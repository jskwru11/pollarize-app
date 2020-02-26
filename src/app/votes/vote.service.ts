import { Injectable } from '@angular/core';
import { Poll} from '../polls/poll.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '.././app.reducer';
import * as POLLS from '.././polls/polls.actions';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  vote: Poll;
  availablePollsChanged = new Subject<Poll>();
  votes: Observable<Poll[]>;
  votesCollection: AngularFirestoreCollection<Poll>;
  voteDoc: AngularFirestoreDocument<Poll>;

  constructor(
    private db: AngularFirestore,
    private store: Store<fromRoot.State>
    ) { }

  getVoteById() {
    this.db.collection('availablePolls').snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map((obj: any) => {
        return {
          id: obj.payload.doc.data().id,
          question: obj.payload.doc.data().question,
          options: obj.payload.doc.data().payload
        };
      });
    }))
    .subscribe(vote => {
      // this.vote = vote;
      this.availablePollsChanged.next();
    });
    return { ...this.vote };
  }

  addVote(vote: Poll) {
    this.store.dispatch(new POLLS.PollCreated(vote));
    this.db.collection('availablePolls').add({ ...vote, id: this.db.collection('availablePolls').ref.doc().id })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
