import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  serverUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  // GET
  getMedia()  {
    return this.http.get(`${this.serverUrl}/media`);
  }

  // POST
  addMedia(media: any) {
    return this.http.post(`${this.serverUrl}/media`, media);
  }
}
