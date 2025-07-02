
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const toggleTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-muted/20 backdrop-blur-md border border-white/10 hover:bg-muted/30 transition-all duration-300"
        >
          <Palette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="glass-effect border-electric-blue-500/30 z-50"
      >
        <DropdownMenuItem 
          onClick={() => toggleTheme('dark')}
          className="cursor-pointer"
        >
          <Moon size={16} className="mr-2" />
          Tema Escuro
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleTheme('light')}
          className="cursor-pointer"
        >
          <Sun size={16} className="mr-2" />
          Tema Claro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
