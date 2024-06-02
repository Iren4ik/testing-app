'use client';

import styles from './page.module.css';
import React from 'react';
import { Box, Typography } from '@mui/material';
import ProgressBar from '../components/ProgressBar';
import Question from '../components/Question';
import useTimer from '../hooks/useTimer';

const Home: React.FC = () => {
  const timeRemaining = useTimer();

  return (
    <main className={styles.main}>
      <Box className={styles.container}>
        <Box>
          <Typography variant="h4" component="h1">Тестирование</Typography>
          <Typography variant="h6">
            {new Date(timeRemaining * 1000).toISOString().substring(14, 19)}
          </Typography>
        </Box>
        <ProgressBar />
        <Box sx={{ mt: 4 }}>
          <Question />
        </Box>
      </Box>
    </main>
  );
};

export default Home;

