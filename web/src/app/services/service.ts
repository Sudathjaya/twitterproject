import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'; // ! Dont forget to Import Observable !

@Injectable()

export class Service {

  constructor(private http: Http) { }


  
}

