export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen bg-slate-400 bg-auth-background bg-no-repeat bg-cover">
      {children}
    </main>
  );
}
