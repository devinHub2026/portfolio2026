export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  client?: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
  imageType?: string; // Type of image to show in place (e.g. 'dashcam', 'vacuum', 'unilever', 'organic', 'camera')
  bgGradient: string;
  image?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  logoText: string;
  title: string;
  location: string;
  period: string;
  description: string[];
  highlights: string[];
}

export interface EducationData {
  school: string;
  degree: string;
  major: string;
  period: string;
  gpa: string;
  courses: string[];
  highlights: string[];
}

export interface HobbiesData {
  categories: {
    icon: string;
    title: string;
    items: string[];
  }[];
  text: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
