import { http } from '@/lib/api/client';
import {
  Course,
  CoursesResponse,
  CreateCourseData,
  CourseDetail,
  UpdateCourseData,
} from '../types';

export const coursesApi = {
  getCourses: async (params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    authorId?: string;
    title?: string;
    onlyPublished?: boolean;
  }): Promise<CoursesResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.authorId) queryParams.append('authorId', params.authorId);
    if (params?.title) queryParams.append('title', params.title);

    // Siempre filtrar solo cursos publicados
    queryParams.append('onlyPublished', 'true');

    const queryString = queryParams.toString();
    const url = `/courses${queryString ? `?${queryString}` : ''}`;

    return http<CoursesResponse>(url);
  },
  getCourseBySlug: async (slug: string): Promise<CourseDetail> => {
    return http<CourseDetail>(`/courses/${slug}`);
  },
  createCourse: async (courseData: CreateCourseData): Promise<Course> => {
    return http<Course>('/courses', {
      method: 'POST',
      body: courseData,
    });
  },
  getCourseById: async (id: string): Promise<CourseDetail> => {
    return http<CourseDetail>(`/courses/${id}`);
  },
  updateCourse: async (id: string, courseData: UpdateCourseData): Promise<Course> => {
    return http<Course>(`/courses/${id}`, {
      method: 'PATCH',
      body: courseData,
    });
  },
  deleteCourse: async (id: string): Promise<void> => {
    return http<void>(`/courses/${id}`, {
      method: 'DELETE',
    });
  },
  publishCourse: async (id: string): Promise<Course> => {
    return http<Course>(`/courses/${id}/publish`, {
      method: 'POST',
    });
  },
  unpublishCourse: async (id: string): Promise<Course> => {
    return http<Course>(`/courses/${id}/unpublish`, {
      method: 'POST',
    });
  },
};
