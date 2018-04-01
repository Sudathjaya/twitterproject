import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytwitterComponent } from './mytwitter/mytwitter.component';
import { AlltwittersComponent } from './alltwitters/alltwitters.component';
import { LayoutComponent } from './layout/layout.component';
import { SearchingComponent } from './searching/searching.component';




 
export const routes: Routes = [      
    {
        path:'',
        component:MytwitterComponent
      },
    
    
    
    {
      path:'alltwite',
      component:AlltwittersComponent
    },
    {
        path:'search/:id',
        component:SearchingComponent
      }
 
   
];

  


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
