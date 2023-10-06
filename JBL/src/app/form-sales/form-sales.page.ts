import { Component, OnInit } from '@angular/core';
import { FormSalesService } from '../services/form-sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sales',
  templateUrl: './form-sales.page.html',
  styleUrls: ['./form-sales.page.scss'],
})
export class FormSalesPage implements OnInit {
  clienteId: number | null = null;
  productoId: number | null = null;
  ventas: any[] = [];
  clientes: any[] = [];
  productos: any[] = [];
  clienteName: string = '';
  productoName: string = '';

  constructor(private formSalesService: FormSalesService, private router: Router) {}

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerProductos();
    this.obtenerVentas();
  }

  crearVenta() {
    if (this.clienteId !== null && this.productoId !== null) {
      this.formSalesService.crearVenta(this.clienteId, this.productoId).subscribe(() => {
        this.obtenerVentas();
        this.clienteId = null;
        this.productoId = null;
      });
    }
  }  
  

  borrarVenta(idVenta: number) {
    this.formSalesService.borrarVenta(idVenta).subscribe(() => {
      this.obtenerVentas();
    });
  }

  obtenerVentas() {
    this.formSalesService.getVentas().subscribe((ventas) => {
      this.ventas = ventas;
    });
  }
  obtenerClientes() {
    this.formSalesService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  obtenerProductos() {
    this.formSalesService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }
  gotoHeadsets() {
    this.router.navigateByUrl("/headsets");
  }

  gotoUsers() {
    this.router.navigateByUrl("/users");
  }

  gotoHome() {
    this.router.navigateByUrl("/home");
  }
}
