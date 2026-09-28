import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  X,
  Bookmark,
  Sparkles,
  LayoutGrid,
  Kanban,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import {
  ApplicationStatus,
  JobApplication,
  ResumeDocument,
} from '../types';
import { KanbanBoard } from './KanbanBoard';
import { CompanyLogo } from './CompanyLogo';

interface ApplicationsViewProps {
  applications: JobApplication[];
  resumes: ResumeDocument[];
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  onMoveApplication: (id: string, newStatus: ApplicationStatus) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onSelectApplication: (app: JobApplication) => void;
  onOpenAddModal: (defaultStatus?: ApplicationStatus) => void;
}

const STAGES: ApplicationStatus[] = [
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected',
];

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  resumes,
  searchInputRef,
  onMoveApplication,
  onToggleBookmark,
  onDeleteApplication,
  onSelectApplication,
  onOpenAddModal,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'kanban'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [salaryFilter, setSalaryFilter] = useState<string>('All');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [previewEmptyState, setPreviewEmptyState] = useState(false);

  const filteredApplications = useMemo(() => {
    if (previewEmptyState) return [];

    return applications.filter((app) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || app.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || app.priority === priorityFilter;
      const matchesType =
        typeFilter === 'All' || app.employmentType === typeFilter;
      const matchesLocation =
        locationFilter === 'All' ||
        app.workMode === locationFilter ||
        app.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesSalary =
        salaryFilter === 'All' || app.salaryBand === salaryFilter;
      const matchesBookmark = !bookmarkedOnly || app.bookmarked;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesType &&
        matchesLocation &&
        matchesSalary &&
        matchesBookmark
      );
    });
  }, [
    applications,
    previewEmptyState,
    searchQuery,
    statusFilter,
    priorityFilter,
    typeFilter,
    locationFilter,
    salaryFilter,
    bookmarkedOnly,
  ]);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    if (searchQuery.trim()) {
      chips.push({
        key: 'search',
        label: `Query: "${searchQuery}"`,
        onRemove: () => setSearchQuery(''),
      });
    }
    if (statusFilter !== 'All') {
      chips.push({
        key: 'status',
        label: `Status: ${statusFilter}`,
        onRemove: () => setStatusFilter('All'),
      });
    }
    if (priorityFilter !== 'All') {
      chips.push({
        key: 'priority',
        label: `Priority: ${priorityFilter}`,
        onRemove: () => setPriorityFilter('All'),
      });
    }
    if (typeFilter !== 'All') {
      chips.push({
        key: 'type',
        label: `Job Type: ${typeFilter}`,
        onRemove: () => setTypeFilter('All'),
      });
    }
    if (locationFilter !== 'All') {
      chips.push({
        key: 'location',
        label: `Location: ${locationFilter}`,
        onRemove: () => setLocationFilter('All'),
      });
    }
    if (salaryFilter !== 'All') {
      chips.push({
        key: 'salary',
        label: `Salary: ${salaryFilter}`,
        onRemove: () => setSalaryFilter('All'),
      });
    }
    if (bookmarkedOnly) {
      chips.push({
        key: 'bookmarked',
        label: 'Bookmarked Only',
        onRemove: () => setBookmarkedOnly(false),
      });
    }
    return chips;
  }, [
    searchQuery,
    statusFilter,
    priorityFilter,
    typeFilter,
    locationFilter,
    salaryFilter,
    bookmarkedOnly,
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setTypeFilter('All');
    setLocationFilter('All');
    setSalaryFilter('All');
    setBookmarkedOnly(false);
    setPreviewEmptyState(false);
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Job Applications & Pipeline
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Showing{' '}
            <span className="font-mono font-semibold text-white tabular-nums">
              {filteredApplications.length}
            </span>{' '}
            of{' '}
            <span className="font-mono tabular-nums">{applications.length}</span>{' '}
            tracked opportunities
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented View Control */}
          <div className="flex items-center gap-1 p-1 bg-[#0D0F17] border border-white/10 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'cards'
                  ? 'bg-[#6366F1] text-white shadow-2xs'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Detailed Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'kanban'
                  ? 'bg-[#6366F1] text-white shadow-2xs'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPreviewEmptyState((prev) => !prev)}
            className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer whitespace-nowrap ${
              previewEmptyState
                ? 'bg-[#6366F1]/20 border-[#6366F1] text-white'
                : 'bg-[#0D0F17] border-white/10 text-[#94A3B8] hover:text-white'
            }`}
          >
            {previewEmptyState ? 'Exit Empty State' : 'Preview Empty State'}
          </button>

          <button
            type="button"
            onClick={() => onOpenAddModal('Applied')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE SEARCH & FILTER BAR */}
      <div className="bg-[#0D0F17] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search Input with Animated Focus Glow & ⌘K indicator */}
          <div className="relative flex-1 group">
            <Search className="w-4 h-4 text-[#94A3B8] group-focus-within:text-[#8B5CF6] transition-colors absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company, job title, location, or tech stack..."
              className="w-full pl-10 pr-16 py-2.5 text-sm bg-[#131622] focus:bg-[#191D2D] text-white placeholder-[#64748B] rounded-xl border border-white/10 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/20 outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 text-slate-400 hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-block font-mono text-[11px] text-[#94A3B8] bg-[#090A10] px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Filter Dropdown Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
              className="px-3 py-2.5 text-xs font-medium text-white bg-[#131622] hover:bg-[#191D2D] border border-white/10 rounded-xl outline-none focus:border-[#6366F1] cursor-pointer"
            >
              <option value="All">Status: All</option>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              aria-label="Filter by Salary Band"
              className="px-3 py-2.5 text-xs font-medium text-white bg-[#131622] hover:bg-[#191D2D] border border-white/10 rounded-xl outline-none focus:border-[#6366F1] cursor-pointer"
            >
              <option value="All">Salary: All Bands</option>
              <option value="Under ₹15L">Under ₹15L / Intern</option>
              <option value="₹15L–₹30L">₹15L–₹30L</option>
              <option value="₹30L–₹50L">₹30L–₹50L</option>
              <option value="₹50L+">₹50L+</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              aria-label="Filter by Location"
              className="px-3 py-2.5 text-xs font-medium text-white bg-[#131622] hover:bg-[#191D2D] border border-white/10 rounded-xl outline-none focus:border-[#6366F1] cursor-pointer"
            >
              <option value="All">Location: All</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by Priority"
              className="px-3 py-2.5 text-xs font-medium text-white bg-[#131622] hover:bg-[#191D2D] border border-white/10 rounded-xl outline-none focus:border-[#6366F1] cursor-pointer"
            >
              <option value="All">Priority: All</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by Job Type"
              className="px-3 py-2.5 text-xs font-medium text-white bg-[#131622] hover:bg-[#191D2D] border border-white/10 rounded-xl outline-none focus:border-[#6366F1] cursor-pointer"
            >
              <option value="All">Job Type: All</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            <button
              type="button"
              onClick={() => setBookmarkedOnly((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                bookmarkedOnly
                  ? 'bg-[#6366F1]/25 border-[#6366F1] text-white'
                  : 'bg-[#131622] border-white/10 text-[#94A3B8] hover:text-white'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${bookmarkedOnly ? 'fill-current' : ''}`}
              />
              <span>Saved</span>
            </button>
          </div>
        </div>

        {/* Animated Active Filter Chips */}
        <AnimatePresence>
          {activeFilterChips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10"
            >
              <span className="text-xs text-[#94A3B8] flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3" />
                Active filters:
              </span>
              {activeFilterChips.map((chip) => (
                <motion.button
                  key={chip.key}
                  type="button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={chip.onRemove}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-[#6366F1]/25 hover:bg-[#6366F1]/40 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{chip.label}</span>
                  <X className="w-3 h-3" />
                </motion.button>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#94A3B8] hover:text-white ml-2 cursor-pointer"
              >
                Reset all
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* EMPTY STATE */}
      {filteredApplications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="bg-[#0D0F17] border border-white/10 rounded-2xl p-12 sm:p-16 text-center max-w-xl mx-auto my-8"
        >
          <div className="animate-float-card w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1]/25 via-[#8B5CF6]/25 to-[#EC4899]/25 border border-[#6366F1]/30 flex items-center justify-center mx-auto text-[#8B5CF6]">
            <Sparkles className="w-8 h-8" />
          </div>

          <h3 className="mt-6 text-xl font-bold text-white">
            No applications yet
          </h3>
          <p className="mt-2 text-sm text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
            Start tracking your job search and build your career pipeline.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPreviewEmptyState(false);
                onOpenAddModal('Applied');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>+ Add your first application</span>
            </button>
            {(activeFilterChips.length > 0 || previewEmptyState) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-4 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-white bg-[#131622] rounded-xl border border-white/10 cursor-pointer whitespace-nowrap"
              >
                Restore Pipeline
              </button>
            )}
          </div>
        </motion.div>
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          applications={filteredApplications}
          onMoveApplication={onMoveApplication}
          onToggleBookmark={onToggleBookmark}
          onDeleteApplication={onDeleteApplication}
          onSelectApplication={onSelectApplication}
          onOpenAddModal={onOpenAddModal}
        />
      ) : (
        /* DETAILED JOB APPLICATION CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredApplications.map((app, index) => {
              const linkedResume = resumes.find((r) => r.id === app.resumeId);

              return (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22, delay: index * 0.03 }}
                  onClick={() => onSelectApplication(app)}
                  className="group bg-[#0D0F17] border border-white/10 hover:border-[#6366F1]/60 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header: Logo + Job Title + Company + Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <CompanyLogo company={app.company} size="lg" />
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors truncate">
                            {app.jobTitle}
                          </h3>
                          <p className="text-xs text-[#94A3B8] mt-0.5">
                            <span className="font-semibold text-white">
                              {app.company}
                            </span>{' '}
                            · {app.location}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(app.id);
                        }}
                        className={`p-1.5 rounded-lg transition-transform active:scale-125 cursor-pointer shrink-0 ${
                          app.bookmarked
                            ? 'text-[#8B5CF6] bg-[#6366F1]/20'
                            : 'text-slate-500 hover:text-white hover:bg-white/10'
                        }`}
                        aria-label="Toggle bookmark"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            app.bookmarked ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Salary, Type, Priority & Date Unboxed Line */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                      <span className="font-mono font-bold text-sm text-white">
                        {app.salary}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{app.employmentType}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          app.priority === 'High'
                            ? 'text-[#8B5CF6] font-semibold'
                            : 'text-[#94A3B8]'
                        }
                      >
                        {app.priority} Priority
                      </span>
                    </div>

                    {/* Animated Pipeline Node Progress Indicator */}
                    <div className="mt-5 p-3.5 rounded-xl bg-[#131622] border border-white/10">
                      <div className="flex items-center justify-between text-[11px] font-medium text-[#94A3B8] mb-2">
                        <span
                          className={
                            app.status === 'Applied'
                              ? 'text-[#8B5CF6] font-bold'
                              : ''
                          }
                        >
                          Applied
                        </span>
                        <span
                          className={
                            app.status === 'Assessment'
                              ? 'text-[#06B6D4] font-bold'
                              : ''
                          }
                        >
                          Assessment
                        </span>
                        <span
                          className={
                            app.status === 'Interview'
                              ? 'text-[#A855F7] font-bold'
                              : ''
                          }
                        >
                          Interview
                        </span>
                        <span
                          className={
                            app.status === 'Offer'
                              ? 'text-[#10B981] font-bold'
                              : app.status === 'Rejected'
                              ? 'text-rose-400 font-bold'
                              : ''
                          }
                        >
                          {app.status === 'Rejected' ? 'Closed' : 'Offer'}
                        </span>
                      </div>

                      <div className="relative flex items-center">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                app.status === 'Applied'
                                  ? '22%'
                                  : app.status === 'Assessment'
                                  ? '50%'
                                  : app.status === 'Interview'
                                  ? '78%'
                                  : '100%',
                            }}
                            transition={{ duration: 0.45 }}
                            className={`h-full rounded-full ${
                              app.status === 'Offer'
                                ? 'bg-gradient-to-r from-[#6366F1] to-[#10B981]'
                                : app.status === 'Rejected'
                                ? 'bg-slate-600'
                                : 'bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Quick Stage Switcher Row */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2"
                      >
                        <span className="text-[11px] text-[#94A3B8]">
                          Move stage:
                        </span>
                        <div className="flex items-center gap-1">
                          {(
                            [
                              'Applied',
                              'Assessment',
                              'Interview',
                              'Offer',
                            ] as ApplicationStatus[]
                          ).map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => onMoveApplication(app.id, st)}
                              className={`px-2 py-0.5 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                                app.status === st
                                  ? 'bg-[#6366F1] text-white'
                                  : 'bg-[#090A10] text-[#94A3B8] hover:text-white border border-white/10'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Notes snippet */}
                    <p className="mt-4 text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {app.notes}
                    </p>
                  </div>

                  {/* Card Footer: Applied date, Deadline & Resume used */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs text-[#94A3B8]">
                    <div className="truncate">
                      <span>Applied {app.appliedRelative}</span>
                      {linkedResume && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono text-[11px] text-[#8B5CF6]">
                            {linkedResume.atsScore}% ATS
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`font-mono font-medium ${
                          app.deadlineDaysLeft <= 2 &&
                          app.status !== 'Offer' &&
                          app.status !== 'Rejected'
                            ? 'text-[#F59E0B]'
                            : 'text-white'
                        }`}
                      >
                        Deadline: {app.deadline}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteApplication(app.id);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        aria-label="Delete application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
