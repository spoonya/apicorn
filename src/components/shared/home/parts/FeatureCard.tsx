'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { FeatureCardProps } from '@/types';
import { cn } from '@/utils';

export const FeatureCard = ({
  icon,
  iconClassName,
  title,
  description,
  textColor,
  iconBgColor,
  borderColor,
  delay,
}: Readonly<FeatureCardProps>) => {
  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        `bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border`,
        borderColor
      )}
    >
      <div className={cn(`p-3 rounded-lg w-max mb-4`, iconBgColor)}>
        <Icon className={iconClassName} />
      </div>
      <h3 className={cn(`text-xl font-semibold mb-3`, textColor)}>{title}</h3>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
};
