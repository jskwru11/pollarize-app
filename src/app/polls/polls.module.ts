import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { PollsRoutingModule } from './polls-routing.module';
import { UserPollsModule } from './user-polls/user-polls.module';

@NgModule({
    declarations: [
        CreatePollComponent,
        ViewPollComponent
    ],
    imports: [
    SharedModule,
    ChartsModule,
    UserPollsModule,
    FlashMessagesModule.forRoot(),
    PollsRoutingModule
    ],
    exports: [],
})
export class PollsModule {}
