import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule
  ]
})
export class PokemonModule { }
