import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Matiere } from '../models/matiere';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { cours } from '../models/cours';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent implements OnInit {
  @Input() title:String='';
  description: string = '';
  pdfTitle: string = '';
  selectedFile!: File;
  pdfData!: ArrayBuffer;
  pdfUrl: SafeUrl | null = null;
  nomMatiere: string='';
  matiereNames: string[]=[];
  matieres:Matiere[]=[];
  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute,private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
 
getAllCours(): Observable<Matiere[]> {
  return this.http.get<Matiere[]>(`http://localhost:8080/matieres/all`);
}

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.pdfTitle); 
   
    formData.append('title', this.pdfTitle); // Ajouter le titre au FormData
    formData.append('description', this.description);
    formData.append('matiere',this.nomMatiere)
    formData.append('file', this.selectedFile);
   

    this.http.post<any>('http://localhost:8080/cours/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully');
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }




  ngOnInit(): void {
    const title= this.route.snapshot.params['title']; // Assuming you have the ID in the route parameter
    this.fetchPdf(title);
    this.getAllCours().subscribe(cours => {
      this.matieres = cours;
      console.log(this.matieres);
      
      this.matieres.forEach(c => {
        this.matiereNames.push(c.name); 
      });
      
      console.log(this.matiereNames)
    });
  }

  fetchPdf(title: String): void {
    this.http.get(`http://localhost:8080/cours/${title}`, { responseType: 'arraybuffer' })
      .subscribe((response: ArrayBuffer) => {
        this.pdfData = response;
      });
  }
  getSafePdfUrl(): SafeUrl | null {
    if (this.pdfData) {
      const blob = new Blob([this.pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return null;
  }

}
