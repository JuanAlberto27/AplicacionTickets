import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, AppComponent, FormularioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}
