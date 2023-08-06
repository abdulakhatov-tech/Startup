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
  excert: string;
  description: string;
  category: string;
  _id: string;
  isActive: boolean;
}

export interface AuthorType {
  firstName: string;
  lastName: string;
  avatar: string;
}
