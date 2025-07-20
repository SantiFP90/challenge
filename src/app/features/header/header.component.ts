import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NewsFormModalComponent } from '../../shared/news-form-modal/news-form-modal.component';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, NewsFormModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  visible = false;

  constructor(private messageService: MessageService) {}

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
}
