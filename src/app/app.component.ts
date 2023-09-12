import { Component } from '@angular/core';
import { Contacto } from './modelos/contact';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { ContactoService } from './servicios/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-232';
  contactoArray: Contacto[] = [];
  contactoForm: FormGroup;
  actualizarContactos: boolean = false; 

  constructor(private formbuilder: FormBuilder, private ContactoService: ContactoService) {
    this.contactoForm = formbuilder.group({
      fullname: [''],
      phone: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.getContactos();
  }

  getContactos() {
    this.ContactoService.getContactos().subscribe(
      (result: any) => {
        this.contactoArray = result?.contactos;
        console.log(this.contactoArray);
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia...',
          text: '¡Ha ocurrido un error!',
        });
      }
    );
  }

  registrarContacto(): void {
    this.ContactoService.registrarContacto(this.contactoForm.value).subscribe(
      (result: any) => {
        
        this.actualizarContactos = true;

        this.getContactos();


        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Contacto registrado con éxito.',
        });
      },
      (err: any) => {
       
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '¡Ha ocurrido un error al registrar!',
        });
      }
    );
  }
}
