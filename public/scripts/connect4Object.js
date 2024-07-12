class Game {
    constructor(p1,p2,HEIGHT = 6, WIDTH = 7) {
        this.p1 = p1;
        this.p2 = p2;
        this.currPlayer = p1;
        this.HEIGHT = HEIGHT;
        this.WIDTH = WIDTH;
        this.gameOver = false;
        this.htmlBoard = document.querySelector("#board");
        this.htmlBoard.style.borderBottom = "20px solid Blue";
        this.pieceArray = [
        'url("css/Images/YellowPiece.png")',
        'url("css/Images/RedPiece.png")',
        'url("css/Images/purpleDie.png',
        'url("css/Images/greenDie.png'
        ];
        this.colorArray = [
            "Yellow","Red","Purple","Green"
          ];
        this.turnCount = 0;
        //counter used for images in the array
        this.pc = 0;
        this.makeBoard();
        this.makeHtmlBoard();
        if (screen.width <= 900 || navigator.userAgent.match(/ipad/i)) {
          this.mouseEventsMobile();
          
        } else {
          this.addMouseEvents();
        }
        this.playerOnePiece = document.querySelector(".piece-list-1");
        this.playerTwoPiece = document.querySelector(".piece-list-2");
        this.p1Container = document.querySelector(".image-container-1");
        this.p2Container = document.querySelector(".image-container-2");
    }

    makeBoard() {
        // TODO: set "board" to empty HEIGHT x WIDTH matrix array
        this.board = [];
        this.board = new Array(this.HEIGHT).fill(null).map(() => new Array(this.WIDTH).fill(null));
        console.log(this.board);
      }
      
    makeHtmlBoard() {
      this.htmlBoard.innerHTML = '';
        // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
          //const playerH2 = document.querySelector("#player-turn");
        
          //playerH2.innerText = "Yellow's Turn";
          //playerH2.style.color = "Yellow";
          //playerH2.style.backgroundColor = "black";
        // TODO: add comment for this code
        /**
         *  Here we start by creating a new Table-Row (tr) element and setting it to a variable called top
         * we give top the id of "column-top" and add a click listener to it with the function of handleClick() which ill discuss at that function
         * we then loop through var x WIDTH times (in this case 7). Each time creating a new row element (td) called headCell with
         * we give each headCell an id of whatever x is at the time which will be 0-6 and then append that to the top row we just created
         * So, top should be a table row containing 7 individual cells or (tds).
         * lastly we append the entire row that we just created to the htmlboard table element
         */
        let top = document.createElement("tr");
        top.setAttribute("id", "column-top");
        this.handleGameClick = this.handleClick.bind(this);
        top.addEventListener("click", this.handleGameClick);
        
        for (let x = 0; x < this.WIDTH; x++) {
          let headCell = document.createElement("td");
          headCell.setAttribute("id", x);
          top.append(headCell);
        }
        this.htmlBoard.append(top);
      
        // TODO: add comment for this code
        /**
         * The below code is similar to the above, except we use it to build all the other rows in the htmlboard table
         * each cell or (td) is given an id that is equal to the row value (y) and the column value (x)
         * then we append the created rows to the htmlboard
         * 
         */
        for (let y = 0; y < this.HEIGHT; y++) {
          const row = document.createElement("tr");
          for (let x = 0; x < this.WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
          }
          this.htmlBoard.append(row);
        }
      }

    findSpotForCol(x) {
        // TODO: write the real version of this, rather than always returning 0
        for (let i = this.HEIGHT-1; i >= 0; i--){
          if (!this.board[i][x]) {
              return i;
          }
        }
        return null;
      }

    placeInTable(y, x) {
        // TODO: make a div and insert into correct table cell
        this.board[y][x] = this.currPlayer;
        if (this.currPlayer === this.p1) {
            this.htmlBoard.rows[y+1].cells[x].style.backgroundImage = this.p1.piece;
            this.htmlBoard.rows[y+1].cells[x].classList.add("fall");
            this.htmlBoard.rows[y+1].cells[x].style.backgroundImage = this.p1.piece;
        }
        if (this.currPlayer === this.p2) {
            this.htmlBoard.rows[y+1].cells[x].style.backgroundImage = this.p2.piece;
            this.htmlBoard.rows[y+1].cells[x].classList.add("fall");
            this.htmlBoard.rows[y+1].cells[x].style.backgroundImage = this.p2.piece;
        }
      }
    
    endGame(msg) {
        this.htmlBoard.rows[0].removeEventListener("click", this.handleGameClick);
        return setTimeout(() => {
            alert(msg);
        },400);
      }
    

    handleClick(evt) {
        // get x from ID of clicked cell
        let x = +evt.target.id;
       
      
        // get next spot in column (if none, ignore click)
        let y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
      
        // place piece in board and add to HTML table
        // TODO: add line to update in-memory board
        this.placeInTable(y, x);
        // check for win
        if (this.checkForWin()) {
          this.gameOver = true;
          return this.endGame(`${this.currPlayer.name} won!`);
        }
      
        // check for tie
        // TODO: check if all cells in board are filled; if so call, call endGame
        if (this.checkForTie()) {
          this.gameOver = true;
          return this.endGame(`Board Is Full, No Winners. Play Again!`);
        }
        // switch players
        // TODO: switch currPlayer 1 <-> 2
        this.switchPlayer(y,x);
        this.turnCount++;
      }
    
    switchPlayer(y,x) {
        if (this.currPlayer === this.p1) {
            this.htmlBoard.rows[y].cells[x].style.backgroundImage = '';
            //playerH2.innerText = "Red's Turn";
            //playerH2.style.color = "Red";
            //playerH2.style.backgroundColor = "black";
            this.currPlayer = this.p2;
            this.pc++;
          }
          else {
            this.htmlBoard.rows[y].cells[x].style.backgroundImage = '';
            //playerH2.innerText = "Yellow's Turn";
            //playerH2.style.color = "Yellow";
            //playerH2.style.backgroundColor = "black";
            this.currPlayer = this.p1;
            this.pc--;
          }
    }

    checkForTie() {
        if (this.turnCount === (this.HEIGHT*this.WIDTH)-1) {
          return true;
        }
        else {
          return false;
        }
      }
    
      checkForWin() {
        const _win = (cells) => {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.currPlayer
          );
        }
      
        // TODO: read and understand this code. Add comments to help you.
      /**
       * Short and sweet explanation
       * horiz, vert, diagDR, and diagDL are some form of 4 "boxes" in a row
       * either horizontally starting from 0 going to 6 or vertical starting from 0 going to 5
       * or diagnal from the R (DR) or diagnal from the left (DL)
       * these cells are checked 43 times in a sense HEIGHT * WIDTH of the board
       * to see if any 4 boxes have an ID that is the same as the current players number 
       * either 0 or 1
       */
        for (let y = 0; y < this.HEIGHT; y++) {
          for (let x = 0; x < this.WIDTH; x++) {
            let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              return true;
            }
          }
        }
      }  

/**
 * Below are functions I will use depending on the screen size to add the proper listeners
 * the mouse events work well when not using a touchscreen, so I needed to come up with a way
 * to implement a different kind of feel and even for mobile and touchscreen users
 */
  addMouseEvents() {
    let td = document.querySelectorAll("#column-top td");
    let tdArray = Array.from(td);
    for (let box in tdArray) {
      tdArray[box].addEventListener("mouseenter",e => {
      tdArray[box].style.backgroundImage = this.currPlayer.piece;
    })
  }
    for (let box in tdArray) {
      tdArray[box].addEventListener("mouseleave",e => {
      tdArray[box].style.backgroundImage = null;
      })
    }
  }
  mouseEventsMobile() {
    let td = document.querySelectorAll("#column-top td");
    let tdArray = Array.from(td);
    for (let box in tdArray) {
        tdArray[box].classList.add("hover");
    }
  }
}
class Player {
    constructor(piece, name) {
        this.piece = piece;
        this.name = name;
      }
}

class ComputerPlayer {
  constructor(piece) {
    
  }
}

const playerOnePiece = document.querySelector(".piece-list-1");
const playerTwoPiece = document.querySelector(".piece-list-2");
let p1Container = document.querySelector(".image-container-1");
let p2Container = document.querySelector(".image-container-2");
/**
 * 
 * function below is to make the icons change when switching player pieces
 * 
 */
function setSelectListImages() {
  let p1ListCount = 0;
  let p2ListCount = 0;
  playerTwoPiece.addEventListener("change", (e) => {
    if (p2ListCount === 0) {
      p2Container.style.backgroundImage = 'url("css/Images/greenDie.png';
      p2ListCount++;
    }
    else {
      p2Container.style.backgroundImage = 'url("css/Images/purpleDie.png';
      p2ListCount--;
    }
  });
  playerOnePiece.addEventListener("change", (e) => {
    if (p1ListCount === 0) {
      p1Container.style.backgroundImage = 'url("css/Images/RedPiece.png")';
      p1ListCount++;
    }
    else {
      p1Container.style.backgroundImage = 'url("css/Images/YellowPiece.png")';
      p1ListCount--;
    }
  });
}
setSelectListImages();


document.getElementById('start-game').addEventListener('click', () => {
    p1Container.style.backgroundImage = playerOnePiece.options[playerOnePiece.selectedIndex].value;
    p2Container.style.backgroundImage = playerTwoPiece.options[playerTwoPiece.selectedIndex].value;
    let p1 = new Player(playerOnePiece.options[playerOnePiece.selectedIndex].value,"Player 1");
    let p2 = new Player(playerTwoPiece.options[playerTwoPiece.selectedIndex].value,"Player 2");
    new Game(p1, p2);
});

const htmlBoard = document.querySelector("#board");
const resetArrow = document.querySelector("#restart-arrow");
resetArrow.addEventListener("click", () => {
  const lp = document.querySelectorAll(".fall");
  let lonePieces = Array.from(lp); 
  for (let p in lonePieces) {
    lonePieces[p].classList.add("ending-fall");
  }
    htmlBoard.style.borderBottom = "none";
setTimeout(() => {
  let p1 = new Player(playerOnePiece.options[playerOnePiece.selectedIndex].value,"Player 1");
  let p2 = new Player(playerTwoPiece.options[playerTwoPiece.selectedIndex].value,"Player 2");
  new Game(p1, p2);
},1800);    
})