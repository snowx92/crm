'use client';

/**
 * Dashboard Home Page
 *
 * The main dashboard overview page with statistics and quick actions.
 */

import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  Briefcase,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Active Customers',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Active Projects',
    value: '42',
    change: '-3.1%',
    trend: 'down',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Expenses',
    value: '$3,450',
    change: '+2.1%',
    trend: 'up',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
  },
];

const recentActivities = [
  {
    action: 'New customer registered',
    customer: 'John Smith',
    time: '2 minutes ago',
    type: 'customer',
  },
  {
    action: 'Payment received',
    customer: 'Acme Corp',
    time: '15 minutes ago',
    type: 'payment',
  },
  {
    action: 'Project completed',
    customer: 'Tech Startup Inc',
    time: '1 hour ago',
    type: 'project',
  },
  {
    action: 'New service request',
    customer: 'Digital Solutions',
    time: '2 hours ago',
    type: 'service',
  },
];

const todaysTasks = [
  { id: 1, title: 'Follow up with John (proposal)', time: '09:30 AM' },
  { id: 2, title: 'Review invoices', time: '11:00 AM' },
  { id: 3, title: 'Team stand-up', time: '01:30 PM' },
  { id: 4, title: 'Prepare presentation', time: '03:00 PM' },
];

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 md:p-8 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="card group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
              <Activity className="w-6 h-6" />
              <span>Recent Activity</span>
            </h2>
            <button className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'customer'
                      ? 'bg-blue-100 text-blue-600'
                      : activity.type === 'payment'
                      ? 'bg-green-100 text-green-600'
                      : activity.type === 'project'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {activity.type === 'customer' ? (
                    <Users className="w-5 h-5" />
                  ) : activity.type === 'payment' ? (
                    <DollarSign className="w-5 h-5" />
                  ) : activity.type === 'project' ? (
                    <Briefcase className="w-5 h-5" />
                  ) : (
                    <Activity className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.customer}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Today's Tasks + Quick Actions */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Today&apos;s Tasks</span>
              </h2>
              <span className="text-sm text-gray-500">{todaysTasks.length} items</span>
            </div>

            <ul className="space-y-3">
              {todaysTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                  <button className="text-sm text-primary font-semibold">Done</button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                'Add New Customer',
                'Create Invoice',
                'Add Expense',
                'Schedule Meeting',
                'View Reports',
              ].map((action, index) => (
                <motion.button
                  key={action}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 text-left rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg transition-all duration-300 font-medium"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
