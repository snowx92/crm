'use client';

/**
 * Top Navbar Component
 *
 * Features:
 * - Search with quick navigation
 * - Notifications
 * - User profile dropdown
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Users,
  Receipt,
  FileText,
  Utensils,
  Wallet,
  Package,
  FolderKanban,
  UsersRound,
  CalendarDays,
  HardDrive,
  Wrench,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const quickNavItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', path: '/dashboard/customers', icon: Users },
  { name: 'Receipts', path: '/dashboard/financial/receipts', icon: Receipt },
  { name: 'Quotations', path: '/dashboard/financial/quotations', icon: FileText },
  { name: 'Menu', path: '/dashboard/financial/menu', icon: Utensils },
  { name: 'Expenses', path: '/dashboard/financial/expenses', icon: Wallet },
  { name: 'Services', path: '/dashboard/services', icon: Package },
  { name: 'Projects', path: '/dashboard/projects', icon: FolderKanban },
  { name: 'Team', path: '/dashboard/team', icon: UsersRound },
  { name: 'Tasks & Calendar', path: '/dashboard/tasks', icon: CalendarDays },
  { name: 'Drive & Gallery', path: '/dashboard/drive', icon: HardDrive },
  { name: 'Tools', path: '/dashboard/tools', icon: Wrench },
];

const mockNotifications = [
  { id: 1, title: 'New customer added', message: 'Alice Johnson signed up', time: '5m ago', unread: true },
  { id: 2, title: 'Payment received', message: '$5,000 from Tech Corp', time: '1h ago', unread: true },
  { id: 3, title: 'Project completed', message: 'Website redesign finished', time: '3h ago', unread: false },
  { id: 4, title: 'New task assigned', message: 'Review Q4 reports', time: '5h ago', unread: false },
];

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const filteredNavItems = quickNavItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleLogout = async () => {
    await logout();
    setShowProfile(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-xl relative" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Quick search... (Pages, customers, etc.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="w-full pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Search Dropdown */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto"
                >
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase px-3 py-2">
                      Quick Navigation
                    </p>
                    {filteredNavItems.length > 0 ? (
                      filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span>{item.name}</span>
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500 px-3 py-4 text-center">
                        No results found
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200"
                  >
                    <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                            notification.unread ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                                notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button className="w-full text-center text-sm text-primary font-medium py-2 hover:bg-gray-50 rounded-md transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          router.push('/dashboard/settings');
                          setShowProfile(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
