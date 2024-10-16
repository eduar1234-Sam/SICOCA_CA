import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stores',
    standalone: true,
    imports: [CommonModule, FormsModule], // Incluye FormsModule aquí
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

    constructor(private router: Router) {}

    @Input() store: any;

    products: any[] = [
        { "id": "001", "name": "producto 1", "stock": "50", "price": 1000, "idStore": "001" },
        { "id": "002", "name": "producto 2", "stock": "30", "price": 2000, "idStore": "002" },
        { "id": "003", "name": "producto 3", "stock": "70", "price": 1500, "idStore": "003" },
        { "id": "004", "name": "producto 4", "stock": "25", "price": 1200, "idStore": "001" },
        { "id": "005", "name": "producto 5", "stock": "60", "price": 1100, "idStore": "002" },
        { "id": "006", "name": "producto 6", "stock": "90", "price": 1800, "idStore": "003" },
        { "id": "007", "name": "producto 7", "stock": "20", "price": 1300, "idStore": "001" },
        { "id": "008", "name": "producto 8", "stock": "35", "price": 1600, "idStore": "002" },
        { "id": "009", "name": "producto 9", "stock": "80", "price": 1700, "idStore": "003" },
        { "id": "010", "name": "producto 10", "stock": "15", "price": 2000, "idStore": "001" },
        { "id": "011", "name": "producto 11", "stock": "43", "price": 1500, "idStore": "002" },
        { "id": "012", "name": "producto 12", "stock": "56", "price": 1400, "idStore": "003" },
        { "id": "013", "name": "producto 13", "stock": "70", "price": 1800, "idStore": "001" },
        { "id": "014", "name": "producto 14", "stock": "22", "price": 1600, "idStore": "002" },
        { "id": "015", "name": "producto 15", "stock": "65", "price": 1700, "idStore": "003" },
        { "id": "016", "name": "producto 16", "stock": "14", "price": 1900, "idStore": "001" },
        { "id": "017", "name": "producto 17", "stock": "34", "price": 1500, "idStore": "002" },
        { "id": "018", "name": "producto 18", "stock": "98", "price": 2000, "idStore": "003" },
        { "id": "019", "name": "producto 19", "stock": "46", "price": 1300, "idStore": "001" },
        { "id": "020", "name": "producto 20", "stock": "59", "price": 1400, "idStore": "002" },
        // ...
        { "id": "200", "name": "producto 200", "stock": "23", "price": 1500, "idStore": "003" }
    ];
  
    productsSelected: any[] = [];
    preSaleItems: any[] = [];
    selectedProductId: string | null = null;
    selectedQuantity: number = 0;
    subtotal: number = 0; // Para almacenar el subtotal

    ngOnInit(): void {
        this.updateProductsByStore();
    }

    updateProductsByStore(): void {
        // Actualiza la lista de productos según la tienda seleccionada
        this.productsSelected = this.getProductsByStore(this.store.id);
    }

    getProductsByStore(idStore: string): any[] {
        return this.products.filter(product => product.idStore === idStore);
    }

    onProductSelect(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      this.selectedProductId = selectElement.value ? selectElement.value : null; // Verifica que haya selección
    }
  
    addToPreSale(): void {
        if (this.selectedProductId && this.selectedQuantity > 0) {
            const product = this.productsSelected.find(prod => prod.id === this.selectedProductId);
            if (product) {
                const existingItem = this.preSaleItems.find(item => item.product.id === product.id);
                if (existingItem) {
                    existingItem.quantity += this.selectedQuantity; // Suma la cantidad
                } else {
                    this.preSaleItems.push({ product, quantity: this.selectedQuantity });
                }
                // Resetea la selección
                this.selectedProductId = null;
                this.selectedQuantity = 0; // Resetea a 0
                this.updateSubtotal(); // Actualiza el subtotal después de agregar
            }
        }
    }

    removeFromPreSale(item: any): void {
        this.preSaleItems = this.preSaleItems.filter(i => i !== item);
        this.updateSubtotal(); // Actualiza el subtotal después de eliminar
    }

    editQuantity(item: any): void {
        const newQuantity = prompt("Modificar cantidad:", item.quantity);
        if (newQuantity) {
            item.quantity = Number(newQuantity);
            this.updateSubtotal(); // Actualiza el subtotal después de editar
        }
    }

    updateSubtotal(): void {
        this.subtotal = this.preSaleItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    goToPayments(){
        this.router.navigate(['/payments']);
    }
}
