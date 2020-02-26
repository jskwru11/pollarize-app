import { Injectable } from '@angular/core';
import { Poll } from './poll.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PollService {
  user;
  poll: Observable<Poll>;
  polls: Observable<Poll[]>;
  pollsCollection: AngularFirestoreCollection<Poll>;
  pollDoc: AngularFirestoreDocument<Poll>;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
      // TODO: Get the user id to add to the user collection
      this.user = this.afAuth.authState.pipe(switchMap(user => {
        if (user) {
          return this.db.doc<Poll>(`avaiablePolls/${user.email}`).valueChanges();
        } else {
          return of(null);
        }
      }));

      // TODO: get the items from the user collection
      this.pollsCollection = this
      .db
      .collection(`${this.user.id}/availablePolls`, ref => ref.orderBy('question', 'asc'));
      // console.log(`this is what is in the collection: ${JSON.stringify(this.pollsCollection)}`);

    }

    getPolls(): Observable<Poll[]> {
      this.polls = this.pollsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Poll;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
      return this.polls;
    }

    addPoll(poll: Poll) {
      const dataPoll = poll;
      dataPoll.url = `http://localhost:4200/poll/${this.user.id}/${poll.question}`;
      this.pollsCollection.add(poll);
    }

    getPollById(id: string): Observable<Poll> {
      this.pollDoc = this.db.doc<Poll>(`availablePolls/${id}`);
      this.poll = this.pollDoc.snapshotChanges()
      .pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Poll;
          data.id = action.payload.id;
          return data;
        }
      }));
      return this.poll;
    }

    updatePoll(poll: Poll) {
      this.pollDoc = this.db.doc<Poll>(`availablePolls/${poll.id}`);
      this.pollDoc.update(poll);
    }

    deletePoll(poll: Poll) {
      this.pollDoc = this.db.doc<Poll>(`availablePolls/${poll.id}`);
      this.pollDoc.delete();
    }

  // getPollVote(vote: string) {
  //   this.poll = {answer: vote, count: 1 };
  // }

  calculateVote() {
    return { ...this.poll };
  }
}
