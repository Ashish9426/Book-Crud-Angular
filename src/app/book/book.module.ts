import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BookRoutingModule } from './book-routing.module';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';



@NgModule({
  declarations: [AddBookComponent, BookListComponent, BookDetailsComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class BookModule { }
