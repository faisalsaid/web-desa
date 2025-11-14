interface Params {
  residentid: string;
}

interface ResidentDetails {
  params: Promise<Params>;
}

const ResidentDetailPage = async ({ params }: ResidentDetails) => {
  const { residentid } = await params;
  console.log(residentid);

  return <div>paget</div>;
};

export default ResidentDetailPage;
