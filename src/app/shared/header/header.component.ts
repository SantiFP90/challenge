import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NewsFormModalComponent } from '../news-form-modal/news-form-modal.component';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from '../../features/services/new.service';
import { News } from '../../features/models/news.model';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, NewsFormModalComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  visible = false;
  isDetailsRoute = false;
  newsId: string | null = null;
  selectedNews: News | null = null;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private newsService: NewsService
  ) {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      const match = currentUrl.match(/^\/details\/(\d+)$/);
      this.isDetailsRoute = !!match;
      this.newsId = match?.[1] ?? null;
    });
  }

  openModal(): void {
    if (this.isDetailsRoute && this.newsId) {
      this.newsService.getById(this.newsId).subscribe((news) => {
        this.selectedNews = news ?? null;
        this.visible = true;
      });
    } else {
      this.selectedNews = null;
      this.visible = true;
    }
  }

  onNewsCreated() {
    this.messageService.add({
      severity: 'success',
      summary: 'Noticia',
      detail: 'La noticia fue publicada correctamente',
    });
  }

  onModalClosed() {
    this.visible = false;
  }

  deleteNews() {
    if (!this.newsId) return;
    this.newsService.delete(this.newsId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Noticia eliminada',
          detail: 'La noticia ha sido eliminada correctamente',
        });
        this.router.navigate(['/news']);
      },
    });
  }
}
