import ComingSoon from '@/components/ComingSoon';
import { Receipt } from 'lucide-react';

export default function ReceiptsPage() {
  return (
    <ComingSoon
      title="Receipts Management"
      description="Generate, manage, and organize all your receipts and invoices. Keep your financial documentation in order."
      icon={<Receipt className="w-12 h-12 text-secondary" />}
    />
  );
}
