import ContentCard from '../_component/ContentCard';
// import UploadFileComp from '../../../components/UploadFileComp';
// import { getImageUrlAction, uploadFileAction } from '../_lib/storage.action';

// const url = await getImageUrlAction('image 1food.png');

const DashboardPage = async () => {
  return (
    <div className="space-y-4">
      <ContentCard>Dashboard</ContentCard>

      <ContentCard>
        {/* <UploadFileComp action={uploadFileAction} /> */}
      </ContentCard>
    </div>
  );
};

export default DashboardPage;
