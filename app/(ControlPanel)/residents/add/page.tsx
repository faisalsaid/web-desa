import ContentCard from '../../_component/ContentCard';
import ResidentForm from '../_components/ResidentForm';

const AddNewResidentPage = () => {
  return (
    <div className="space-y-4">
      <ContentCard className=" ">
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-xl font-semibold">Rekam Penduduk Baru</h2>
        </div>
      </ContentCard>
      <ContentCard>
        <ResidentForm />
      </ContentCard>
    </div>
  );
};

export default AddNewResidentPage;
