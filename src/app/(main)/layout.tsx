import BottomBar from "@/components/layout-components/bottom-bar";
import TopNavbar from "@/components/layout-components/top-nav-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen flex-col relative scroll-smooth">
      <TopNavbar />
      <main className="flex-1 h-full">
        {children}
        <div className="h-14 block lg:hidden w-full" />
      </main>
      <BottomBar />
    </div>
  );
}
