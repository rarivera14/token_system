import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-token-table',
  templateUrl: './token-table.component.html',
  styleUrls: ['./token-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule // Asegúrate de incluir MatInputModule aquí
  ]
})
export class TokenTableComponent implements OnInit {
  tokens: any[] = [];
  displayedColumns: string[] = ['userId', 'value', 'expiresAt', 'isActive'];
  dataSource = new MatTableDataSource<any>([]);
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  clienteId: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    // Suscríbete al ID del cliente desde el servicio compartido
    this.tokenService.clienteId$.subscribe((id) => {
      this.clienteId = id;
      if (this.clienteId) {
        this.loadTokens(this.clienteId);
      }
    });
  }

  // Cargar los tokens basados en el ID del cliente
  loadTokens(clienteId: string) {
    this.tokenService.getTokens(clienteId).subscribe(
      (data) => {
        this.tokens = data;
        this.dataSource.data = this.tokens;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los tokens:', error);
      }
    );
  }

  // Aplicar el filtro basado en la entrada del usuario
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filtro con MatTableDataSource
  }

  // Método para manejar el cambio de página
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.dataSource.paginator = this.paginator;
  }
}
