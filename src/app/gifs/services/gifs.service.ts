import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponde, Gift } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'eL6eVqWt33u2jfz0fgG4SrN3GhYhoUek';
  private _historial: string[] = [];

  public resultados: Gift[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (query.length === 0) {
      return;
    } else if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get<SearchGifsResponde>(
        `https://api.giphy.com/v1/gifs/search?api_key=eL6eVqWt33u2jfz0fgG4SrN3GhYhoUek&q=${query}&limit=10`
      )
      .subscribe((resp: SearchGifsResponde) => {
        console.log(resp);
        this.resultados = resp.data;
      });
  }
}
