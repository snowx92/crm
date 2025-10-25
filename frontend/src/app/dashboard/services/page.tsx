import ComingSoon from '@/components/ComingSoon';
import { Briefcase } from 'lucide-react';

export default function ServicesPage() {
  return (
    <ComingSoon
      title="Services Management"
      description="Manage all your agency services, packages, and pricing in one place. Track service delivery and client satisfaction."
      icon={<Briefcase className="w-12 h-12 text-secondary" />}
    />
  );
}
