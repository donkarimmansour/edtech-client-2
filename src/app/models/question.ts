export class Question {
    // id: number;
    name: string;
    options: Option[];
    // correct: string;
    selectedOption: number = -1; // Add this line

 
    constructor(data: any) {
        // this.id = data.id;
        this.name = data.name;
        this.options = data.options;
        // this.correct = data.correct;
    }
}


interface Option {
    name: string;
    isAnswer: number;
}