import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaService } from '../../services/media.service';

// define a class for the media structure
export class Media {
  _id: string | undefined;
  title: string | undefined;
  releaseYear: number | undefined;
  type: string | undefined;
  provider: string | undefined;
  rating: number | undefined;
  username: string | undefined;
  status: string | undefined;
}

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './media.component.html'
})
export class MediaComponent {
  // mock data for this week, will come from API next week
  /*MEDIA: Media[] = [
    {_id: 'abc123', title: 'Shogun', releaseYear: 2024, type: 'TV', provider: 'FX', rating: 5 },
    {_id: 'def234', title: 'The Hunger Habit', releaseYear: 2023, type: 'Book', provider: 'Jud Brewer', rating: 5 },
    {_id: 'ghi567', title: 'Bosch', releaseYear: 2018, type: 'TV', provider: 'Prime', rating: 4 }
  ]*/
  MEDIA: any;
  _id: string | undefined;
  title: string | undefined;
  releaseYear: number | undefined;
  type: string | undefined;
  provider: string | undefined;
  rating: number | undefined;
  username: string | undefined;
  status: string | undefined;
  //selectedMedia: Media | undefined;

  constructor(private service: MediaService) {}

  onSelect(media: Media): void {
    this._id = media._id;
    this.title = media.title;
    this.releaseYear = media.releaseYear;
    this.type = media.type;
    this.rating = media.rating;
    this.provider = media.provider;
    this.username = media.username;
    this.status = media.status;
    //console.log(media);
  }

  onReset(): void {
    this._id = null;
    this.title = null;
    this.releaseYear = null;
    this.type = null;
    this.rating = null;
    this.provider = null;
    this.username = null;
    this.status = null;
    //this.selectedMedia = null;
  }

  getMedia(): void {
    this.service.getMedia().subscribe(response => {
      this.MEDIA = response;
    });
  }

  saveMedia(): void {
    if (this._id == undefined) {
      // create new media object
      let newMedia = {
        title: this.title,
        type: this.type,
        releaseYear: this.releaseYear,
        rating: this.rating,
        provider: this.provider,
        username: this.username,
        status: this.status
      };

      // pass object to service which calls API POST
      this.service.addMedia(newMedia).subscribe(response => {
        this.getMedia();
        this.onReset();
      });
    }
    else {
      let currentMedia = {
        _id: this._id,
        title: this.title,
        type: this.type,
        releaseYear: this.releaseYear,
        rating: this.rating,
        provider: this.provider,
        username: this.username,
        status: this.status
      };

      // pass object to service which calls API POST
      this.service.updateMedia(currentMedia).subscribe(response => {
        this.getMedia();
        this.onReset();
      });
    }
  }

  deleteMedia(): void {
    if (confirm('Are you sure?')) {
      let _id = this._id || '';

      this.service.deleteMedia(_id).subscribe(response => {
        this.getMedia();
        this.onReset();
      });
    }
  }

  ngOnInit() {
    this.getMedia();
  }
}
