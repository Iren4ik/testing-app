'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControlLabel, Checkbox, Box } from '@mui/material';
import styles from '@/styles/multipleChoiceQuestion.module.scss';

interface MultipleChoiceQuestionProps {
  control: Control<any>;
  options: string[];
  setValue: (name: string, value: any) => void;
  setIsAnswerGiven: (isGiven: boolean) => void;
  fieldValue: any;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ control, options, setValue, setIsAnswerGiven, fieldValue }) => {
  return (
    <Controller
      name="answer"
      control={control}
      render={({ field }) => (
        <Box className={styles.checkboxContainer}>
          {options.map((option: string) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  classes={{
                    root: styles.checkbox,
                    checked: styles.checkboxChecked,
                  }}
                  checked={Array.isArray(field.value) && field.value.includes(option)}
                  onChange={() => {
                    const newValue = field.value.includes(option)
                      ? field.value.filter((item: string) => item !== option)
                      : [...(field.value || []), option];
                    setValue('answer', newValue);
                    setIsAnswerGiven(newValue.length > 0);
                  }}
                />
              }
              label={option}
            />
          ))}
        </Box>
      )}
    />
  );
};

export default MultipleChoiceQuestion;