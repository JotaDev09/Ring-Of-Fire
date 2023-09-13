import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  } 

  newGame() {
    this.game = new Game();
  }
  
  takeCard() {
    if (!this.pickCardAnimation) {
      const poppedCard = this.game.stack.pop();
      
      if (poppedCard !== undefined) {
        this.currentCard = poppedCard;
        this.pickCardAnimation = true;
        console.log('New card:' + this.currentCard);
        console.log('game is', this.game);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}


}
