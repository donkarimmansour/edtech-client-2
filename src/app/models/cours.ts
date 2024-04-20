import { Matiere } from "./matiere";

export class cours{
     coursId:number;
     data: Uint8Array;
     description:String;
     title:String ;
     matiere:Matiere;
    constructor(coursId:number,data:Uint8Array,title:string,description:string,matiere:Matiere){

        this.coursId=coursId;
        this.description=description;
        this.title=title
        this.data=data
        this.matiere=matiere

    }
}