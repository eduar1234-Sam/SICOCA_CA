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
  sinpeName: string = ''; // Propiedad añadida
  filteredNames: string[] = [];
  selectedMethod: string = '';
  paymentMethods: string[] = [];
  amounts: { [key: string]: number } = {}; // Solo acepta número
  efectivoRecibido: number = 0; // Campo para el efectivo recibido
  errorMessage: string = ''; // Mensaje de error
  showSummary: boolean = false; // Estado para mostrar las secciones de métodos de pago
  totalAmount: number = 5000; // Monto total de la compra

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

    // Validación si hay más de un método de pago
    if (this.paymentMethods.length > 1) {
      let totalAmount = 0;
      for (let method of this.paymentMethods) {
        if (this.amounts[method] == null || this.amounts[method] <= 0) {
          this.errorMessage = 'Por favor, completa todos los campos de monto.';
          return false;
        }
        totalAmount += this.amounts[method]; // Sumar montos
      }
      if (totalAmount !== this.totalAmount) { // Verificar si la suma es igual al total
        this.errorMessage = 'La suma de los montos debe ser igual al total de la compra.';
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

  calculateChange(): number {
    if (this.paymentMethods.includes('Efectivo')) {
      if (this.paymentMethods.length === 1) {
        return this.efectivoRecibido - this.totalAmount; // Solo efectivo
      } else {
        // Si hay más de un método, se usa el monto en efectivo indicado
        const efectivoAmount = this.amounts['Efectivo'] || 0;
        return this.efectivoRecibido - efectivoAmount;
      }
    }
    return 0; // Sin efectivo
  }
}
