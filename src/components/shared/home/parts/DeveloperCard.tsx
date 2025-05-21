'use client';

import { motion } from 'framer-motion';
import { Github, Users } from 'lucide-react';
import Image from 'next/image';

import { DeveloperInfo } from '@/types';
import { Link } from '@heroui/react';

interface DeveloperCardProps {
  developer: DeveloperInfo;
  animationDelay?: number;
  className?: string;
}

export const DeveloperCard = ({
  developer,
  animationDelay = 0,
  className = '',
}: Readonly<DeveloperCardProps>) => {
  const { name, git, gitName, avatar } = developer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all
        duration-300 border border-slate-100 hover:border-blue-100 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div
            className="w-16 h-16 rounded-full bg-blue-50 overflow-hidden
            border-2 border-blue-100"
          >
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
          <Link
            href={git}
            className="inline-flex items-center gap-2 text-blue-600
            hover:text-blue-700 transition-colors"
            isExternal
          >
            <Github className="w-5 h-5" />
            {gitName || 'GitHub Profile'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
