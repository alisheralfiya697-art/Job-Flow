import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JobApplication } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface AnalyticsViewProps {
  applications: JobApplication[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  applications,
}) => {
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | 'ytd'>('90d');

  // 1. Applications Over Time (Weekly velocity data)
  const WEEKLY_SERIES =
    timeframe === '30d'
      ? [
          { label: 'W1', count: 14 },
          { label: 'W2', count: 19 },
          { label: 'W3', count: 24 },
          { label: 'W4', count: 29 },
        ]
      : [
          { label: 'Aug W1', count: 12 },
          { label: 'Aug W3', count: 18 },
          { label: 'Sep W1', count: 22 },
          { label: 'Sep W2', count: 27 },
          { label: 'Sep W3', count: 21 },
          { label: 'Sep W4', count: 31 },
        ];

  // 2. Interview Conversion Funnel
  const FUNNEL_STAGES = [
    { stage: 'Applications Sent', count: 124, pct: 100, color: 'from-[#6366F1] to-[#8B5CF6]' },
    { stage: 'Online Assessment', count: 42, pct: 33.8, color: 'from-[#06B6D4] to-[#6366F1]' },
    { stage: 'Technical Interviews', count: 18, pct: 14.5, color: 'from-[#8B5CF6] to-[#EC4899]' },
    { stage: 'Final Round Loops', count: 9, pct: 7.2, color: 'from-[#A855F7] to-[#06B6D4]' },
    { stage: 'Offers Extended', count: 4, pct: 3.2, color: 'from-[#10B981] to-[#06B6D4]' },
  ];

  // 3. Applications by Company Tier / Organization
  const COMPANY_BARS = [
    { name: 'Google', apps: 4, heightPct: 80 },
    { name: 'Microsoft', apps: 5, heightPct: 100 },
    { name: 'Stripe', apps: 3, heightPct: 62 },
    { name: 'Atlassian', apps: 4, heightPct: 80 },
    { name: 'Linear', apps: 2, heightPct: 45 },
    { name: 'Razorpay', apps: 4, heightPct: 80 },
  ];

  // 4. Applications by Role Category
  const ROLE_BREAKDOWN = [
    { role: 'Software Engineer (Full-Stack)', count: 52, pct: 42, color: 'bg-[#6366F1]' },
    { role: 'Frontend / Design Engineer', count: 38, pct: 31, color: 'bg-[#8B5CF6]' },
    { role: 'Backend & Distributed Systems', count: 22, pct: 18, color: 'bg-[#06B6D4]' },
    { role: 'SWE Intern / New Grad', count: 12, pct: 9, color: 'bg-[#10B981]' },
  ];

  // 5. Salary Distribution Bands
  const SALARY_BANDS = [
    { band: 'Under ₹15L / Intern', count: 14, pct: 35, color: 'from-slate-500 to-[#6366F1]' },
    { band: '₹15L – ₹30L CTC', count: 38, pct: 78, color: 'from-[#6366F1] to-[#06B6D4]' },
    { band: '₹30L – ₹50L CTC', count: 49, pct: 100, color: 'from-[#8B5CF6] to-[#EC4899]' },
    { band: '₹50L+ CTC', count: 23, pct: 52, color: 'from-[#10B981] to-[#06B6D4]' },
  ];

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8">
      {/* Header & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Career Pipeline Analytics
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Real-time conversion funnels, response velocity, role distribution,
            and target compensation benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#0D0F17] border border-white/10 rounded-xl self-start sm:self-auto">
          {[
            { id: '30d', label: 'Last 30 Days' },
            { id: '90d', label: 'Last Quarter' },
            { id: 'ytd', label: 'Year to Date' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTimeframe(tab.id as '30d' | '90d' | 'ytd')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                timeframe === tab.id
                  ? 'bg-[#6366F1] text-white'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ROW 1: APPLICATIONS OVER TIME (Progressive Line Chart) & RESPONSE RATE GAUGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Applications Over Time (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
          className="lg:col-span-7 bg-[#0D0F17] border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">
                Applications Over Time
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Weekly submission velocity and interview callbacks across{' '}
                {applications.length} active pipeline tracks
              </p>
            </div>
            <div className="text-right">
              <AnimatedCounter
                value={timeframe === '30d' ? 86 : 124}
                className="text-2xl font-extrabold text-[#8B5CF6]"
              />
              <p className="text-[11px] font-mono text-[#10B981]">
                +22% vs prior period
              </p>
            </div>
          </div>

          {/* Progressive SVG Line & Area Chart */}
          <div className="relative h-56 w-full pt-4">
            <svg
              viewBox="0 0 500 170"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="areaIndigo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              {[30, 75, 120, 155].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="500"
                  y2={y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                />
              ))}

              {/* Area Fill */}
              <motion.path
                d="M 10 135 C 90 110, 130 95, 200 78 C 270 60, 330 85, 400 42 C 445 20, 475 18, 490 14 L 490 155 L 10 155 Z"
                fill="url(#areaIndigo)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              />

              {/* Self-Drawing Primary Line */}
              <motion.path
                d="M 10 135 C 90 110, 130 95, 200 78 C 270 60, 330 85, 400 42 C 445 20, 475 18, 490 14"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.25, ease: 'easeOut' }}
              />

              {/* Secondary Interview Callback Line */}
              <motion.path
                d="M 10 150 C 90 142, 140 135, 200 124 C 270 118, 330 122, 400 102 C 445 92, 475 88, 490 84"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.2"
                strokeDasharray="5 5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.25, delay: 0.2, ease: 'easeOut' }}
              />
            </svg>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-2 px-2">
              {WEEKLY_SERIES.map((w) => (
                <span key={w.label}>{w.label}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chart 2: Response Rate Radial Gauge (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32, delay: 0.08 }}
          className="lg:col-span-5 bg-[#0D0F17] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-base font-bold text-white">
              Response Rate & Callback Efficiency
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Percentage of applications reaching recruiter or technical screen
            </p>
          </div>

          <div className="my-6 flex items-center justify-center relative">
            <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="64"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="14"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="64"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 64}
                initial={{ strokeDashoffset: 2 * Math.PI * 64 }}
                whileInView={{
                  strokeDashoffset: 2 * Math.PI * 64 * (1 - 0.68),
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient
                  id="gaugeGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <AnimatedCounter
                value={14.5}
                decimals={1}
                suffix="%"
                className="text-2xl font-extrabold text-white"
              />
              <span className="text-[11px] text-[#10B981] font-mono font-semibold">
                Top 12% Tier
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs">
            <div>
              <p className="text-[#94A3B8]">Referral Callback</p>
              <p className="font-mono font-bold text-white mt-0.5">38.0%</p>
            </div>
            <div>
              <p className="text-[#94A3B8]">Direct Portal Callback</p>
              <p className="font-mono font-bold text-white mt-0.5">11.2%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ROW 2: INTERVIEW CONVERSION FUNNEL & APPLICATIONS BY COMPANY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 3: Interview Conversion Funnel (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
          className="lg:col-span-6 bg-[#0D0F17] border border-white/10 rounded-2xl p-6"
        >
          <div className="mb-6">
            <h2 className="text-base font-bold text-white">
              Interview Conversion Funnel
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Stage-by-stage progression across 124 total applications
            </p>
          </div>

          <div className="space-y-4">
            {FUNNEL_STAGES.map((item, idx) => (
              <div key={item.stage}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-white">
                    {item.stage}
                  </span>
                  <span className="font-mono tabular-nums text-[#94A3B8]">
                    <strong className="text-white">{item.count}</strong> (
                    {item.pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.pct / 100 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: idx * 0.08,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: 'left' }}
                    className={`h-full w-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chart 4: Applications by Company (Vertical Bars growing 0 -> height) (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32, delay: 0.08 }}
          className="lg:col-span-6 bg-[#0D0F17] border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-base font-bold text-white">
              Applications by Company
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Active roles & team tracks per target engineering organization
            </p>
          </div>

          <div className="h-52 pt-8 pb-2 flex items-end justify-between gap-3 sm:gap-5 px-2">
            {COMPANY_BARS.map((bar, idx) => (
              <div
                key={bar.name}
                className="flex-1 flex flex-col items-center h-full justify-end group"
              >
                <span className="text-[11px] font-mono font-bold text-[#8B5CF6] mb-1.5 opacity-85 group-hover:opacity-100">
                  {bar.apps}
                </span>
                <div className="w-full max-w-[44px] bg-white/10 rounded-t-xl h-36 flex items-end overflow-hidden">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: bar.heightPct / 100 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: idx * 0.07,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: 'bottom' }}
                    className="w-full h-full bg-gradient-to-t from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] rounded-t-xl"
                  />
                </div>
                <span className="mt-2.5 text-xs font-medium text-[#94A3B8] truncate max-w-full">
                  {bar.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ROW 3: APPLICATIONS BY ROLE & SALARY DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 5: Applications by Role (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
          className="lg:col-span-6 bg-[#0D0F17] border border-white/10 rounded-2xl p-6"
        >
          <div className="mb-6">
            <h2 className="text-base font-bold text-white">
              Applications by Role Specialization
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Breakdown across engineering tracks
            </p>
          </div>

          <div className="space-y-4">
            {ROLE_BREAKDOWN.map((r, idx) => (
              <div key={r.role}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-white">{r.role}</span>
                  <span className="font-mono tabular-nums text-[#94A3B8]">
                    {r.count} roles · {r.pct}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: r.pct / 100 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: idx * 0.08,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: 'left' }}
                    className={`h-full w-full ${r.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chart 6: Salary Distribution (6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32, delay: 0.08 }}
          className="lg:col-span-6 bg-[#0D0F17] border border-white/10 rounded-2xl p-6"
        >
          <div className="mb-6">
            <h2 className="text-base font-bold text-white">
              Salary Distribution
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Compensation range across tracked roles and offers
            </p>
          </div>

          <div className="space-y-4">
            {SALARY_BANDS.map((b, idx) => (
              <div key={b.band}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono font-semibold text-white">
                    {b.band}
                  </span>
                  <span className="font-mono tabular-nums text-[#94A3B8]">
                    {b.count} applications
                  </span>
                </div>
                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: b.pct / 100 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: idx * 0.08,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: 'left' }}
                    className={`h-full w-full bg-gradient-to-r ${b.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
