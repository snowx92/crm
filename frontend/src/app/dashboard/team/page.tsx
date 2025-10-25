import ComingSoon from '@/components/ComingSoon';
import { Users } from 'lucide-react';

export default function TeamPage() {
  return (
    <ComingSoon
      title="Team Members"
      description="View and manage your team members, assign roles, track performance, and collaborate effectively."
      icon={<Users className="w-12 h-12 text-secondary" />}
    />
  );
}
