import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from "./stores/stores.component";  // Asegúrate de importar CommonModule

@Component({
  selector: 'app-sale-point',
  standalone: true,
  imports: [CommonModule, StoresComponent],
  templateUrl: './sale-point.component.html',
  styleUrl: './sale-point.component.css'
})
export class SalePointComponent {

  stores: any[] =[
    {
      id: "001",
      name: "Monkey´s"
    },
    {
      id: "002",
      name: "El Bus"
    },
    {
      id: "002",
      name: "Tienda de Ropa"
    },
    {
      id: "003",
      name: "Carnes"
    },
  ];

  storeSelected: any = {}; 

  showStore: boolean = false;

  onSelectStore(store: any) {
    this.storeSelected = store;
    this.showStore = true;
  }

}
