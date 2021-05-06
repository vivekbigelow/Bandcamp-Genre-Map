import React, { useState } from 'react'
import {
    Link,
    Button,
    Flex,
    Box,
    Table,
    Th,
    Thead,
    Tr,
    Tbody,
    Td,
    Container
  } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
import { NavBar } from '../components/NavBar';
import { useAlbumsQuery, useGenreByNameQuery } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import GoogleMapReact from 'google-map-react';
import { Marker } from '../components/Marker';
import { GenreDropDown } from '../components/GenreDropDown';


interface mapProps {

}

const Map: React.FC<mapProps> = ({}) => {
    
    const [value,setValue] = useState("");
    const getValue = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value)
    }
    const [{data,fetching}] = useGenreByNameQuery({
      variables:{
        name:value
      }
    })
    let body = null
    let table = null
    

    // data is loading
    if(fetching){
      body = (   <div style={{ height:'auto', width: '60%' }}>
      <GoogleMapReact
      bootstrapURLKeys= {{key: 'AIzaSyC0B05XnH-PvxOsus1k2halxIhWQZ1nLsk'}}
      defaultCenter={{
        lat: 40.00,
        lng:-100.00
      }}
      defaultZoom={1}>
        
      </GoogleMapReact>
    </div>);
      //  no locations
    } else if (!data?.genreByName){
      body = (   <div style={{ height:'auto', width: '60%' }}>
      <GoogleMapReact
      bootstrapURLKeys= {{key: 'AIzaSyC0B05XnH-PvxOsus1k2halxIhWQZ1nLsk'}}
      defaultCenter={{
        lat: 40.00,
        lng:-100.00
      }}
      defaultZoom={1}>
        
      </GoogleMapReact>
    </div>);
      } else {
        
      body = (
        
      
        <div style={{ height:'auto', width: '60%' }}>
          <GoogleMapReact
          bootstrapURLKeys= {{key: 'AIzaSyC0B05XnH-PvxOsus1k2halxIhWQZ1nLsk'}}
          defaultCenter={{
            lat: 40.00,
            lng:-100.00
          }}
          defaultZoom={1}>
            {data.genreByName.albums.map(g_album => 
              <Marker 
              album={{
                artist:g_album.artist.name,
                title:g_album.title.name,
                url:g_album.url
              }} 
              key={g_album.title.name} 
              lat={g_album.location.lat + (Math.random() * .008)} 
              lng={g_album.location.lng + (Math.random() * .008)}/>
            )}
          </GoogleMapReact>
        </div>
      ) 
      table = (
        <Container  w='auto' overflow='scroll'>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Artist</Th>
              <Th>City</Th>
              <Th>Region</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.genreByName.albums.map(g_album => 
              <Tr key={g_album.title.name}>
                <Td>{g_album.title.name}</Td>
                <Td>{g_album.artist.name}</Td>
                <Td>{g_album.city.name}</Td>
                <Td>{g_album.country.name}</Td>
              </Tr>)}
          </Tbody>
        </Table>
        </Container>
      )
      
    }
    return (
        <>
        
        <NavBar />
        <Flex>
        {body}
        <Flex placeContent="center" w="40%">
        <div style={{height:'95vh', width:'90%', marginTop:'5px', overflow:'scroll' }}>
          <GenreDropDown value={value} handleChange={(e) => getValue(e)} />
          {table}
        </div>
        </Flex>
        </Flex>

        </>
    );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Map)