'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import styles from '@/styles/singleChoiceQuestion.module.scss';

interface SingleChoiceQuestionProps {
  control: Control<any>;
  options: string[];
  setIsAnswerGiven: (isGiven: boolean) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ control, options, setIsAnswerGiven }) => {
  return (
    <Controller
      name="answer"
      control={control}
      render={({ field }) => (
        <RadioGroup
          {...field}
          className={styles.radioGroup}
          value={field.value || ''}
          onChange={(e) => {
            field.onChange(e);
            setIsAnswerGiven(!!e.target.value);
          }}
        >
          {options.map((option: string) => (
            <FormControlLabel
              key={option}
              value={option}
              control={
                <Radio
                  classes={{
                    root: styles.radio,
                    checked: styles.radioChecked,
                  }}
                />
              }
              label={<span className={styles.radioLabel}>{option}</span>}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default SingleChoiceQuestion;
