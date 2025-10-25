import ComingSoon from '@/components/ComingSoon';
import { UserCircle } from 'lucide-react';

export default function CustomersPage() {
  return (
    <ComingSoon
      title="Customer Management"
      description="Manage your customer relationships, track interactions, view purchase history, and improve customer satisfaction."
      icon={<UserCircle className="w-12 h-12 text-secondary" />}
    />
  );
}
