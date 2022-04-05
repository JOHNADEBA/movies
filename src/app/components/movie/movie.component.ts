import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  @Input() moveieDetails: any;

  @Output() modalShow = new EventEmitter<boolean>();
  showMovieDetail: boolean = true;

  moveieOne = [];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
  ngOnChanges(changes: any) {
    console.log(changes);
  }
  addNewItem() {    
    this.showMovieDetail = !this.showMovieDetail;
    this.modalShow.emit(this.showMovieDetail);
  }
}
