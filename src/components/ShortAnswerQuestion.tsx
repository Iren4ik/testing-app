'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import styles from '@/styles/shortAnswerQuestion.module.scss';

interface ShortAnswerQuestionProps {
  control: Control<any>;
  setIsAnswerGiven: (isGiven: boolean) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ control, setIsAnswerGiven }) => {
  return (
    <Controller
      name="answer"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          onChange={(e) => {
            field.onChange(e);
            setIsAnswerGiven(!!e.target.value.trim());
          }}
          className={styles.shortAnswer}
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

export default ShortAnswerQuestion;