import { Layout } from '@/components/layout';
import { OneQuestionnaire } from '@/features/questionnaires/oneQuestionnaire';
import { Questionnaires } from '@/features/questionnaires/questionnaires';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Questionnaires />} />
        <Route path={'/questionnaires/:id'} element={<OneQuestionnaire />} />
      </Routes>
    </Layout>
  );
};
