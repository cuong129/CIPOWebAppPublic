import { Flex, Link, List, ListItem, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'
    >
      <Text
        color='gray.400'
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        &copy; {1900 + new Date().getFullYear()},{' '}
        <Text as='span'>{'Made with ❤️ by '}</Text>
        <Link
          // color={linkTeal}
          color='teal.400'
          href='https://www.creative-tim.com'
          target='_blank'
        >
          {'Creative Tim '}
        </Link>
        &
        <Link
          // color={linkTeal}
          color='teal.400'
          href='https://www.simmmple.com'
          target='_blank'
        >
          {' Simmmple'}
        </Link>
        {' for a better web'}
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color='gray.400' href='https://www.creative-tim.com'>
            {'Creative Tim'}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color='gray.400' href='https://www.simmmple.com'>
            {'Simmmple'}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link color='gray.400' href='https://creative-tim.com/blog'>
            {'Blog'}
          </Link>
        </ListItem>
        <ListItem>
          <Link color='gray.400' href='https://www.creative-tim.com/license'>
            {'License'}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
