import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <SignUp redirectUrl="/dashboard" />
    </div>
  );
}
