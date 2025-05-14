
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarTrigger } from "./Sidebar";
import { Header } from "./Header";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/Spinner";

export function DashboardLayout() {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-64 transition-all duration-300">
        <SidebarTrigger />
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
