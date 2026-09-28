import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  Star,
} from 'lucide-react';
import { ResumeDocument } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface ResumeViewProps {
  resumes: ResumeDocument[];
  onAddResume: (newResume: ResumeDocument) => void;
  onSetDefaultResume: (id: string) => void;
  onDeleteResume: (id: string) => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  resumes,
  onAddResume,
  onSetDefaultResume,
  onDeleteResume,
}) => {
  const [uploadState, setUploadState] = useState<
    'idle' | 'uploading' | 'analyzing' | 'complete'
  >('idle');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadingFileName, setUploadingFileName] = useState<string>(
    'Alfiya_SWE_Tailored_2026.pdf'
  );
  const [selectedResume, setSelectedResume] = useState<ResumeDocument | null>(
    resumes[0] || null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startUploadSimulation = (customFileName?: string) => {
    if (uploadState !== 'idle') return;

    const targetName =
      customFileName || `Alfiya_SWE_v${resumes.length + 1}_2026.pdf`;
    setUploadingFileName(targetName);
    setUploadState('uploading');
    setUploadProgress(12);

    setTimeout(() => setUploadProgress(48), 320);
    setTimeout(() => {
      setUploadProgress(76);
      setUploadState('analyzing');
    }, 680);
    setTimeout(() => {
      setUploadProgress(100);
    }, 1250);
    setTimeout(() => {
      setUploadState('complete');
      const generatedScore = Math.min(98, 91 + (resumes.length % 6));
      const newDoc: ResumeDocument = {
        id: `res-${Date.now()}`,
        title: `Resume — ${targetName
          .replace('.pdf', '')
          .replace(/_/g, ' ')}`,
        targetRole: 'Software Engineer / Full-Stack Systems',
        fileName: targetName,
        updatedRelative: 'Updated just now',
        atsScore: generatedScore,
        usedCount: 1,
        fileSize: '176 KB',
        keywordsMatched: [
          'TypeScript',
          'React',
          'System Design',
          'Distributed Systems',
          'Node.js',
          'SQL',
          'REST & GraphQL',
        ],
        keywordsMissing: ['Kubernetes'],
        isDefault: false,
      };
      onAddResume(newDoc);
      setSelectedResume(newDoc);
    }, 1550);

    setTimeout(() => {
      setUploadState('idle');
      setUploadProgress(0);
    }, 3400);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      startUploadSimulation(file.name);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resume Management & ATS Intelligence
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Manage role-specific resumes, inspect ATS keyword alignment, and
            track application conversion per version.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => startUploadSimulation()}
            disabled={uploadState !== 'idle'}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 transition-all cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>Upload & Analyze Resume</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE UPLOAD & ANIMATED ATS PROGRESS ZONE */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFile = e.dataTransfer.files?.[0];
          startUploadSimulation(droppedFile?.name);
        }}
        className="bg-[#0D0F17] border-2 border-dashed border-white/15 hover:border-[#6366F1]/60 rounded-2xl p-6 sm:p-8 text-center transition-all"
      >
        <AnimatePresence mode="wait">
          {uploadState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/20 text-[#8B5CF6] flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="mt-3 text-base font-bold text-white">
                Drop your PDF resume here, or click to simulate instant ATS scan
              </h3>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Automatically parses technical keywords, formatting structure,
                and role alignment score.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => startUploadSimulation('Alfiya_SWE_Google_2026.pdf')}
                  className="px-4 py-2 text-xs font-semibold text-[#8B5CF6] bg-[#6366F1]/15 hover:bg-[#6366F1]/25 rounded-xl transition-colors cursor-pointer"
                >
                  Simulate Resume Upload (76% → 100%)
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-xs font-medium text-[#94A3B8] hover:text-white bg-[#131622] border border-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  Browse Local PDF
                </button>
              </div>
            </motion.div>
          )}

          {(uploadState === 'uploading' || uploadState === 'analyzing') && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-md mx-auto py-2"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                <span>
                  {uploadState === 'uploading'
                    ? 'Uploading resume...'
                    : 'Analyzing ATS compatibility & keywords...'}
                </span>
                <span className="font-mono tabular-nums text-[#8B5CF6]">
                  {uploadProgress}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.28 }}
                  className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] rounded-full"
                />
              </div>
              <p className="mt-2.5 text-xs font-mono text-[#94A3B8]">
                {uploadingFileName} ·{' '}
                {uploadState === 'analyzing'
                  ? 'Analyzing...'
                  : 'Transferring...'}
              </p>
            </motion.div>
          )}

          {uploadState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto py-2 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="mt-3 text-base font-bold text-[#10B981]">
                Resume uploaded successfully ✓
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                ATS analysis complete for {uploadingFileName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UPLOADED RESUME CARDS & KEYWORD INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Resume Cards Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {resumes.map((res, index) => {
            const isSelected = selectedResume?.id === res.id;
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
                onClick={() => setSelectedResume(res)}
                className={`group bg-[#0D0F17] border rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50 cursor-pointer ${
                  isSelected
                    ? 'border-[#6366F1] ring-2 ring-[#6366F1]/25'
                    : 'border-white/10 hover:border-[#6366F1]/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/30 text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-[#8B5CF6] transition-colors">
                          {res.title}
                        </h3>
                        {res.isDefault && (
                          <span className="text-xs font-semibold text-[#8B5CF6]">
                            · Primary Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        {res.updatedRelative} · {res.fileName} ({res.fileSize})
                      </p>
                    </div>
                  </div>

                  {/* Animated ATS Score */}
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs text-[#94A3B8]">ATS Score</p>
                    <AnimatedCounter
                      value={res.atsScore}
                      suffix="%"
                      className={`text-2xl font-extrabold ${
                        res.atsScore >= 90
                          ? 'text-[#10B981]'
                          : 'text-[#8B5CF6]'
                      }`}
                    />
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="mt-5">
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${res.atsScore}%` }}
                      transition={{ duration: 0.9, delay: 0.1 + index * 0.08 }}
                      className={`h-full rounded-full ${
                        res.atsScore >= 90
                          ? 'bg-gradient-to-r from-[#6366F1] via-[#06B6D4] to-[#10B981]'
                          : 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                      }`}
                    />
                  </div>
                </div>

                {/* Footer: Used for X applications + Quick Actions */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-[#94A3B8]">
                    Used for:{' '}
                    <strong className="font-mono font-semibold text-white tabular-nums">
                      {res.usedCount} applications
                    </strong>
                  </span>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2"
                  >
                    {!res.isDefault && (
                      <button
                        type="button"
                        onClick={() => onSetDefaultResume(res.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#8B5CF6] hover:bg-[#6366F1]/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>Set Default</span>
                      </button>
                    )}
                    {resumes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteResume(res.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                        aria-label="Delete resume"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ATS Keyword & Structure Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D0F17] border border-white/10 rounded-2xl p-6 sticky top-24">
          {selectedResume ? (
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div>
                  <p className="text-xs font-semibold text-[#8B5CF6]">
                    ATS Diagnostic Breakdown
                  </p>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {selectedResume.title}
                  </h3>
                </div>
                <div className="text-right font-mono font-bold text-xl text-[#10B981] tabular-nums">
                  {selectedResume.atsScore}%
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-white mb-2">
                    Target Engineering Profile
                  </p>
                  <p className="text-xs text-[#94A3B8] bg-[#131622] p-3 rounded-xl border border-white/10">
                    {selectedResume.targetRole}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white mb-2">
                    Verified High-Impact Keywords (
                    {selectedResume.keywordsMatched.length})
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#10B981] font-medium">
                    {selectedResume.keywordsMatched.map((kw, i) => (
                      <React.Fragment key={kw}>
                        <span>✓ {kw}</span>
                        {i < selectedResume.keywordsMatched.length - 1 && (
                          <span aria-hidden="true" className="text-white/25">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {selectedResume.keywordsMissing.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-white mb-2">
                      Suggested Additions for +4% ATS Lift
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#F59E0B] font-medium">
                      {selectedResume.keywordsMissing.map((kw, i) => (
                        <React.Fragment key={kw}>
                          <span>+ {kw}</span>
                          {i < selectedResume.keywordsMissing.length - 1 && (
                            <span aria-hidden="true" className="text-white/25">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-[#94A3B8]">Formatting Parse</p>
                    <p className="font-mono font-bold text-[#10B981] mt-0.5">
                      100% Clean
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#131622] border border-white/10">
                    <p className="text-[#94A3B8]">Quantified Bullets</p>
                    <p className="font-mono font-bold text-[#8B5CF6] mt-0.5">
                      14 Metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
