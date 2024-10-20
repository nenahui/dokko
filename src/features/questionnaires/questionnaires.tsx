import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { PageTitle } from '@/components/pageTitle';
import { selectIsLoading, selectQuestionnairesNames } from '@/features/questionnaires/questionnairesSlice';
import { fetchQuestionnaires } from '@/features/questionnaires/questionnairesThunks';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Questionnaires: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const questionnairesNames = useAppSelector(selectQuestionnairesNames);

  useEffect(() => {
    dispatch(fetchQuestionnaires());
  }, [dispatch]);

  console.log(questionnairesNames);

  return (
    <div className={'flex flex-col gap-3 mx-auto'}>
      <PageTitle title={'Анкетирование'} subtitle={'Выберите анкету из списка'} />

      {isLoading ? (
        <Loader absolute />
      ) : (
        questionnairesNames?.map((item) => (
          <Link key={item.id} to={`/questionnaires/${item.id}`}>
            <p className={'text-muted-foreground underline text-sm'}>{item.questionnaireName}</p>
          </Link>
        ))
      )}
    </div>
  );
};
