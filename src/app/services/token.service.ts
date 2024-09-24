import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = 'http://localhost:8080/api/tokens'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para generar un token
  generateToken(cliente: string): Observable<any> {
    const params = new HttpParams().set('userId', cliente); // Ajusta según el backend
    return this.http.get(`${this.apiUrl}/generate`, { params });
  }

  // Método para usar un token
  useToken(cliente: string, token: string): Observable<any> {
    const params = new HttpParams()
      .set('cliente', cliente)
      .set('token', token);
    return this.http.post(`${this.apiUrl}/use`, {}, { params });
  }

  // Método para obtener la lista de tokens generados y sus usos
  getTokens(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`); // Ajusta el endpoint según tu backend
  }

}
