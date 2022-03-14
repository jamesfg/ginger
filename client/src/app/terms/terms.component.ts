import { Component, OnInit } from '@angular/core';
import { Metadata } from '../models/metadata.model';
import { Service } from '../services/service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  articles: Metadata[] = [];
  page = 1;
  loading = false;
  
  constructor(public service: Service) {
    this.loadPage();
  }

  ngOnInit(): void {
  }

  openArticle(url: string) {
    window.open(url, "_blank");
  }

  loadPage() {
    this.loading = true;
    this.service.getTerms(this.page).subscribe((items: Metadata[]) => {
      this.articles = this.articles.concat(items);
      this.page += 1;
      this.loading = false;
    });
  }
}
