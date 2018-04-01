
import { Component,OnInit } from '@angular/core';
import { Http, Headers ,RequestOptions,URLSearchParams} from "@angular/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment/moment';





@Component({
  selector: 'app-alltwitters',
  templateUrl: './alltwitters.component.html',
  styleUrls: ['./alltwitters.component.css']
})
export class AlltwittersComponent implements OnInit {

  searchquery;
  tweetsdata;
  details = [];
  text;
  name;
  joinDate;
  postImage;
  url;
  created_at;
  media_url;
  imageUrl;
  text1;
  user_id1;
  created_at1;
  description;
  screen_name;
  // profImage=true;
  constructor(private http: Http) {

  }
  ngOnInit() {
    // setTimeout(
    //   function(){ 
    //   location.reload(); 
    //   }, 30000);
    
   
    // this.makecall();
     this.searchcall();
    
//console.log()
  }

  makecall() {
    var headers = new Headers();

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('http://localhost:3000/authorize', { headers: headers }).subscribe((res) => {
      console.log(res);
    });

  }

  searchcall() {
  
    this.details = [];
    var headers = new Headers();
    var searchterm = 'query=' + this.searchquery;

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('http://localhost:3000/search', searchterm, { headers: headers }).subscribe((res) => {
      this.tweetsdata = res.json().data.statuses;
     // console.log(this.tweetsdata);

      for (var i = 0; i < this.tweetsdata.length; i++) {
  
        
        if (this.tweetsdata[i].text) {
          this.text = this.tweetsdata[i].text;
        } else {
          this.text = "unavailable"
        }
        if (this.tweetsdata[i].user.name) {
          this.name = this.tweetsdata[i].user.name;
        } else {
          this.name = "unavailable"
        }
        if (this.tweetsdata[i].user.description) {
          this.description = this.tweetsdata[i].user.description;
        } else {
          this.description = "unavailable"
        }
        if (this.tweetsdata[i].created_at) {
          this.created_at = this.tweetsdata[i].created_at;
        } else {
          this.created_at = "unavailable"
        }
        if (this.tweetsdata[i].entities.media) {
          this.media_url = this.tweetsdata[i].entities.media[0].media_url;
          
        } else {
          this.media_url = "unavailable"
          
        }
        if (this.tweetsdata[i].entities.media) {
          this.url = this.tweetsdata[i].entities.media[0].url;
        } else {
          this.url = "unavailable"
        }
        if (this.tweetsdata[i].user.profile_image_url) {
          //  this.profImage=true;
          this.imageUrl = this.tweetsdata[i].user.profile_image_url;
        } else {
          // this.profImage=false;
          this.imageUrl = "unavailable"
        }

        if (this.tweetsdata[i].user.id) {
          this.user_id1 = this.tweetsdata[i].user.id;
        } else {
          this.user_id1 = "unavailable"
        }
        if (this.tweetsdata[i].user.screen_name) {
          this.screen_name = this.tweetsdata[i].user.screen_name;
        } else {
          this.screen_name = "unavailable"
        }
        let time = this.created_at.split(" ");

      
       
        this.details.push({

          text: this.text,
          name: this.name,
          description: this.description,
          created_at: time[1]+' '+time[0]+' '+time[3],
          postImage: this.media_url,
          url: this.url,
          imageUrl: this.imageUrl,
          screen_name:'https://twitter.com/'+this.screen_name



        });

     
        

      }
   
   

    });

  }




 


}