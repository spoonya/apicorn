import { Clock, Terminal, Variable } from 'lucide-react';

export const features = [
  {
    icon: Terminal,
    iconClassName: 'w-6 h-6 text-blue-600',
    title: 'REST Client',
    description: 'Full-featured REST client with all HTTP methods support',
    textColor: 'text-blue-600',
    iconBgColor: 'bg-blue-100',
    borderColor: 'border-blue-100',
  },
  {
    icon: Clock,
    iconClassName: 'w-6 h-6 text-green-600',
    title: 'History',
    description: 'Track requests and responses history',
    textColor: 'text-green-600',
    iconBgColor: 'bg-green-100',
    borderColor: 'border-green-100',
  },
  {
    icon: Variable,
    iconClassName: 'w-6 h-6 text-purple-600',
    title: 'Variables',
    description: 'Store and manage global variables',
    textColor: 'text-purple-600',
    iconBgColor: 'bg-purple-100',
    borderColor: 'border-purple-100',
  },
];
