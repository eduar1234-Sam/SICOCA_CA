import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ModulesComponent } from "../modules/modules.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, CommonModule, ModulesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuPrincipal: boolean = false;
  opc:string ='';

  toggleMenu(opti?:any) {
    this.menuPrincipal = !this.menuPrincipal;
    this.opc = opti;
  }
}
