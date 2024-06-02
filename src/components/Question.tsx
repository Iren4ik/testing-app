'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTestStore } from '@/store/testStore';
import { questions } from '@/questions';
import { Box, Typography, Button } from '@mui/material';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ShortAnswerQuestion from '@/components/ShortAnswerQuestion';
import LongAnswerQuestion from '@/components/LongAnswerQuestion';
import styles from '@/styles/questions.module.scss';

const Question: React.FC = () => {
  const { control, handleSubmit, watch, reset, setValue } = useForm();
  const currentQuestionId = useTestStore((state) => state.currentQuestionId);
  const answerQuestion = useTestStore((state) => state.answerQuestion);
  const nextQuestion = useTestStore((state) => state.nextQuestion);
  const currentQuestion = questions.find(question => question.id === currentQuestionId);
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);

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
      nextQuestion();
    }
  };

  if (!currentQuestion) {
    return <Typography variant="h6">Вопрос не найден</Typography>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" component="h2" className={styles.headerQuestion}>{currentQuestion.question}</Typography>
      {currentQuestion.type === 'single-choice' && (
        <SingleChoiceQuestion control={control} options={currentQuestion.options || []} setIsAnswerGiven={setIsAnswerGiven} />
      )}
      {currentQuestion.type === 'multiple-choice' && (
        <MultipleChoiceQuestion control={control} options={currentQuestion.options || []} setValue={setValue} setIsAnswerGiven={setIsAnswerGiven} fieldValue={formValues.answer} />
      )}
      {currentQuestion.type === 'short-answer' && (
        <ShortAnswerQuestion control={control} setIsAnswerGiven={setIsAnswerGiven} />
      )}
      {currentQuestion.type === 'long-answer' && (
        <LongAnswerQuestion control={control} setIsAnswerGiven={setIsAnswerGiven} />
      )}
      <Box className={styles.buttonContainer}>
        <Button type="submit" variant="contained" disabled={!isAnswerGiven} className={styles.button}>
          Ответить
        </Button>
      </Box>
    </form>
  );
};

export default Question;