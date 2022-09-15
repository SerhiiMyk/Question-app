import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManagementPageComponent } from './pages/question-management-page/question-management-page.component';
import { QuestionsListPageComponent } from './pages/questions-list-page/questions-list-page.component';
import { CreateEditQuestionPageComponent } from './pages/create-edit-question-page/create-edit-question-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'management-question', pathMatch: 'full' },
  { path: 'management-question', component: QuestionManagementPageComponent },
  { path: 'create-question', component: CreateEditQuestionPageComponent},
  { path: 'edit-question', component: CreateEditQuestionPageComponent },
  { path: 'list-question', component: QuestionsListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
