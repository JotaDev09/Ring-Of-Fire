import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  stack: string[] = [];
  topCardStyleRight = 156;
  gameOver = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    const cardNames = this.generateCardNames();
    this.stack = this.shuffleArray(cardNames);
  }

  newGame() {
    this.game = new Game();
  }

  generateCardNames(): string[] {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    const cardNames: string[] = [];

    for (const suit of suits) {
      for (let i = 1; i <= 13; i++) {
        cardNames.push(`${suit}_${i}`);
      }
    }

    return cardNames;
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.pickCardAnimation && this.stack.length > 0) {
      const poppedCard = this.stack.pop();

      if (poppedCard !== undefined) {
        this.currentCard = poppedCard;
        this.pickCardAnimation = true;

        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;

        this.topCardStyleRight -= 3;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1500);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('player1.png');
      }
    });
  }

  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
      }
    });
  }
}
