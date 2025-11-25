'use client';

import { RevenueCategoryType } from '../page';
import { RevenueCategoryChart } from './RevenueCategoryChart';

const RevenueCategoryCard = ({
  category,
}: {
  category: RevenueCategoryType[];
}) => {
  return (
    <div>
      <RevenueCategoryChart category={category} />
    </div>
  );
};

export default RevenueCategoryCard;
