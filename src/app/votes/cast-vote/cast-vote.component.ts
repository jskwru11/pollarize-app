import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoteService } from '../vote.service';
import { Poll } from '../../polls/poll.model';
import { Router } from '@angular/router';
import { PollService } from '../../polls/poll.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromRoot from '../../app.reducer';
import * as VOTE from '../vote.actions';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent implements OnInit {
  voteButtonForm: FormGroup;
  poll: Poll;

  constructor(
    private voteService: VoteService,
    private router: Router,
    private pollService: PollService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.select(fromRoot.getPolls).subscribe(poll => {
      this.poll = poll;
    });
    this.voteButtonForm = new FormGroup({
      vote: new FormControl(null, [Validators.required])
    });
  }

  onSubmitVote() {
    // this.pollService.getPollVote(this.voteButtonForm.value.vote);
    console.log(this.voteButtonForm.value);
    this.store.dispatch(new VOTE.CastVote(this.voteButtonForm.value.vote));
    this.router.navigate(['/viewpoll']);
  }

}
