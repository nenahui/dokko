import {
  fetchInstitutes,
  fetchQuestionnaires,
  fetchQuestionnairesById,
  sendAnswers,
} from '@/features/questionnaires/questionnairesThunks';
import type { Institutes, Questionnaire, QuestionnairesNames } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface questionnairesState {
  questionnaire: Questionnaire | null;
  isLoading: boolean;
  isSending: boolean;
  isNamesFetching: boolean;
  questionnairesNames: QuestionnairesNames[] | null;
  institutes: Institutes[] | null;
}

const initialState: questionnairesState = {
  questionnaire: null,
  isLoading: false,
  isSending: false,
  isNamesFetching: false,
  questionnairesNames: [],
  institutes: null,
};

export const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionnairesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestionnairesById.fulfilled, (state, { payload: apiQuestionnaire }) => {
        state.questionnaire = apiQuestionnaire;
        state.isLoading = false;
      })
      .addCase(fetchQuestionnairesById.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchQuestionnaires.pending, (state) => {
        state.isNamesFetching = true;
      })
      .addCase(fetchQuestionnaires.fulfilled, (state, { payload: apiQuestionnairesNames }) => {
        state.questionnairesNames = apiQuestionnairesNames;
        state.isNamesFetching = false;
      })
      .addCase(fetchQuestionnaires.rejected, (state) => {
        state.isNamesFetching = false;
      });

    builder.addCase(fetchInstitutes.fulfilled, (state, { payload: apiInstitutes }) => {
      state.institutes = apiInstitutes;
    });

    builder
      .addCase(sendAnswers.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendAnswers.fulfilled, (state) => {
        state.isSending = false;
      })
      .addCase(sendAnswers.rejected, (state) => {
        state.isSending = false;
      });
  },
  selectors: {
    selectQuestionnaire: (state) => state.questionnaire,
    selectIsLoading: (state) => state.isLoading,
    selectIsSending: (state) => state.isSending,
    selectIsNamesFetching: (state) => state.isNamesFetching,
    selectQuestionnairesNames: (state) => state.questionnairesNames,
    selectInstitutes: (state) => state.institutes,
  },
});

export const {
  selectQuestionnaire,
  selectIsLoading,
  selectIsSending,
  selectQuestionnairesNames,
  selectIsNamesFetching,
  selectInstitutes,
} = questionnairesSlice.selectors;
