import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, FileText, Trash2 } from 'lucide-react';
import { ApplicationStatus, JobApplication, ResumeDocument } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface ApplicationDetailModalProps {
  application: JobApplication | null;
  resumes: ResumeDocument[];
  onClose: () => void;
  onMoveApplication: (id: string, newStatus: ApplicationStatus) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteApplication: (id: string) => void;
}

const STAGES: ApplicationStatus[] = [
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected',
];

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({
  application,
  resumes,
  onClose,
  onMoveApplication,
  onToggleBookmark,
  onDeleteApplication,
}) => {
  if (!application) return null;

  const linkedResume = resumes.find((r) => r.id === application.resumeId);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-xl bg-[#0D0F17] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-7 z-10 text-white"
        >
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-start gap-3.5">
              <CompanyLogo company={application.company} size="lg" />
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {application.jobTitle}
                </h2>
                <p className="text-sm text-[#94A3B8] mt-0.5">
                  <strong className="text-white">
                    {application.company}
                  </strong>{' '}
                  · {application.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onToggleBookmark(application.id)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  application.bookmarked
                    ? 'text-[#8B5CF6] bg-[#6366F1]/20'
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="Bookmark"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    application.bookmarked ? 'fill-current' : ''
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                aria-label="Close detail modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="py-5 space-y-5">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-[#94A3B8]">Compensation</p>
                <p className="font-mono font-bold text-white mt-1">
                  {application.salary}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-[#94A3B8]">Deadline</p>
                <p className="font-mono font-bold text-[#F59E0B] mt-1">
                  {application.deadline}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-[#94A3B8]">Priority</p>
                <p className="font-bold text-[#8B5CF6] mt-1">
                  {application.priority}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-[#94A3B8]">Applied</p>
                <p className="font-mono font-semibold text-white mt-1">
                  {application.applicationDate}
                </p>
              </div>
            </div>

            {/* Stage Selector */}
            <div>
              <p className="text-xs font-semibold text-white mb-2">
                Pipeline Stage
              </p>
              <div className="grid grid-cols-5 gap-1.5 p-1 bg-[#131622] border border-white/10 rounded-xl">
                {STAGES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => onMoveApplication(application.id, st)}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      application.status === st
                        ? 'bg-[#6366F1] text-white shadow-2xs'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-xs font-semibold text-white mb-1.5">
                Application & Interview Notes
              </p>
              <p className="text-xs sm:text-sm text-[#94A3B8] bg-[#131622] p-4 rounded-xl border border-white/10 leading-relaxed">
                {application.notes}
              </p>
            </div>

            {/* Linked Resume */}
            {linkedResume && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#131622] border border-white/10 text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#8B5CF6]" />
                  <div>
                    <p className="font-semibold text-white">
                      {linkedResume.title}
                    </p>
                    <p className="text-[#94A3B8]">{linkedResume.fileName}</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#10B981]">
                  {linkedResume.atsScore}% ATS Match
                </span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onDeleteApplication(application.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/15 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Role</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
