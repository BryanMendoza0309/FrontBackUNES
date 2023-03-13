import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class BlogServicesService {
  urlLocal: string;
  urlAWS: string;
  token: any;
  cry: any = localStorage.getItem("token");
  key = "GAMABAML"
  constructor(private http: HttpClient) {
    this.urlLocal = "http://127.0.0.1:8000/api/"
    this.urlAWS = "https://rc5appmobile.tech/api/"
    this.token = CryptoJS.AES.decrypt(this.cry.trim(), this.key.trim()).toString(CryptoJS.enc.Utf8);
  }

  crear_updateBlog(_datos: any) {
    let url = this.urlAWS + 'CrearBlog'

    const httpheaders = new HttpHeaders({
      'Authorization': "Bearer " + this.token
    });

    let formData = new FormData();
    formData.append('categorie_id',  _datos.categorie_id);
    formData.append('perfil_id', _datos.perfils_id);
    formData.append('blogtitulo', _datos.blogtitulo);
    formData.append('blogdescripcion', _datos.blogdescripcion);
    formData.append('blogcontenido', _datos.blogcontenido);
    formData.append('ultimanoticia', _datos.ultimanoticia);
    formData.append('imagen', _datos.imagen);
    formData.append('blog_id', _datos.blog_id);
      
    return new Promise((resolve, reject) => {
      this.http.post(url, formData, {headers: httpheaders }).subscribe(res => {
        resolve(res); {
        }
      }, error => {
        reject(error);
      });
    });
  }

  ListarCateBlog(){
    let url = this.urlAWS + 'ListarCateBlog'

    const httpheaders = new HttpHeaders({
      'Authorization': "Bearer " + this.token
    });

    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: httpheaders }).subscribe(res => {
        resolve(res); {
        }
      }, error => {
        reject(error);
      });
    });
  }

  listarBlog(){
    let url = this.urlAWS + 'ListarBlogsPorAprobar'
    const httpheaders = new HttpHeaders({
      'Authorization': "Bearer " + this.token
    });
    return new Promise((resolve, reject) => {
      this.http.get(url, {headers: httpheaders }).subscribe(res => {
        resolve(res); {
        }
      }, error => {
        reject(error);
      });
    });
  }

}