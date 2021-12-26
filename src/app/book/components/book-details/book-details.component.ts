import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book/models/book.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  currentBook: Book = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private _bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.params.id);
    // console.log(this.route.snapshot.params.id)
  }

  getBook(id: string): void {
    this._bookService.get(id)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentBook.title,
      description: this.currentBook.description,
      published: status
    };

    this.message = '';

    this._bookService.update(this.currentBook.id, data)
      .subscribe(
        response => {
          this.currentBook.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
          this._toastr.info('Thanks!', this.message);
        },
        error => {
          console.log(error);
        });
  }

  updateBook(): void {
    this.message = '';

    this._bookService.update(this.currentBook.id, this.currentBook)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This tutorial was updated successfully!';
          this._toastr.success('Thanks!', 'Successfully Updated book!');
        },
        error => {
          console.log(error);
        });
  }

  deleteBook(): void {
    this._bookService.delete(this.currentBook.id)
      .subscribe(
        response => {
          console.log(response);
          window.alert('Conform want to delete ???');
          this.router.navigate(['/book-list']);
          this._toastr.warning('Thanks!', 'Successfully deleted book!');
        },
        error => {
          console.log(error);
        });
  }

}
