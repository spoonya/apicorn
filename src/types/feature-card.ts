import { features } from '@/data';

export type FeatureCardProps = (typeof features)[number] & {
  delay: number;
};
