import { Component ,OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent {
  nomMatiere: String='';
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const nomMatiere = params['nomMatiere'];
      // console.log('Nom de la matière:', nomMatiere);
      this.nomMatiere=nomMatiere
      
    });
  }
  


course = [
    {
      id: 1,
      name: 'Cours',
      
      image: '../../assets/frc.jpg',
    },
    {
      id: 2,
      name: 'Quiz',
      
      image: '../../assets/eng.jpg',
    },
    
  ];
}
