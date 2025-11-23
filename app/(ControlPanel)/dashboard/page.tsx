import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  console.log('HALO');

  const session = await auth();
  if (!session?.user) {
    // redirect ke login jika session invalid
    return redirect('/auth/login?expired=1');
  }

  return <div>DASHBOARD</div>;
};

export default DashboardPage;
