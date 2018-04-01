import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Ng4TwitterTimelineModule } from 'ng4-twitter-timeline/lib/index';
import { AppRoutingModule } from './app.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Service } from './services/service';


// import { TwitterService } from 'ng2-twitter';


import { AppComponent } from './app.component';
import { MytwitterComponent } from './mytwitter/mytwitter.component';
import { AlltwittersComponent } from './alltwitters/alltwitters.component';
import { LayoutComponent } from './layout/layout.component';
import { SearchingComponent } from './searching/searching.component';


@NgModule({
  declarations: [
    AppComponent,
    MytwitterComponent,
    AlltwittersComponent,
    LayoutComponent,
    SearchingComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpModule,Ng2SearchPipeModule,FormsModule,HttpClientModule,Ng4TwitterTimelineModule.forRoot()
    
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
