import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  nom: string;
  texte: string;

  nom2: string;
  texte2: string;

  constructor() {
    this.nom = 'Article 1';
    this.texte = 'Contenu de l article 1';

    this.nom2 = 'Article 2';
    this.texte2 = 'Contenu de l article 2';

    this.nom3 = 'Article 3';
    this.texte3 = 'Contenu de l article 3';
  }

  ngOnInit(): {
  }

}
