import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  containerClassName?: string;
}

export const PageTitle: React.FC<Props> = ({ title, subtitle, containerClassName }) => {
  return (
    <div className={containerClassName}>
      <h3 className='text-lg font-medium'>{title}</h3>
      <p className='text-sm text-muted-foreground sm:text-xs'>{subtitle}</p>
    </div>
  );
};
