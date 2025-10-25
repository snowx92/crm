/**
 * Firestore Database Service
 *
 * Centralized service for all Firestore operations.
 * Provides CRUD operations for all CRM entities.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Collection names
export const COLLECTIONS = {
  CUSTOMERS: 'customers',
  SERVICES: 'services',
  TRANSACTIONS: 'transactions',
  EXPENSES: 'expenses',
  TEAM_MEMBERS: 'teamMembers',
  RECEIPTS: 'receipts',
};

// Types
export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  totalSpent?: number;
  notes?: string;
  tags?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service {
  id?: string;
  name: string;
  description: string;
  category: 'design' | 'development' | 'marketing' | 'consulting' | 'other';
  price: number;
  currency?: string;
  duration?: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
  };
  status: 'active' | 'inactive' | 'archived';
  features?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Transaction {
  id?: string;
  customerId: string;
  serviceId?: string;
  amount: number;
  currency?: string;
  type: 'income' | 'refund';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'paypal' | 'other';
  description?: string;
  invoiceNumber?: string;
  transactionDate?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Expense {
  id?: string;
  title: string;
  amount: number;
  currency?: string;
  category: 'office' | 'software' | 'marketing' | 'travel' | 'utilities' | 'salaries' | 'other';
  description?: string;
  vendor?: string;
  paymentMethod?: 'cash' | 'card' | 'bank_transfer' | 'other';
  receiptUrl?: string;
  expenseDate?: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TeamMember {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department?: 'design' | 'development' | 'marketing' | 'sales' | 'management' | 'other';
  role: 'admin' | 'manager' | 'employee';
  salary?: number;
  hireDate?: Timestamp;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  skills?: string[];
  bio?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Receipt {
  id?: string;
  receiptNumber: string;
  customerId: string;
  transactionId?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  status: 'draft' | 'sent' | 'paid' | 'cancelled';
  issueDate?: Timestamp;
  dueDate?: Timestamp;
  paidDate?: Timestamp;
  notes?: string;
  pdfUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Generic Firestore Service Class
class FirestoreService<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // Get all documents with optional filters
  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    try {
      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T));
    } catch (error) {
      console.error(`Error getting all ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Get a single document by ID
  async getById(id: string): Promise<T | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  // Create a new document
  async create(data: Omit<T, 'id'>): Promise<string> {
    try {
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, this.collectionName), docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update an existing document
  async update(id: string, data: Partial<T>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Search with filters
  async search(filters: { field: string; operator: any; value: any }[]): Promise<T[]> {
    try {
      const constraints: QueryConstraint[] = filters.map(filter =>
        where(filter.field, filter.operator, filter.value)
      );
      return await this.getAll(constraints);
    } catch (error) {
      console.error(`Error searching ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// Export service instances for each collection
export const customersService = new FirestoreService<Customer>(COLLECTIONS.CUSTOMERS);
export const servicesService = new FirestoreService<Service>(COLLECTIONS.SERVICES);
export const transactionsService = new FirestoreService<Transaction>(COLLECTIONS.TRANSACTIONS);
export const expensesService = new FirestoreService<Expense>(COLLECTIONS.EXPENSES);
export const teamMembersService = new FirestoreService<TeamMember>(COLLECTIONS.TEAM_MEMBERS);
export const receiptsService = new FirestoreService<Receipt>(COLLECTIONS.RECEIPTS);
