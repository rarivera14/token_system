import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-modal',
  templateUrl: './token-modal.component.html',
  styleUrls: ['./token-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TokenModalComponent implements OnInit {
  @Input() userId: string = '';  // ID del usuario que se pasará al modal
  token: string = '';
  expiresAt: Date | null = null;
  errorMessage: string = '';
  interval: any;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.generateNewToken();
    // Regenera el token cada 60 segundos
    this.interval = setInterval(() => {
      this.generateNewToken();
    }, 60000); // 60,000 ms = 60 segundos
  }

  // Método para generar un nuevo token
  generateNewToken() {
    this.tokenService.generateToken(this.userId).subscribe(
      (response) => {
        this.token = response.token;
        this.expiresAt = new Date(response.expiresAt);
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error al generar el token.';
      }
    );
  }

  // Limpiar el intervalo cuando se cierre el componente
  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
