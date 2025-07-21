import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  {
    path: 'news',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        './features/news-details/news-details/news-details.component'
      ).then((m) => m.NewsDetailsComponent),
  },
  { path: '**', redirectTo: '/news' },
];
