import prisma from '@/lib/prisma';
import Link from 'next/link';
import SetPasswordForm from '../_components/SetPasswordForm';

const SetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;
  console.log('TOKEN =>', token);
  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-5xl text-destructive">Ops!</p>

        <p>Invalid or missing token</p>
        <Link className="text-sky-500 underline" href={'/'}>
          Home
        </Link>
      </div>
    );
  }

  const record = await prisma.verificationToken.findFirst({
    where: { token },
  });
  console.log('RECORD', record);

  if (!record || record.expires < new Date()) {
    return (
      <div className="text-center space-y-4">
        <p className="text-5xl text-destructive">Ops!</p>
        <p className="">Token invalid or expired</p>
        <div>
          <Link className="text-sky-500 underline" href={'/'}>
            Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SetPasswordForm token={token} />
    </div>
  );
};

export default SetPasswordPage;
