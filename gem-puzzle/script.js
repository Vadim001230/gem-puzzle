alert('Уважаемый проверяющий, не успел доделать пару моментов, буду благодарен если проверите игру вечером!')
//body random color
let randomColor = Math.round(1 - 0.5 + Math.random() * (10 - 1 + 1));
const body = document.getElementById('body');
body.className = (`fon${randomColor}`);
//audio
const audioMove = document.createElement('audio');
audioMove.id = ('audioMove');
audioMove.src = 'assets/mp3/move.mp3'
body.prepend(audioMove);

class Render {
  constructor() {
    this.tiles;
  }

  createField() {
  //header
    const header = document.createElement('header');
    header.className = ('header');
    const container = document.createElement('div');
    container.className = ('container');
    const counter = document.createElement('div');
    counter.className = ('header__counter');
    const counterTime = document.createElement('span');
    counterTime.className = ('header__counter-time');
    counterTime.innerHTML = 'Time: 00:00';
    const counterMoves = document.createElement('span');
    counterMoves.className = ('header__counter-moves');
    counterMoves.innerHTML = 'Moves: 0'
    const headerBtns = document.createElement('div');
    headerBtns.className = ('header__btns');
    const sound = document.createElement('button');
    sound.className = ('header__sound');
    const score = document.createElement('button');
    score.className = ('header__score');
    score.textContent = 'Score';
    document.body.prepend(header);
    header.prepend(container);
    container.append(counter, headerBtns);
    counter.append(counterTime, counterMoves)
    headerBtns.append(sound, score)

    //volume off
    sound.addEventListener('click', () => {
      sound.classList.toggle('off');
      if (sound.classList.contains('off')) {
        audioMove.volume = 0;
      } else {
        audioMove.volume = 0.9;
      }
    });

  //field
    const field = document.createElement('div');
    field.className = ('field');
    header.after(field);
    const fieldContainer = document.createElement('div');
    fieldContainer.className = ('field__container');
    field.prepend(fieldContainer);
  //size field btns
    const sizeContainer = document.createElement('div');
    sizeContainer.className = ('size-container');
    field.after(sizeContainer);
    const sizeBtn3 = document.createElement('button');
    sizeBtn3.className = ('size-btn3');
    sizeBtn3.textContent = '3x3';
    sizeContainer.append(sizeBtn3);
    const sizeBtn4 = document.createElement('button');
    sizeBtn4.className = ('size-btn4');
    sizeBtn4.textContent = '4x4';
    sizeContainer.append(sizeBtn4);
    const sizeBtn5 = document.createElement('button');
    sizeBtn5.className = ('size-btn4');
    sizeBtn5.textContent = '5x5';
    sizeContainer.append(sizeBtn5);
  // new game
    const newGame = document.createElement('button');
    newGame.className = ('new-game');
    newGame.textContent = 'New Game';
    sizeContainer.after(newGame)

    const tileSize = 100;
    const empty  = {
      value: 0,
      top: 0,
      left: 0
    }

    //timer
    let minutes = 0;
    let seconds = 0;
    let timerFlag = false;
    let intervalID;

    function timer() {
      intervalID = setInterval(() => {
        seconds++
        if (seconds === 60) {
          seconds = 0;
          minutes ++;
        }
        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) {
          counterTime.innerHTML = `Time: 0${minutes}:${seconds}`;
        } else {
          counterTime.innerHTML = `Time: ${minutes}:${seconds}`;
        }
      }, 1000);
    };

    const tiles = [];
    tiles.push(empty);
    let count = 0;

    function move(index) {
      let cell = tiles[index];
      //coordinates of adjacent tile
      const leftDiff = Math.abs(empty.left - cell.left);
      const topDiff = Math.abs(empty.top - cell.top);

      if (leftDiff + topDiff > 1) {
        return;
      }
      audioMove.play();
      audioMove.playbackRate = 1.9;

      cell.element.style.left = `${empty.left * tileSize}px`;
      cell.element.style.top = `${empty.top * tileSize}px`;

      const emptyLeft = empty.left;
      const emptyTop = empty.top;
      empty.left = cell.left;
      empty.top = cell.top;
      cell.left = emptyLeft;
      cell.top = emptyTop;

    //counter
      count++;
      counterMoves.innerHTML = `Moves: ${count}`;

    field.addEventListener('click', () => {
      if(!timerFlag) {
        timer();
        timerFlag = true;
      }
    });

      const isWon = tiles.every(cell => {
        if (cell.value === cell.top * 4 + cell.left) {
          return true;
        } else if (cell.value === cell.top * 4 + cell.left + 1) {
          return true;
        }
      });

      if (isWon) {
        alert(`Hooray! You solved the puzzle in ${minutes}:${seconds} and ${count} moves!`);
      }
    }

    //render tiles
    let arrShuffle = [...Array(15).keys()].sort( () => Math.random() - 0.5);
    function renderField() {
      for (let i = 1; i <= 15; i++) {
        const tile = document.createElement('div');
        tile.className = ('tile');
        const tileSpan = document.createElement('span');
        tileSpan.className = ('tile__span');
        const value = arrShuffle[i - 1] + 1;
        tileSpan.innerHTML = value;

        const left = i % 4;
        const top = (i - left) / 4;
        tiles.push({
          left: left,
          top: top,
          element: tile,
          value: value
        });

        tile.style.left = `${left * tileSize}px`;
        tile.style.top = `${top * tileSize}px`;
        fieldContainer.append(tile);
        tile.append(tileSpan);
        tile.addEventListener('click', () => {
          move(i);
        });
      }
    }
    renderField()

    function removeField() {
      const tils = document.querySelectorAll('.tile');
      const tileSpans = document.querySelectorAll('.tile__span');
      for (let tile of tils) {
        tile.remove();
      }
      for (let tileSpan of tileSpans) {
        tileSpan.remove();
      }
      tiles.length = 0;
    }

    newGame.addEventListener('click', () => {
      clearInterval(intervalID);
      count = 0;
      minutes = 0;
      seconds = 0;
      timerFlag = false;
      counterMoves.innerHTML = `Moves: 0`;
      counterTime.innerHTML = `Time: 00:00`;
      empty.value = 0;
      empty.top = 0;
      empty.left = 0;
      arrShuffle = [...Array(15).keys()].sort( () => Math.random() - 0.5);
      removeField()
      renderField()
      console.log(tiles)
    });



  }
}

const container = new Render();
container.createField();