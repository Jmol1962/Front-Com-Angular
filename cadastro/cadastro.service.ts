import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class CadastroService 
{
  baseUrl = "http://localhost:3000/login"
  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }
  showMessege(msg: string, isError: boolean = false): void
  {
    this.snackbar.open(msg, 'x',
    {
      duration: 6000,
      verticalPosition: "top",
      panelClass: isError ? ['errorMsg'] : ['suscessMsg']
    });
  }

  create(cadastro: Cadastro): Observable<Cadastro> 
  {
    return this.http.post<Cadastro>(this.baseUrl, cadastro).
    pipe(map((obj) => obj),
    catchError(e => this.errorMsg(e))
    )
  }

  errorMsg(e: any): Observable<any>
  {
    console.log(e);
    this.showMessege("Erro", true);
    return EMPTY
  }

  read(): Observable<Cadastro[]> 
  {    
    return this.http.get<Cadastro[]>(this.baseUrl)
  }

  updateCadastro(cadastro: Cadastro): Observable<Cadastro>
  {
    const url = "${this.baseUrl}/${cadastro.id}"
    return this.http.put<Cadastro>(url, cadastro)
  }
}
