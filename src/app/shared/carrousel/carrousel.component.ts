import { Component, Input } from '@angular/core';
import { News } from '../../features/models/news.model';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carrousel',
  imports: [CarouselModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss',
})
export class CarrouselComponent {
  @Input() carouselNews: News[] = [];

  constructor(private router: Router) {}

  carouselResponsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  viewNewsDetail(newsId: string): void {
    this.router.navigate(['/details', newsId]);
  }
}
