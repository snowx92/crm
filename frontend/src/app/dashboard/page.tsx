'use client';

/**
 * Dashboard Overview Page
 *
 * Comprehensive analytics and insights dashboard
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
  CreditCard,
  ShoppingBag,
  Clock,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { useState } from 'react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '$124,563',
    change: '+12.5%',
    trend: 'up',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Active Customers',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Active Projects',
    value: '42',
    change: '+5.3%',
    trend: 'up',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Monthly Expenses',
    value: '$12,450',
    change: '+2.1%',
    trend: 'up',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'New Customers',
    value: '89',
    change: '+18.7%',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
  {
    title: 'Avg. Project Value',
    value: '$8,450',
    change: '+6.4%',
    trend: 'up',
    icon: <Target className="w-5 h-5" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Conversion Rate',
    value: '68%',
    change: '+3.2%',
    trend: 'up',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    title: 'Team Members',
    value: '24',
    change: '+2',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
  },
];

const recentActivities = [
  {
    action: 'New customer registered',
    customer: 'John Smith - Tech Solutions Inc',
    time: '2 minutes ago',
    type: 'customer',
    icon: Users,
  },
  {
    action: 'Payment received',
    customer: '$5,000 from Acme Corp',
    time: '15 minutes ago',
    type: 'payment',
    icon: DollarSign,
  },
  {
    action: 'Project completed',
    customer: 'Website redesign for Tech Startup Inc',
    time: '1 hour ago',
    type: 'project',
    icon: CheckCircle,
  },
  {
    action: 'New quotation sent',
    customer: 'Mobile app development - Digital Solutions',
    time: '2 hours ago',
    type: 'quotation',
    icon: ShoppingBag,
  },
  {
    action: 'Task completed',
    customer: 'Q4 financial report reviewed',
    time: '3 hours ago',
    type: 'task',
    icon: CheckCircle,
  },
];

const topCustomers = [
  { name: 'Tech Solutions Inc', revenue: '$45,200', projects: 8, growth: '+24%' },
  { name: 'Digital Marketing Pro', revenue: '$38,900', projects: 6, growth: '+18%' },
  { name: 'Creative Design Studio', revenue: '$32,500', projects: 5, growth: '+12%' },
  { name: 'Startup Ventures LLC', revenue: '$28,100', projects: 4, growth: '+31%' },
  { name: 'Global Enterprises', revenue: '$24,800', projects: 3, growth: '+9%' },
];

const projectStatus = [
  { status: 'In Progress', count: 18, color: 'bg-blue-500', percentage: 43 },
  { status: 'Completed', count: 15, color: 'bg-green-500', percentage: 36 },
  { status: 'On Hold', count: 6, color: 'bg-yellow-500', percentage: 14 },
  { status: 'Cancelled', count: 3, color: 'bg-red-500', percentage: 7 },
];

const revenueData = [
  { month: 'Jan', revenue: 65000, expenses: 42000 },
  { month: 'Feb', revenue: 72000, expenses: 45000 },
  { month: 'Mar', revenue: 68000, expenses: 43000 },
  { month: 'Apr', revenue: 85000, expenses: 48000 },
  { month: 'May', revenue: 92000, expenses: 52000 },
  { month: 'Jun', revenue: 105000, expenses: 55000 },
];

const upcomingTasks = [
  { id: 1, title: 'Client presentation - Tech Corp', deadline: 'Today, 2:00 PM', priority: 'high' },
  { id: 2, title: 'Review project proposals', deadline: 'Today, 4:30 PM', priority: 'medium' },
  { id: 3, title: 'Team meeting - Q4 planning', deadline: 'Tomorrow, 10:00 AM', priority: 'high' },
  { id: 4, title: 'Send quotation to new lead', deadline: 'Tomorrow, 2:00 PM', priority: 'medium' },
  { id: 5, title: 'Update financial reports', deadline: 'Dec 20, 2024', priority: 'low' },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-3 md:p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-xs mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid - 4x2 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -2 }}
            className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 text-xs mb-1">{stat.title}</h3>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Revenue vs Expenses
              </h2>
              <div className="flex gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Expenses</span>
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-3">
              {revenueData.map((data) => (
                <div key={data.month}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 w-8">{data.month}</span>
                    <div className="flex-1 mx-3">
                      <div className="flex gap-1 h-8">
                        <div
                          className="bg-primary rounded transition-all hover:opacity-80"
                          style={{ width: `${(data.revenue / 120000) * 100}%` }}
                          title={`Revenue: $${data.revenue.toLocaleString()}`}
                        />
                        <div
                          className="bg-red-500 rounded transition-all hover:opacity-80"
                          style={{ width: `${(data.expenses / 120000) * 100}%` }}
                          title={`Expenses: $${data.expenses.toLocaleString()}`}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 w-16 text-right">
                      ${((data.revenue - data.expenses) / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Project Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Project Status Distribution
            </h2>
            <div className="space-y-3">
              {projectStatus.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.status}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Top Customers by Revenue
            </h2>
            <div className="space-y-2">
              {topCustomers.map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.projects} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{customer.revenue}</p>
                    <p className="text-xs text-green-600 font-medium">{customer.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Recent Activity
              </h2>
              <button className="text-xs text-primary hover:text-primary-dark font-medium">
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'customer' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                      activity.type === 'project' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'quotation' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 truncate">{activity.customer}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Upcoming Tasks
              </h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                {upcomingTasks.length} tasks
              </span>
            </div>

            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {task.deadline}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-4 text-white shadow-lg"
          >
            <h2 className="font-bold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Performance Highlights
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/90">Customer Satisfaction</span>
                <span className="text-lg font-bold">94%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '94%' }} />
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-white/90">On-Time Delivery</span>
                <span className="text-lg font-bold">89%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '89%' }} />
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-white/90">Revenue Goal</span>
                <span className="text-lg font-bold">78%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
