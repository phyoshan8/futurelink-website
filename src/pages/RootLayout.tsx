import Header from "@/components/layout/Header";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-slate-950 flex flex-col font-montserrat">
      <header>
        <Header />
      </header>

      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 FutureLink. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Empowering learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
