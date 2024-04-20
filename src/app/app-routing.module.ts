import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';

import { MatiereComponent } from './matiere/matiere.component';

import { QuizComponent } from './quiz/quiz.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DetailsQuizComponent } from './details-quiz/details-quiz.component';
import { listCoursComponent } from './listCours/list-cours.component';
import { DetailsCoursComponent } from './details-cours/details-cours.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AjouterMatiereComponent } from './ajouter-matiere/ajouter-matiere.component';
import { AjouterCoursComponent } from './ajouter-cours/ajouter-cours.component';
import { FooterComponent } from './footer/footer.component';
import { StudentProfilComponent } from './student-profil/student-profil.component';
import { TeacherProfilComponent } from './teacher-profil/teacher-profil.component';
import { ResultComponent } from './result/result.component'; // Import your ResultComponent
import { InformatiqueComponent } from './informatique/informatique.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'result', component: ResultComponent }, // Add this line

 
  { path: 'details/:title', component: DetailsCoursComponent },
  { path: 'detailsQuiz/:name', component: DetailsQuizComponent },
  { path: 'test/:name', component: QuizComponent },
  // { path: 'upload', component: DetailsCoursComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  // { path: 'footer', component: FooterComponent},
  // { path: 'StudentProfil', component: StudentProfilComponent},
  // { path: 'TeacherProfil', component: TeacherProfilComponent},
   { path: 'informatique/attempt/:username', component: InformatiqueComponent},
  
  // { path: 'addCours', component: AjouterCoursComponent },
  // { path: 'addMatiere', component: AjouterMatiereComponent },
  // { path: 'joinnow', component: JoinnowComponent },
  { path: 'about', component: AboutComponent },
  { path: 'course', component: CourseComponent },
  { path: 'matiere/:nomMatiere', component: MatiereComponent },
  // { path: 'matiere/:nomMatiere/quiz', component: ListQuizComponent },
  { path: 'matiere/:nomMatiere/listCours', component: listCoursComponent },
  { path: 'listQuiz', component: ListQuizComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
