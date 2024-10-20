import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuestionInput } from '@/features/questionnaires/components/questionInput';
import {
  selectInstitutes,
  selectIsLoading,
  selectIsSending,
  selectQuestionnaire,
} from '@/features/questionnaires/questionnairesSlice';
import { fetchInstitutes, fetchQuestionnairesById, sendAnswers } from '@/features/questionnaires/questionnairesThunks';
import type { FormValues } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const OneQuestionnaire: React.FC = () => {
  const dispatch = useAppDispatch();
  const questionnaire = useAppSelector(selectQuestionnaire);
  const isLoading = useAppSelector(selectIsLoading);
  const institutes = useAppSelector(selectInstitutes);
  const { id } = useParams() as { id: string };
  const [formData, setFormData] = useState<FormValues[]>([]);
  const isSending = useAppSelector(selectIsSending);

  useEffect(() => {
    dispatch(fetchQuestionnairesById(id));
    dispatch(fetchInstitutes());
  }, [dispatch, id]);

  const handleInputChange = (questionId: string, answer: string | boolean) => {
    setFormData((prevState) => {
      const existingIndex = prevState.findIndex((item) => item.questionId === Number(questionId));
      if (existingIndex !== -1) {
        const updatedFormData = [...prevState];
        updatedFormData[existingIndex] = { ...updatedFormData[existingIndex], answer };
        return updatedFormData;
      }

      return [...prevState, { instituteId: parseFloat(id), questionId: Number(questionId), answer }];
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(sendAnswers({ questionId: id, values: formData }));
  };

  console.log(formData);

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : questionnaire?.questionList.length === 0 ? (
        <p className={'text-muted-foreground text-sm text-center mt-72'}>Неизвестная ошибка, попробуйте позже.</p>
      ) : (
        <div className={'flex flex-col gap-4 mt-2'}>
          <Select required onValueChange={(value) => handleInputChange(value, value)}>
            <SelectTrigger>
              <SelectValue placeholder='Выберите институт' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {institutes?.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <form onSubmit={handleSubmit}>
            <div className={'flex flex-col gap-6 mb-4'}>
              {questionnaire?.questionList.map((item) => (
                <QuestionInput
                  key={item.id}
                  id={item.id}
                  label={item.questionName}
                  type={item.typeName}
                  required={item.typeName !== 'BOOLEAN'}
                  handleInputChange={handleInputChange}
                />
              ))}
            </div>

            <Button className={'w-full'} disabled={isSending} type={'submit'}>
              Отправить {isSending && <Loader />}
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
