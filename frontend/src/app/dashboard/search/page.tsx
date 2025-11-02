'use client';

/**
 * Search Page
 *
 * Universal search across all data types in the CRM
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Building2,
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'customer' | 'quotation' | 'transaction' | 'project';
  title: string;
  subtitle: string;
  description: string;
  metadata?: string;
  date?: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'customer',
    title: 'Tech Solutions Inc',
    subtitle: 'contact@techsolutions.com',
    description: 'Premium customer with multiple active projects',
    metadata: 'Active',
    date: '2024-01-15',
  },
  {
    id: '2',
    type: 'quotation',
    title: 'QUO-2024-001',
    subtitle: 'Website Development',
    description: '$12,500 quotation for Tech Solutions Inc',
    metadata: 'Sent',
    date: '2024-01-18',
  },
  {
    id: '3',
    type: 'project',
    title: 'E-commerce Platform',
    subtitle: 'Digital Marketing Pro',
    description: 'Full-stack e-commerce development project',
    metadata: 'In Progress',
    date: '2024-01-20',
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'customer':
      return <Users className="w-4 h-4" />;
    case 'quotation':
      return <FileText className="w-4 h-4" />;
    case 'transaction':
      return <DollarSign className="w-4 h-4" />;
    case 'project':
      return <Building2 className="w-4 h-4" />;
    default:
      return <Search className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'customer':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'quotation':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'transaction':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'project':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(result => {
        const matchesQuery = 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase());
        
        const matchesType = selectedType === 'all' || result.type === selectedType;
        
        return matchesQuery && matchesType;
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleQueryChange = (value: string) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <div className="p-3 md:p-4 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Universal Search
          </h1>
          <p className="text-gray-600 text-xs mt-0.5">
            Search across customers, quotations, projects, and transactions
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers, quotations, projects..."
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                handleSearch(searchQuery);
              }}
              className="px-3 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
            >
              <option value="all">All Types</option>
              <option value="customer">Customers</option>
              <option value="quotation">Quotations</option>
              <option value="project">Projects</option>
              <option value="transaction">Transactions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {/* Results Header */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Search Results
              {searchResults.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({searchResults.length} found)
                </span>
              )}
            </h2>
          </div>

          {/* Results List */}
          <div className="divide-y divide-gray-100">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Searching...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search query or filters
                </p>
              </div>
            ) : (
              searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Type Icon */}
                      <div className={`p-2 rounded-lg border ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {result.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {result.subtitle}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="text-right text-xs text-gray-500 ml-4">
                      {result.metadata && (
                        <div className="mb-1 font-medium">{result.metadata}</div>
                      )}
                      {result.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(result.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!searchQuery && (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Universal Search</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Start typing to search across all your customers, quotations, projects, and transactions.
            Use filters to narrow down results by type.
          </p>
        </div>
      )}
    </div>
  );
}
