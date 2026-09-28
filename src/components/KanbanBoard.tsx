import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
} from 'lucide-react';
import { ApplicationStatus, JobApplication } from '../types';
import { CompanyLogo } from './CompanyLogo';

export const PIPELINE_COLUMNS: {
  status: ApplicationStatus;
  title: string;
  accentColor: string;
  barColor: string;
}[] = [
  {
    status: 'Applied',
    title: 'Applied',
    accentColor: 'text-[#8B5CF6]',
    barColor: 'from-[#6366F1] to-[#8B5CF6]',
  },
  {
    status: 'Assessment',
    title: 'Assessment',
    accentColor: 'text-[#06B6D4]',
    barColor: 'from-[#06B6D4] to-[#6366F1]',
  },
  {
    status: 'Interview',
    title: 'Interview',
    accentColor: 'text-[#A855F7]',
    barColor: 'from-[#8B5CF6] to-[#EC4899]',
  },
  {
    status: 'Offer',
    title: 'Offer',
    accentColor: 'text-[#10B981]',
    barColor: 'from-[#10B981] to-[#06B6D4]',
  },
  {
    status: 'Rejected',
    title: 'Rejected',
    accentColor: 'text-[#94A3B8]',
    barColor: 'from-slate-500 to-slate-600',
  },
];

const STAGE_PROGRESS_MAP: Record<ApplicationStatus, number> = {
  Applied: 25,
  Assessment: 50,
  Interview: 75,
  Offer: 100,
  Rejected: 100,
};

interface KanbanBoardProps {
  applications: JobApplication[];
  onMoveApplication: (id: string, newStatus: ApplicationStatus) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteApplication?: (id: string) => void;
  onSelectApplication?: (app: JobApplication) => void;
  onOpenAddModal: (defaultStatus?: ApplicationStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  applications,
  onMoveApplication,
  onToggleBookmark,
  onDeleteApplication,
  onSelectApplication,
  onOpenAddModal,
}) => {
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ApplicationStatus | null>(
    null
  );
  const [recentlyMovedId, setRecentlyMovedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedAppId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: ApplicationStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedAppId;
    setDragOverColumn(null);
    setDraggedAppId(null);

    if (id) {
      const existing = applications.find((a) => a.id === id);
      if (existing && existing.status !== targetStatus) {
        onMoveApplication(id, targetStatus);
        setRecentlyMovedId(id);
        setTimeout(() => setRecentlyMovedId(null), 1200);
      }
    }
  };

  const getAdjacentStatus = (
    current: ApplicationStatus,
    direction: 'prev' | 'next'
  ): ApplicationStatus | null => {
    const order: ApplicationStatus[] = [
      'Applied',
      'Assessment',
      'Interview',
      'Offer',
      'Rejected',
    ];
    const idx = order.indexOf(current);
    if (direction === 'prev' && idx > 0) return order[idx - 1];
    if (direction === 'next' && idx < order.length - 1) return order[idx + 1];
    return null;
  };

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 min-w-[300px] md:min-w-[920px] xl:min-w-full">
        {PIPELINE_COLUMNS.map((col) => {
          const colApps = applications.filter((a) => a.status === col.status);
          const isOver = dragOverColumn === col.status;

          return (
            <div
              key={col.status}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragLeave={() => setDragOverColumn(null)}
              onDrop={(e) => handleDrop(e, col.status)}
              className={`rounded-2xl p-3.5 transition-all duration-150 border flex flex-col min-h-[420px] ${
                isOver
                  ? 'bg-[#6366F1]/[0.12] border-[#6366F1] ring-2 ring-[#6366F1]/30'
                  : 'bg-[#0D0F17]/90 border-white/10'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1.5 pb-3 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${col.accentColor}`}>
                    {col.title}
                  </h3>
                  <span className="text-xs font-mono tabular-nums text-[#94A3B8]">
                    · {colApps.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenAddModal(col.status)}
                  className="p-1 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#131622] transition-colors cursor-pointer"
                  aria-label={`Add application to ${col.title}`}
                  title={`Add to ${col.title}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Column Cards List */}
              <div className="space-y-3 flex-1">
                <AnimatePresence mode="popLayout">
                  {colApps.map((app) => {
                    const prevStatus = getAdjacentStatus(app.status, 'prev');
                    const nextStatus = getAdjacentStatus(app.status, 'next');
                    const progressPct = STAGE_PROGRESS_MAP[app.status];
                    const isGlowing = recentlyMovedId === app.id;

                    return (
                      <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        draggable
                        onDragStart={(e) =>
                          handleDragStart(
                            e as unknown as React.DragEvent,
                            app.id
                          )
                        }
                        onClick={() => onSelectApplication?.(app)}
                        className={`group relative bg-[#131622] rounded-xl p-4 border transition-all duration-150 cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 ${
                          isGlowing
                            ? 'border-[#6366F1] ring-2 ring-[#6366F1]/40 shadow-lg'
                            : 'border-white/10 hover:border-[#6366F1]/60'
                        }`}
                      >
                        {/* Top Row: Logo + Title + Bookmark */}
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <CompanyLogo company={app.company} size="sm" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-[#94A3B8] truncate">
                                {app.company}
                              </p>
                              <h4 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors leading-snug line-clamp-2">
                                {app.jobTitle}
                              </h4>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(app.id);
                            }}
                            className={`p-1 rounded-md transition-transform active:scale-125 cursor-pointer shrink-0 ${
                              app.bookmarked
                                ? 'text-[#8B5CF6]'
                                : 'text-slate-500 hover:text-white'
                            }`}
                            aria-label={
                              app.bookmarked
                                ? 'Remove bookmark'
                                : 'Bookmark application'
                            }
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 ${
                                app.bookmarked ? 'fill-current' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {/* Salary & Location Unboxed Metadata */}
                        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#94A3B8]">
                          <span className="font-mono font-semibold text-white">
                            {app.salary}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{app.location}</span>
                        </div>

                        {/* Animated Stage Progress Indicator */}
                        <div className="mt-3.5">
                          <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1">
                            <span>Applied</span>
                            <span className={`font-medium ${col.accentColor}`}>
                              {app.status}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPct}%` }}
                              transition={{ duration: 0.35 }}
                              className={`h-full bg-gradient-to-r ${col.barColor} rounded-full`}
                            />
                          </div>
                        </div>

                        {/* Footer Metadata & Quick Stage Controls on Hover */}
                        <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] text-[#94A3B8]">
                          <span className="truncate">
                            {app.status} · {app.appliedRelative}
                          </span>
                          <span
                            className={`font-mono shrink-0 ${
                              app.deadlineDaysLeft <= 2 &&
                              app.status !== 'Rejected' &&
                              app.status !== 'Offer'
                                ? 'text-[#F59E0B] font-semibold'
                                : 'text-[#94A3B8]'
                            }`}
                          >
                            {app.deadline === 'Expired'
                              ? 'Closed'
                              : `Due: ${app.deadline}`}
                          </span>
                        </div>

                        {/* Quick Hover Action Bar (Move Prev / Move Next / Delete) */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2.5 pt-2 border-t border-white/10 hidden group-hover:flex items-center justify-between gap-1"
                        >
                          <div className="flex items-center gap-1">
                            {prevStatus && (
                              <button
                                type="button"
                                onClick={() => {
                                  onMoveApplication(app.id, prevStatus);
                                  setRecentlyMovedId(app.id);
                                  setTimeout(
                                    () => setRecentlyMovedId(null),
                                    1000
                                  );
                                }}
                                className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-medium text-[#94A3B8] hover:text-white bg-[#0D0F17] hover:bg-white/10 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                                title={`Move back to ${prevStatus}`}
                              >
                                <ChevronLeft className="w-3 h-3" />
                                <span>{prevStatus}</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {nextStatus && (
                              <button
                                type="button"
                                onClick={() => {
                                  onMoveApplication(app.id, nextStatus);
                                  setRecentlyMovedId(app.id);
                                  setTimeout(
                                    () => setRecentlyMovedId(null),
                                    1000
                                  );
                                }}
                                className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-semibold text-white bg-[#6366F1]/25 hover:bg-[#6366F1] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                                title={`Advance to ${nextStatus}`}
                              >
                                <span>{nextStatus}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                            {onDeleteApplication && (
                              <button
                                type="button"
                                onClick={() => onDeleteApplication(app.id)}
                                className="p-1 text-slate-400 hover:text-rose-400 rounded-md transition-colors cursor-pointer"
                                aria-label="Remove application"
                                title="Remove application"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {colApps.length === 0 && (
                  <div className="h-36 rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs text-[#64748B]">
                      Drop card here or add role
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenAddModal(col.status)}
                      className="mt-2 text-xs font-medium text-[#8B5CF6] hover:underline cursor-pointer"
                    >
                      + Add to {col.title}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
