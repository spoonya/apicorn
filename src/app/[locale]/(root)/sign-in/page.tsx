import { SignInForm } from '@/components';
import { DefaultLayout } from '@/layouts';

export default function SignInPage() {
  return (
    <DefaultLayout className="flex justify-center items-center bg-gradient-to-b from-blue-50 to-white">
      <SignInForm />
    </DefaultLayout>
  );
}
