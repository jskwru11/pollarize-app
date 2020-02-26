import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { FlashMessagesService} from 'angular2-flash-messages';

import { VoteService } from '../../votes/vote.service';
import * as fromRoot from '../../app.reducer';
import * as POLLS from '../polls.actions';
import * as VOTE from '../../votes/vote.actions';
import { VoteData } from '../../votes/vote.model';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  createPollForm: FormGroup;
  options: FormArray;
  optionsArray: string[] = [];
  user;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private voteService: VoteService,
    private ps: PollService,
    private db: AngularFirestore,
    private store: Store<fromRoot.State>,
    private fms: FlashMessagesService) { }

  ngOnInit() {
    this.createPollForm = this.formBuilder.group({
      question: '',
      options: this.formBuilder.array([this.createOptions() ])
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(`the current user profile: ${JSON.stringify(this.user)}`);
  }

  createOptions() {
    return this.formBuilder.group({
      option: ''
    });
  }

  addOptions(): void {
    this.options = this.createPollForm.get('options') as FormArray;
    this.options.push(this.createOptions());
  }

  getControls() {
    return (this.createPollForm.get('options') as FormArray).controls;
  }

  onSubmit() {
    const optionData: VoteData[] = [];
    this.createPollForm.value.options.forEach(option => {
      this.optionsArray.push(option.option);
      optionData.push({answer: option.option, voteCount: 0});
    });
    this.store.dispatch(new VOTE.CreateVoteData(optionData));
    const poll = {
      question: this.createPollForm.value.question,
      options: this.optionsArray,
      date: new Date(),
      state: 'open',
      count: 0
    };
    this.ps.addPoll(poll);
    // this.fms.show('A new Poll has been created', { cssClass: 'showGreen', timeout: 4000});
    this.voteService.addVote(poll);
    this.router.navigate([`/polls/${this.user.userId}`]);
  }

}
