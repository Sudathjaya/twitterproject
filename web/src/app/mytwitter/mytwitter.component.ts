import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { Ng4TwitterTimelineService } from 'ng4-twitter-timeline/lib/index';
declare var $: any;


@Component({
  selector: 'app-mytwitter',
  templateUrl: './mytwitter.component.html',
  styleUrls: ['./mytwitter.component.css']
})
export class MytwitterComponent implements OnInit {
  response;
  incoming_text;
  incoming_created_at;
  incoming_description;
  incoming_name;
  incoming_profile_image_url;
  incoming_screen_name;
  incoming_location;
  incoming_followers_count;
  mediaurl;
  details = [];
  replyurl;
  month1: number;
  previousMentions;
  followingtwittes;
  followings = [];
  following_name;
  following_profile_image_url;
  following_url;
  following_created_at;
  following_description;
  following_favourites_count;
  following_followers_count;
  following_friends_count;
  following_location;
  following_screen_name;
  hometimeline;
  follower_location;
  followers_count;
  follower_profile_image_url;
  follower_notifications;
  follower_screen_name;
  follower_created_at;
  follower_name;
  follower_description;
  followerArray = [];
  followrs;
  ht_created_at
  ht_id
  ht_text
  ht_url
  ht_type
  ht_user_favourites_count
  ht_user_friends_count
  ht_user_followers_count
  ht_user_location
  ht_user_name
  ht_user_profile_image_url
  ht_user_screen_name
  ht_expanded_url;
  ht_extended_entities_url;
  ht_media_url
  homeDeatils = [];
  daly;
  dateTo;
  homeDbData;
  ht_expanded2_url;
  constructor(private http: Http) {
    this.makecall();
    this.mytweets();
    this.followingList();
    this.followerList();
 }
 ngOnInit() {
    this.hometimeLine();
    setTimeout(
      function () {
        location.reload();
      }, 100000);
  }
  makecall() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('http://localhost:3000/authorize', { headers: headers }).subscribe((res) => {
    });
  }
  hometimeLine() {
   // this.homeDeatils = [];
   console.log(this.homeDeatils);
    this.http.get('http://localhost:3000/getHomeTimeline').subscribe((res) => {
      this.hometimeline = res.json();
      console.log("this.hometimeline",this.hometimeline.length);
    if(this.hometimeline.lenth!=0){ 
    
      for (var i = 0; i < this.hometimeline.length; i++) {
        if (this.hometimeline[i].id) {
          this.ht_id = this.hometimeline[i].id;
        } else {
          this.ht_id = "unavailable"
        }
        if (this.hometimeline[i].created_at) {
          this.ht_created_at = this.hometimeline[i].created_at;
        } else {
          this.ht_created_at = "unavailable"
        }
        if (this.hometimeline[i].text) {
          this.ht_text = this.hometimeline[i].text;
        } else {
          this.ht_text = "unavailable"
        }
        if (this.hometimeline[i].entities.media) {
          this.ht_url = this.hometimeline[i].entities.media[0].url;
        } else {
          this.ht_url = "unavailable"
        }
        if (this.hometimeline[i].entities.media) {
          this.ht_media_url = this.hometimeline[i].entities.media[0].media_url;
        } else {
          this.ht_media_url = "unavailable"
        }
        if (this.hometimeline[i].entities.media) {
          this.ht_type = this.hometimeline[i].entities.media[0].type;
        } else {
          this.ht_type = "unavailable"
        }
        if (this.hometimeline[i].user.screen_name) {
          this.ht_user_screen_name = this.hometimeline[i].user.screen_name;
        } else {
          this.ht_user_screen_name = "unavailable"
        }
        if (this.hometimeline[i].user.profile_image_url) {
          this.ht_user_profile_image_url = this.hometimeline[i].user.profile_image_url;
        } else {
          this.ht_user_profile_image_url = "unavailable"
        }
        if (this.hometimeline[i].user.name) {
          this.ht_user_name = this.hometimeline[i].user.name;
        } else {
          this.ht_user_name = "unavailable"
        }
        if (this.hometimeline[i].extended_entities) {
         if (this.hometimeline[i].extended_entities.media) {
            if (this.hometimeline[i].extended_entities.media[0]) {
              if (this.hometimeline[i].extended_entities.media[0].video_info) {
                if (this.hometimeline[i].extended_entities.media[0].video_info) {
                  if (this.hometimeline[i].extended_entities.media[0].video_info.variants) {
                    if (this.hometimeline[i].extended_entities.media[0].video_info.variants[0]) {
                      this.ht_extended_entities_url = this.hometimeline[i].extended_entities.media[0].video_info.variants[0].url;
                      this.ht_media_url = "unavailable"
                    } else {
                      this.ht_extended_entities_url = "unavailable"
                    }
                  } else {
                    this.ht_extended_entities_url = "unavailable"
                  }
                } else {
                  this.ht_extended_entities_url = "unavailable"
                }
              } else {
                this.ht_extended_entities_url = "unavailable"
              }

            } else {
              this.ht_extended_entities_url = "unavailable"
            }
          }
          else {
            this.ht_extended_entities_url = "unavailable"
          }
        } else {
          this.ht_extended_entities_url = "unavailable"
        }
       // console.log('month,',this.ht_created_at);
        let time = this.ht_created_at.split(" ");
        let month = time[1];
        month = month.toLowerCase();
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        let month1 = months.indexOf(month) + 1;
        let datetime = time[5] + "-" + month1 + "-" + time[2] + " " + time[3];
      //  console.log('month,',datetime);
        let details = {
          ht_post_id: this.ht_id,
          ht_post_created_at: datetime,
          ht_url: this.ht_url,
          ht_user_screen_name: 'https://twitter.com/' + this.ht_user_screen_name,
          ht_user_profile_image_url: this.ht_user_profile_image_url,
          ht_media_url: this.ht_media_url,
          ht_user_screen_name_display: this.ht_user_screen_name,
          ht_extended_entities_url: this.ht_extended_entities_url
        }
        this.saveHomeTimeline(details);
        this.homeDeatils.push({
          ht_created_at: datetime,
          ht_text: this.ht_text,
          ht_url: this.ht_url,
          ht_type: this.ht_type,
          ht_user_name: this.ht_user_name,
          ht_user_profile_image_url: this.ht_user_profile_image_url,
          ht_user_screen_name_url: 'https://twitter.com/' + this.ht_user_screen_name,
          ht_user_screen_name: this.ht_user_screen_name,
          ht_media_url: this.ht_media_url,
          ht_extended_entities_url: this.ht_extended_entities_url
        });
      }
    }
    });
  }
  
  saveHomeTimeline(data) {
    var headers = new Headers();
    var searchterm = 'ht_post_id=' + data.ht_post_id +
      '&ht_post_created_at=' + data.ht_post_created_at +
      '&ht_url=' + data.ht_url +
      '&ht_user_screen_name=' + data.ht_user_screen_name +
      '&ht_user_profile_image_url=' + data.ht_user_profile_image_url +
      '&ht_media_url=' + data.ht_media_url +
      '&ht_user_screen_name_display=' + data.ht_user_screen_name_display +
      '&ht_extended_entities_url=' + data.ht_extended_entities_url;
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return this.http.post('http://localhost:3000/saveHomeTimeline', searchterm, { headers: headers }).subscribe((res) => {
    })
  }
  mytweets() {
    this.details = [];
    this.http.get('http://localhost:3000/getTimeline').subscribe((res) => {
      this.response = res.json();
      for (var i = 0; i < this.response.length; i++) {
        if (this.response[i].text) {
          this.incoming_text = this.response[i].text;
        } else {
          this.incoming_text = "unavailable"
        }
        if (this.response[i].created_at) {
          this.incoming_created_at = this.response[i].created_at;
        } else {
          this.incoming_created_at = "unavailable"
        }
        if (this.response[i].user.name) {
          this.incoming_name = this.response[i].user.name;
        } else {
          this.incoming_name = "unavailable"
        }
        if (this.response[i].user.description) {
          this.incoming_description = this.response[i].user.description;
        } else {
          this.incoming_description = "unavailable"
        }
        if (this.response[i].user.profile_image_url) {
          this.incoming_profile_image_url = this.response[i].user.profile_image_url;
        } else {
          this.incoming_profile_image_url = "unavailable"
        }
        if (this.response[i].user.screen_name) {
          this.incoming_screen_name = this.response[i].user.screen_name;
        } else {
          this.incoming_screen_name = "unavailable"
        }
        if (this.response[i].user.location) {
          this.incoming_location = this.response[i].user.location;
        } else {
          this.incoming_location = "unavailable"
        }
        if (this.response[i].user.followers_count) {
          this.incoming_followers_count = this.response[i].user.followers_count;
        } else {
          this.incoming_followers_count = "unavailable"
        }
        if (this.response[i].entities.media) {
          this.mediaurl = this.response[i].entities.media[0].media_url;
          this.replyurl = this.response[i].entities.media[0].url;
        } else {
          this.mediaurl = "unavailable";
          this.replyurl = "unavailable"
        }
        let time = this.incoming_created_at.split(" ");
        let month = time[1];
        month = month.toLowerCase();
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        this.month1 = months.indexOf(month) + 1;
        let datetime = time[5] + "-" + this.month1 + "-" + time[2] + " " + time[3];
        let data = {
          name: this.incoming_name,
          url: 'https://twitter.com/' + this.incoming_screen_name,
          imageurl: this.incoming_profile_image_url,
          postImage: this.mediaurl,
          replytourl: this.replyurl,
          created_at: datetime
        }
        this.saveincomeText(data)
        this.details.push({
          text: this.incoming_text,
          name: this.incoming_name,
          description: this.incoming_description,
          created_at: time[1] + ' ' + time[0] + ' ' + time[3],
          url: 'https://twitter.com/' + this.incoming_screen_name,
          screen_name: "@" + this.incoming_screen_name,
          imageUrl: this.incoming_profile_image_url,
          location: this.incoming_location,
          followers_count: this.incoming_followers_count,
          postImage: this.mediaurl,
          replyurl: this.replyurl
        });
      }
    });
    this.getPreviousTwittes();
  }
  saveincomeText(data) {
    var headers = new Headers();
    var searchterm = 'name=' + data.name + '&url=' + data.url + '&imageurl=' + data.imageurl + '&postimage=' + data.postImage + '&replytourl=' + data.replytourl + '&created_at=' + data.created_at;
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    return this.http.post('http://localhost:3000/saveincomeText', searchterm, { headers: headers }).subscribe((res) => {
    })
  }
  getPreviousTwittes() {
    return this.http.get('http://localhost:3000/getPreviousTwittes').subscribe((preData) => {

      this.previousMentions = preData.json();
    });
  }
  followingList() {
    this.followings = [];
    var headers = new Headers();
    var searchterm = 'query=' + 'BrentonAGM';
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('http://localhost:3000/timeline', searchterm, { headers: headers }).subscribe((res) => {
      this.followingtwittes = res.json().data;
      for (var i = 0; i < this.followingtwittes.users.length; i++) {
        if (this.followingtwittes.users[i].name) {
          this.following_name = this.followingtwittes.users[i].name;
        } else {
          this.following_name = "unavailable"
        }
        if (this.followingtwittes.users[i].profile_image_url) {
          this.following_profile_image_url = this.followingtwittes.users[i].profile_image_url;
        } else {
          this.following_profile_image_url = "unavailable"
        }
        if (this.followingtwittes.users[i].url) {
          this.following_url = this.followingtwittes.users[i].url;
        } else {
          this.following_url = "unavailable"
        }
        if (this.followingtwittes.users[i].created_at) {
          this.following_created_at = this.followingtwittes.users[i].created_at;
        } else {
          this.following_created_at = "unavailable"
        }
        if (this.followingtwittes.users[i].description) {
          this.following_description = this.followingtwittes.users[i].description;
        } else {
          this.following_description = "unavailable"
        }
        if (this.followingtwittes.users[i].favourites_count) {
          this.following_favourites_count = this.followingtwittes.users[i].favourites_count;
        } else {
          this.following_favourites_count = "unavailable"
        }
        if (this.followingtwittes.users[i].followers_count) {
          this.following_followers_count = this.followingtwittes.users[i].followers_count;
        } else {
          this.following_followers_count = "unavailable"
        }
        if (this.followingtwittes.users[i].friends_count) {
          this.following_friends_count = this.followingtwittes.users[i].friends_count;
        } else {
          this.following_friends_count = "unavailable"
        }
        if (this.followingtwittes.users[i].location) {
          this.following_location = this.followingtwittes.users[i].location;
        } else {
          this.following_location = "unavailable"
        }
        if (this.followingtwittes.users[i].screen_name) {
          this.following_screen_name = this.followingtwittes.users[i].screen_name;
        } else {
          this.following_screen_name = "unavailable"
        }
        let time = this.following_created_at.split(" ");
        this.followings.push({
          name: this.following_name,
          description: this.following_description,
          created_at: time[1] + ' ' + time[0] + ' ' + time[3],
          Image: this.following_profile_image_url,
          freind_count: this.following_friends_count,
          followers_count: this.following_favourites_count,
          follower_location: this.following_location,
          favourites_count: this.following_favourites_count,
          following_url: this.following_url,
          following_screen_name_url: 'https://twitter.com/' + this.following_screen_name,
          following_screen_name: this.following_screen_name
        });
      }
    });
    this.getHomePreDetails();
  }
  followerList() {
    this.followerArray = [];
    var headers = new Headers();
    var searchterm = 'query=' + 'BrentonAGM';
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    this.http.post('http://localhost:3000/followers', searchterm, { headers: headers }).subscribe((res) => {
      this.followrs = res.json().data;
      for (var i = 0; i < this.followrs.users.length; i++) {
        if (this.followrs.users[i].name) {
          this.follower_name = this.followrs.users[i].name;
        } else {
          this.follower_name = "unavailable"
        }
        if (this.followrs.users[i].created_at) {
          this.follower_created_at = this.followrs.users[i].created_at;
        } else {
          this.follower_created_at = "unavailable"
        }
        if (this.followrs.users[i].description) {
          this.follower_description = this.followrs.users[i].description;
        } else {
          this.follower_description = "unavailable"
        }
        if (this.followrs.users[i].screen_name) {
          this.follower_screen_name = this.followrs.users[i].screen_name;
        } else {
          this.follower_screen_name = "unavailable"
        }
        if (this.followrs.users[i].notifications) {
          this.follower_notifications = this.followrs.users[i].notifications;
        } else {
          this.follower_notifications = "unavailable"
        }
        if (this.followrs.users[i].profile_image_url) {
          this.follower_profile_image_url = this.followrs.users[i].profile_image_url;
        } else {
          this.follower_profile_image_url = "unavailable"
        }
        if (this.followrs.users[i].followers_count) {
          this.followers_count = this.followrs.users[i].followers_count;
        } else {
          this.followers_count = "unavailable"
        }
        if (this.followrs.users[i].location) {
          this.follower_location = this.followrs.users[i].location;
        } else {
          this.follower_location = "unavailable"
        }
        let time = this.follower_created_at.split(" ");
        this.followerArray.push({
          screen_name: 'https://twitter.com/' + this.follower_screen_name,
          dispaly_screen_name: "@" + this.follower_screen_name,
          name: this.follower_name,
          description: this.follower_description,
          created_at: time[1] + ' ' + time[0] + ' ' + time[3],
          Image: this.follower_profile_image_url,
          notifications: this.follower_notifications,
          followers_count: this.followers_count,
          follower_location: this.follower_location
        });
      }
    });
  
  }
  getHomePreDetails() {
    return this.http.get('http://localhost:3000/getHomePreDetails').subscribe((preData) => {
      this.homeDbData = preData.json();
    });
  }
}
