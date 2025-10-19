import { webTitle } from '@/lib/staticData';
import Link from 'next/link';
import LoginForm from '../_components/login-form';
import { auth } from '@/auth';

const LoginPage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div>
        <Link href={'/'}>
          <h1 className="text-2xl text-center">{webTitle}</h1>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
