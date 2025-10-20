import { Suspense } from 'react';
import ResetPasswordForm from '../_components/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<p>Loading reset password form...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
