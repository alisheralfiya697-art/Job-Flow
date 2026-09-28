export type ApplicationStatus =
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export type PriorityLevel = 'High' | 'Medium' | 'Low';

export type EmploymentType = 'Full-time' | 'Internship' | 'Contract' | 'Part-time';

export type NavPage =
  | 'landing'
  | 'dashboard'
  | 'applications'
  | 'interviews'
  | 'resume'
  | 'analytics';

export interface JobApplication {
  id: string;
  company: string;
  jobTitle: string;
  jobUrl: string;
  salary: string;
  salaryBand: 'Under ₹15L' | '₹15L–₹30L' | '₹30L–₹50L' | '₹50L+';
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: EmploymentType;
  applicationDate: string;
  appliedRelative: string;
  deadline: string;
  deadlineDaysLeft: number;
  status: ApplicationStatus;
  priority: PriorityLevel;
  notes: string;
  resumeId: string;
  bookmarked: boolean;
}

export interface ResumeDocument {
  id: string;
  title: string;
  targetRole: string;
  fileName: string;
  updatedRelative: string;
  atsScore: number;
  usedCount: number;
  fileSize: string;
  keywordsMatched: string[];
  keywordsMissing: string[];
  isDefault: boolean;
}

export interface InterviewPrepItem {
  id: string;
  text: string;
  done: boolean;
}

export interface InterviewEvent {
  id: string;
  company: string;
  role: string;
  type: 'Technical Interview' | 'HR Interview' | 'Final Interview' | 'System Design';
  dayGroup: 'Today' | 'Tomorrow' | 'Friday' | 'Next Week';
  dateLabel: string;
  timeLabel: string;
  duration: string;
  interviewer: string;
  meetingLink: string;
  notes: string;
  completed: boolean;
  prepChecklist: InterviewPrepItem[];
}

export interface NotificationItem {
  id: string;
  category: 'interview' | 'resume' | 'deadline' | 'offer';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetPage: NavPage;
}

export interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type: 'success' | 'offer' | 'info';
}
