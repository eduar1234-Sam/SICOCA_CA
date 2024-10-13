import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalePointComponent } from "./sale-point/sale-point.component";
import { AccountingComponent } from "./accounting/accounting.component";
import { ReportsComponent } from "./reports/reports.component";
import { InventoryComponent } from "./inventory/inventory.component";


@Component({
  selector: 'app-modules',
  standalone: true,
  imports: [CommonModule, SalePointComponent, AccountingComponent, ReportsComponent, InventoryComponent],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
@Input() opc: String | undefined;
}
