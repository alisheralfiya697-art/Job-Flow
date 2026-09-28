import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  Clock,
  ArrowUpRight,
  Sparkles,
  FileText,
  Zap,
} from 'lucide-react';
import {
  ApplicationStatus,
  InterviewEvent,
  JobApplication,
  NavPage,
  NotificationItem,
} from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { KanbanBoard } from './KanbanBoard';
import { CompanyLogo } from './CompanyLogo';

interface DashboardViewProps {
  applications: JobApplication[];
  interviews: InterviewEvent[];
  notifications: NotificationItem[];
  baselineApplicationsCount: number;
  onMoveApplication: (id: string, newStatus: ApplicationStatus) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onSelectApplication: (app: JobApplication) => void;
  onOpenAddModal: (defaultStatus?: ApplicationStatus) => void;
  onNavigate: (page: NavPage) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  applications,
  interviews,
  notifications,
  baselineApplicationsCount,
  onMoveApplication,
  onToggleBookmark,
  onDeleteApplication,
  onSelectApplication,
  onOpenAddModal,
  onNavigate,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showSkeletonPreview, setShowSkeletonPreview] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate live dynamic stats anchored to 124 / 18 / 4 / 14.5%
  const deltaApps = applications.length - baselineApplicationsCount;
  const totalAppsStat = Math.max(0, 124 + deltaApps);

  const activeInterviewsInPipeline = applications.filter(
    (a) => a.status === 'Interview'
  ).length;
  const totalInterviewsStat = Math.max(0, 18 + (activeInterviewsInPipeline - 2));

  const activeOffersInPipeline = applications.filter(
    (a) => a.status === 'Offer'
  ).length;
  const totalOffersStat = Math.max(0, 4 + (activeOffersInPipeline - 2));

  const responseRateStat =
    totalAppsStat > 0
      ? Number(((totalInterviewsStat / totalAppsStat) * 100).toFixed(1))
      : 14.5;

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const STAT_CARDS = [
    {
      id: 'applications',
      label: 'Applications',
      value: totalAppsStat,
      decimals: 0,
      suffix: '',
      change: '+18.4% this month',
      icon: Briefcase,
      iconColor: 'text-[#8B5CF6] bg-[#6366F1]/20',
      strokeColor: '#6366F1',
      fillId: 'gradIndigo',
      sparkPath: 'M 0 34 Q 20 28, 40 24 T 80 18 T 120 12 T 160 4',
    },
    {
      id: 'interviews',
      label: 'Interviews',
      value: totalInterviewsStat,
      decimals: 0,
      suffix: '',
      change: '+24.0% conversion',
      icon: Calendar,
      iconColor: 'text-[#A855F7] bg-[#8B5CF6]/20',
      strokeColor: '#8B5CF6',
      fillId: 'gradViolet',
      sparkPath: 'M 0 36 Q 25 32, 50 22 T 100 16 T 160 6',
    },
    {
      id: 'offers',
      label: 'Offers',
      value: totalOffersStat,
      decimals: 0,
      suffix: '',
      change: '+2 new offers',
      icon: Award,
      iconColor: 'text-[#10B981] bg-[#10B981]/20',
      strokeColor: '#10B981',
      fillId: 'gradEmerald',
      sparkPath: 'M 0 38 Q 35 35, 70 26 T 115 14 T 160 5',
    },
    {
      id: 'response-rate',
      label: 'Response Rate',
      value: responseRateStat,
      decimals: 1,
      suffix: '%',
      change: '+3.2% vs benchmark',
      icon: TrendingUp,
      iconColor: 'text-[#06B6D4] bg-[#06B6D4]/20',
      strokeColor: '#06B6D4',
      fillId: 'gradCyan',
      sparkPath: 'M 0 32 Q 30 24, 60 27 T 110 15 T 160 7',
    },
  ];

  const handleToggleSkeleton = () => {
    setShowSkeletonPreview(true);
    setTimeout(() => {
      setShowSkeletonPreview(false);
    }, 1200);
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-10">
      {/* TOP GREETING & LIVE DATE/TIME INDICATOR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mb-2">
            <Clock className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="font-mono tabular-nums">{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-white font-medium">
              {formattedTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Good morning, Alfiya 👋
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#94A3B8]">
            Here&apos;s your job search overview.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={handleToggleSkeleton}
            className="px-3.5 py-2.5 text-xs font-medium text-[#94A3B8] hover:text-white bg-[#0D0F17] hover:bg-[#131622] border border-white/10 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Preview Skeleton State
          </button>

          <button
            type="button"
            onClick={() => onOpenAddModal('Applied')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E6] hover:to-[#7C4DFF] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </motion.div>
      </div>

      {/* FOUR LARGE ANIMATED STATISTICS CARDS */}
      {showSkeletonPreview ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-[#0D0F17] border border-white/10 rounded-2xl p-6 h-[176px] animate-pulse flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="w-10 h-10 bg-white/10 rounded-xl" />
              </div>
              <div className="h-9 w-28 bg-white/10 rounded mt-2" />
              <div className="h-8 w-full bg-white/5 rounded mt-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STAT_CARDS.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.07 }}
                onClick={() =>
                  onNavigate(
                    card.id === 'interviews'
                      ? 'interviews'
                      : card.id === 'response-rate'
                      ? 'analytics'
                      : 'applications'
                  )
                }
                className="group relative bg-[#0D0F17] border border-white/10 hover:border-[#6366F1]/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer overflow-hidden"
              >
                {/* Top Row: Label & Icon */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#94A3B8]">
                    {card.label}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${card.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Middle Row: Animated Number & Percentage Change */}
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <AnimatedCounter
                    value={card.value}
                    decimals={card.decimals}
                    suffix={card.suffix}
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                  />
                  <span className="text-xs font-mono font-medium text-[#10B981]">
                    {card.change}
                  </span>
                </div>

                {/* Progressive Self-Drawing SVG Sparkline Graph */}
                <div className="mt-4 pt-2">
                  <svg
                    viewBox="0 0 160 42"
                    className="w-full h-10 overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id={card.fillId}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={card.strokeColor}
                          stopOpacity="0.28"
                        />
                        <stop
                          offset="100%"
                          stopColor={card.strokeColor}
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`${card.sparkPath} L 160 42 L 0 42 Z`}
                      fill={`url(#${card.fillId})`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                    />
                    <motion.path
                      d={card.sparkPath}
                      fill="none"
                      stroke={card.strokeColor}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.1,
                        delay: 0.15 + index * 0.08,
                        ease: 'easeOut',
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* INTERACTIVE APPLICATION PIPELINE (KANBAN BOARD) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Application Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Drag job cards between stages or use quick hover controls to
              update status and recalculate live statistics.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('applications')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#06B6D4] transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            <span>Open Full Filterable View</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {showSkeletonPreview ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((col) => (
              <div
                key={col}
                className="bg-[#0D0F17] border border-white/10 rounded-2xl p-4 h-96 animate-pulse space-y-3"
              >
                <div className="h-5 w-24 bg-white/10 rounded" />
                <div className="h-32 w-full bg-white/5 rounded-xl" />
                <div className="h-32 w-full bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <KanbanBoard
            applications={applications}
            onMoveApplication={onMoveApplication}
            onToggleBookmark={onToggleBookmark}
            onDeleteApplication={onDeleteApplication}
            onSelectApplication={onSelectApplication}
            onOpenAddModal={onOpenAddModal}
          />
        )}
      </section>

      {/* BOTTOM 2-COLUMN COMMAND CENTER: INTERVIEW TIMELINE & RECENT NOTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Interview Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D0F17] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white">
                Upcoming Interview Schedule
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Chronological technical & HR loops this week
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('interviews')}
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#06B6D4] cursor-pointer whitespace-nowrap"
            >
              Full Timeline →
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#6366F1] before:via-[#8B5CF6] before:to-white/10">
            {interviews.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.06 }}
                onClick={() => onNavigate('interviews')}
                className="relative group bg-[#131622] hover:bg-[#191D2D] border border-white/10 hover:border-[#6366F1]/50 rounded-xl p-4 transition-all cursor-pointer"
              >
                <span
                  className={`absolute -left-[21px] top-5 w-3 h-3 rounded-full ring-4 ring-[#0D0F17] ${
                    item.completed
                      ? 'bg-[#10B981]'
                      : idx === 0
                      ? 'bg-[#6366F1]'
                      : 'bg-[#8B5CF6]'
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={item.company} size="sm" />
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className="font-semibold text-[#8B5CF6]">
                          {item.dayGroup}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums font-medium text-white">
                          {item.timeLabel}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {item.type} — {item.company}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#94A3B8]">
                    {item.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Activity & Notifications Feed (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D0F17] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Priority Alerts & Updates
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Deadlines, ATS analysis, and interview reminders
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('resume')}
                className="text-xs font-semibold text-[#8B5CF6] hover:text-[#06B6D4] cursor-pointer whitespace-nowrap"
              >
                Manage Resumes →
              </button>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif, idx) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.06 }}
                  onClick={() => onNavigate(notif.targetPage)}
                  className="p-3.5 rounded-xl bg-[#131622] hover:bg-[#191D2D] border border-white/10 transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#05060A] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {notif.category === 'interview' && (
                      <Calendar className="w-4 h-4 text-[#6366F1]" />
                    )}
                    {notif.category === 'resume' && (
                      <FileText className="w-4 h-4 text-[#10B981]" />
                    )}
                    {notif.category === 'deadline' && (
                      <Zap className="w-4 h-4 text-[#F59E0B]" />
                    )}
                    {notif.category === 'offer' && (
                      <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-white">
                        {notif.title}
                      </p>
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
            <span>Default Resume: Software Engineer (92% ATS)</span>
            <button
              type="button"
              onClick={() => onNavigate('analytics')}
              className="font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
