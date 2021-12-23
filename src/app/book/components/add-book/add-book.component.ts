import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/book/models/book.model';
import { BookService } from 'src/app/book/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private _bookService: BookService, private _toastr:ToastrService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      title: this.book.title,
      description: this.book.description
    };

    this._bookService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this._toastr.success('Thanks!', 'Successfully added book!');
      },
      error => {
        console.log(error);
      });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      description: '',
      published: false
    };
  }

}
