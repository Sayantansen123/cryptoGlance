import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase'; 
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Search, Menu } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast(); 
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/market?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };



  const handleMenu = () => {
    // Toggle sidebar for mobile
    console.log('Toggle sidebar');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        variant: "default",
      });
  
      // Optionally clear token or localStorage if you're storing anything
      
      localStorage.removeItem('user');
  
      // Reload or redirect
      window.location.href = "/login";
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={handleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex relative w-96">
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="hidden md:flex"
          >
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
