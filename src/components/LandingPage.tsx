import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText,
  BarChart3,
  Kanban,
} from 'lucide-react';
import { NavPage } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { CompanyLogo } from './CompanyLogo';

interface LandingPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenAddModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAddModal,
}) => {
  return (
    <div className="pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm font-medium text-[#8B5CF6] tracking-normal mb-4"
            >
              Intelligent Career & Application Workspace · Built for Software Engineers
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.08] text-balance"
            >
              Turn Job Hunting Into Your Next{' '}
              <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                Opportunity.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto"
            >
              Track applications, organize interviews, manage resumes, and see
              your career progress — all in one intelligent workspace.
            </motion.p>

            {/* Tactile Hero Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-xl shadow-lg shadow-[#6366F1]/25 hover:shadow-xl hover:shadow-[#6366F1]/35 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>Start Tracking</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('applications')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#0D0F17] hover:bg-[#131622] border border-white/15 rounded-xl shadow-2xs hover:shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>Explore Demo</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.22 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#94A3B8]"
            >
              <span>Interactive Kanban Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>ATS Resume Scoring</span>
              <span aria-hidden="true">·</span>
              <span>Technical Interview Timeline</span>
              <span aria-hidden="true">·</span>
              <span>Real-Time Conversion Metrics</span>
            </motion.div>
          </div>

          {/* ANIMATED HERO DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="relative mt-14 max-w-[1140px] mx-auto"
          >
            {/* Moving ambient gradient glow behind dashboard preview */}
            <div
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-r from-[#6366F1]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Decorative Card 1: Top-Left Interview Bubble */}
            <div className="hidden lg:flex animate-float-card absolute -left-8 -top-6 z-20 bg-[#0D0F17]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl items-center gap-3.5 w-64">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">
                  ✓ Interview Confirmed
                </p>
                <p className="text-xs text-[#94A3B8] truncate">
                  Google · Tomorrow 10:00 AM
                </p>
              </div>
            </div>

            {/* Floating Decorative Card 2: Bottom-Right ATS Score Bubble */}
            <div className="hidden lg:flex animate-float-card-alt absolute -right-7 -bottom-6 z-20 bg-[#0D0F17]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl items-center gap-3.5 w-68">
              <div className="w-10 h-10 rounded-xl bg-[#6366F1]/20 text-[#8B5CF6] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                92%
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">
                    ATS Resume Match
                  </p>
                  <span className="text-[11px] font-mono text-[#10B981]">
                    +14%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 0.92 }}
                    transition={{ duration: 1.1, delay: 0.4 }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#10B981] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Main Interactive Preview Frame */}
            <div className="relative bg-[#0D0F17]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Preview Top Window Header */}
              <div className="px-6 py-4 bg-[#08090F] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="text-xs font-medium text-[#94A3B8]">
                    JobFlow Workspace Preview — Alfiya&apos;s Active Pipeline
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('dashboard')}
                    className="text-xs font-semibold text-[#8B5CF6] hover:text-[#06B6D4] transition-colors cursor-pointer"
                  >
                    Open Full Workspace →
                  </button>
                </div>
              </div>

              {/* Hero Preview Stats Strip (Applied 24, Interviews 8, Offers 3, Success Rate 12%) */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-xs font-medium text-[#94A3B8]">Applied</p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <AnimatedCounter
                        value={24}
                        className="text-2xl sm:text-3xl font-bold text-white"
                      />
                      <span className="text-xs font-mono text-[#10B981]">
                        +6 this week
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-xs font-medium text-[#94A3B8]">
                      Interviews
                    </p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <AnimatedCounter
                        value={8}
                        className="text-2xl sm:text-3xl font-bold text-[#8B5CF6]"
                      />
                      <span className="text-xs font-mono text-[#8B5CF6]">
                        3 upcoming
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-xs font-medium text-[#94A3B8]">Offers</p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <AnimatedCounter
                        value={3}
                        className="text-2xl sm:text-3xl font-bold text-[#10B981]"
                      />
                      <span className="text-xs font-mono text-[#10B981]">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-xs font-medium text-[#94A3B8]">
                      Success Rate
                    </p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <AnimatedCounter
                        value={12}
                        suffix="%"
                        className="text-2xl sm:text-3xl font-bold text-[#06B6D4]"
                      />
                      <span className="text-xs font-mono text-[#10B981]">
                        +4.2%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Preview Job Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Google */}
                  <div
                    onClick={() => onNavigate('applications')}
                    className="group p-5 rounded-xl bg-[#131622] border border-white/10 hover:border-[#6366F1]/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CompanyLogo company="Google" size="md" />
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                            Software Engineer Intern
                          </h3>
                          <p className="text-xs text-[#94A3B8]">
                            Google · Remote, India
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-white">
                        ₹30K/mo
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5">
                        <span>Applied</span>
                        <span className="font-medium text-[#06B6D4]">
                          Technical Round
                        </span>
                        <span>Offer</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Applied · 2 days ago</span>
                      <span className="font-mono text-[#F59E0B] font-medium">
                        Deadline: 4 days
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Microsoft */}
                  <div
                    onClick={() => onNavigate('interviews')}
                    className="group p-5 rounded-xl bg-[#131622] border border-white/10 hover:border-[#8B5CF6]/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CompanyLogo company="Microsoft" size="md" />
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                            Software Engineer II
                          </h3>
                          <p className="text-xs text-[#94A3B8]">
                            Microsoft · Hyderabad
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-white">
                        ₹34L/yr
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5">
                        <span>Applied</span>
                        <span className="font-medium text-[#8B5CF6]">
                          HR Interview
                        </span>
                        <span>Offer</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-full" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Tomorrow · 2:30 PM</span>
                      <span className="font-mono text-[#8B5CF6] font-medium">
                        Prep 80% ready
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Stripe */}
                  <div
                    onClick={() => onNavigate('applications')}
                    className="group p-5 rounded-xl bg-[#131622] border border-white/10 hover:border-[#10B981]/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CompanyLogo company="Stripe" size="md" />
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#10B981] transition-colors">
                            Full Stack Engineer
                          </h3>
                          <p className="text-xs text-[#94A3B8]">
                            Stripe · Bengaluru
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#10B981]">
                        ₹46L/yr
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] text-[#94A3B8] mb-1.5">
                        <span>Applied</span>
                        <span>Interview</span>
                        <span className="font-semibold text-[#10B981]">
                          Offer Received ✓
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-[#6366F1] to-[#10B981] rounded-full" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Offer Stage</span>
                      <span className="font-mono text-[#10B981] font-medium">
                        Decision in 5d
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ASYMMETRIC BENTO CAPABILITIES SECTION (Scroll-Animated) */}
      <section className="py-16 sm:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl mb-12"
        >
          <p className="text-xs font-semibold text-[#8B5CF6] mb-2">
            Engineered for High-Velocity Career Pipelines
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Every Stage of Your Job Search, Structured for Clarity.
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] leading-relaxed">
            Replace scattered spreadsheets with an interactive system that tracks
            deadlines, scores resume alignment, and surfaces conversion bottlenecks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bento Card 1 (Col Span 2): Kanban Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            onClick={() => onNavigate('applications')}
            className="lg:col-span-2 group bg-[#0D0F17] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#6366F1]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                  01. Drag-and-Drop Application Pipeline
                </h3>
                <Kanban className="w-5 h-5 text-[#6366F1]" />
              </div>
              <p className="text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                Move roles seamlessly across Applied, Assessment, Interview,
                Offer, and Rejected stages. Automatic status calculations keep
                your response rate and deadline alerts synchronized in real time.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {[
                { stage: 'Applied', count: '14 Roles', color: 'text-[#8B5CF6]' },
                { stage: 'Assessment', count: '5 Active', color: 'text-[#06B6D4]' },
                { stage: 'Interview', count: '4 Scheduled', color: 'text-[#A855F7]' },
                { stage: 'Offers', count: '2 Pending', color: 'text-[#10B981]' },
              ].map((col) => (
                <div key={col.stage} className="p-3 rounded-xl bg-[#131622] border border-white/[0.06]">
                  <p className="text-xs text-[#94A3B8]">{col.stage}</p>
                  <p className={`text-sm font-mono font-semibold mt-1 ${col.color}`}>
                    {col.count}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 2 (Col Span 1): ATS Resume Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            onClick={() => onNavigate('resume')}
            className="group bg-[#0D0F17] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#8B5CF6]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                  02. ATS Resume Intelligence
                </h3>
                <FileText className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Maintain role-specific resume versions, inspect keyword coverage,
                and see which resume generates the highest interview callback rate.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-white">
                  Software Engineer v4.pdf
                </span>
                <span className="font-mono font-bold text-[#10B981]">
                  92% ATS
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-[#6366F1] to-[#10B981] rounded-full" />
              </div>
              <p className="mt-2.5 text-xs text-[#94A3B8] font-mono">
                Used across 24 applications · 18% callback
              </p>
            </div>
          </motion.div>

          {/* Bento Card 3 (Col Span 1): Interview Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            onClick={() => onNavigate('interviews')}
            className="group bg-[#0D0F17] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#06B6D4]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">
                  03. Chronological Interview Timeline
                </h3>
                <Calendar className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Stay prepared with structured technical round timelines, live
                meeting links, and interactive preparation checklists.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Today · 10:00 AM
                </span>
                <span className="text-[#06B6D4] font-medium">
                  Google Technical
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  Tomorrow · 2:30 PM
                </span>
                <span className="text-[#8B5CF6] font-medium">
                  Microsoft HR
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 4 (Col Span 2): Conversion & Salary Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            onClick={() => onNavigate('analytics')}
            className="lg:col-span-2 group bg-[#0D0F17] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#10B981]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-[#10B981] transition-colors">
                  04. Deep Conversion & Compensation Analytics
                </h3>
                <BarChart3 className="w-5 h-5 text-[#10B981]" />
              </div>
              <p className="text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                Visualize your application velocity, stage-to-stage interview
                conversion funnel, and target compensation bands across top
                engineering organizations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-[#94A3B8]">Response Rate</p>
                <p className="text-xl font-mono font-bold text-white mt-1">
                  14.5%{' '}
                  <span className="text-xs font-normal text-[#10B981]">
                    (+3.2%)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8]">Interview Conversion</p>
                <p className="text-xl font-mono font-bold text-[#8B5CF6] mt-1">
                  28.4%
                </p>
              </div>
              <div>
                <p className="text-xs text-[#94A3B8]">Median Target CTC</p>
                <p className="text-xl font-mono font-bold text-[#10B981] mt-1">
                  ₹38.0L
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROOF & CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35 }}
          className="bg-[#0D0F17] border border-white/10 rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              Ready to organize your engineering career pipeline?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Jump straight into Alfiya&apos;s live workspace or log a new role
              to test the interactive Kanban board, ATS resume analyzer, and
              interview timeline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#131622] hover:bg-[#1B1F30] border border-white/10 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>+ Add New Application</span>
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
