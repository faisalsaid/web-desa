import { auth } from '@/auth';

const DashboardPage = async () => {
  const session = await auth();

  return <div>Halo {session?.user ? session.user.email : 'Guest'}</div>;
};

export default DashboardPage;
