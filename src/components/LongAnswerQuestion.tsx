'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import styles from '@/styles/longAnswerQuestion.module.scss';

interface LongAnswerQuestionProps {
  control: Control<any>;
  setIsAnswerGiven: (isGiven: boolean) => void;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({ control, setIsAnswerGiven }) => {
  return (
    <Controller
      name="answer"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          onChange={(e) => {
            field.onChange(e);
            setIsAnswerGiven(!!e.target.value.trim());
          }}
          className={styles.longAnswer}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'black',
              },
            },
          }}
        />
      )}
    />
  );
};

export default LongAnswerQuestion;