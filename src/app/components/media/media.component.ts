import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

// define a class for the media structure
export class Media {
  _id: string | undefined;
  title: string | undefined;
  releaseYear: number | undefined;
  type: string | undefined;
  provider: string | undefined;
  rating: number | undefined;
}

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NgFor],
  templateUrl: './media.component.html'
})
export class MediaComponent {
  // mock data for this week, will come from API next week
  MEDIA: Media[] = [
    {_id: 'abc123', title: 'Shogun', releaseYear: 2024, type: 'TV', provider: 'FX', rating: 5 },
    {_id: 'def234', title: 'The Hunger Habit', releaseYear: 2023, type: 'Book', provider: 'Jud Brewer', rating: 5 },
    {_id: 'ghi567', title: 'Bosch', releaseYear: 2018, type: 'TV', provider: 'Prime', rating: 4 }
  ]

  selectedMedia: Media | undefined;

  onSelect(media: Media): void {
    this.selectedMedia = media;
    console.log(media);
  }
}
