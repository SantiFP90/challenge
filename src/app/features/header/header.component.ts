import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NewsFormModalComponent } from '../../shared/news-form-modal/news-form-modal.component';
import { Router } from '@angular/router';
import { NewsService } from '../services/new.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, NewsFormModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  visible = false;
  isDetailsRoute = false;
  newsId: string | null = null;

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

  openModal() {
    this.visible = true;
  }

  onNewsCreated() {
    this.messageService.add({
      severity: 'success',
      summary: 'Noticia creada',
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
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la noticia',
        });
      },
    });
  }
}
