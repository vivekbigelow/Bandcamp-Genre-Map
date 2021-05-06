import { NavBar } from '../components/NavBar';
import { Hero } from '../components/Hero';
import { Link as ChakraLink, Button, Flex } from '@chakra-ui/react';

import { Container } from '../components/Container'
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
 
const Index = () => (
<>
<NavBar />
<Hero />
<Flex direction="column"
      alignItems="center">
<ChakraLink
    isExternal
    href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui"
    flexGrow={3}
    mx={2}
>
    <Button width="100%" bg='tomato'>
    View Repo
    </Button>
</ChakraLink>
</Flex>
</>
);

export default withUrqlClient(createUrqlClient)(Index);  
