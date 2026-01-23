import axios, { AxiosError } from "axios";

// ============================================
// AXIOS INSTANCE
// ============================================
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// ============================================
// TOKEN MANAGEMENT
// ============================================
async function getValidAccessToken(): Promise<string> {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh");
  const expiresAt = localStorage.getItem("expires");

  // Check if token exists
  if (!token || !refreshToken || !expiresAt) {
    throw new Error("No auth tokens found");
  }

  // Check if token is still valid (with 5 min buffer)
  const expiresAtMs = Number(expiresAt) * 1000;
  const bufferMs = 5 * 60 * 1000; // 5 minutes
  
  if (Date.now() < expiresAtMs - bufferMs) {
    return token; // Token still valid
  }

  // Token expired or about to expire → refresh
  try {
    const res = await api.post("/refresh", { refresh_token: refreshToken });
    const data = res.data;

    // Save new tokens
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh", data.refresh_token ?? refreshToken);
    localStorage.setItem("expires", String(data.expires_in));

    return data.access_token;
  } catch (error) {
    // Refresh failed → force logout
    localStorage.clear();
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }
}

// ============================================
// REQUEST INTERCEPTOR (Auto-attach token)
// ============================================
api.interceptors.request.use(
  async (config) => {
    // Skip token for public endpoints
    const publicEndpoints = ["/signup", "/login", "/", "/refresh"];
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublic && typeof window !== "undefined") {
      try {
        const token = await getValidAccessToken();
        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Token error:", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================
// RESPONSE INTERCEPTOR (Handle errors)
// ============================================
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If 401 and not already retried, try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await getValidAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// TYPE DEFINITIONS
// ============================================
interface AuthResponse {
  user: any;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}

interface Project {
  id?: string;
  git_repo: string;
  description: string;
  type: string[];
  domain: string[];
  issue: string[];
  language: string[];
}

interface Roadmap {
  id?: string;
  title: string;
  description: string;
  project: Project;
  skills: string[];
  tutorial: string[];
  Assessment: string[];
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  time: string;
}

interface Course {
  id?: string;
  course_name: string;
  course_domain: string;
  course_time: string;
  course_description: string;
  course_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  module?: Roadmap[];
  modules: Roadmap[];
}

interface ExploreCourse extends Course {
  course_module_count: number;
  users: string[];
  completed: string[];
  created_by: string;
  views: number;
  created_at: string;
}

interface UserProgress {
  [moduleId: string]: {
    completed: boolean;
    completedAt?: string;
  };
}

interface AiResponse{
  data : string
}

// ============================================
// API ENDPOINTS
// ============================================
const Endpoints = {
  // Auth
  signup: "/signup",
  login: "/login",
  refresh: "/refresh",
  user: "/user",
  logout: "/logout",
  
  // Profile
  profile: "/profile",
  
  // Status
  status: "/",
  users: "/users",
  
  // Courses
  courses: "/courses",
  myCourses: "/my-courses",
  enrolledCourses: "/enrolled-courses",
  module: "/module",
  project: "/project",
  projects: "/projects"
};

// ============================================
// AUTH API
// ============================================
export const authApi = {
  /**
   * Sign up a new user
   */
  signup: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post(Endpoints.signup, { email, password });
    
    // Save tokens
    if (response.data.session) {
      localStorage.setItem("token", response.data.session.access_token);
      localStorage.setItem("refresh", response.data.session.refresh_token);
      localStorage.setItem("expires", String(response.data.session.expires_in));
    }
    
    return response.data;
  },

  /**
   * Login existing user
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post(Endpoints.login, { email, password });
    
    // Save tokens
    if (response.data.session) {
      localStorage.setItem("token", response.data.session.access_token);
      localStorage.setItem("refresh", response.data.session.refresh_token);
      localStorage.setItem("expires", String(response.data.session.expires_in));
    }
    
    return response.data;
  },

  /**
   * Logout user (clear local storage)
   */
  logout: async (): Promise<void> => {
    const res =  await api.get(Endpoints.logout);
    // alert(res.status)
    localStorage.clear();
    window.location.href = "/login";
  },

  /**
   * Get current authenticated user
   */
  getUser: async () => {
    const response = await api.get(Endpoints.user);
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("token");
    const expires = localStorage.getItem("expires");
    
    if (!token || !expires) return false;
    
    return Date.now() < Number(expires) * 1000;
  },
};

// ============================================
// USER/PROFILE API
// ============================================
export const userAPI = {
  /**
   * Get all users (admin)
   */
  getAllUsers: async () => {
    const response = await api.get(Endpoints.users);
    return response.data;
  },

  /**
   * Get current user's profile
   */
  getProfile: async () => {
    const response = await api.get(Endpoints.profile);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: any) => {
    const response = await api.post(Endpoints.profile, data);
    return response.data;
  },

  /**
   * Delete user profile
   */
  deleteProfile: async (id: string) => {
    const response = await api.delete(`${Endpoints.profile}/${id}`);
    return response.data;
  },
};

// ============================================
// COURSE API
// ============================================
export const courseAPI = {
  /**
   * Create a new course from AI-generated data
   */
  createCourse: async (courseData: AiResponse): Promise<Course> => {
    const response = await api.post(Endpoints.courses, courseData);
    return response.data;
  },

  /**
   * Get all courses (for explore page)
   */
  getAllCourses: async (): Promise<ExploreCourse[]> => {
    const response = await api.get(Endpoints.courses);
    return response.data;
  },

  /**
   * Get courses by domain
   */
  getCoursesByDomain: async (domain: string): Promise<ExploreCourse[]> => {
    const response = await api.get(`${Endpoints.courses}/domain/${domain}`);
    return response.data;
  },

  /**
   * Get single course with all modules/roadmaps
   */
  getCourseById: async (courseId: string): Promise<Course> => {
    const response = await api.get(`${Endpoints.courses}/${courseId}`);
    return response.data;
  },

  // get single module
  getModuleById: async (courseId: string): Promise<Roadmap> => {
    const response = await api.get(`${Endpoints.module}/${courseId}`);
    return response.data;
  },

  // get single project
  getProjectById: async (moduleId: string): Promise<Project> => {
    const response = await api.get(`${Endpoints.project}/${moduleId}`);
    return response.data;
  },

  // get all Projects
  getProjectByCourseId: async (courseId: string): Promise<any> => {
    const response = await api.get(`${Endpoints.projects}/${courseId}`);
    return response.data;
  },
  /**
   * Get courses created by current user
   */
  getMyCourses: async (): Promise<any[]> => {
    const response = await api.get(Endpoints.myCourses);
    return response.data;
  },

  /**
   * Get courses user is enrolled in
   */
  getEnrolledCourses: async (): Promise<any[]> => {
    const response = await api.get(Endpoints.enrolledCourses);
    return response.data;
  },

  /**
   * Enroll in a course
   */
  enrollInCourse: async (courseId: string): Promise<{ success: boolean }> => {
    const response = await api.post(`${Endpoints.courses}/${courseId}/enroll`);
    return response.data;
  },

  /**
   * Update course progress
   */
  updateProgress: async (
    courseId: string,
    progress: UserProgress
  ): Promise<any> => {
    const response = await api.patch(
      `${Endpoints.courses}/${courseId}/progress`,
      { progress }
    );
    return response.data;
  },

  /**
   * Delete a course (creator only)
   */
  deleteCourse: async (courseId: string): Promise<void> => {
    const response = await api.delete(`${Endpoints.courses}/${courseId}`);
    return response.data;
  },

  /**
   * Search courses by query
   */
  searchCourses: async (query: string): Promise<ExploreCourse[]> => {
    const response = await api.get(`${Endpoints.courses}?search=${query}`);
    return response.data;
  },
};

// ============================================
// UTILITY API
// ============================================
export const utilAPI = {
  /**
   * Check server status
   */
  getStatus: async () => {
    const response = await api.get(Endpoints.status);
    return response.data;
  },
};

// ============================================
// EXPORT DEFAULT API INSTANCE
// ============================================
export default api;