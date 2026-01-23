// types/roadmap.ts
export type Level = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Project {
  id?: string;
  git_repo: string;
  description: string;
  type: string[];
  domain: string[];
  issue: string[];
  language: string[];
}

export interface Roadmap {
  id?: string;
  title: string;
  description: string;
  project: Project;
  skills: string[];
  tutorial: string[];
  assessment: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  time: string;
}
export interface ResponseSchema {
  module: Roadmap[];
}

export interface Course {
  id?: string;
  course_name: string;
  course_domain: string;
  course_time: string;
  course_description: string;
  course_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  module?: Roadmap[];
  modules: Roadmap[];
}

export interface ExploreCourse extends Course {
  course_module_count: number;
  users: string[];
  completed: string[];
  created_by: string;
  views: number;
  created_at: string;
}

export interface UserProgress {
  [moduleId: string]: {
    completed: boolean;
    completedAt?: string;
  };
}

export interface UserProfile {
  user_id: string,
  name: string,
  username: string,
  about: string,
  email: string,
  country: string,
  region: string,
  street_address: string,
  city: string,
  postal_code: string,
  photo_url: string,
  cover_photo_url: string,
  current_job: string,
  expected_role: string,
  expected_ctc: string,
  transition_time: string,
  career_note: string,
  created_at?: string
}