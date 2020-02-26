import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { VotesRoutingModule } from './votes-routing.module';
import { VotesEffect } from './votes.effect';

@NgModule({
    declarations: [
    CastVoteComponent,
    ],
    imports: [
    SharedModule,
    VotesRoutingModule,
    EffectsModule.forFeature([VotesEffect])
    ],
    exports: [],
})
export class VotesModule {}
