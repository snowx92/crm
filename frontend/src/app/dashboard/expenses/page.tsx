import ComingSoon from '@/components/ComingSoon';
import { DollarSign } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <ComingSoon
      title="Expense Tracking"
      description="Track and manage all your business expenses. Generate reports, categorize spending, and stay on budget."
      icon={<DollarSign className="w-12 h-12 text-secondary" />}
    />
  );
}
