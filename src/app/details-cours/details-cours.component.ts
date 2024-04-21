import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})
export class DetailsCoursComponent implements OnInit{
  //@Input() title:String='';
 // description: string = '';
  //pdfTitle: string = '';
  //selectedFile!: File;
  pdfData!: ArrayBuffer;
  //pdfUrl: SafeUrl | null = null;
  
  constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.pdfData) {
      const title = this.route.snapshot.params['title'];
      this.fetchPdf(title);
    }
  }

  fetchPdf(title: String): void {
    // console.log("title");
    // console.log(title);
    
    
    this.http.get(`http://localhost:8080/cours/${title}`, { responseType: 'arraybuffer' })
      .subscribe((response: ArrayBuffer) => {
      //  console.log(response);
      
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
