import prisma from '@/lib/prisma';
import ContentCard from '../../_component/ContentCard';
import FamilyForm from '../_components/FamilyForm';

const CreateFamilyPage = async () => {
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Form Keluarga</h1>
        </div>
      </ContentCard>
      <ContentCard>
        <FamilyForm />
      </ContentCard>
    </div>
  );
};

export default CreateFamilyPage;
