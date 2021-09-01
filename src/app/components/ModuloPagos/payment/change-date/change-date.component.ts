import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-date',
  templateUrl: './change-date.component.html',
  styleUrls: ['./change-date.component.css']
})

export class ChangeDateComponent implements OnInit {
  index = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 ];

  constructor() { }

  ngOnInit(): void {
  }

}
