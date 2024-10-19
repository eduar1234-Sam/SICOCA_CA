import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  names: string[] = ['Tomas Guardias', 'Tom Cruz', 'Tec Johnson', 'Tobias Lane', 'Tori Vega', 'Tonya Harding'];

  name: string = '';
  filteredNames: string[] = [];
  selectedMethod: string = '';
  paymentMethods: string[] = [];
  amounts: { [key: string]: number } = {}; // Solo acepta número
  efectivoRecibido: number = 0; // Campo para el efectivo recibido

  onInputChange() {
    const inputValue = this.name.toLowerCase();
    if (inputValue) {
      this.filteredNames = this.names.filter(name => 
        name.toLowerCase().includes(inputValue)
      );
    } else {
      this.filteredNames = [];
    }
  }

  selectName(suggestion: string) {
    this.name = suggestion;
    this.filteredNames = [];
  }

  addPaymentMethod() {
    if (this.selectedMethod && !this.paymentMethods.includes(this.selectedMethod)) {
      this.paymentMethods.push(this.selectedMethod);
      this.amounts[this.selectedMethod] = 0; // Inicializa el monto en 0
      this.selectedMethod = ''; // Reinicia la selección
    }
  }

  removePaymentMethod(method: string) {
    const index = this.paymentMethods.indexOf(method);
    if (index !== -1) {
      this.paymentMethods.splice(index, 1);
      delete this.amounts[method]; // Elimina el monto correspondiente
    }
  }
}
