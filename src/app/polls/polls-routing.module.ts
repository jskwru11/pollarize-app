import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';

const routes: Routes = [
    {path: '', component: CreatePollComponent},
    {path: 'viewpoll', component: ViewPollComponent},
    {path: 'polls/:id', loadChildren: () => import('./user-polls/user-polls.module')
    .then(m => m.UserPollsModule)}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PollsRoutingModule {}

