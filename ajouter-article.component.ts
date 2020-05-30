import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({  
      username: [],                   
      password: [],                   
    });
  }

  login() {
    console.log('Données du formulaire...', this.loginForm.value);
  }
}
