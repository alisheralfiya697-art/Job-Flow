import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Search,
  Plus,
  Check,
  Sparkles,
  Calendar,
  FileText,
  Zap,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { NavPage, NotificationItem } from '../types';
import { JobFlowLogo } from './JobFlowLogo';
import avatarImg from '../assets/images/avatar_alfiya_profile_1790579411416.jpg';

interface NavbarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onOpenAddModal: () => void;
  onOpenCommandSearch: () => void;
  onTriggerLoadingScreen: () => void;
  onResetDemoData: () => void;
  onOpenBrandLogoModal: () => void;
}

const NAV_ITEMS: { id: NavPage; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'applications', label: 'Applications' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'resume', label: 'Resume' },
  { id: 'analytics', label: 'Analytics' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  notifications,
  onMarkAllRead,
  onSelectNotification,
  onOpenAddModal,
  onOpenCommandSearch,
  onTriggerLoadingScreen,
  onResetDemoData,
  onOpenBrandLogoModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'interview':
        return <Calendar className="w-4 h-4 text-[#6366F1]" />;
      case 'resume':
        return <FileText className="w-4 h-4 text-[#10B981]" />;
      case 'deadline':
        return <Zap className="w-4 h-4 text-[#F59E0B]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#8B5CF6]" />;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#05060A]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
            : 'bg-[#05060A]/65 backdrop-blur-md border-b border-white/[0.07]'
        }`}
      >
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() =>
              onNavigate(activePage === 'landing' ? 'dashboard' : 'landing')
            }
            className="transition-transform hover:scale-[1.02] cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#6366F1] rounded-md"
          >
            <JobFlowLogo size="md" showWordmark={true} />
          </button>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-5 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#6366F1] rounded-sm ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] rounded-full"
                      transition={{ duration: 0.18 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Search shortcut, Notifications, Profile & Add CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenCommandSearch}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#94A3B8] hover:text-white bg-[#0D0F17] hover:bg-[#131622] border border-white/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              aria-label="Quick search applications"
            >
              <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Search</span>
              <kbd className="font-mono text-[11px] text-white bg-[#131622] px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onOpenAddModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C4DFF] rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Application</span>
            </button>

            {/* Notification Bell & Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                className="relative w-10 h-10 rounded-xl bg-[#0D0F17] hover:bg-[#131622] border border-white/10 flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                aria-label={`Notifications (${unreadCount} unread)`}
              >
                <Bell className="w-4 h-4 text-[#94A3B8]" />
                {unreadCount > 0 && (
                  <span className="animate-pulse-once absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EC4899] ring-2 ring-[#05060A]" />
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0D0F17]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Notifications
                        </h3>
                        <p className="text-xs text-[#94A3B8] font-mono tabular-nums">
                          {unreadCount} unread updates
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={onMarkAllRead}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#8B5CF6] hover:text-[#06B6D4] cursor-pointer whitespace-nowrap"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {notifications.map((notif, idx) => (
                        <motion.button
                          key={notif.id}
                          type="button"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.16 }}
                          onClick={() => {
                            onSelectNotification(notif);
                            setNotifOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            notif.read
                              ? 'bg-[#090A10] border-white/[0.06] hover:border-white/15'
                              : 'bg-[#131622] border-[#6366F1]/40 hover:border-[#6366F1]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#05060A] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                            {getCategoryIcon(notif.category)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-white truncate">
                                {notif.title}
                              </p>
                              <span className="text-[11px] font-mono tabular-nums text-[#64748B] shrink-0">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar & User Menu */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#131622] border border-transparent hover:border-white/10 transition-all hover:-translate-y-0.5 cursor-pointer"
                aria-label="User profile menu"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-[#6366F1] to-[#EC4899] flex items-center justify-center text-white font-semibold text-xs shrink-0">
                  {!avatarError ? (
                    <img
                      src={avatarImg}
                      alt="Alfiya profile avatar"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>AL</span>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 mt-2 w-64 bg-[#0D0F17]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50"
                  >
                    <div className="px-3 py-2.5 border-b border-white/10 mb-2">
                      <p className="text-sm font-semibold text-white">
                        Alfiya Alisher
                      </p>
                      <p className="text-xs text-[#94A3B8] truncate">
                        Software Engineer Candidate
                      </p>
                    </div>

                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate(
                            activePage === 'landing' ? 'dashboard' : 'landing'
                          );
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-white hover:bg-[#131622] rounded-lg transition-colors cursor-pointer"
                      >
                        <Layers className="w-4 h-4 text-[#6366F1]" />
                        <span>
                          {activePage === 'landing'
                            ? 'Open Dashboard Workspace'
                            : 'View Landing Page Hero'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onOpenBrandLogoModal();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-white hover:bg-[#131622] rounded-lg transition-colors cursor-pointer"
                      >
                        <JobFlowLogo size="sm" showWordmark={false} />
                        <span>Brand Logo & SVG Kit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onTriggerLoadingScreen();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-white hover:bg-[#131622] rounded-lg transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                        <span>Preview Workspace Loader</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onResetDemoData();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#131622] rounded-lg transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-[#94A3B8]" />
                        <span>Reset Sample Pipeline</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#05060A]/95 backdrop-blur-md border-t border-white/10 px-2 flex items-center justify-around"
        aria-label="Mobile Navigation"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-white font-semibold bg-[#6366F1]/25'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
};
