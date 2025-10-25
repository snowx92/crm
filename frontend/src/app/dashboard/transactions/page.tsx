import ComingSoon from '@/components/ComingSoon';
import { CreditCard } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <ComingSoon
      title="Transaction History"
      description="View all financial transactions, process payments, and maintain detailed financial records for your agency."
      icon={<CreditCard className="w-12 h-12 text-secondary" />}
    />
  );
}
