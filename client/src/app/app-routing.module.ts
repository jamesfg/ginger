import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', component: TermsComponent },
  { path: 'articles', component: TermsComponent },
  { path: 'authors', component: AuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
