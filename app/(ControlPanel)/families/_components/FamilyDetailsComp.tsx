'use client';

import { FamilyType } from '../_lib/families.type';

type FamilyDetailType = FamilyType;

interface FamilyDetailsProps {
  family: FamilyDetailType;
}

const FamilyDetailsComp = ({ family }: FamilyDetailsProps) => {
  return <div>{family.headOfFamily?.fullName}</div>;
};

export default FamilyDetailsComp;
