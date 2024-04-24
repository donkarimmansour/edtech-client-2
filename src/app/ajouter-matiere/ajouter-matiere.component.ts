import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Matiere } from '../models/matiere';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-ajouter-matiere',
  templateUrl: './ajouter-matiere.component.html',
  styleUrls: ['./ajouter-matiere.component.css']
})
export class AjouterMatiereComponent {

  nouvelleMatiere: any = {
    name: null,
    description: null,
    image: null
 }
 res_start: boolean = false;

  constructor(private http: HttpClient) { }

 
  onSubmit(): void {

    this.ajouterMatiere(this.nouvelleMatiere)
      .subscribe(
        () => {
          console.log('Matière ajoutée avec succès');
          this.res_start = false
          this.nouvelleMatiere = {
            name: null,
            description: null,
            image: null
         }
          // Réinitialiser le formulaire ou faire d'autres actions nécessaires
        },
        error => {
          console.error('Erreur lors de l\'ajout de la matière : ', error);
          this.res_start = false
          // Gérer l'erreur de manière appropriée
        }
      );
  }
 
  ajouterMatiere(nouvelleMatiere: Matiere): Observable<any> {
    return this.http.post<any>('http://localhost:8080/matieres/add', nouvelleMatiere);
  }

}
