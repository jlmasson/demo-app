import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  async submit() {
    alert("Guardando Pokemon");
    try {
      const pokemon = this.form.value; 
      const response = await this.pokemonService.savePokemon(pokemon).toPromise();
      if (!response) {
        throw Error;
      }
      alert("Se ha guardado el pokemon");
      await this.router.navigate(['../list'], { relativeTo: this.route });
    } catch (e) {
      console.log(e);
      alert("No se ha podido guardar el pokemon! Inténtalo de nuevo");
    }
  }

  private buildForm() {
    this.form = this.fb.group({
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
