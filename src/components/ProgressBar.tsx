'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useTestStore } from '../store/testStore';
import { questions } from '../questions';
import styles from '../styles/ProgressBar.module.scss';

const ProgressBar: React.FC = () => {
  const currentQuestionId = useTestStore((state) => state.currentQuestionId);

  return (
    <Box className={styles.progressBarContainer}>
      {questions.map((question) => (
        <Box
          key={question.id}
          className={
            question.id < currentQuestionId
              ? styles.completed
              : question.id === currentQuestionId
              ? styles.current
              : styles.pending
          }
        />
      ))}
    </Box>
  );
};

export default ProgressBar;

