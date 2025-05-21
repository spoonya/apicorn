'use client';

import { BookOpen, FileText, LogIn, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@heroui/react';

import { ProjectInfoItem } from './';

export const ProjectInfoCard = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="mb-12 bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100/50" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-100/50" />

      <div className="relative space-y-6 z-10">
        <ProjectInfoItem
          icon={<Zap className="w-6 h-6 text-blue-600" />}
          content={t.rich('projectGoal', {
            highlight: (chunks) => (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {chunks}
              </span>
            ),
          })}
          bgColor="bg-blue-100"
        />
        <ProjectInfoItem
          icon={<BookOpen className="w-6 h-6 text-purple-600" />}
          content={t.rich('courseInfo', {
            courseLink: (chunks) => (
              <Link
                href="https://rs.school/courses/reactjs"
                className="group inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                isExternal
              >
                {chunks}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  <LogIn className="w-4 h-4" />
                </span>
              </Link>
            ),
          })}
          bgColor="bg-purple-100"
        />
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <Link
          href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md"
          className="flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors"
          isExternal
        >
          <FileText className="w-5 h-5" />
          {t('taskRequirements')}
        </Link>
      </div>
    </div>
  );
};
