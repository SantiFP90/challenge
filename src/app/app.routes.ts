import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NewsIdGuard } from './core/guards/new-id.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  {
    path: 'news',
    component: HomeComponent,
  },
  {
    path: 'details/:id',
    canActivate: [NewsIdGuard],
    loadComponent: () =>
      import(
        './features/news-details/news-details/news-details.component'
      ).then((m) => m.NewsDetailsComponent),
  },
  { path: '**', redirectTo: '/news' },
];
