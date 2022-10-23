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
    sound.addEventListener('click', () => {
      sound.classList.toggle('off');
    });

  //field
    const field = document.createElement('div');
    field.className = ('field');
    header.after(field);
    const fieldContainer = document.createElement('div');
    fieldContainer.className = ('field__container');
    field.prepend(fieldContainer);

    const tileSize = 100;
    const empty  = {
      value: 0,
      top: 0,
      left: 0
    }

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
      counterMoves.innerHTML = `Moves: ${count}`

      const isWon = tiles.every(cell => {
        if (cell.value === cell.top * 4 + cell.left) {
          return true;
        } else if (cell.value === cell.top * 4 + cell.left + 1) {
          return true;
        }
      });

      if (isWon) {
        alert('you won');
      }
    }

    const arrShuffle = [...Array(15).keys()].sort( () => Math.random() - 0.5);

    //timer
    function timer() {
      let minutes = 0;
      let seconds = 0;
      setInterval(() => {
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
    let timerFlag = false;
    field.addEventListener('click', () => {
      if(!timerFlag) {
        timer();
        timerFlag = true;
      }
    });

    //render tiles
    for (let i = 1; i <= 15; i++) {
      const tile = document.createElement('div');
      tile.className = ('tile');
      const tileSpan = document.createElement('span');
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
  // const keyboard = document.createElement('div');
  // keyboard.classList.add('content__keyboard');
  //   keyboard.append(this.createField(tiles));
  // }

  // createField() {

  // }
}

const container = new Render();
container.createField();