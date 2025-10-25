'use client';

/**
 * Sidebar Component
 *
 * A modern, animated sidebar with navigation links and smooth transitions.
 * Features collapsible design for mobile responsiveness.
 */

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  DollarSign,
  CreditCard,
  Receipt,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useState } from 'react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'Services',
    path: '/dashboard/services',
    icon: <Briefcase className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Team Members',
    path: '/dashboard/team',
    icon: <Users className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Expenses',
    path: '/dashboard/expenses',
    icon: <DollarSign className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Transactions',
    path: '/dashboard/transactions',
    icon: <CreditCard className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Receipts',
    path: '/dashboard/receipts',
    icon: <Receipt className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Customers',
    path: '/dashboard/customers',
    icon: <UserCircle className="w-5 h-5" />,
    comingSoon: true,
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
    comingSoon: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileMenuOpen ? 0 : pathname.startsWith('/dashboard') ? 0 : -280 }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 bg-gradient-to-b from-primary via-primary-dark to-primary
          text-white z-40 flex flex-col shadow-2xl
          lg:translate-x-0 transition-transform duration-300
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Omena Agency</h2>
              <p className="text-xs text-white/60">CRM Dashboard</p>
            </div>
          </motion.div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-white/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      group relative flex items-center justify-between px-4 py-3 rounded-lg
                      transition-all duration-300
                      ${
                        isActive
                          ? 'bg-secondary text-primary shadow-lg'
                          : 'hover:bg-white/10 text-white'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`
                        transition-transform duration-300 group-hover:scale-110
                        ${isActive ? 'text-primary' : 'text-white'}
                      `}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>

                    {item.comingSoon ? (
                      <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                        Soon
                      </span>
                    ) : (
                      isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      )
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-secondary rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
