import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private pokemonesCatalogo: Pokemon[] = [];

  pokemones: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.initLoad();
    })();
  }

  searchPokemon(searchValue: string) {
    searchValue = searchValue.trim().toLowerCase();
    this.pokemones = this.pokemonesCatalogo.filter((pokemon: Pokemon) => {
      return pokemon.name.toLowerCase().includes(searchValue);
    });
  }

  async deletePokemon(pokemon: Pokemon) {
    const r = confirm(`¿Está seguro que desea eliminar el pokemon ${pokemon.name}?`);
    if (r) {
      try {
        const response = await this.pokemonService.deletePokemon(pokemon.id).toPromise();
        if (!response) {
          throw Error;
        }
        alert("Pokemon se ha eliminado");
        await this.initLoad();
      } catch (e) {
        alert(`No se ha podido eliminar al pokemon ${pokemon.name}`);
      }
      
    }
  }

  private async initLoad() {
    try {
      this.pokemones = await this.pokemonService.getPokemons().toPromise();
      this.pokemonesCatalogo = this.pokemones;
    } catch (e) {
      this.pokemones = [];
    }
  }

}
