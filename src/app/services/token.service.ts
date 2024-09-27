import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = 'http://192.168.6.34:8080/api'; // URL del backend

  // BehaviorSubject para mantener y compartir el ID del cliente
  private clienteIdSubject = new BehaviorSubject<string | null>(null);
  clienteId$ = this.clienteIdSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para actualizar el ID del cliente
  setClienteId(clienteId: string) {
    this.clienteIdSubject.next(clienteId);
  }

  // Método para obtener el ID del cliente actual
  getClienteId(): string | null {
    return this.clienteIdSubject.value;
  }

  // Método para generar un token
  generateToken(cliente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/generarToken/${cliente}`);
  }

  // Método para usar un token
  useToken(cliente: string, token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usarToken/${cliente}/${token}`);
  }

  // Método para obtener la lista de tokens generados y sus usos
  getTokens(cliente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/findAllTokensByUser/${cliente}`); // Ajusta el endpoint según tu backend
  }
}
