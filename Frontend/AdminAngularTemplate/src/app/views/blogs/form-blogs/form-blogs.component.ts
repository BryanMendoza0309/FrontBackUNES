import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogServicesService } from 'src/app/servicios/blog-services.service';
import * as ClassicEditor from '../../../ckeditor 5/ckBuildD/build/ckeditor';
import Swal from 'sweetalert2';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-blogs',
  templateUrl: './form-blogs.component.html',
  styleUrls: ['./form-blogs.component.scss']
})
export class FormBlogsComponent implements OnInit {
  urlGet: any = '';
  urlSet: any = '';
  @Input() datosEdit: any;
  @Output() cargarListBlog = new EventEmitter<void>();
  miControl: any = new FormControl('', Validators.required);
  public datos: any = ""; public Editor: any = ClassicEditor;
  titulo: string = ''; descripcion: string = ''; importante = 0; categorie_id: any = "Seleccione una categoría"; blog_id = "";
  listCateg: any; frameWidth: number = 900;
  frameHeight: number = 250;
  check: boolean = false;
  constructor(private spinnerService: SpinnerService, private service: BlogServicesService) {

  }


  ngOnInit(): void {
    if (this.datosEdit) {
      this.urlGet = this.datosEdit.urlGet;
      this.categorie_id = this.datosEdit.categoria;
      this.titulo = this.datosEdit.blogtitulo;
      this.descripcion = this.datosEdit.blogdescripcion;
      this.datos = this.datosEdit.blogcontenido;
      this.blog_id = this.datosEdit.id;
      this.urlSet = this.datosEdit.urlSet;
      this.importante = this.datosEdit.ultNoticia;
      
      this.import(true);
    }
    this.listarCategoriasBlog();
  }

  listarCategoriasBlog() {
    this.spinnerService.llamarSpinner();
    this.service.ListarCateBlog().then((data: any) => {
      this.listCateg = data;
      this.spinnerService.detenerSpinner();
    })
  }

  public config = {
    toolbar: [
      'heading', '|',
      'fontfamily', 'fontsize',
      'alignment',
      'fontColor', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'code', 'htmlEmbed', '|',
      'blockQuote', '|',
      'undo', 'redo'],
    shouldNotGroupWhenFull: true,
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
      ]
    }, htmlEmbed: {
      showPreviews: true,
      sanitizeHtml: (inputHtml: any) => {
        const outputHtml = inputHtml;
        return {
          html: outputHtml,
          hasChanged: true
        };
      }
    },

    lenguage: 'es'
  }

  public onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let tipoImagen = event.target.files[0].type;
      if (tipoImagen == "image/jpeg" || tipoImagen == "image/png" || tipoImagen == "image/svg") {
        var reader = new FileReader();
        let base64String;
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.urlGet = event.target.result;
          base64String = event.target.result.replace("data:", "")
            .replace(/^.+,/, "");
          this.urlSet = base64String;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡No es una Imagen..!',
          text: 'Elija una imagen.'
        })
      }
    }
  }


  create() {
    if(this.urlGet != '' && this.urlGet != '' && this.categorie_id != 'Seleccione una categoría' && this.titulo!='' && this.descripcion != '' && this.datos != ''){
      
      Swal.fire({
        title: 'Esta seguro que desea crear una cuenta?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Crear',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.spinnerService.llamarSpinner();
          let data = {
            'categorie_id': this.categorie_id,
            'blogtitulo': this.titulo,
            'blogdescripcion': this.descripcion,
            'blogcontenido': this.datos,
            'ultimanoticia': this.importante,
            'imagen': this.urlSet,
            'blog_id': this.blog_id
          }
          
          this.service.crear_updateBlog(data).then(() => {
            this.spinnerService.detenerSpinner();
            this.onReset2();
          }).catch((error) => {
            this.spinnerService.detenerSpinner();
            console.log(error);
          })
  
        } else if (result.isDenied) {
          Swal.fire('No se a guardado la cuenta', '', 'info')
        }
      })
    }else{
      Swal.fire(
        'Campos vacíos?',
        'Tiene que llenar todos los campos!',
        'question'
      )
    }
    
    

  }

  alert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: 'Blog actualizado!'
    })
  }

  onReset2() {
    Swal.fire('Guardado!', '', 'success')
    if (this.datosEdit) {
      this.alert();
      this.cargarListBlog.emit();
    }
    this.categorie_id = "Seleccione una categoría"; this.titulo = ""; this.descripcion = ""; this.datos = ""
    this.blog_id = ""; this.check = false; this.urlSet = ""; this.urlGet = ""; this.importante = 0;
  }

  import(_edit: boolean) {
    if (_edit == true) {
      if (this.importante == 1) {
        this.check = true
      } else {
        this.check = false
      }
    } else {
      if (this.importante == 0) {
        this.importante = 1
        this.check = true
      } else {
        this.importante = 0
        this.check = false
      }
    }
  }

}
