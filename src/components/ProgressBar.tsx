'use client';

import React from 'react';
import { Box } from '@mui/material';
import { useTestStore } from '@/store/testStore';
import { questions } from '@/questions';
import styles from '@/styles/ProgressBar.module.scss';

const ProgressBar: React.FC = () => {
  const currentQuestionId = useTestStore((state) => state.currentQuestionId);
  const timeExpired = useTestStore((state) => state.timeExpired);
  const allAnswersSubmitted = useTestStore((state) => state.allAnswersSubmitted);

  return (
    <Box className={styles.progressBarContainer}>
      {questions.map((question) => (
        <Box
          key={question.id}
          className={
            allAnswersSubmitted || question.id < currentQuestionId
              ? styles.completed
              : timeExpired && question.id === currentQuestionId
              ? styles.current
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
