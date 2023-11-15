import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import { Provider } from 'react-redux';
import { AuthProvider } from './authContext'; // Importez le AuthProvider

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import store from './redux/store'; // Importez votre magasin Redux

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
   // <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
          <AuthProvider> {/* Enveloppez App avec le AuthProvider */}
            <Routes />
          </AuthProvider>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    //</Provider>
  );
};

export default App;
