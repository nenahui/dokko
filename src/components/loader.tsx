import { LoaderIcon } from 'lucide-react';
import React from 'react';

interface Props {
  fixed?: boolean;
  absolute?: boolean;
  className?: string;
}

export const Loader: React.FC<Props> = ({ fixed, absolute, className }) => {
  return (
    <div
      className={`${fixed && 'fixed w-screen h-screen top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'} ${absolute && 'absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'}`}
    >
      <LoaderIcon className={`text-muted-foreground size-5 animate-spin duration-1000 ${className}`} />
    </div>
  );
};
