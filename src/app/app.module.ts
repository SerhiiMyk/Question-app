import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionManagementPageComponent } from './pages/question-management-page/question-management-page.component';
import { QuestionsListPageComponent } from './pages/questions-list-page/questions-list-page.component';
import { CreateEditQuestionPageComponent } from './pages/create-edit-question-page/create-edit-question-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementPageComponent,
    QuestionsListPageComponent,
    CreateEditQuestionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
