import { Box, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";

interface NavBarProps{

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <Box bg='tomato' p={4} ml={'auto'}>
            <NextLink href="/map">
                <Link color='white'>Map</Link>
            </NextLink>
            <NextLink href="/genres">
                <Link ml={2} color="white">Genres</Link>
            </NextLink>
            <NextLink href="http://localhost:3000">
                <Link ml={2} color='white'>Home</Link>
            </NextLink>
        </Box>
    );
}