import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { TokenModalComponent } from '../token-modal/token-modal.component'

@Component({
  selector: 'app-token-generator',
  templateUrl: './token-generator.component.html',
  styleUrls: ['./token-generator.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TokenModalComponent
  ]
})
export class TokenGeneratorComponent {

  cliente: string = '';
  generatedToken: string = '';
  errorMessage: string = '';
  isModalVisible: boolean = false;

  constructor(private tokenService: TokenService) { }

  // Método para generar un token
  generateToken() {
    if (this.cliente) {
      this.tokenService.generateToken(this.cliente).subscribe(
        (response) => {
          this.generatedToken = response.token;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Error al generar el token. Verifica los datos.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingresa el ID del cliente.';
    }
  }

  showModal() {
    if (this.cliente) {
      this.isModalVisible = true;
    } else {
      alert('Por favor, ingresa el ID del cliente.');
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
