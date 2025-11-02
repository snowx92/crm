// Data Store for Mock Data
// This module provides mock data and utility functions for customers and menu items

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  available: boolean;
  createdAt: string;
}

export const mockCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Tech Solutions Inc',
    email: 'john@techsolutions.com',
    phone: '+1 234 567 8900',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    company: 'Digital Marketing Pro',
    email: 'jane@digitalmarketing.com',
    phone: '+1 234 567 8901',
    status: 'active',
    createdAt: '2024-01-18',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    company: 'Creative Design Studio',
    email: 'michael@creativedesign.com',
    phone: '+1 234 567 8902',
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    company: 'Startup Ventures LLC',
    email: 'sarah@startupventures.com',
    phone: '+1 234 567 8903',
    status: 'inactive',
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    company: 'Global Enterprises',
    email: 'david@globalent.com',
    phone: '+1 234 567 8904',
    status: 'active',
    createdAt: '2024-01-22',
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Website Development',
    description: 'Full-stack website development with modern technologies',
    category: 'Development',
    price: 2500,
    available: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile app development for iOS and Android',
    category: 'Development',
    price: 4500,
    available: true,
    createdAt: '2024-01-16',
  },
  {
    id: '3',
    name: 'SEO Optimization',
    description: 'Search engine optimization for better visibility',
    category: 'Marketing',
    price: 800,
    available: true,
    createdAt: '2024-01-17',
  },
  {
    id: '4',
    name: 'Logo Design',
    description: 'Professional logo design with unlimited revisions',
    category: 'Design',
    price: 350,
    available: true,
    createdAt: '2024-01-18',
  },
  {
    id: '5',
    name: 'Social Media Management',
    description: 'Complete social media management and content creation',
    category: 'Marketing',
    price: 1200,
    available: false,
    createdAt: '2024-01-19',
  },
];

// Utility functions
export const getActiveCustomers = (customers: Customer[]): Customer[] => {
  return customers.filter(customer => customer.status === 'active');
};

export const getCustomerDisplayName = (customer: Customer): string => {
  return customer.company || `${customer.firstName} ${customer.lastName}`;
};

export const getAvailableMenuItems = (menuItems: MenuItem[]): MenuItem[] => {
  return menuItems.filter(item => item.available);
};