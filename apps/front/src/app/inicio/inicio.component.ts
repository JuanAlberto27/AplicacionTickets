import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, AppComponent, FormularioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private router: Router) {}

  navegarTickets() {
    this.router.navigate(['/tickets']);
  }
}
