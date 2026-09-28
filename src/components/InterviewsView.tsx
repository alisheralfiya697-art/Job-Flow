import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Video,
  CheckCircle2,
  Plus,
  User,
  X,
} from 'lucide-react';
import { InterviewEvent } from '../types';
import { CompanyLogo } from './CompanyLogo';

interface InterviewsViewProps {
  interviews: InterviewEvent[];
  onToggleInterviewCompleted: (id: string) => void;
  onTogglePrepItem: (interviewId: string, prepId: string) => void;
  onAddInterview: (newInterview: Omit<InterviewEvent, 'id'>) => void;
}

export const InterviewsView: React.FC<InterviewsViewProps> = ({
  interviews,
  onToggleInterviewCompleted,
  onTogglePrepItem,
  onAddInterview,
}) => {
  const [filterDay, setFilterDay] = useState<string>('All');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  // Schedule Interview Modal Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState<InterviewEvent['type']>(
    'Technical Interview'
  );
  const [dayGroup, setDayGroup] = useState<InterviewEvent['dayGroup']>('Today');
  const [timeLabel, setTimeLabel] = useState('11:30 AM');
  const [duration, setDuration] = useState('45 mins');
  const [interviewer, setInterviewer] = useState('');
  const [notes, setNotes] = useState('');

  const filteredInterviews =
    filterDay === 'All'
      ? interviews
      : interviews.filter((i) => i.dayGroup === filterDay);

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    onAddInterview({
      company: company.trim(),
      role: role.trim(),
      type,
      dayGroup,
      dateLabel:
        dayGroup === 'Today'
          ? 'Today, Sep 28'
          : dayGroup === 'Tomorrow'
          ? 'Tomorrow, Sep 29'
          : dayGroup === 'Friday'
          ? 'Friday, Oct 2'
          : 'Next Week',
      timeLabel,
      duration,
      interviewer: interviewer.trim() || 'Engineering Hiring Team',
      meetingLink: 'https://meet.google.com/new-round',
      notes:
        notes.trim() ||
        'Review system architecture, core data structures, and role expectations.',
      completed: false,
      prepChecklist: [
        {
          id: `p-${Date.now()}-1`,
          text: 'Review role job description & tech stack',
          done: false,
        },
        {
          id: `p-${Date.now()}-2`,
          text: 'Prepare 2 questions for the interviewer',
          done: false,
        },
      ],
    });

    setCompany('');
    setRole('');
    setInterviewer('');
    setNotes('');
    setScheduleModalOpen(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interview Timeline & Preparation
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Track upcoming technical rounds, meeting links, and interactive
            preparation checklists.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented Day Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#0D0F17] border border-white/10 rounded-xl">
            {['All', 'Today', 'Tomorrow', 'Friday'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setFilterDay(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterDay === d
                    ? 'bg-[#6366F1] text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setScheduleModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* VERTICAL INTERVIEW TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#6366F1] before:via-[#8B5CF6] before:to-[#06B6D4]">
          {filteredInterviews.map((item, idx) => {
            const doneCount = item.prepChecklist.filter((p) => p.done).length;
            const totalPrep = item.prepChecklist.length;
            const prepPct =
              totalPrep > 0 ? Math.round((doneCount / totalPrep) * 100) : 100;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="relative"
              >
                {/* Timeline Glowing Node Marker */}
                <div
                  className={`absolute -left-[27px] sm:-left-[31px] top-6 w-4 h-4 rounded-full ring-4 ring-[#05060A] flex items-center justify-center transition-colors ${
                    item.completed
                      ? 'bg-[#10B981]'
                      : item.dayGroup === 'Today'
                      ? 'bg-[#6366F1]'
                      : item.dayGroup === 'Tomorrow'
                      ? 'bg-[#8B5CF6]'
                      : 'bg-[#06B6D4]'
                  }`}
                />

                {/* Day Group Header Label */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-xs font-extrabold text-[#8B5CF6]">
                    {item.dayGroup}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span className="text-xs font-mono font-semibold text-white tabular-nums">
                    {item.timeLabel}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <span className="text-xs text-[#94A3B8]">{item.dateLabel}</span>
                </div>

                {/* Timeline Card */}
                <div
                  className={`bg-[#0D0F17] border rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-black/50 ${
                    item.completed
                      ? 'border-[#10B981]/50 bg-[#0D0F17]/90'
                      : 'border-white/10 hover:border-[#6366F1]/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <CompanyLogo company={item.company} size="lg" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-white">
                            {item.type}
                          </h3>
                          {item.completed && (
                            <span className="text-xs font-semibold text-[#10B981]">
                              · Completed ✓
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#8B5CF6] mt-0.5">
                          {item.company}{' '}
                          <span className="text-[#94A3B8] font-normal">
                            · {item.role}
                          </span>
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                            <span className="font-mono">{item.duration}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                            <span>{item.interviewer}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#8B5CF6] bg-[#6366F1]/15 hover:bg-[#6366F1]/25 rounded-xl transition-colors whitespace-nowrap"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Meeting Room</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onToggleInterviewCompleted(item.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                          item.completed
                            ? 'bg-[#10B981] text-white'
                            : 'bg-[#131622] hover:bg-[#191D2D] text-white border border-white/10'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {item.completed ? 'Completed' : 'Mark Complete'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Notes */}
                  <p className="mt-4 text-xs sm:text-sm text-[#94A3B8] leading-relaxed bg-[#131622] p-3.5 rounded-xl border border-white/10">
                    {item.notes}
                  </p>

                  {/* Interactive Preparation Checklist */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-semibold text-white">
                        Interview Readiness Checklist
                      </span>
                      <span className="font-mono tabular-nums text-[#8B5CF6] font-semibold">
                        {doneCount}/{totalPrep} ready ({prepPct}%)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {item.prepChecklist.map((prep) => (
                        <button
                          key={prep.id}
                          type="button"
                          onClick={() => onTogglePrepItem(item.id, prep.id)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#131622] text-left transition-colors cursor-pointer group"
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                              prep.done
                                ? 'bg-[#6366F1] border-[#6366F1] text-white'
                                : 'bg-[#05060A] border-white/25 group-hover:border-[#6366F1]'
                            }`}
                          >
                            {prep.done && (
                              <motion.svg
                                viewBox="0 0 14 14"
                                className="w-3 h-3 fill-none stroke-current stroke-2"
                              >
                                <motion.path
                                  d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.18 }}
                                />
                              </motion.svg>
                            )}
                          </div>
                          <span
                            className={`text-xs transition-colors ${
                              prep.done
                                ? 'line-through text-[#64748B]'
                                : 'text-white'
                            }`}
                          >
                            {prep.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-5 sticky top-24">
          <div className="bg-[#0D0F17] border border-white/10 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white">
              Weekly Interview Velocity
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              Summary of scheduled engineering loops
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-xs text-[#94A3B8]">Scheduled</p>
                <p className="text-2xl font-mono font-bold text-[#8B5CF6] mt-1 tabular-nums">
                  {interviews.filter((i) => !i.completed).length}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#131622] border border-white/10">
                <p className="text-xs text-[#94A3B8]">Completed</p>
                <p className="text-2xl font-mono font-bold text-[#10B981] mt-1 tabular-nums">
                  {interviews.filter((i) => i.completed).length + 14}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
              <p className="text-xs font-semibold text-white">
                Quick Timeline Snapshot
              </p>
              <div className="text-xs space-y-2 text-[#94A3B8]">
                <div className="flex items-center justify-between">
                  <span>Today · 10:00 AM</span>
                  <span className="font-medium text-white">
                    Google (Technical)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tomorrow · 2:30 PM</span>
                  <span className="font-medium text-white">
                    Microsoft (HR)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Friday · 11:00 AM</span>
                  <span className="font-medium text-white">
                    Linear (Final)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE INTERVIEW MODAL */}
      <AnimatePresence>
        {scheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setScheduleModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg bg-[#0D0F17] border border-white/10 rounded-2xl shadow-2xl p-6 z-10 text-white"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Schedule Interview Round
                  </h2>
                  <p className="text-xs text-[#94A3B8]">
                    Add an upcoming technical, system design, or HR interview
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateInterview} className="space-y-4">
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
                      placeholder="e.g. Google, Stripe"
                      className="w-full px-3.5 py-2 text-sm text-white bg-[#131622] border border-white/10 rounded-xl focus:border-[#6366F1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Target Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Software Engineer"
                      className="w-full px-3.5 py-2 text-sm text-white bg-[#131622] border border-white/10 rounded-xl focus:border-[#6366F1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Round Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) =>
                        setType(e.target.value as InterviewEvent['type'])
                      }
                      className="w-full px-3 py-2 text-xs font-medium text-white bg-[#131622] border border-white/10 rounded-xl outline-none"
                    >
                      <option value="Technical Interview">
                        Technical Interview
                      </option>
                      <option value="System Design">System Design</option>
                      <option value="HR Interview">HR Interview</option>
                      <option value="Final Interview">Final Interview</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Day
                    </label>
                    <select
                      value={dayGroup}
                      onChange={(e) =>
                        setDayGroup(
                          e.target.value as InterviewEvent['dayGroup']
                        )
                      }
                      className="w-full px-3 py-2 text-xs font-medium text-white bg-[#131622] border border-white/10 rounded-xl outline-none"
                    >
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Friday">Friday</option>
                      <option value="Next Week">Next Week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Time
                    </label>
                    <input
                      type="text"
                      value={timeLabel}
                      onChange={(e) => setTimeLabel(e.target.value)}
                      placeholder="10:00 AM"
                      className="w-full px-3 py-2 text-xs font-mono text-white bg-[#131622] border border-white/10 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Interviewer / Panel
                  </label>
                  <input
                    type="text"
                    value={interviewer}
                    onChange={(e) => setInterviewer(e.target.value)}
                    placeholder="e.g. Staff SWE Panel"
                    className="w-full px-3.5 py-2 text-sm text-white bg-[#131622] border border-white/10 rounded-xl focus:border-[#6366F1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Preparation Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Key topics, algorithms, or system design focus areas..."
                    className="w-full px-3.5 py-2 text-sm text-white bg-[#131622] border border-white/10 rounded-xl focus:border-[#6366F1] outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setScheduleModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#131622] rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-xs hover:shadow-md cursor-pointer"
                  >
                    Add to Timeline
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
