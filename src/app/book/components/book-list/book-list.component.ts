import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books?: Book[];
  currentBook: Book = {};
  currentIndex = -1;
  title = '';

  constructor(private _bookService: BookService, private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this._bookService.getAll()
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = {};
    this.currentIndex = -1;
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }


  // removeAllBooks(): void {
  //   this._bookService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.refreshList();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  removeAllBooks(): void {
    this._bookService.getAll().subscribe(r=>{
      r.forEach(e=>{

        this._bookService.deleteAll(e.id)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
          // console.log(error);
          });
      })
      this.refreshList();
      this._toastr.warning('Thanks!', 'Successfully deleted all book!');

    })
   
  }

  searchTitle(): void {
    this.currentBook = {};
    this.currentIndex = -1;

    this._bookService.findByTitle(this.title)
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
