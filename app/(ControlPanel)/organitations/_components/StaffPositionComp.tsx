'use client';

import StaffPositionForm from './StaffPositionForm';

const StaffPositionComp = () => {
  return (
    <div className="sm:grid sm:grid-cols-2">
      <div>List Jabatan </div>
      <StaffPositionForm />
    </div>
  );
};

export default StaffPositionComp;
