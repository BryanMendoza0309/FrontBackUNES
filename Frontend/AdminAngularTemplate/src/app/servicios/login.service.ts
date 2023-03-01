import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  ValidarLogin(data: any) {
    let formData = new FormData();
    let url = 'https://rc5appmobile.tech/api/Login';
    formData.append('email', data.email);
    formData.append('password', data.password);
    debugger
    return new Promise((resolve, reject) => {
      this.http.post(url, formData).subscribe(res => {
        resolve(res); {
        }
      }, error => {
        reject(error);
      });
    });
  }
}
