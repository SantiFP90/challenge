import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { News } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private newsList: News[] = [
    {
      id: '1',
      title: 'Primer noticia',
      content: 'Esta es la primera noticia de prueba.',
      createdAt: new Date(),
      imageUrl: './assets/news-generic.jpg',
      author: 'Santiago Fernandez',
    },
    {
      id: '2',
      title: 'Segunda noticia',
      content: 'Otra noticia interesante en el sistema.',
      createdAt: new Date(),
      imageUrl: './assets/news-generic.jpg',
      author: 'Santiago Fernandez',
    },
  ];

  private newsSubject = new BehaviorSubject<News[]>(this.newsList);

  constructor() {}

  getAll(): Observable<News[]> {
    return this.newsSubject.asObservable().pipe(delay(500));
  }

  getById(id: string): Observable<News | undefined> {
    return of(this.newsList.find((n) => n.id === id)).pipe(delay(300));
  }

  create(news: Omit<News, 'id' | 'createdAt'>): void {
    const newItem: News = {
      id: uuid(),
      title: news.title,
      content: news.content,
      createdAt: new Date(),
      imageUrl: news.imageUrl,
      author: news.author,
    };
    this.newsList = [newItem, ...this.newsList];
    this.newsSubject.next(this.newsList);
  }

  update(updatedNews: News): void {
    const index = this.newsList.findIndex((n) => n.id === updatedNews.id);
    if (index > -1) {
      this.newsList[index] = { ...updatedNews };
      this.newsSubject.next(this.newsList);
    }
  }

  delete(id: string): void {
    this.newsList = this.newsList.filter((n) => n.id !== id);
    this.newsSubject.next(this.newsList);
  }
}
