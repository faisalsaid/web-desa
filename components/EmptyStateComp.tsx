'use client';

import { ReactNode } from 'react';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode; // FULL flexible content
  className?: string;
}

export default function EmptyStateComp({
  icon,
  title = 'No Data',
  description = 'Belum ada data untuk ditampilkan.',
  children,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>

      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
