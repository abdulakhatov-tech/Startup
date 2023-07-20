export interface ArticleType {
  createdAt: string;
  excert: string;
  id: string;
  image: {
    url: string;
  };
  slug: string;
  title: string;
  author: AuthorType;
  language: string;
  description: {
    text: string;
    raw: [];
  };
}

export interface AuthorType {
  name: string;
  avatar: {
    url: string;
  };
}
