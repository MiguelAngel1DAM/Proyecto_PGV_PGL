import { Component, OnInit } from '@angular/core';
import { FormSalesService } from '../services/form-sales.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { HeadsetsService } from '../services/headsets.service';

@Component({
  selector: 'app-form-sales',
  templateUrl: './form-sales.page.html',
  styleUrls: ['./form-sales.page.scss'],
})
export class FormSalesPage implements OnInit {
  clienteId: number | null = null;
  productoId: number | null = null;
  ventas: any[] = [];
  Users: any = [];
  Headsets: any = [];
  clienteName: string = '';
  productoName: string = '';

  constructor(private formSalesService: FormSalesService,
     private router: Router
    ,  private userService: UsersService,
    private headsetService: HeadsetsService) {}

  ngOnInit() {
    this.getAllUsers();
    this.getAllHeadsets();
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

  getAllUsers(){
    this.userService.getUser().subscribe(response=>{
      this.Users = response;
    })
  }

  getAllHeadsets() {
    this.headsetService.getHeadset().subscribe(response => {
      this.Headsets = response;
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
