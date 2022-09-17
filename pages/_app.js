import { ChakraProvider, Flex } from '@chakra-ui/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log({ pageProps })
  return (
    <ChakraProvider>
      <Flex w="100vw" bg="black" color="white">
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
}

export default MyApp
