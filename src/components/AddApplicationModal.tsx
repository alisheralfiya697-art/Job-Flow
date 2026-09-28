import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import {
  ApplicationStatus,
  EmploymentType,
  JobApplication,
  PriorityLevel,
  ResumeDocument,
} from '../types';

interface AddApplicationModalProps {
  isOpen: boolean;
  defaultStatus?: ApplicationStatus;
  resumes: ResumeDocument[];
  onClose: () => void;
  onAddApplication: (newApp: Omit<JobApplication, 'id'>) => void;
}

export const AddApplicationModal: React.FC<AddApplicationModalProps> = ({
  isOpen,
  defaultStatus = 'Applied',
  resumes,
  onClose,
  onAddApplication,
}) => {
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [salary, setSalary] = useState('₹32,00,000/year');
  const [location, setLocation] = useState('Remote • India');
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>('Full-time');
  const [applicationDate, setApplicationDate] = useState('2026-09-28');
  const [deadline, setDeadline] = useState('5 days');
  const [status, setStatus] = useState<ApplicationStatus>(defaultStatus);
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [notes, setNotes] = useState('');
  const [resumeId, setResumeId] = useState<string>(resumes[0]?.id || 'res-1');

  useEffect(() => {
    setStatus(defaultStatus);
  }, [defaultStatus, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !jobTitle.trim()) return;

    const workMode: JobApplication['workMode'] = location
      .toLowerCase()
      .includes('remote')
      ? 'Remote'
      : location.toLowerCase().includes('hybrid')
      ? 'Hybrid'
      : 'On-site';

    onAddApplication({
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      jobUrl: jobUrl.trim() || 'https://careers.example.com',
      salary: salary.trim() || '₹30,00,000/year',
      salaryBand: '₹30L–₹50L',
      location: location.trim() || 'Remote • India',
      workMode,
      employmentType,
      applicationDate,
      appliedRelative: 'Just now',
      deadline: deadline.trim() || '7 days',
      deadlineDaysLeft: 5,
      status,
      priority,
      notes:
        notes.trim() ||
        'Submitted tailored engineering resume and verified core system requirements.',
      resumeId,
      bookmarked: priority === 'High',
    });

    setCompany('');
    setJobTitle('');
    setJobUrl('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          {/* Smoothly Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Dialog: scale(0.95) -> scale(1), opacity(0) -> opacity(1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0D0F17] border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 sm:p-7 z-10 max-h-[92vh] overflow-y-auto text-white"
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Add New Job Application
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Log role details, compensation, deadline, and linked ATS resume
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Company & Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google, Microsoft, Stripe"
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Job URL & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Job URL
                  </label>
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    placeholder="https://careers.google.com/..."
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Salary / Compensation
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ₹30,000/month or ₹36,00,000/yr"
                    className="w-full px-3.5 py-2.5 text-sm font-mono text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Location & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote • India or Bengaluru"
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) =>
                      setEmploymentType(e.target.value as EmploymentType)
                    }
                    className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Application Date, Deadline, Status, Priority */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Application Date
                  </label>
                  <input
                    type="date"
                    value={applicationDate}
                    onChange={(e) => setApplicationDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono text-white bg-[#131622] border border-white/10 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. 4 days"
                    className="w-full px-3 py-2 text-xs font-mono text-white bg-[#131622] border border-white/10 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ApplicationStatus)
                    }
                    className="w-full px-3 py-2 text-xs font-semibold text-white bg-[#131622] border border-white/10 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as PriorityLevel)
                    }
                    className="w-full px-3 py-2 text-xs font-semibold text-white bg-[#131622] border border-white/10 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Resume Selection */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Select Resume Version
                </label>
                <select
                  value={resumeId}
                  onChange={(e) => setResumeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none cursor-pointer"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.atsScore}% ATS Match — {r.fileName})
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 6: Notes */}
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5">
                  Notes & Referral Details
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add referral contacts, key tech stack requirements, or interview notes..."
                  className="w-full px-3.5 py-2.5 text-sm text-white bg-[#131622] focus:bg-[#191D2D] border border-white/10 focus:border-[#6366F1] rounded-xl outline-none resize-none"
                />
              </div>

              {/* Submit Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#131622] hover:bg-[#191D2D] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C4DFF] rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Application</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
