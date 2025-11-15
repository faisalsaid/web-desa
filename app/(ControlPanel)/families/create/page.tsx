import prisma from '@/lib/prisma';
import ContentCard from '../../_component/ContentCard';
import { CreateFamilyForm } from '../_components/CreateFamilyForm';

const CreateFamilyPage = async () => {
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-xl font-semibold">Form Keluarga</h1>
        </div>
      </ContentCard>
      <ContentCard>
        <CreateFamilyForm />
      </ContentCard>
    </div>
  );
};

export default CreateFamilyPage;
