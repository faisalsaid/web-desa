import { auth } from '@/auth';
import UnauthorizedUI from './_componen/unauthorized';

const UnauthorizedPage = async () => {
  const session = await auth();
  return <UnauthorizedUI session={session} />;
};

export default UnauthorizedPage;
