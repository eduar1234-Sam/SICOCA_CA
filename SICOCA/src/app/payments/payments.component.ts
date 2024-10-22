import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit { // Implementar OnInit

  clients: string[] = []; // Cambiado de 'names' a 'clients'

  products: { name: string; quantity: number; price: number }[] = [
    { name: 'Piña con hierba buena', quantity: 1, price: 1300 },
    { name: 'Fresada en leche', quantity: 2, price: 1300 },
    { name: 'Oreo', quantity: 1, price: 1300 },
    { name: 'BATIDO ESPECIAL', quantity: 1, price: 1300 },
  ];
  
  name: string = '';
  sinpeName: string = ''; 
  filteredClients: string[] = []; // Cambiado de 'filteredNames' a 'filteredClients'
  selectedMethod: string = '';
  paymentMethods: string[] = [];
  amounts: { [key: string]: number } = {};
  efectivoRecibido: number = 0;
  errorMessage: string = '';
  showSummary: boolean = false;
  totalAmount: number = 5000;
  showInvoice: boolean = false;

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.getClients(); // Llamada al servicio cuando el componente se inicializa
  }

  onInputChange() {
    const inputValue = this.name.toLowerCase();
    if (inputValue) {
      this.filteredClients = this.clients.filter(client => 
        client.toLowerCase().includes(inputValue)
      );
    } else {
      this.filteredClients = [];
    }
  }

  selectName(suggestion: string) {
    this.name = suggestion;
    this.filteredClients = [];
  }

  getClients() {
    this.clienteService.getClientes().subscribe(
      data => {
        console.log('Clientes obtenidos:', data);
        this.clients = data; // Almacena los clientes en 'clients'
      },
      error => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  addPaymentMethod() {
    if (this.selectedMethod && !this.paymentMethods.includes(this.selectedMethod)) {
      this.paymentMethods.push(this.selectedMethod);
      this.amounts[this.selectedMethod] = 0;
      this.selectedMethod = '';
    }
  }

  validateFields(): boolean {
    this.errorMessage = '';
    if (this.paymentMethods.length === 0) {
      this.errorMessage = 'Por favor, añade al menos un método de pago.';
      return false;
    }

    if (this.paymentMethods.length > 1) {
      let totalAmount = 0;
      for (let method of this.paymentMethods) {
        if (this.amounts[method] == null || this.amounts[method] <= 0) {
          this.errorMessage = 'Por favor, completa todos los campos de monto.';
          return false;
        }
        totalAmount += this.amounts[method];
      }
      if (totalAmount !== this.totalAmount) {
        this.errorMessage = 'La suma de los montos debe ser igual al total de la compra.';
        return false;
      }
    }

    return true;
  }

  proceedToSummary() {
    if (this.validateFields()) {
      this.showSummary = true;
    }
  }

  removePaymentMethod(method: string) {
    this.paymentMethods = this.paymentMethods.filter(m => m !== method);
    delete this.amounts[method];
  }

  calculateChange(): number {
    if (this.paymentMethods.includes('Efectivo')) {
      if (this.paymentMethods.length === 1) {
        return this.efectivoRecibido - this.totalAmount;
      } else {
        const efectivoAmount = this.amounts['Efectivo'] || 0;
        return this.efectivoRecibido - efectivoAmount;
      }
    }
    return 0;
  }

  goToInvoice() {
    this.showInvoice = true;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
