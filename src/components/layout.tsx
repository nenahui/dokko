import React, { type PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={'container mx-auto max-w-4xl p-3'}>{children}</div>;
};
