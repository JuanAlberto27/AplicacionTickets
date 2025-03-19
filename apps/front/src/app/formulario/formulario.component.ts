import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {

  formu = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.maxLength(23)]),
    descripcion: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    fecha_fin: new FormControl('', Validators.required),
    notas: new FormControl(''),
    imgdocs: new FormControl(null)
  });

  enviar() {
    if (this.formu.valid) {
      alert("Ticket creado correctamente.");
    } else {
      this.formu.markAllAsTouched();
      alert("Revise los campos otra vez.");
    }
  }

  
}
