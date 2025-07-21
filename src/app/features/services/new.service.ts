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
      subtitle:
        'Gato local se postula para alcalde prometiendo más cajas de arena públicas',
      title: 'Gato local para alcalde',
      content:
        'El felino Whiskers, de 3 años, presentó su candidatura con un programa electoral que incluye horarios de siesta obligatorios y prohibición de aspiradoras los domingos.',
      createdAt: new Date(),
      imageUrl:
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=300&fit=crop',
      author: 'María Gatuna',
      location: 'Barcelona',
    },
    {
      id: '2',
      subtitle: 'Hombre descubre que su planta le ha estado cobrando el WiFi',
      title: 'Planta manipuladora',
      content:
        'Después de 6 meses pagando una cuenta extra de internet, Juan descubrió que su cactus había creado una red propia llamada "PlantNet_Premium".',
      createdAt: new Date(),
      imageUrl:
        'https://imgs.search.brave.com/XwEMvrb7XCmR92vEf3BEDJ7V0hrCfx3hA_qU1Q9x3mg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3VpZG9taWRlc3Bl/bnNhLmNvbS9ocy1m/cy9odWJmcy9wbGFu/dGFfY2Fybml2b3Jh/X3ZlbnVzX2ZseXRy/YW1wYSUyMC5qcGc_/d2lkdGg9NjY2Jmhl/aWdodD01MDAmbmFt/ZT1wbGFudGFfY2Fy/bml2b3JhX3ZlbnVz/X2ZseXRyYW1wYSUy/MC5qcGc',
      author: 'Pedro Maceta',
      location: 'Madrid',
    },
    {
      id: '3',
      subtitle: 'Abuela bate récord mundial de velocidad en WhatsApp familiar',
      title: 'Abuela influencer',
      content:
        'Doña Carmen logró enviar 247 memes de "Buenos días" en menos de 5 minutos, estableciendo un nuevo récord en la categoría "Bombardeo Matutino Familiar".',
      createdAt: new Date(),
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=300&fit=crop',
      author: 'Nieto Agobiado',
      location: 'Valencia',
    },
    {
      id: '4',
      subtitle: 'Pizza se declara independiente y forma su propio país',
      title: 'Pizza revolucionaria',
      content:
        'Una pizza margherita de 40cm proclamó la República Popular de Pizzalandia desde una caja de cartón, exigiendo reconocimiento internacional y extra queso.',
      createdAt: new Date(),
      imageUrl:
        'https://imgs.search.brave.com/aN0qFbXihUeMex6KVdnT08f-xp5X47zh9hwC93h2M30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5Lzg4LzExLzEz/LzM2MF9GXzk4ODEx/MTM2OV9QeE1wMTV2/RjJCQzR3aFF4OUs1/aVpmQWZvZkNBQmdB/Ui5qcGc',
      author: 'Giuseppe Mozzarella',
      location: 'Sevilla',
    },
    {
      id: '5',
      subtitle:
        'Calcetín desaparecido regresa tras 3 años con historias increíbles',
      title: 'Media secuestrada',
      content:
        'El calcetín azul rayado de Roberto apareció con pasaporte falso y acento extraño, alegando haber trabajado como espía internacional bajo lavadoras enemigas.',
      createdAt: new Date(),
      imageUrl:
        'https://imgs.search.brave.com/w8XZjhfHMUDlGsMbkQy14QgANyp_UUiY_C9gRH1R_7s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZXJ2/aWNlcy5tZXRlb3Jl/ZC5jb20vaW1nL2Fy/dGljbGUvZGlhLW11/bmRpYWwtZGUtbGFz/LW1lZGlhcy1wZXJk/aWRhcy11bi1taXN0/ZXJpby1xdWUtdGll/bmUtZXhwbGljYWNp/b24tMTY4MzQyMjU3/MTQ1MV8xMDI0Lmpw/Zw',
      author: 'Detective Lavandería',
      location: 'Bilbao',
    },
    {
      id: '6',
      subtitle: 'Semáforo se declara en huelga por exceso de trabajo',
      title: 'Semáforo revolucionario',
      content:
        'El semáforo de la Plaza Mayor anunció que solo funcionará en amarillo intermitente hasta que le concedan vacaciones pagadas y seguro médico.',
      createdAt: new Date(),
      imageUrl:
        'https://imgs.search.brave.com/-JkDDplXf_fXtT7jAwuQOa44SnXQGqMsvPkF_EWEV8A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzYyLzUwLzcw/LzM2MF9GXzYyNTA3/MDExX2hvak9hZHA1/eWRQNUtOMlV6YkZm/U2dKdmFUWFBzNThQ/LmpwZw',
      author: 'Sindicato Vial',
      location: 'Zaragoza',
    },
    {
      id: '7',
      subtitle: 'Perro desarrolla aplicación para pedir croquetas a domicilio',
      title: 'Perro DEV',
      content:
        'Rex, un golden retriever de 5 años, lanzó "WoofEats" tras frustrarse con los tiempos de entrega de sus humanos. Ya tiene 10,000 descargas.',
      createdAt: new Date(),
      imageUrl:
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=300&fit=crop',
      author: 'Reportero Canino',
      location: 'Málaga',
    },
    {
      id: '8',
      subtitle: 'Café se niega a ser bebido antes de las 10 AM',
      title: 'Café seco',
      content:
        'Una taza de café expreso implementó un sistema de bloqueo temporal, argumentando que "la gente necesita aprender a respetarme como bebida premium".',
      createdAt: new Date(),
      imageUrl:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop',
      author: 'Barista Rebelde',
      location: 'Granada',
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
      subtitle: news.subtitle,
      content: news.content,
      createdAt: new Date(),
      imageUrl: news.imageUrl,
      author: news.author,
      location: news.location,
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
