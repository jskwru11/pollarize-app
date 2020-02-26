import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CastVoteComponent } from './cast-vote/cast-vote.component';

const routes: Routes = [
    {path: 'castvote', component: CastVoteComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VotesRoutingModule {}
