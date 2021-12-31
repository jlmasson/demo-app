import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  loading = true;
  validData = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    (async () => {
      await this.initLoad();
    })();
  }

  async submit() {
    alert("Guardando Pokemon");
    try {
      const pokemon = this.form.value; 
      const response = await this.pokemonService.updatePokemon(pokemon.id, pokemon).toPromise();
      if (!response) {
        throw Error;
      }
      alert("Se ha guardado el pokemon");
      await this.router.navigate(['../../list'], { relativeTo: this.route });
    } catch (e) {
      console.log(e);
      alert("No se ha podido guardar el pokemon! Inténtalo de nuevo");
    }
  }

  private async initLoad() {
    const id = +this.route.snapshot.params.id;
    try {
      const response = await this.pokemonService.getPokemon(id).toPromise();
      if (!response) {
        throw Error;
      }
      this.buildForm();
      this.form.patchValue(response);
      this.validData = true;
    } catch (e) {
      this.validData = false;
    }
    this.loading = false;
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      type: ['', [Validators.required]],
      hp: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      attack: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      defense: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      idAuthor: [1]
    });
  }
}
