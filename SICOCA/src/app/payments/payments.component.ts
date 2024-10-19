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
  errorMessage: string = ''; // Mensaje de error
  showSummary: boolean = false; // Estado para mostrar las secciones de métodos de pago

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

  validateFields(): boolean {
    this.errorMessage = '';
    if (this.paymentMethods.length === 0) {
      this.errorMessage = 'Por favor, añade al menos un método de pago.';
      return false;
    }
    
    for (let method of this.paymentMethods) {
      if (this.amounts[method] == null || this.amounts[method] <= 0) {
        this.errorMessage = 'Por favor, completa todos los campos de monto.';
        return false;
      }
    }
    
    return true;
  }

  proceedToSummary() {
    if (this.validateFields()) {
      this.showSummary = true; // Cambia el estado para mostrar el resumen
    }
  }

  removePaymentMethod(method: string) {
    this.paymentMethods = this.paymentMethods.filter(m => m !== method);
    delete this.amounts[method]; // Elimina el monto correspondiente
  }
}
