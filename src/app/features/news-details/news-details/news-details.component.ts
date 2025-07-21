import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewsService } from '../../services/new.service';
import { News } from '../../models/news.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-news-details',
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ChipModule,
    DividerModule,
    ImageModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
})
export class NewsDetailsComponent {
  news: News | undefined;
  id: string | null = '';
  sideNews: News[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activateRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.id = id;
          this.loadNew(id);
          this.loadNews();
        } else {
          this.router.navigate(['/news']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNew(id: string): void {
    this.newsService
      .getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (news) => {
          this.news = news;
          this.loading = false;
          if (!news) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Noticia no encontrada',
            });
            this.router.navigate(['/news']);
          }
        },
        error: () => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar la noticia',
          });
          this.router.navigate(['/news']);
        },
      });
  }

  private loadNews(): void {
    this.newsService.getAll().subscribe((news) => {
      if (news.length > 0 && this.id) {
        const filtered = news.filter((n) => n.id !== this.id);

        const shuffled = filtered.sort(() => 0.5 - Math.random());

        this.sideNews = shuffled.slice(0, 4);
      }
    });
  }

  viewNewsDetail(newsId: string): void {
    this.router.navigate(['/details', newsId]);
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Enlace copiado',
        detail: 'El enlace se ha copiado al portapapeles',
      });
    });
  }
}
