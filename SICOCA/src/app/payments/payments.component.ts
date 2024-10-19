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

  proceed() {
    // Validar que el nombre y los métodos de pago estén completos
    if (!this.name) {
      this.errorMessage = 'Por favor, ingrese su nombre.';
      return;
    }

    if (this.paymentMethods.length === 0) {
      this.errorMessage = 'Por favor, seleccione al menos un método de pago.';
      return;
    }

    // Si hay 2 o más métodos, verificar que cada monto esté completado
    if (this.paymentMethods.length > 1) {
      for (let method of this.paymentMethods) {
        if (this.amounts[method] == null || this.amounts[method] <= 0) {
          this.errorMessage = `Por favor, ingrese el monto para el método ${method}.`;
          return;
        }
      }
    }

    // Si todo está correcto, limpiar el mensaje de error
    this.errorMessage = '';
    
    // Aquí puedes continuar con la lógica de lo que debe suceder al presionar Siguiente
    console.log('Continuando con el pago...');
  }
}
