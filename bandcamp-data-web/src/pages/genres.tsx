import { Table, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { NavBar } from '../components/NavBar'
import { Wrapper } from '../components/Wrapper';
import { useGenresQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface genresProps{

}

const Genres: React.FC<genresProps> = ({}) => {
    const [{data,fetching}] = useGenresQuery()
    let body = null;    

    // data is loading
    if(fetching){
      body = null;
      //  no locations
    } else if (!data?.genres){
        body = (
          <div>no albums</div>
        )
      } else {
      body = (
        <Wrapper>
        <Table variant='simple'>
          <Thead>
            <Tr>
            <Th>Name</Th>
            <Th>Number of Albums</Th>
            </Tr>
          </Thead>
          <Tbody>
          {data.genres.map(genre => 
          <Tr key={genre.name}>
            <Td>{genre.name}</Td>
          
            <Td>{genre.albums.length}</Td>
          </Tr>)}
          </Tbody>
           </Table>
           </Wrapper>
      )}
       
    return (
        <>
        <NavBar />
        {body}
        </>
    )
}


export default withUrqlClient(createUrqlClient, { ssr: true })(Genres)