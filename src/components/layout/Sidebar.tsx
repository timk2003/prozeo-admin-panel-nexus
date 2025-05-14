
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Mail, 
  Cloud, 
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  external?: boolean;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mautic',
    href: 'https://mautic.prozeo.me',
    icon: Mail,
    external: true,
  },
  {
    title: 'CloudPanel',
    href: 'https://cloudpanel.prozeo.me',
    icon: Cloud,
    external: true,
  },
  {
    title: 'Mailserver',
    href: 'https://mail.prozeo.me',
    icon: Mail,
    external: true,
  },
  {
    title: 'Analytics',
    href: 'https://analytics.prozeo.me',
    icon: BarChart,
    external: true,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    setCollapsed(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setCollapsed(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-sidebar border-r border-border',
        collapsed ? 'w-16' : 'w-64',
        isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-border",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/dashboard" className="text-xl font-bold text-sidebar-foreground">
              Prozeo
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "flex items-center px-2 py-3 text-sidebar-foreground rounded-md transition-colors",
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "text-sidebar-primary")} />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-border p-4">
          <Button
            onClick={signOut}
            variant="ghost"
            className={cn(
              "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50",
              collapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Log out</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Mobile menu overlay trigger
export function SidebarTrigger() {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 left-4 z-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      )}
    </Button>
  );
}
