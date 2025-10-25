/**
 * Firestore React Hooks
 *
 * Custom hooks for real-time data fetching from Firestore.
 * Provides automatic updates when data changes.
 */

'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Hook to fetch a single document in real-time
 * @param collectionName - Firestore collection name
 * @param documentId - Document ID
 * @returns { data, loading, error }
 */
export function useDocument<T = DocumentData>(
  collectionName: string,
  documentId: string | null
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const docRef = doc(db, collectionName, documentId);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching document:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, documentId]);

  return { data, loading, error };
}

/**
 * Hook to fetch a collection in real-time
 * @param collectionName - Firestore collection name
 * @param constraints - Optional query constraints
 * @returns { data, loading, error }
 */
export function useCollection<T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const collectionRef = collection(db, collectionName);
    const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as T));
        setData(documents);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
}

/**
 * Hook to fetch customers
 */
export function useCustomers() {
  return useCollection('customers');
}

/**
 * Hook to fetch services
 */
export function useServices() {
  return useCollection('services');
}

/**
 * Hook to fetch transactions
 */
export function useTransactions() {
  return useCollection('transactions');
}

/**
 * Hook to fetch expenses
 */
export function useExpenses() {
  return useCollection('expenses');
}

/**
 * Hook to fetch team members
 */
export function useTeamMembers() {
  return useCollection('teamMembers');
}

/**
 * Hook to fetch receipts
 */
export function useReceipts() {
  return useCollection('receipts');
}

/**
 * Hook to fetch a single customer
 */
export function useCustomer(customerId: string | null) {
  return useDocument('customers', customerId);
}

/**
 * Hook to fetch a single service
 */
export function useService(serviceId: string | null) {
  return useDocument('services', serviceId);
}

/**
 * Hook to fetch a single transaction
 */
export function useTransaction(transactionId: string | null) {
  return useDocument('transactions', transactionId);
}

/**
 * Hook to fetch a single expense
 */
export function useExpense(expenseId: string | null) {
  return useDocument('expenses', expenseId);
}

/**
 * Hook to fetch a single team member
 */
export function useTeamMember(memberId: string | null) {
  return useDocument('teamMembers', memberId);
}

/**
 * Hook to fetch a single receipt
 */
export function useReceipt(receiptId: string | null) {
  return useDocument('receipts', receiptId);
}
