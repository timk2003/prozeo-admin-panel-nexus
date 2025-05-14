
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Mail, Cloud, BarChart, Users, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface ShortcutCardProps {
  title: string;
  icon: React.ElementType;
  href: string;
  description: string;
  external?: boolean;
}

const ShortcutCard = ({ title, icon: Icon, href, description, external }: ShortcutCardProps) => (
  <Card className="hover:shadow-md transition-all hover:border-primary/20">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <CardDescription className="mb-4">{description}</CardDescription>
      <Button asChild variant="outline" className="w-full">
        <Link to={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          Open {title}
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  const shortcuts = [
    {
      title: "Mautic",
      icon: Mail,
      href: "https://mautic.prozeo.me",
      description: "Marketing automation platform",
      external: true,
    },
    {
      title: "CloudPanel",
      icon: Cloud,
      href: "https://cloudpanel.prozeo.me",
      description: "Server & application management",
      external: true,
    },
    {
      title: "Mailserver",
      icon: Mail,
      href: "https://mail.prozeo.me",
      description: "Email service administration",
      external: true,
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "https://analytics.prozeo.me",
      description: "Website traffic & user insights",
      external: true,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome, {user?.email?.split("@")[0] || "Admin"}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your applications today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">All Systems Operational</div>
            <p className="text-xs text-muted-foreground">100% uptime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+0 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Admin user active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Now</div>
            <p className="text-xs text-muted-foreground">Current session active</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shortcuts.map((shortcut) => (
            <ShortcutCard key={shortcut.title} {...shortcut} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
