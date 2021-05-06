import psycopg2
import csv

DB_NAME = "bandcamp"
DB_USER = "Vivek"
DB_HOST = "localhost"
DB_PASS = ""

conn = psycopg2.connect(database = DB_NAME, user = DB_USER, password=DB_PASS, host = DB_HOST)

print("Database Opened Successfully")

cur = conn.cursor()

cur.execute(
    '''CREATE TEMPORARY TABLE albumTemp
    (
        title VARCHAR NOT NULL,
        artist VARCHAR NOT NULL,
        url VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        country VARCHAR NOT NULL,
        releaseDate date,
        numTracks integer,
        genres VARCHAR[]

    );'''
    )


fname = 'albumsData.csv'
with open(fname) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)
    for row in csv_reader:
        title = row[0]
        artist = row[1]
        url = row[2]
        if(',' in row[3]):
            location = row[3].split(',')
            name = location[0]
            country = location[1].strip()
        else:
            name = "NA"
            country = row[3]
        releaseDate = row[4]
        numTracks = row[5]
        genres = row[6]
        

        

        #Add City
        cur.execute("SELECT * from city WHERE name = (%s)"%((repr(name))))
        result = cur.fetchall()
        if (not name == "NA" and len(result) == 0):
            cur.execute('''INSERT INTO city(name) VALUES (%s)'''%(repr(name)))

        #Add Country
        cur.execute("SELECT * from country WHERE name = (%s)"%((repr(country))))
        result = cur.fetchall()
        if(len(result) == 0):
            cur.execute('''INSERT INTO country(name) VALUES (%s)'''%(repr(country)))
        
        #Add Title
        cur.execute("SELECT * from title WHERE name = (%s)"%((repr(title))))
        result = cur.fetchall()
        if(len(result) == 0):
            cur.execute('''INSERT INTO title (name) VALUES (%s)'''%(repr(title)))

        #Add Artist
        cur.execute("SELECT * from artist WHERE name = (%s)"%((repr(artist))))
        result = cur.fetchall()
        if(len(result) == 0):
            cur.execute('''INSERT INTO artist (name) VALUES (%s)'''%(repr(artist)))
        
        #Add ReleaseDate
        cur.execute("SELECT * from release_date WHERE date = (%s)"%((repr(releaseDate))))
        result = cur.fetchall()
        if(len(result) == 0):
            cur.execute('''INSERT INTO release_date (date) VALUES (%s)'''%(repr(releaseDate)))
        
        #Add Album
        if(not name == "NA"):
            cur.execute("SELECT id from city WHERE name = (%s)" %(repr(name)))
            cityID = cur.fetchall()[0][0]

        cur.execute("SELECT id from country WHERE name = (%s)" %(repr(country)))
        countryID = cur.fetchall()[0][0]

        cur.execute("SELECT id from title WHERE name = (%s)" %(repr(title)))
        titleID = cur.fetchall()[0][0]

        cur.execute("SELECT id from artist WHERE name = (%s)" %(repr(artist)))
        artistID = cur.fetchall()[0][0]

        cur.execute("SELECT id from release_date WHERE date = (%s)" %(repr(releaseDate)))
        releaseDateID = cur.fetchall()[0][0]

        cur.execute('''SELECT * from album WHERE "titleId" = (%s) AND "artistId" = (%s) AND url = (%s) AND "numberTracks" = (%s)''' %(titleID,artistID,repr(url),numTracks))
        result = cur.fetchall()
        if(len(result) == 0 and not name == "NA"):
            cur.execute('''INSERT INTO album (url,"numberTracks","titleId","artistId","releaseDateId","cityId","countryId") VALUES (%s,%s,%s,%s,%s,%s,%s)'''
            %(repr(url),numTracks,titleID,artistID,releaseDateID,cityID,countryID))
        elif(len(result) == 0 and name == "NA"):
            cur.execute('''INSERT INTO album (url,"numberTracks","titleId","artistId","releaseDateId","countryId") VALUES (%s,%s,%s,%s,%s,%s)'''
            %(repr(url),numTracks,titleID,artistID,releaseDateID,countryID))
        

    
        #cur.execute('''INSERT INTO album(title,artist,url,"albumLocationCity","albumLocationCountry","releaseDate","numberTracks") 
        #    VALUES (%s,%s,%s,%s,%s,%s,%s)''',(title,artist,url,city,country,releaseDate,numTracks))
    
conn.commit()
rows = cur.fetchall()

print(rows)
conn.close()
