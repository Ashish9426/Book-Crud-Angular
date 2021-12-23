import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'', loadChildren:()=>import('./book/book.module').then(mod=>mod.BookModule)
  },
  {
    path:'book', loadChildren:()=>import('./book/book.module').then(mod=>mod.BookModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
