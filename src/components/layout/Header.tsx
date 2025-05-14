
import { UserButton } from '@/components/UserButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold md:text-2xl">
          {/* Dynamic title based on URL path could go here */}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && <UserButton user={user} />}
      </div>
    </header>
  );
}
