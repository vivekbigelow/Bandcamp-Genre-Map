import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useState } from "react";


interface Album{
    title: string;
    artist: string;
    url: string;
}

interface MarkerProps{
    lat: number;
    lng: number;
    album: Album;
    
}

export const Marker: React.FC<MarkerProps> = ({album}) => {
    const [hoverOn, setHoverOn] = useState(false);
    let background = "tomato"
    if(hoverOn){
       background = "#4bfa7f"
    }
    
    return (
        <Container 
        transform="translate(-50%,0)" 
        position="absolute" 
        cursor="pointer" 
        onMouseEnter = {() => setHoverOn(true)}
        onMouseLeave = {() => setHoverOn(false)} 
        centerContent>
            <Box 
            border="1px" 
            borderRadius={10} 
            bg={background}
            w={3} 
            h={3}
            zIndex={-1}
            cursor="pointer">
            </Box>
        
            {hoverOn && (<Box bg="white" zIndex={10} w="auto" h="auto" p={2} textAlign="center" >
            <div>
            <p style={{padding:5,fontWeight:"bold"}}>{album.title}</p>
          
            <p style={{padding:5}}>{album.artist}</p>
        
            <a href={album.url} target="new window"><p style={{color:'tomato', padding:5}}>view on bandcamp</p></a>
            </div>
            </Box>)}
        </Container>
    )
}