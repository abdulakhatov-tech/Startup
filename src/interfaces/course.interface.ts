export interface CourseType {
  previewImage: string;
  title: string;
  slug: string;
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
}
export interface AuthorType {
  fullName: string;
  avatar: string;
}
