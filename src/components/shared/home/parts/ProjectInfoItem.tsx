import { ReactNode } from 'react';

interface ProjectInfoItemProps {
  icon: ReactNode;
  content: ReactNode;
  bgColor: string;
}

export const ProjectInfoItem = ({
  icon,
  content,
  bgColor,
}: Readonly<ProjectInfoItemProps>) => (
  <div className="flex items-center gap-4">
    <div className={`p-3 ${bgColor} rounded-lg`}>{icon}</div>
    <div className="flex-1">{content}</div>
  </div>
);
