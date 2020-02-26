import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Poll } from '../poll.model';
import { PollService } from '../poll.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-polls',
  templateUrl: './user-polls.component.html',
  styleUrls: ['./user-polls.component.css']
})
export class UserPollsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Poll>();
  displayColumns: string[] = [
    'date',
    'question',
    'state',
    'url'
  ];

  constructor(private ps: PollService) { }

  ngOnInit() {
    this.ps.getPolls()
    .subscribe(polls => {
      this.dataSource.data = polls;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
