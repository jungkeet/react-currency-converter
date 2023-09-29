import React from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Converter from './Converter'

function App() {
  return (
    <Box
      sx={{
        color: '#505050',
        backgroundColor: '#e9e9e9',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Converter />
      <Typography variant="subtitle1" fontWeight="300" marginTop={1}>
        API provided by <Link href="https://freecurrencyapi.com/" underline="hover" target="_blank" rel="noopener noreferrer">
          {'https://freecurrencyapi.com/'}
        </Link>
      </Typography>
    </Box>
  );
};

export default App
