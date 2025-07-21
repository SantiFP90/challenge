export interface News {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
  author: string;
  location: string;
}
