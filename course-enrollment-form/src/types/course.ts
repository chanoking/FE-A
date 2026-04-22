export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  instructor: string;
}

export interface CourseListResponse {
  courses: Course[];
  categories: string[];
}
