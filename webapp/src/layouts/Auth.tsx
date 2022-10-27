// chakra imports
import { Box, ChakraProvider, Portal } from '@chakra-ui/react';
import { Footer } from 'components/Footer';
// core components
import AuthNavbar from 'components/Navbars/AuthNavbar';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from 'theme/theme';

export default function Pages() {
  // ref for the wrapper div
  const wrapper = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    document.body.style.overflow = 'unset';
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getActiveNavbar = (routes: any): boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const navRef = React.useRef<HTMLDivElement>(null);
  document.documentElement.dir = 'ltr';
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Box ref={navRef} w='100%'>
        <Portal containerRef={navRef}>
          <AuthNavbar
            secondary={getActiveNavbar(routes)}
            logoText='PURITY UI DASHBOARD'
          />
        </Portal>
        <Box w='100%'>
          <Box ref={wrapper} w='100%'>
            <Switch>
              {getRoutes(routes)}
              <Redirect from='/auth' to='/auth/login-page' />
            </Switch>
          </Box>
        </Box>
        <Box px='24px' mx='auto' width='1044px' maxW='100%'>
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
