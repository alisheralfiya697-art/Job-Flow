/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, Sparkles, X } from 'lucide-react';
import {
  ApplicationStatus,
  InterviewEvent,
  JobApplication,
  NavPage,
  NotificationItem,
  ResumeDocument,
  ToastMessage,
} from './types';
import {
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RESUMES,
} from './data/initialData';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { ApplicationsView } from './components/ApplicationsView';
import { InterviewsView } from './components/InterviewsView';
import { ResumeView } from './components/ResumeView';
import { AnalyticsView } from './components/AnalyticsView';
import { AddApplicationModal } from './components/AddApplicationModal';
import { ApplicationDetailModal } from './components/ApplicationDetailModal';
import { LoadingOverlay } from './components/LoadingOverlay';
import { BrandLogoModal, JobFlowLogo } from './components/JobFlowLogo';

const STORAGE_KEYS = {
  APPS: 'jobflow_apps_v1',
  RESUMES: 'jobflow_resumes_v1',
  INTERVIEWS: 'jobflow_interviews_v1',
  NOTIFS: 'jobflow_notifs_v1',
};

export default function App() {
  // Active Page State (Starts on Landing Page with immediate access to Dashboard & all tabs)
  const [activePage, setActivePage] = useState<NavPage>('landing');
  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState<boolean>(false);

  // Persistent Data States
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [resumes, setResumes] = useState<ResumeDocument[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESUMES);
      return saved ? JSON.parse(saved) : INITIAL_RESUMES;
    } catch {
      return INITIAL_RESUMES;
    }
  });

  const [interviews, setInterviews] = useState<InterviewEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEWS;
    } catch {
      return INITIAL_INTERVIEWS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modals & Toasts
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [brandLogoModalOpen, setBrandLogoModalOpen] = useState(false);
  const [addModalDefaultStatus, setAddModalDefaultStatus] =
    useState<ApplicationStatus>('Applied');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPS, JSON.stringify(applications));
    } catch {
      // ignore storage quota errors
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
    } catch {
      // ignore
    }
  }, [resumes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
    } catch {
      // ignore
    }
  }, [interviews]);

  // Toast helper
  const pushToast = useCallback(
    (
      title: string,
      subtitle?: string,
      type: ToastMessage['type'] = 'success'
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev.slice(-2), { id, title, subtitle, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3600);
    },
    []
  );

  // Global ⌘K / Ctrl+K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActivePage('applications');
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 120);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: NavPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerLoadingScreen = () => {
    setIsWorkspaceLoading(true);
    setTimeout(() => {
      setIsWorkspaceLoading(false);
    }, 1100);
  };

  const handleResetDemoData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setResumes(INITIAL_RESUMES);
    setInterviews(INITIAL_INTERVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    pushToast(
      '✓ Workspace Reset',
      'Restored default engineering pipeline and sample data.'
    );
  };

  // Application Handlers
  const handleAddApplication = (newAppData: Omit<JobApplication, 'id'>) => {
    const created: JobApplication = {
      ...newAppData,
      id: `app-${Date.now()}`,
    };
    setApplications((prev) => [created, ...prev]);

    // Increment resume usage count
    setResumes((prev) =>
      prev.map((r) =>
        r.id === created.resumeId ? { ...r, usedCount: r.usedCount + 1 } : r
      )
    );

    if (created.status === 'Offer') {
      pushToast(
        '✓ Offer Logged!',
        `${created.company} — ${created.jobTitle} added to Offers.`,
        'offer'
      );
    } else {
      pushToast(
        '✓ Application Added',
        `${created.company} (${created.jobTitle}) added to ${created.status}.`,
        'success'
      );
    }
  };

  const handleMoveApplication = (id: string, newStatus: ApplicationStatus) => {
    const target = applications.find((a) => a.id === id);
    if (!target || target.status === newStatus) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, status: newStatus, appliedRelative: 'Updated just now' }
          : app
      )
    );

    if (newStatus === 'Offer') {
      pushToast(
        '🎉 Offer Stage Reached!',
        `Congratulations! ${target.company} moved to Offer.`,
        'offer'
      );
    } else if (newStatus === 'Interview') {
      pushToast(
        '✓ Interview Unlocked',
        `${target.company} — ${target.jobTitle} advanced to Interview.`,
        'success'
      );
    } else {
      pushToast(
        `✓ Moved to ${newStatus}`,
        `${target.company} pipeline status updated.`,
        'info'
      );
    }
  };

  const handleToggleBookmark = (id: string) => {
    const target = applications.find((a) => a.id === id);
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
    if (target) {
      pushToast(
        target.bookmarked ? 'Removed from Saved' : '✓ Bookmarked Role',
        `${target.company} — ${target.jobTitle}`
      );
    }
  };

  const handleDeleteApplication = (id: string) => {
    const target = applications.find((a) => a.id === id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
    if (target) {
      pushToast(
        'Application Removed',
        `${target.company} removed from pipeline.`,
        'info'
      );
    }
  };

  // Interview Handlers
  const handleToggleInterviewCompleted = (id: string) => {
    const target = interviews.find((i) => i.id === id);
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    if (target && !target.completed) {
      pushToast(
        '✓ Interview Completed',
        `Logged completion for ${target.company} (${target.type}).`
      );
    }
  };

  const handleTogglePrepItem = (interviewId: string, prepId: string) => {
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === interviewId
          ? {
              ...item,
              prepChecklist: item.prepChecklist.map((p) =>
                p.id === prepId ? { ...p, done: !p.done } : p
              ),
            }
          : item
      )
    );
  };

  const handleAddInterview = (newInt: Omit<InterviewEvent, 'id'>) => {
    const created: InterviewEvent = {
      ...newInt,
      id: `int-${Date.now()}`,
    };
    setInterviews((prev) => [created, ...prev]);
    pushToast(
      '✓ Interview Scheduled',
      `${created.company} ${created.type} added for ${created.dayGroup} at ${created.timeLabel}.`
    );
  };

  // Resume Handlers
  const handleAddResume = (newResume: ResumeDocument) => {
    setResumes((prev) => [newResume, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        category: 'resume',
        title: 'Resume Updated',
        message: `${newResume.fileName} analyzed with ${newResume.atsScore}% ATS score.`,
        timestamp: 'Just now',
        read: false,
        targetPage: 'resume',
      },
      ...prev,
    ]);
    pushToast(
      '✓ Resume Uploaded & Analyzed',
      `ATS Match Score: ${newResume.atsScore}%`
    );
  };

  const handleSetDefaultResume = (id: string) => {
    const target = resumes.find((r) => r.id === id);
    setResumes((prev) =>
      prev.map((r) => ({ ...r, isDefault: r.id === id }))
    );
    if (target) {
      pushToast('✓ Default Resume Updated', `${target.title} set as primary.`);
    }
  };

  const handleDeleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    pushToast('Resume Deleted', 'Removed resume version from library.', 'info');
  };

  // Notification Handlers
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    handleNavigate(notif.targetPage);
  };

  const selectedApplication =
    applications.find((a) => a.id === selectedAppId) || null;

  return (
    <div className="min-h-screen flex flex-col relative isolate bg-[#05060A] text-[#F8FAFC]">
      <AnimatedBackground />
      <LoadingOverlay visible={isWorkspaceLoading} />

      {/* Top Floating Glassmorphic Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onSelectNotification={handleSelectNotification}
        onOpenAddModal={() => {
          setAddModalDefaultStatus('Applied');
          setAddModalOpen(true);
        }}
        onOpenCommandSearch={() => {
          setActivePage('applications');
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
        }}
        onTriggerLoadingScreen={handleTriggerLoadingScreen}
        onResetDemoData={handleResetDemoData}
        onOpenBrandLogoModal={() => setBrandLogoModalOpen(true)}
      />

      {/* Main Content with Smooth 240ms Page Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {activePage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <LandingPage
                onNavigate={handleNavigate}
                onOpenAddModal={() => {
                  setAddModalDefaultStatus('Applied');
                  setAddModalOpen(true);
                }}
              />
            </motion.div>
          )}

          {activePage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <DashboardView
                applications={applications}
                interviews={interviews}
                notifications={notifications}
                baselineApplicationsCount={INITIAL_APPLICATIONS.length}
                onMoveApplication={handleMoveApplication}
                onToggleBookmark={handleToggleBookmark}
                onDeleteApplication={handleDeleteApplication}
                onSelectApplication={(app) => setSelectedAppId(app.id)}
                onOpenAddModal={(status = 'Applied') => {
                  setAddModalDefaultStatus(status);
                  setAddModalOpen(true);
                }}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {activePage === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <ApplicationsView
                applications={applications}
                resumes={resumes}
                searchInputRef={searchInputRef}
                onMoveApplication={handleMoveApplication}
                onToggleBookmark={handleToggleBookmark}
                onDeleteApplication={handleDeleteApplication}
                onSelectApplication={(app) => setSelectedAppId(app.id)}
                onOpenAddModal={(status = 'Applied') => {
                  setAddModalDefaultStatus(status);
                  setAddModalOpen(true);
                }}
              />
            </motion.div>
          )}

          {activePage === 'interviews' && (
            <motion.div
              key="interviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <InterviewsView
                interviews={interviews}
                onToggleInterviewCompleted={handleToggleInterviewCompleted}
                onTogglePrepItem={handleTogglePrepItem}
                onAddInterview={handleAddInterview}
              />
            </motion.div>
          )}

          {activePage === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <ResumeView
                resumes={resumes}
                onAddResume={handleAddResume}
                onSetDefaultResume={handleSetDefaultResume}
                onDeleteResume={handleDeleteResume}
              />
            </motion.div>
          )}

          {activePage === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <AnalyticsView applications={applications} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05060A]/85 backdrop-blur-xs py-8 mb-14 md:mb-0">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBrandLogoModalOpen(true)}
              className="hover:opacity-90 transition-opacity cursor-pointer"
              title="Open JobFlow Brand Logo & SVG Kit"
            >
              <JobFlowLogo size="sm" showWordmark={true} />
            </button>
            <span aria-hidden="true">·</span>
            <span>Intelligent Career & Application Workspace</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => setBrandLogoModalOpen(true)}
              className="font-semibold text-[#8B5CF6] hover:text-[#06B6D4] transition-colors cursor-pointer"
            >
              Brand Logo & SVG
            </button>
            {(
              [
                { id: 'landing', label: 'Landing Hero' },
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'applications', label: 'Pipeline' },
                { id: 'interviews', label: 'Interviews' },
                { id: 'resume', label: 'Resume ATS' },
                { id: 'analytics', label: 'Analytics' },
              ] as { id: NavPage; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Brand Logo & SVG Asset Kit Modal */}
      <BrandLogoModal
        isOpen={brandLogoModalOpen}
        onClose={() => setBrandLogoModalOpen(false)}
      />

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={addModalOpen}
        defaultStatus={addModalDefaultStatus}
        resumes={resumes}
        onClose={() => setAddModalOpen(false)}
        onAddApplication={handleAddApplication}
      />

      {/* Application Detail & Stage Editor Modal */}
      <ApplicationDetailModal
        application={selectedApplication}
        resumes={resumes}
        onClose={() => setSelectedAppId(null)}
        onMoveApplication={handleMoveApplication}
        onToggleBookmark={handleToggleBookmark}
        onDeleteApplication={handleDeleteApplication}
      />

      {/* Animated Toast & Offer Celebration Stack (Section 22) */}
      <div
        className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto bg-[#0D0F17]/95 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl flex items-start gap-3 ${
                toast.type === 'offer'
                  ? 'border-[#10B981] ring-2 ring-[#10B981]/25'
                  : 'border-white/15'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  toast.type === 'offer'
                    ? 'bg-[#10B981]/20 text-[#10B981]'
                    : 'bg-[#6366F1]/20 text-[#8B5CF6]'
                }`}
              >
                {toast.type === 'offer' ? (
                  <Award className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white">
                  {toast.title}
                </p>
                {toast.subtitle && (
                  <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
                    {toast.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
