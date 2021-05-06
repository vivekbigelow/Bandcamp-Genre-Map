#Bandcamp Web Scraper 

import requests
import pandas
from bs4 import BeautifulSoup
from queue import LifoQueue,Queue
import psycopg2
import requests
import csv



#Album class to store album information
class Album:
    def __init__(self,url,title,artistName,location,releaseDate,numberTracks,fanLinks,recLinks,genres,tagLinks):
       self.url = url
       self.title = title
       self.artistName = artistName
       self.location = location
       self.releaseDate = releaseDate
       self.numberTracks = numberTracks
       self.fanLinks = fanLinks
       self.recLinks = recLinks
       self.genres = genres
       self.tagLinks = tagLinks

    def getURL(self):
        return self.url
    def getTitle(self):
        return self.title
    def getArtist(self):
        return self.artistName
    def getLocation(self):
        return self.location
    def getReleaseDate(self):
        return self.releaseDate
    def getNumberTracks(self):
        return self.numberTracks
    def getFanLinks(self):
        return self.fanLinks
    def getRecLinks(self):
        return self.recLinks
    def getGenres(self):
        return self.genres
    def getTagLinks(self):
        return self.tagLinks

    def __str__(self):
        return f'[Album Title: {self.title}, Artist: {self.artistName}, url: {self.url}]'



#Depth first search that takes a bandcamp album url 
#Finds n urls that are connected by paths to the first url
#Returns an array of the URLS
#Based off of the recommended albums on Bandcamp
def  DFSrecs(album,n):
    stack = LifoQueue()
    albums = []
    albums.append(album)
    startLinks = album.getRecLinks()
    for i in range(len(startLinks)):
        stack.put(startLinks[i])
    while n > 0:
        if (not stack.empty()):
            url = stack.get()
            newAlbum = makeAlbumObject(url)
            newLinks = newAlbum.getRecLinks()
            for j in range(len(newLinks)):
                stack.put(newLinks[j])
            albums.append(newAlbum)
            n -= 1
        else:
            break
    return albums


#Breadth first search that takes a bandcamp album url 
#Finds n urls that are connected by paths to the first url
#Returns an array of the URLS
#Based off of the recommend albums on Bandcamp
def BFSrecs(album, n):
    q = Queue()
    albums = []
    albums.append(album)
    startLinks = album.getRecLinks()
    for link in startLinks:
        q.put(link)
    while n > 0:
        if (not q.empty()):
            url = q.get()
            newAlbum = makeAlbumObject(url)
            newLinks = newAlbum.getRecLinks()
            for link in newLinks:
                q.put(link)
            albums.append(newAlbum)
            n -= 1
        else:
            break
    return albums
   
def convertDate(dateArray):
    date = ''
    mm = ''
    yyyy = dateArray[2]
    dd = ''
    if (dateArray[0] == 'January'):
        mm = '01'
    elif (dateArray[0] == 'February'):
        mm = '02'
    elif (dateArray[0] == 'March') :
        mm = '03'
    elif (dateArray[0] == 'April'):
        mm = '04'
    elif (dateArray[0] == 'May'):
        mm = '05'
    elif (dateArray[0] == 'June'):
        mm = '06'
    elif (dateArray[0] == 'July'):
        mm = '07'
    elif (dateArray[0] == 'August'):
        mm = '08'
    elif (dateArray[0] == 'September'):
        mm = '09'
    elif (dateArray[0] == 'October'):
        mm = '10'
    elif (dateArray[0] == 'November'):
        mm = '11'
    elif (dateArray[0] == 'December'):
        mm = '12'
    else:
        mm = '00'

    if (not dateArray[1] > '10'):
        dd = '0' + dateArray[1]
    else:
        dd= dateArray[1]
    #yyyy-mm-dd
    date = yyyy+'-'+mm+'-'+dd
    return date

def getLocationCoords(location):
    coords = []
    APIKEY = 'YOUR KEY'
    response = requests.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
     params= {'address' :'%s'%(location),
            'key' : '%s'%(APIKEY)}
    )
    json_result = response.json()['results']
    lat = json_result[0]['geometry']['location']['lat']
    lng = json_result[0]['geometry']['location']['lng']
    coords.append(lat)
    coords.append(lng)
    return coords



def makeAlbumObject(url):
    page = requests.get(url)

    soup = BeautifulSoup(page.content, 'html.parser')
   
    artistName = soup.find(id='name-section').h3.span.text.strip()

    pNameLocation = soup.find(id="band-name-location").find_all('span')
    location = pNameLocation[1].text.strip()

    albumTitle = soup.find_all('h2', class_='trackTitle')[0].text.strip()

    albumCredits = soup.find_all('div', class_='tralbum-credits')[0].text.strip().split()
    date = albumCredits[1:4]
    date[1] = date[1].replace(',','')

    releaseDate = convertDate(date)
    

    #turn into yyyy-mm-dd

    tracks = soup.find_all('tr', class_='track_row_view')
    numberTracks = len(tracks)

    fans = soup.find_all('a', class_='fan')
    fanLinks = []

    for i in fans:
        fanLinks.append(i['href'])
    
    recs = soup.find_all('li', class_='recommended-album')
    recLinks = []

    for i in recs:
        recLinks.append(i.a['href'])

    tagLinks = soup.find_all('a', class_='tag')
    genres = []
    genreLinks = []
    for link in tagLinks:
        tagTitle = link.text.strip()
        tagTitle = tagTitle.replace(" ","")
        tagTitle = tagTitle.replace("-","")
        tagTitle = tagTitle.lower()
        genres.append(tagTitle)
        linkUrl = link['href']
        genreLinks.append(linkUrl)
    genres.pop()
   
    
    album = Album(url,albumTitle,artistName,location,releaseDate,numberTracks,fanLinks,recLinks,genres,genreLinks)
    return album

#takes a list of album objects
#saves a csv of the album data
def makeAlbumDF(albums):
    titles = []
    artists = []
    locations = []
    dates = []
    numtracks = []
    #fanlinks = []
    #reclinks = []
    genres = []
    #taglinks = []
    urls = []

    for album in albums:
        titles.append(album.getTitle())
        artists.append(album.getArtist())
        locations.append(album.getLocation())
        dates.append(album.getReleaseDate())
        numtracks.append(album.getNumberTracks())
        #fanlinks.append(album.getFanLinks())
        #reclinks.append(album.getRecLinks())
        genres.append(album.getGenres())
        #taglinks.append(album.getTagLinks())
        urls.append(album.getURL())
    albumDict = {'title':titles, 'artist':artists,'url':urls, 'location':locations, 
                  'date': dates, 'ntracks':numtracks,'genres': genres }
    df = pandas.DataFrame(data = albumDict)

    return df
    

def addAlbumToDb(album):
    DB_NAME = "bandcamp"
    DB_USER = "Vivek"
    DB_HOST = "localhost"
    DB_PASS = ""

    conn = psycopg2.connect(database = DB_NAME, user = DB_USER, password=DB_PASS, host = DB_HOST) 

    cur = conn.cursor()  
    print("Connected to DB \n")

    #Get album attributes
    print("Getting Attributes \n")
    title = album.getTitle()
    artist = album.getArtist()
    location = album.getLocation()
    date = album.getReleaseDate()
    genres = album.getGenres()
    numTracks = album.getNumberTracks()
    url = album.getURL()


    #Convert Location to city and country if there is a city
    print("Convert Location")
    if(',' in location):
        #get location coords
        coords = getLocationCoords(location)
        lat = coords[0]
        lng = coords[1]
        location = location.split(',')
        city = location[0]
        country = location[1].lstrip()
    else:
        city = "NA"
        country = location

    if(not city == 'NA'):

        #Add City
        print("Adding city to DB \n")
        statement = "SELECT * from city WHERE name =%s;"
        cur.execute(statement,(city,))
        result = cur.fetchall()
        if (len(result) == 0):
            statement = '''INSERT INTO city(name) VALUES (%s)'''
            cur.execute(statement,(city,))
            print("Added City \n")
        
        #Add Country
        print("Adding country to DB \n")
        statement = "SELECT * from country WHERE name =%s;"
        cur.execute(statement,(country,))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO country(name) VALUES (%s)'''
            cur.execute(statement,(country,))
            print("Added Country \n")
        
        #Add Location
        print("Adding location to DB \n")
        statement = "SELECT * from location where lat=%s AND lng =%s;"
        cur.execute(statement, (lat,lng))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO location(lat,lng) VALUES(%s,%s);'''
            cur.execute(statement,(lat,lng))
            print("Added Location \n")
        
        #Add Title
        print("Adding Title \n")
        statement = "SELECT * from title WHERE name = %s;"
        cur.execute(statement,(title,))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO title (name) VALUES (%s)'''
            cur.execute(statement,(title,))
            print("Added Title \n")

        #Add Artist
        print("Adding artist \n")
        statement = "SELECT * from artist WHERE name =%s;"
        cur.execute(statement,(artist,))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO artist (name) VALUES (%s)'''
            cur.execute(statement, (artist,))
            print("Added Artist \n")

        #Add ReleaseDate
        print("Adding ReleaseDate \n")
        statement = "SELECT * from release_date WHERE date =%s;"
        cur.execute(statement,(date,))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO release_date (date) VALUES (%s)'''
            cur.execute(statement, (date,))
            print("Added ReleaseDate \n")

        #Add Genres
        print("Adding Genres \n")
        genreIds= []
        for i in range(len(genres)):
            genre = genres[i]
            statement = "SELECT * from genre WHERE name =%s;"
            cur.execute(statement, (genre,))
            result = cur.fetchall()
            if(len(result) == 0):
                statement = '''INSERT INTO genre(name) VALUES (%s)'''
                cur.execute(statement,(genre,))
                print("Added genre \n")
            statement = '''SELECT DISTINCT id from genre WHERE name =%s;'''
            cur.execute(statement, (genre,))
            result = cur.fetchall()
            genreIds.append(result[0][0])
        print("Genres added \n")
            

        #Add Album
        print("Adding Album \n")
        
        statement = "SELECT id from city WHERE name = %s;" 
        cur.execute(statement, (city,))
        cityID = cur.fetchall()[0][0]

        statement = "SELECT id from country WHERE name =%s;" 
        cur.execute(statement, (country,))
        countryID = cur.fetchall()[0][0]

        statement = "SELECT id from location WHERE lat=%s AND lng=%s;"
        cur.execute(statement,(lat,lng))
        locationID = cur.fetchall()[0][0]

        statement = "SELECT id from title WHERE name =%s;"
        cur.execute(statement,(title,))
        titleID = cur.fetchall()[0][0]

        statement = "SELECT id from artist WHERE name =%s;"
        cur.execute(statement, (artist,))
        artistID = cur.fetchall()[0][0]

        statement = "SELECT id from release_date WHERE date =%s;"
        cur.execute(statement, (date,))
        releaseDateID = cur.fetchall()[0][0]

        statement = '''SELECT id from album WHERE "titleId" = (%s) AND "artistId" = (%s) AND "numberTracks" = (%s) AND "countryId" = (%s) AND "releaseDateId" = (%s)'''
        cur.execute(statement, (titleID,artistID,numTracks,countryID,releaseDateID))
        result = cur.fetchall()
        if(len(result) == 0):
            statement = '''INSERT INTO album (url,"numberTracks","titleId","artistId","releaseDateId","cityId","countryId","locationId") VALUES (%s,%s,%s,%s,%s,%s,%s,%s)'''
            cur.execute(statement, (url,numTracks,titleID,artistID,releaseDateID,cityID,countryID,locationID))

            print("Added Album \n")
            print("Creating Genre Album relations \n")
            statement = '''SELECT id from album WHERE "titleId" = (%s) AND "artistId" = (%s) AND url = (%s) AND "numberTracks" = (%s) AND "countryId" = (%s) AND "releaseDateId" = (%s)'''
            cur.execute(statement, (titleID,artistID,url,numTracks,countryID,releaseDateID))
            result = cur.fetchall()
            albumID = result[0][0]
            for genre in genreIds:
                statement = '''SELECT * from album_genres_genre WHERE "albumId" = (%s) AND "genreId" = (%s)'''
                cur.execute(statement, (albumID,genre))
                result = cur.fetchall()
                if(len(result) == 0 ):
                    statement = '''INSERT INTO album_genres_genre ("albumId","genreId") VALUES (%s,%s)'''
                    cur.execute(statement,(albumID,genre))
                    print("Added relation \n")
    
    
    conn.commit()
    print("Commiting Inserts")
    conn.close()
    print("Connection Closed")

# Scrape and add albums

#URL = "https://cursesforever.bandcamp.com/album/romantic-fiction"
#URL ="https://slicerslicer.bandcamp.com/album/join-my-party"
#URL ="https://girlsville.bandcamp.com/album/joy"
#URL = "https://thechivestheband.bandcamp.com/album/the-chives"
#URL = "https://franckroger.bandcamp.com/track/agoe"
#URL = 'https://disasterstock.bandcamp.com/album/stimulus-check-2'
#URL = 'https://wetcassettes.bandcamp.com/album/ok-sat-n'
#URL = "https://playland.bandcamp.com/album/playland-2"
URL = "https://mutantacademyrva.bandcamp.com/album/big-fly-digital"
#URL = "https://halfshellrecords.bandcamp.com/album/moonstoners"
#URL = "https://caspermcfadden.bandcamp.com/album/original-soundtrack"
#page = requests.get(URL)
#soup = BeautifulSoup(page.content, 'html.parser')


print("Starting Scrape \n")
startAlbum = makeAlbumObject(URL)

albums = BFSrecs(startAlbum,100)

for album in albums:
    print("Adding Album \n")
    addAlbumToDb(album)

df = makeAlbumDF(albums)

df.to_csv('albumsData.csv',header=True,index=False)







