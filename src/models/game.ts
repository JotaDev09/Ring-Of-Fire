export class Game {
    public players: string[] = ["Player 1", "Player 2", "Player 3", "Player 4"];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        for(let i=  1; i < 14; i++) {
            this.stack.push('ace_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('hearts_' + i)
        }

        shuffle(this.stack);
    }
}

function shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
      
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
      
    return array;
}