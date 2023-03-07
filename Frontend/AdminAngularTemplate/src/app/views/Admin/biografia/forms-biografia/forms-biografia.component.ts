import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '../../../../ckeditor 5/ckBuildD/build/ckeditor';

@Component({
  selector: 'app-forms-biografia',
  templateUrl: './forms-biografia.component.html',
  styleUrls: ['./forms-biografia.component.scss']
})
export class FormsBiografiaComponent implements OnInit {

  APIKEy = "wuDYA2WLsQy3aEM5sDRojRYYj"; APIKeySecret = "D5pIJZropa8iuXQ5eK9OTRdRGnIR8nGYobg3Cfa0h4KiNcHGMA"; bearerToken = "AAAAAAAAAAAAAAAAAAAAAJYhmAEAAAAAUiCdGbTgwAqbY8H0gILpaedAeOQ%3DX0GqQKpwEYK8sMeoWhYqIeCfxUXQar0T4hFO4un984qrJiFJRg";



  //@ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
  constructor(private adminService: AdministradorService, private spinner: NgxSpinnerService, private sanitizer: DomSanitizer) {
  }

  urlfb: any = "";
  urltw: any = "";
  urlit: any = "";
  urlttk: any = "";
  datosAsambleistas: any; keyword = 'name'; dataAsmbleista: any = []; idAsambleiApiAsam: string = ""; asamPerfil: boolean = false; idPosicionDataAsam: any;

  urlSet: any;
  urlGet: any = ''; ClaseFoto: string = ""; foto = "";
  public Editor: any = ClassicEditor; datos: string = '<blockquote class="twitter-tweet"><p lang="es" dir="ltr">👀😃🔥<br><br>Un Color histórico vuelve 🔵⚪💡<br><br>🔝Edición Especial 👕<a href="https://twitter.com/hashtag/PorEmelec?src=hash&amp;ref_src=twsrc%5Etfw">#PorEmelec</a> <a href="https://twitter.com/hashtag/SiempreJuntos?src=hash&amp;ref_src=twsrc%5Etfw">#SiempreJuntos</a>🤜🏻🤛🏻⚡ <a href="https://t.co/ssOTya639Z">pic.twitter.com/ssOTya639Z</a></p>&mdash; Club Sport Emelec (@CSEmelec) <a href="https://twitter.com/CSEmelec/status/1631753320384659470?ref_src=twsrc%5Etfw">March 3, 2023</a></blockquote>'; binImg: any; urlImgAssa: any;
  habilitarCampos: boolean = false; notFound: string = "No se encuentra asambleista";


  config = {
    toolbar: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      '|',
      'htmlEmbed',
      'undo',
      'redo',],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
      ]
    },
    codeBlock: {
      languages: [
        { language: 'html', label: 'HTML' }
      ]
    },
    htmlEmbed: {
      showPreviews: true,
      
    },
    lenguage: 'es'
  }

  ngOnInit() {
    this.spinner.show('sample');
    this.cargarPerfilesAsam();
  }

  habilitar() {
    if (this.idAsambleiApiAsam != "")
      this.habilitarCampos = !this.habilitarCampos
  }

  clearVariables() {
    this.habilitarCampos = !this.habilitarCampos;
    this.idAsambleiApiAsam = "";
    this.datos = ""; this.urlfb = ""; this.urlit = ""; this.urlttk = ""; this.urltw = "";
    this.urlGet = "";
  }
  deshabilitar() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cancélalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearVariables();
      }
    })

  }

  public onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let tipoImagen = event.target.files[0].type;
      if (tipoImagen == "image/jpeg" || tipoImagen == "image/png" || tipoImagen == "image/svg") {
        this.foto = event.target.files[0];
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
        this.foto = "";
      }
      this.ClaseFoto = "";
    }
  }


  /*public onSelectFile(event: any) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.binImg = event.target.result;
    }
    reader.readAsText(file);
  }

  public readFile(event: any) {
    //textarea.textContent = event.target.result;
    this.binImg = "event.target.result";
    
  }*/

  updateBiografia() {
    Swal.fire({
      title: 'Esta seguro que desea crear una cuenta?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Crear',
      denyButtonText: `No crear`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let data = {
          'id': this.idAsambleiApiAsam,
          'perfil': this.datos,
          'urlfb': this.urlfb,
          'urltw': this.urltw,
          'urlit': this.urlit,
          'urlttk': this.urlttk,
          'binImg': this.urlSet
        };

        this.adminService.updateBiografia(data).then(() => {
          this.clearVariables();
        }).catch(error => {
          console.log(error);
        })
        Swal.fire('Guardado!', '', 'success')

      } else if (result.isDenied) {
        Swal.fire('No se a guardado la cuenta', '', 'info')
      }
    }) //Actualizar la biografia de los asambleistas

  }

  selectEvent(item: any) {
    // Evento para obtener valor del ng-autocomplete
    //this.cargarPerfilesAsam();
    this.idAsambleiApiAsam = item.id;
    this.cargarBiografiaAsam();

  }

  trasformaImagen(img: any) {
    let objectURL = 'data:image/jpeg;base64,' + img;
    this.urlGet = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  cargarBiografiaAsam() {

    this.adminService.cargarBiografia(this.idAsambleiApiAsam).then(data => {
      let biografia: any = data

      if (biografia.error == "404") {
        this.adminService.getImg(this.idAsambleiApiAsam).subscribe((data: any) => {
          let img = data
          this.urlSet = img[0]['imagen'];

          this.trasformaImagen(img[0]['imagen']);
        });
      } else {
        this.trasformaImagen(biografia['image'][0].imagen);
        //this.datos = biografia.perfil; 
        this.urlfb = biografia.urlfb; this.urlit = biografia.urlit; this.urlttk = biografia.urlttk; this.urltw = biografia.urltw;
      }
    }).catch(error => {
      console.log(error);
    })
  }

  cargarPerfilesAsam() { //Carga los datos en el ng-autocomplete
    this.adminService.cargarPerfiles().then(data => {
      this.dataAsmbleista = data;
      var datoPrueba: any = [{ id: this.dataAsmbleista[1].id, name: this.dataAsmbleista[1].firstName + '' + this.dataAsmbleista[1].lastName, idPos: 1 }];
      for (var i = 2; i < this.dataAsmbleista.length; i++) {
        if (this.dataAsmbleista[i].active == 1) {
          datoPrueba.push({
            "id": this.dataAsmbleista[i].id,
            "name": this.dataAsmbleista[i].firstName + " " + this.dataAsmbleista[i].lastName,
            "idPos": i
          });
        }
      }
      this.datosAsambleistas = datoPrueba;
      this.spinner.hide('sample');
    }).catch(error => {
      console.log(error);
    })
  }

  onClear() {
    this.idAsambleiApiAsam = "";
  }

  spinnerConfig = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };


  async redSocial(URL: any) {
    if (URL == "facebook") {
      if (this.urlfb == null) {
        this.urlfb = "";
      }
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL',
        inputValue: this.urlfb,
        inputPlaceholder: 'URL de perfil de ' + URL,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar"
      })
      if (url) {
        this.urlfb = url
        if (this.urlfb) {

          Swal.fire(`Ingeso la URL: ${this.urlfb}`)
        }
      }
    } else if (URL == "twitter") {
      if (this.urltw == null) {
        this.urltw = "";
      }
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL',
        inputValue: this.urltw,
        inputPlaceholder: 'URL de perfil de ' + URL,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar"
      })
      if (url) {
        this.urltw = url
        if (this.urltw) {

          Swal.fire(`Ingeso la URL: ${this.urltw}`)
        }
      }
    } else if (URL == "instagram") {
      if (this.urlit == null) {
        this.urlit = "";
      }
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL',
        inputValue: this.urlit,
        inputPlaceholder: 'URL de perfil de ' + URL,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar"
      })
      if (url) {
        this.urlit = url
        if (this.urlit) {

          Swal.fire(`Ingeso la URL: ${this.urlit}`)
        }
      }
    } else {
      if (this.urlttk == null) {
        this.urlttk = "";
      }
      const { value: url } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL',
        inputValue: this.urlttk,
        inputPlaceholder: 'URL de perfil de ' + URL,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar"
      })
      if (url) {
        this.urlttk = url
        if (this.urlttk) {

          Swal.fire(`Ingeso la URL: ${this.urlttk}`)
        }
      }
    }



  }
}
function sanitize(inputHtml: any) {
  throw new Error('Function not implemented.');
}

