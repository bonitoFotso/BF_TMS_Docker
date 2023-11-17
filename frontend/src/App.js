import { useSelector } from 'react-redux';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import { AuthProvider } from './authContext'; // Importez le AuthProvider

// project imports
import NavigationScroll from 'layout/NavigationScroll';

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
