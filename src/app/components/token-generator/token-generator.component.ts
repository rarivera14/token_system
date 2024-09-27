import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { TokenModalComponent } from '../token-modal/token-modal.component'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-generator',
  templateUrl: './token-generator.component.html',
  styleUrls: ['./token-generator.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TokenModalComponent,
    FormsModule
  ]
})
export class TokenGeneratorComponent {
  cliente: string = '';
  generatedToken: string = '';
  enteredToken: string = '';
  isModalVisible: boolean = false;
  validationError: string = '';
  isTokenGenerated: boolean = false; // Variable para controlar el estado del input
  countdown: number = 0; // Temporizador en segundos
  interval: any; // Intervalo para el temporizador

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {}

  // Método para generar el token y mostrar el modal
  generateToken() {
    if (this.cliente) {
      this.tokenService.generateToken(this.cliente).subscribe(
        (response) => {
          if (response.errorCode == 0){
            this.generatedToken = response.token.token;

            const expirationTime = new Date(response.token.feCreacion).getTime() + 60000; 
            this.countdown = Math.floor((expirationTime - new Date().getTime()) / 1000);
            this.startCountdown();
            this.isModalVisible = true;
            this.isTokenGenerated = true;

            this.tokenService.setClienteId(this.cliente);
          }else{
            alert('Error al generar el token. Verifica los datos.');
          }
        },
        (error) => {
          alert('Hubo un error al consultar.');
        }
      );
    } else {
      alert('Por favor, ingresa el ID del cliente.');
    }
  }

  // Inicia el temporizador de cuenta regresiva
  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > -1) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        // Vuelve a generar el token automáticamente cuando el temporizador llegue a 0
        this.generateToken();
      }
    }, 1000);
  }

  // Método para cerrar el modal y limpiar el temporizador
  closeModal() {
    this.isModalVisible = false;
    clearInterval(this.interval); // Limpia el intervalo cuando se cierra el modal
  }

  // Método para validar el token ingresado
  validateToken() {
    this.tokenService.useToken(this.cliente,this.enteredToken).subscribe(
      (response) => {
        if (response.errorCode == 0){
          this.router.navigate(['/tokens-table']);
        }else{
          alert('Error al generar el token. Verifica los datos.');
        }
      },
      (error) => {
        alert('Hubo un error al consultar.');
      }
    );
  }

  // Limpieza cuando se destruye el componente
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
