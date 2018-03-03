import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBU66Cm4C77fWqppFoTfehB1gtXrVX2J5s',
      authDomain: 'ng-recipe-book-d547d.firebaseapp.com'
    });
  }

  onNavigate(featureToNavigateTo: string) {
    this.loadedFeature = featureToNavigateTo;
  }
}
