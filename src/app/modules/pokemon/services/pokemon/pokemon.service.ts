import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../entities/pokemon.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private endPoint = environment.api.pokemons;

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.endPoint}?idAuthor=1`);
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.endPoint}/${id}`);
  }

  savePokemon(data: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.endPoint}?idAuthor=1`, data);
  }

  updatePokemon(id: number, data: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.endPoint}/${id}`, data);
  }

  deletePokemon(id: number): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${this.endPoint}/${id}`);
  }
}
