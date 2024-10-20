import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { Institutes, Questionnaire, QuestionnairesNames, SendAnswers } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuestionnairesById = createAsyncThunk<Questionnaire, string, { state: RootState }>(
  'questionnaires/fetchById',
  async (id) => {
    const { data: answers } = await axiosApi.get<Questionnaire>(`/questionnaires/${id}`);

    return answers;
  },
);

export const fetchQuestionnaires = createAsyncThunk('questionnaires/fetch', async () => {
  const { data: apiQuestionnaireName } = await axiosApi.get<QuestionnairesNames[]>('/questionnaires');

  return apiQuestionnaireName;
});

export const fetchInstitutes = createAsyncThunk('questionnaires/fetchInstitutes', async () => {
  const { data: apiInstitutes } = await axiosApi.get<Institutes[]>('/institutes');

  return apiInstitutes;
});

export const sendAnswers = createAsyncThunk('questionnaires/sendAnswers', async (data: SendAnswers) => {
  await axiosApi.post(`/questionnaires/${data.questionId}`, data.values);
});
