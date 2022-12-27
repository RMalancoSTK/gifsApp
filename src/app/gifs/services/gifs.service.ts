import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponde, Gift } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'eL6eVqWt33u2jfz0fgG4SrN3GhYhoUek';

  private _historial: string[] = [];

  public resultados: Gift[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (query.length === 0) {
      return;
    } else if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    // console.log(params.toString());

    this.http
      .get<SearchGifsResponde>(
        // `https://api.giphy.com/v1/gifs/search?api_key=eL6eVqWt33u2jfz0fgG4SrN3GhYhoUek&q=${query}&limit=10`
        `${this.servicioUrl}/search`,
        { params }
      )
      .subscribe((resp: SearchGifsResponde) => {
        // console.log(resp);
        this.resultados = resp.data;

        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
