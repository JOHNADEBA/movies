import { Component, OnInit, Input } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  page: number = 1;
  @Input() clientMovies:any;

  constructor(private allMovies: MoviesApiService) {}

  ngOnInit(): void {
    this.onGetAllMovies(this.page);
  }

  onGetAllMovies(pageNo: number) {
    this.allMovies.getAllMovies(pageNo).subscribe((results: any) => {
      this.clientMovies = [...this.clientMovies, ...results.results];
      console.log(this.clientMovies);
    });
  }

  onLoadMore() {
    this.page += 1;
    this.onGetAllMovies(this.page);
  }
}
