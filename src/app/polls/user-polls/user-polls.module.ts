import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserPollsComponent } from './user-polls.component';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
  {
    path: 'polls/:id', component: UserPollsComponent
  }
];

@NgModule({
  declarations: [ UserPollsComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ],
  providers: [],
})
export class UserPollsModule {}
