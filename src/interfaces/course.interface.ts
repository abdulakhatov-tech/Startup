export interface CourseType {
  slug: string;
  previewImage: string;
  title: string;
  lessonCount: number;
  totalHour: number;
  level: string;
  price: number;
  reviewAvarage: number;
  reviewCount: number;
  author: AuthorType;
  tags: string[];
  requirements: string[];
  learn: string[];
  excerpt: string;
  description: string;
  category: string;
  _id: string;
  language: string;
  isActive: boolean;
  updatedAt: Date;
}
export interface AuthorType {
  fullName: string;
  avatar: string;
  job: string;
}
