import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    // id: number;
    name: string;
    // cours: any;
    description: string;
    questions: Question[];

    constructor(data: any) {
        // this.id = data.id;
        this.name = data.name;
        // this.cours = data.cours;
        this.description = data.description;
        this.questions = [];

        if (data.questions && Array.isArray(data.questions)) {
            data.questions.forEach((questionData: any) => {
                this.questions.push(new Question(questionData));
            });
        }
    }
}