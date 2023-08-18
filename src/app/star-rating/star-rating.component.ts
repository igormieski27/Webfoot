import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnChanges {
  @Input() ratingValue!: number; // Adicione o '!' para indicar que o valor será inicializado posteriormente

  stars: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ratingValue']) {
      // Acessar a propriedade usando ['ratingValue']
      this.updateStars();
    }
  }

  private updateStars(): void {
    this.stars = [];
    const fullStars = Math.floor(this.ratingValue / 2);
    const hasHalfStar = this.ratingValue % 2 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        this.stars.push('../../assets/stars/full-star-icon.png');
      } else if (hasHalfStar && i === fullStars) {
        this.stars.push('../../assets/stars/half-star-icon.png');
      } else {
        this.stars.push('../../assets/stars/empty-star-icon.png');
      }
    }
  }
}
