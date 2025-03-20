import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})

export class FormularioComponent {

  constructor(private ticketsService : TicketsService) {}

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
      
      const ticket: Ticket = {
        titulo: this.formu.value.titulo!,
        descripcion: this.formu.value.descripcion!,
        tipoIncidencia: this.formu.value.tipo as Ticket['tipoIncidencia'],
        estadoTrabajo: 'pendiente',
        fechaFin: new Date(this.formu.value.fecha_fin!)
      };

      this.ticketsService.createTicket(ticket).subscribe({
        next: () => {
          alert('Ticket creado correctamente.');
          this.formu.reset();
        },
        error: (error) => {
          console.error('Error al crear el ticket:', error);
          alert('Error al crear el ticket.');
        }
      });

    } else {
      this.formu.markAllAsTouched();
      alert('Revise los campos otra vez.');
    }
  }

}
