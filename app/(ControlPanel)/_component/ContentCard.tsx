'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge('bg-background p-4 rounded-xl shadow-xs', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContentCard;
