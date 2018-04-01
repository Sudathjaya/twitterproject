import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers ,RequestOptions,URLSearchParams} from "@angular/http";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  searchquery;

  
  
 
 
  constructor(private router:Router,private http: Http) { }

  ngOnInit() {
    
  }
  searchcall()
{
this.router.navigate(['/search', this.searchquery]);
}
refresh()
{
  location.reload();
}}
