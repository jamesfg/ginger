import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author.model';
import { Service } from '../services/service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  loading = false;
  page = 1;
  authors: Author[] = [];
  private today = new Date();
  sixMonths = new Date(this.today.setMonth(this.today.getMonth() - 6));
  
  constructor(public service: Service) {
    this.loadPage();
  }

  ngOnInit(): void {
  }

  loadPage() {
    this.loading = true;
    this.service.getAuthors(this.page).subscribe((items: Author[]) => {
      this.authors = this.authors.concat(items);
      this.page += 1;
      this.loading = false;
    });
  }
}
