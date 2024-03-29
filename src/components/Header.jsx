import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import AuthContext from '../context/AuthContext';

const ColorModeToggleButton = ({ onClick, colorMode }) => (
  <Button onClick={onClick}>
    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
  </Button>
);

const AuthButtons = ({ isAuthenticated }) => (
  <>
    <Button fontSize={'sm'} fontWeight={400} variant={'link'} as={Link} to={'/login'}>
      Sign In
    </Button>
    <Button
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'purple.500'}
      _hover={{
        bg: 'purple.400',
      }}
      as={Link}
      to={'/register'}
    >
      Sign Up
    </Button>
  </>
);

const UserMenu = ({ userName, onLogout }) => (
  <Menu>
    {/* ... rest of the user menu */}
  </Menu>
);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth, logout, user } = useContext(AuthContext);

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={5}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justifyContent={'space-between'}
        boxShadow={'base'}
      >
        <Box as={Link} to={'/'}>
          Pern Stack Todo App
        </Box>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={5}>
            <ColorModeToggleButton onClick={toggleColorMode} colorMode={colorMode} />
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
              {auth === false ? (
                <AuthButtons />
              ) : (
                <UserMenu userName={user.userName} onLogout={logout} />
              )}
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
