'use client';

/**
 * Quotations Management Page
 *
 * Features:
 * - View all quotations with filters
 * - Create new quotations
 * - Search and filter by status, customer, date
 * - Convert quotations to invoices
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Send,
  CheckCircle2,
  MoreVertical,
  Calendar,
  DollarSign,
  Clock,
  XCircle,
  TrendingUp,
  FileCheck,
  FileClock,
  X,
  Grid3x3,
  List,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { mockMenuItems, mockCustomers, getCustomerDisplayName, getActiveCustomers, type MenuItem, type Customer } from '@/lib/dataStore';

interface QuotationItem {
  id: string;
  quotationNumber: string;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  validUntil: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdDate: string;
  items: number;
}

const mockQuotations: QuotationItem[] = [
  {
    id: '1',
    quotationNumber: 'QUO-2024-001',
    customer: { name: 'Tech Solutions Inc', email: 'contact@techsolutions.com' },
    amount: 12500,
    validUntil: '2024-02-15',
    status: 'sent',
    createdDate: '2024-01-15',
    items: 8,
  },
  {
    id: '2',
    quotationNumber: 'QUO-2024-002',
    customer: { name: 'Digital Marketing Pro', email: 'info@digitalmarketing.com' },
    amount: 8900,
    validUntil: '2024-02-20',
    status: 'accepted',
    createdDate: '2024-01-18',
    items: 5,
  },
  {
    id: '3',
    quotationNumber: 'QUO-2024-003',
    customer: { name: 'Creative Design Studio', email: 'hello@creativedesign.com' },
    amount: 15200,
    validUntil: '2024-02-25',
    status: 'draft',
    createdDate: '2024-01-20',
    items: 12,
  },
  {
    id: '4',
    quotationNumber: 'QUO-2024-004',
    customer: { name: 'Startup Ventures LLC', email: 'contact@startupventures.com' },
    amount: 6800,
    validUntil: '2024-01-30',
    status: 'expired',
    createdDate: '2024-01-10',
    items: 4,
  },
  {
    id: '5',
    quotationNumber: 'QUO-2024-005',
    customer: { name: 'Global Enterprises', email: 'billing@globalent.com' },
    amount: 9500,
    validUntil: '2024-02-05',
    status: 'rejected',
    createdDate: '2024-01-12',
    items: 7,
  },
  {
    id: '6',
    quotationNumber: 'QUO-2024-006',
    customer: { name: 'Innovative Solutions Ltd', email: 'info@innovative.com' },
    amount: 18900,
    validUntil: '2024-02-28',
    status: 'sent',
    createdDate: '2024-01-22',
    items: 10,
  },
];

const stats = [
  {
    label: 'Total Quotations',
    value: '156',
    change: '+24',
    icon: FileText,
    color: 'blue',
  },
  {
    label: 'Potential Revenue',
    value: '$245,890',
    change: '+32%',
    icon: DollarSign,
    color: 'green',
  },
  {
    label: 'Accepted',
    value: '78',
    change: '+15',
    icon: FileCheck,
    color: 'emerald',
  },
  {
    label: 'Pending',
    value: '42',
    change: '+8',
    icon: FileClock,
    color: 'yellow',
  },
];

export default function QuotationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [quotations, setQuotations] = useState<QuotationItem[]>(mockQuotations);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationItem | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    quotationNumber: '',
    customerId: '',
    customerName: '',
    customerEmail: '',
    amount: '',
    status: 'draft' as QuotationItem['status'],
    createdDate: '',
    validUntil: '',
    items: '1',
  });

  // Customer selection state
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // Menu items selection state
  const [selectedMenuItems, setSelectedMenuItems] = useState<Array<{ menuItem: MenuItem; quantity: number }>>([]);
  const [showMenuItemsModal, setShowMenuItemsModal] = useState(false);
  const [menuSearchTerm, setMenuSearchTerm] = useState('');

  const activeCustomers = getActiveCustomers(mockCustomers);
  const availableMenuItems = mockMenuItems.filter((item: MenuItem) => item.available);

  const filteredCustomers = useMemo(() => {
    if (!customerSearchTerm) return activeCustomers;
    const search = customerSearchTerm.toLowerCase();
    return activeCustomers.filter((c: Customer) =>
      getCustomerDisplayName(c).toLowerCase().includes(search) ||
      c.email.toLowerCase().includes(search)
    );
  }, [customerSearchTerm, activeCustomers]);

  const filteredMenuItems = useMemo(() => {
    if (!menuSearchTerm) return availableMenuItems;
    const search = menuSearchTerm.toLowerCase();
    return availableMenuItems.filter((item: MenuItem) =>
      item.name.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    );
  }, [menuSearchTerm, availableMenuItems]);

  const totalAmount = useMemo(() => {
    return selectedMenuItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  }, [selectedMenuItems]);

  const handleSelectCustomer = (customer: Customer) => {
    setFormData({
      ...formData,
      customerId: customer.id,
      customerName: customer.company || `${customer.firstName} ${customer.lastName}`,
      customerEmail: customer.email
    });
    setCustomerSearchTerm('');
    setShowCustomerDropdown(false);
  };

  const handleAddMenuItem = (menuItem: MenuItem) => {
    const existingItem = selectedMenuItems.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setSelectedMenuItems(selectedMenuItems.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedMenuItems([...selectedMenuItems, { menuItem, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedMenuItems(selectedMenuItems.filter(item => item.menuItem.id !== menuItemId));
    } else {
      setSelectedMenuItems(selectedMenuItems.map(item =>
        item.menuItem.id === menuItemId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleRemoveMenuItem = (menuItemId: string) => {
    setSelectedMenuItems(selectedMenuItems.filter(item => item.menuItem.id !== menuItemId));
  };

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'sent':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'expired':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'sent':
        return <Send className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Action handlers
  const openViewModal = (quotation: QuotationItem) => {
    setSelectedQuotation(quotation);
    setShowViewModal(true);
  };

  const openEditModal = (quotation: QuotationItem) => {
    setSelectedQuotation(quotation);
    setFormData({
      quotationNumber: quotation.quotationNumber,
      customerId: '',
      customerName: quotation.customer.name,
      customerEmail: quotation.customer.email,
      amount: quotation.amount.toString(),
      status: quotation.status,
      createdDate: quotation.createdDate,
      validUntil: quotation.validUntil,
      items: quotation.items.toString(),
    });
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (!selectedQuotation) return;
    const amount = parseFloat(formData.amount || '0');
    const items = parseInt(formData.items || '1', 10);
    const updated: QuotationItem = {
      ...selectedQuotation,
      quotationNumber: formData.quotationNumber || selectedQuotation.quotationNumber,
      customer: { name: formData.customerName, email: formData.customerEmail },
      amount: isNaN(amount) ? selectedQuotation.amount : amount,
      status: formData.status,
      createdDate: formData.createdDate || selectedQuotation.createdDate,
      validUntil: formData.validUntil || selectedQuotation.validUntil,
      items: isNaN(items) ? selectedQuotation.items : items,
    };
    setQuotations((prev) => prev.map((q) => (q.id === selectedQuotation.id ? updated : q)));
    setShowEditModal(false);
    setSelectedQuotation(null);
  };

  const handleSendQuotation = (quotation: QuotationItem) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === quotation.id ? { ...q, status: 'sent' } : q))
    );
  };

  return (
    <div className="p-3 md:p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quotations Management
          </h1>
          <p className="text-gray-600 text-xs mt-0.5">
            Create and manage quotations for your customers
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2 py-1 rounded transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2 py-1 rounded transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-md shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            New Quotation
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-xs mb-1">{stat.label}</h3>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by quotation number or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 text-sm border rounded-lg transition-all flex items-center gap-2 ${
              showFilters
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2"
          >
            {['all', 'draft', 'sent', 'accepted', 'rejected', 'expired'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  statusFilter === status
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Quotations - Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredQuotations.map((quotation, index) => (
            <motion.div
              key={quotation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {quotation.quotationNumber}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    {quotation.customer.name}
                  </p>
                  <p className="text-xs text-gray-500">{quotation.customer.email}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    quotation.status
                  )}`}
                >
                  {getStatusIcon(quotation.status)}
                  {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                </span>
              </div>

              {/* Amount */}
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Quotation Amount</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${quotation.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">{quotation.items} items</span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Created</p>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Calendar className="w-3 h-3" />
                    {new Date(quotation.createdDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Valid Until</p>
                  <div className="flex items-center gap-1 text-xs text-gray-700">
                    <Clock className="w-3 h-3" />
                    {new Date(quotation.validUntil).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openViewModal(quotation)}
                  className="flex-1 px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openEditModal(quotation)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendQuotation(quotation)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  Send
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                >
                  <MoreVertical className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Quotations - List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quotation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Valid Until
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredQuotations.map((q, index) => (
                  <motion.tr
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{q.quotationNumber}</p>
                        <p className="text-xs text-gray-500">Created {new Date(q.createdDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{q.customer.name}</p>
                        <p className="text-xs text-gray-500">{q.customer.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">${q.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{q.items} items</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(q.status)}`}>
                        {getStatusIcon(q.status)}
                        {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <Clock className="w-3 h-3" />
                        {new Date(q.validUntil).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openViewModal(q)}
                          className="p-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openEditModal(q)}
                          className="p-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSendQuotation(q)}
                          className="p-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Send"
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredQuotations.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">No quotations found</h3>
          <p className="text-xs text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredQuotations.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredQuotations.length}</span> of{' '}
            <span className="font-medium">{quotations.length}</span> quotations
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-all">
              1
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              2
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Quotation Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  New Quotation
                </h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quotation Number</label>
                  <input
                    type="text"
                    value={formData.quotationNumber}
                    onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Auto-generated if empty"
                  />
                </div>

                {/* Customer Selection */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
                  {!formData.customerName ? (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={customerSearchTerm}
                          onChange={(e) => {
                            setCustomerSearchTerm(e.target.value);
                            setShowCustomerDropdown(true);
                          }}
                          onFocus={() => setShowCustomerDropdown(true)}
                          placeholder="Search customer by name or email..."
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      {showCustomerDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer: Customer) => (
                              <button
                                key={customer.id}
                                type="button"
                                onClick={() => handleSelectCustomer(customer)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                              >
                                <div className="font-medium text-gray-900">{getCustomerDisplayName(customer)}</div>
                                <div className="text-sm text-gray-500">{customer.email}</div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                              No customers found
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{formData.customerName}</div>
                        <div className="text-sm text-gray-600">{formData.customerEmail}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, customerId: '', customerName: '', customerEmail: '' });
                          setCustomerSearchTerm('');
                        }}
                        className="p-1 hover:bg-green-100 rounded transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Menu Items Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services / Items</label>
                  <button
                    type="button"
                    onClick={() => setShowMenuItemsModal(true)}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-gray-600 hover:text-primary flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Services / Items
                  </button>

                  {selectedMenuItems.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {selectedMenuItems.map((item) => (
                        <div key={item.menuItem.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.menuItem.name}</div>
                            <div className="text-sm text-gray-600">${item.menuItem.price.toFixed(2)} each</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                                className="p-1 hover:bg-blue-100 rounded transition-colors"
                              >
                                <span className="text-lg font-bold text-gray-600">−</span>
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                                className="p-1 hover:bg-blue-100 rounded transition-colors"
                              >
                                <span className="text-lg font-bold text-gray-600">+</span>
                              </button>
                            </div>
                            <div className="text-sm font-bold text-gray-900 w-20 text-right">
                              ${(item.menuItem.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveMenuItem(item.menuItem.id)}
                              className="p-1 hover:bg-red-100 rounded transition-colors"
                            >
                              <X className="w-5 h-5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-lg">
                        <span className="font-bold text-gray-900">Total Amount:</span>
                        <span className="text-xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as QuotationItem['status'] })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                    <input
                      type="date"
                      value={formData.createdDate}
                      onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const amount = parseFloat(formData.amount || '0');
                    const newQuotation: QuotationItem = {
                      id: (quotations.length + 1).toString(),
                      quotationNumber:
                        formData.quotationNumber || `QUO-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, '0')}`,
                      customer: { name: formData.customerName, email: formData.customerEmail },
                      amount,
                      validUntil: formData.validUntil || new Date().toISOString().slice(0, 10),
                      status: formData.status,
                      createdDate: formData.createdDate || new Date().toISOString().slice(0, 10),
                      items: parseInt(formData.items || '1', 10),
                    };
                    setQuotations([...quotations, newQuotation]);
                    setShowAddModal(false);
                    setFormData({
                      quotationNumber: '',
                      customerId: '',
                      customerName: '',
                      customerEmail: '',
                      amount: '',
                      status: 'draft',
                      createdDate: '',
                      validUntil: '',
                      items: '1',
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                >
                  Add Quotation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Quotation Modal */}
      <AnimatePresence>
        {showViewModal && selectedQuotation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Quotation Details
                </h2>
                <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Quotation</p>
                    <p className="text-base font-medium text-gray-900">{selectedQuotation.quotationNumber}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedQuotation.status)}`}>
                    {getStatusIcon(selectedQuotation.status)}
                    {selectedQuotation.status.charAt(0).toUpperCase() + selectedQuotation.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="text-base font-medium text-gray-900">{selectedQuotation.customer.name}</p>
                    <p className="text-xs text-gray-500">{selectedQuotation.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-base font-bold text-gray-900">${selectedQuotation.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{selectedQuotation.items} items</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedQuotation.createdDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valid Until</p>
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedQuotation.validUntil).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    if (selectedQuotation) openEditModal(selectedQuotation);
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Quotation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Quotation Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-primary" />
                  Edit Quotation
                </h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quotation Number</label>
                    <input
                      type="text"
                      value={formData.quotationNumber}
                      onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Items Count</label>
                    <input
                      type="number"
                      min={1}
                      value={formData.items}
                      onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as QuotationItem['status'] })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                    <input
                      type="date"
                      value={formData.createdDate}
                      onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
