import { Injectable } from '@angular/core';
import { IQuestion, IQuestionPart } from '../interfaces/question.interface';
import { LocalStorage } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  @LocalStorage(true, 'QUESTIONNAIRE', [])
  private questionnaireData!: IQuestion[];

  get _questionnaireData(): IQuestion[] {
    return this.questionnaireData;
  }

  getQuestionnaireById(id: string) {
    return this.questionnaireData.find((item) => item.id == id);
  }

  deleteQuestion(id: string): IQuestion[] {
    this.questionnaireData = this.questionnaireData.filter(item => item.id !== id);
    return [...this.questionnaireData];
  }

  addQuestion(newQuestion: IQuestionPart) {
    let tempQuestion = this.objBuilder(newQuestion);
    this.questionnaireData.unshift(tempQuestion);
    this.questionnaireData = [...this.questionnaireData];
  }

  editQuestion(editedQuestion: IQuestionPart, editedId: string) {
    let tempQuestion = this.objBuilder(editedQuestion, editedId);
    this.questionnaireData.forEach((item, index) => {
      if (item.id === editedId) {
        this.questionnaireData[index] = tempQuestion;
      }
    });
    this.questionnaireData = [...this.questionnaireData];
  }

  objBuilder(question: IQuestionPart, newId = this.generateId()): IQuestion {
    return {
      id: newId,
      ...question,
      creationDate: new Date(),
      answerStatus: false,
      userAnswer: []
    };
  }

  generateId(): string {
    return new Date().getTime().toString();
  }
}
