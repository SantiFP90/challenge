import { Component, Input } from '@angular/core';
import { News } from '../../features/models/news.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-secondary-card',
  imports: [],
  templateUrl: './news-secondary-card.component.html',
  styleUrl: './news-secondary-card.component.scss',
})
export class NewsSecondaryCardComponent {
  @Input() news: News[] = [];

  constructor(private router: Router) {}

  viewNewsDetail(newsId: string): void {
    this.router.navigate(['/details', newsId]);
  }
}
