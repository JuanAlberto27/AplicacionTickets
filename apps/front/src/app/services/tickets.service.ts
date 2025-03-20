import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})

export class TicketsService {

  private apiUrl = 'http://localhost:3000/api/tickets'
  private http = inject(HttpClient);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicket(id: string): Observable<Ticket> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, this.httpOptions);
  }

  updateTicket(id: string, ticket: Ticket): Observable<Ticket> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Ticket>(url, ticket, this.httpOptions);
  }

}
