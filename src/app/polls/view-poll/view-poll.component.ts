import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { VoteService } from '../../votes/vote.service';
import { PollService } from '../poll.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.css']
})
export class ViewPollComponent implements OnInit {
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  private vote: string;

  constructor(
    private voteService: VoteService,
    private pollService: PollService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select(fromRoot.getVoteData).subscribe(voteData => {
      voteData.forEach(vData => {
        this.doughnutChartLabels.push(vData.answer);
        this.doughnutChartData.push(vData.voteCount);
      });
    });
    // const options = this.voteService.getVote().options;
    // this.vote = this.pollService.calculateVote().answer;
    // options.forEach(option => {
    //   this.doughnutChartLabels.push(option.option);
    //   if (option.option === this.vote.option) {
    //     this.doughnutChartData.push(1);
    //   } else {
    //     this.doughnutChartData.push(0);
    //   }
    // });
  }

}
