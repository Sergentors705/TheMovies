import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/style.scss';

const theme = createTheme({
  colors: {
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
  fontSizes: {
    pageTitle: '48px',
    sectionTitle: '32px',
    secondaryTitle: '24px',
  },
  lineHeights: {
    pageTitle: '48px',
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

