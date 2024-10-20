export interface Question {
  id: number;
  questionName: string;
  typeName: 'STRING' | 'BOOLEAN' | 'INTEGER';
}

export interface Questionnaire {
  id: number;
  nameQuestionnaire: string;
  questionList: Question[];
}

export interface QuestionnairesNames {
  id: number;
  questionnaireName: string;
}

export interface Institutes {
  id: number;
  name: string;
}

export interface FormValues {
  instituteId: number;
  questionId: number;
  answer: string | boolean;
}

export interface SendAnswers {
  questionId: string;
  values: FormValues[];
}
