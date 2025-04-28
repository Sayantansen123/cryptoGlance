
import { Link, useLocation } from 'react-router-dom';
import { Home, PieChart, LineChart, Wallet, Settings } from "lucide-react";
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
  { icon: LineChart, label: 'Market', path: '/market' },
  { icon: Wallet, label: 'Transactions', path: '/transactions' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex flex-col bg-white border-r border-border w-64 p-4">
      <div className="flex items-center gap-2 mb-10 pl-2">
        <div className="h-8 w-8 rounded-full crypto-gradient"></div>
        <h1 className="text-xl font-bold">CryptoGlance</h1>
      </div>
      
      <nav className="flex flex-col space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

import { User } from 'lucide-react';
export default Sidebar;
