import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <SignIn />
    </main>
  );
}