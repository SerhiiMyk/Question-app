import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { IQuestion } from '../../interfaces/question.interface';

@Component({
  selector: 'app-question-management-page',
  templateUrl: './question-management-page.component.html',
  styleUrls: ['./question-management-page.component.scss']
})
export class QuestionManagementPageComponent implements OnInit {

  public questionnaireData: IQuestion[] = [];

  constructor(private questionnaireService: QuestionnaireService) {
  }

  ngOnInit(): void {
    this.questionnaireData = [...this.questionnaireService._questionnaireData];
  }

  onDelete(id: string) {
    this.questionnaireData = this.questionnaireService.deleteQuestion(id);
  }
}
