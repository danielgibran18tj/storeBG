import * as forge from 'node-forge';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LogginRQ, LogginRS } from '@shared/models/Loggin.model';
import { Usuario } from '@shared/models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private publicKey: string = '';
  private http = inject(HttpClient);

  constructor() { }

  createUser(user : Usuario){
    return this.http.post('http://localhost:5024/api/createUser', user,
      {responseType: 'text' as 'json'}
    );
  }


  async getLoggin(logginRQ : LogginRQ): Promise<Observable<any>> {
    await this.getPublicKey();
    const encryptedCredentials = this.encryptCredentials(logginRQ.username, logginRQ.password);
    const loginRequest = {
      EncryptedCredentials: encryptedCredentials
    };
    console.log("loginRequest: ", loginRequest)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<LogginRS>(
      'http://localhost:5024/api/login',
      JSON.stringify(loginRequest),
      { headers } // Agregar los encabezados a la solicitud
    );
  }


  // Hacemos la petición HTTP para obtener la clave pública
  async getPublicKey(): Promise<void> {
    return this.http.get<any>('http://localhost:5024/api/public-key').toPromise().then((data) => {
      const modulusBytes = forge.util.hexToBytes(data.modulus);
      console.log("Modulus byte length: ", modulusBytes.length); // Debería ser 256 bytes
      const { modulus, exponent } = data;
      this.publicKey = this.convertToPem(modulus, exponent);
    });
  }

  // Convertir Modulus y Exponent a formato PEM
  private convertToPem(modulus: string, exponent: string): string {
    const mod = forge.util.createBuffer(forge.util.hexToBytes(modulus));
    const exp = forge.util.createBuffer(forge.util.hexToBytes(exponent));
    const publicKey = forge.pki.setRsaPublicKey(
      new forge.jsbn.BigInteger(mod.toHex(), 16),
      new forge.jsbn.BigInteger(exp.toHex(), 16)
    );
    return forge.pki.publicKeyToPem(publicKey);
  }

  // Encriptar las credenciales usando la clave pública
  encryptCredentials(username: string, password: string) :string {
    const publicKey = forge.pki.publicKeyFromPem(this.publicKey);
    const credentials = JSON.stringify({ username, password });
    const encrypted = publicKey.encrypt(credentials, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);;
  }

}
