import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}
