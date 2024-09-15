import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LogginRQ, LogginRS } from '@shared/models/Loggin.model';
import { Usuario } from '@shared/models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);

  constructor() { }

  getLoggin(logginRQ : LogginRQ): Observable<any> {
    return this.http.post<LogginRS>('http://localhost:5024/api/login', logginRQ);
  }

  createUser(user : Usuario){
    return this.http.post('http://localhost:5024/api/createUser', user, 
      {responseType: 'text' as 'json'}
    );
  }
}
