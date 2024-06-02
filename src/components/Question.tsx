'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTestStore } from '../store/testStore';
import { questions } from '../questions';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, TextField, Button } from '@mui/material';

const Question: React.FC = () => {
  const { control, handleSubmit, watch, reset, setValue } = useForm();
  const currentQuestionId = useTestStore((state) => state.currentQuestionId);
  const answerQuestion = useTestStore((state) => state.answerQuestion);
  const nextQuestion = useTestStore((state) => state.nextQuestion);
  const allAnswersSubmitted = useTestStore((state) => state.allAnswersSubmitted);
  const setAllAnswersSubmitted = useTestStore((state) => state.setAllAnswersSubmitted);
  const isLastQuestion = useTestStore((state) => state.isLastQuestion);

  const currentQuestion = questions.find(question => question.id === currentQuestionId);

  const [isAnswerGiven, setIsAnswerGiven] = useState(false);
  // const [allAnswersSubmitted, setAllAnswersSubmitted] = useState(false);

  const formValues = watch();

  useEffect(() => {
    if (!currentQuestion) return;

    const checkAnswerGiven = () => {
      if (currentQuestion.type === 'single-choice') {
        return typeof formValues.answer === 'string' && formValues.answer.trim() !== '';
      }
      if (currentQuestion.type === 'multiple-choice') {
        return Array.isArray(formValues.answer) && formValues.answer.length > 0;
      }
      if (currentQuestion.type === 'short-answer' || currentQuestion.type === 'long-answer') {
        return typeof formValues.answer === 'string' && formValues.answer.trim().length > 0;
      }
      return false;
    };

    setIsAnswerGiven(checkAnswerGiven());
  }, [formValues, currentQuestion]);

  useEffect(() => {
    reset({ answer: [] });
    setIsAnswerGiven(false);
  }, [currentQuestionId, reset]);

  const onSubmit = (data: any) => {
    if (currentQuestion) {
      answerQuestion({ questionId: currentQuestion.id, answer: data.answer });
      if (isLastQuestion) {
        setAllAnswersSubmitted(true);
      } else {
        nextQuestion();
      }
    }
  };

  if (allAnswersSubmitted) {
    return <Typography variant="h6">Ответы направлены</Typography>;
  }

  if (!currentQuestion) {
    return <Typography variant="h6">Вопрос не найден</Typography>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">{currentQuestion.question}</Typography>
      {currentQuestion.type === 'single-choice' && (
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
              <RadioGroup
                {...field}
                value={field.value || ''}
                onChange={(e) => {
                  field.onChange(e);
                  setIsAnswerGiven(!!e.target.value);
                }}
              >
              {currentQuestion.options?.map((option: string) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          )}
        />
      )}
      {currentQuestion.type === 'multiple-choice' && (
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <>
              {currentQuestion.options?.map((option: string) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={Array.isArray(field.value) && field.value.includes(option)}
                      onChange={() => {
                        const newValue = field.value.includes(option)
                          ? field.value.filter((item: string) => item !== option)
                          : [...(field.value || []), option];
                        setValue('answer', newValue);
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </>
          )}
        />
      )}
      {currentQuestion.type === 'short-answer' && (
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
            />
          )}
        />
      )}
      {currentQuestion.type === 'long-answer' && (
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
            />
          )}
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={!isAnswerGiven}>
          Ответить
        </Button>
      </Box>
    </form>
  );
};

export default Question;