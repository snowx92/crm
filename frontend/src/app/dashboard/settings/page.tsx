import ComingSoon from '@/components/ComingSoon';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings & Configuration"
      description="Customize your CRM experience, manage preferences, configure integrations, and control user permissions."
      icon={<Settings className="w-12 h-12 text-secondary" />}
    />
  );
}
