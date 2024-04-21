import { Component ,OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent {
  nomMatiere: String='';
  matiere_id: String | null = '';
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const nomMatiere = params['nomMatiere'];
      const matiere_id = params['matiere_id'];
      // console.log('Nom de la matière:', nomMatiere);
      this.nomMatiere = nomMatiere
      this.matiere_id = matiere_id
      
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
