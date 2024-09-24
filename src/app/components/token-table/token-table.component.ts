import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TokenTableComponent implements OnInit {
  tokens: any[] = [];
  filteredTokens: any[] = [];

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.getTokens().subscribe(
      (data) => {
        this.tokens = data;
        this.filteredTokens = data;
      },
      (error) => {
        console.error('Error al obtener los tokens:', error);
      }
    );
  }

  // Método para filtrar los tokens
  filterTokens(filterValue: any) {
    this.filteredTokens = this.tokens.filter(token => 
      token.userId.includes(filterValue) || 
      token.value.includes(filterValue)
    );
  }
}
