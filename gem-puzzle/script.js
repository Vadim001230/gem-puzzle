//alert('Уважаемый проверяющий, не успел доделать пару моментов, буду благодарен если проверите игру вечером!')
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
  // win modal
    const winModal = document.createElement('div');
    winModal.className = ('win-modal');
    body.prepend(winModal);
    const winBlock = document.createElement('div');
    winBlock.className = ('win-block');
    winModal.append(winBlock);
    const winMessage = document.createElement('div');
    winMessage.className = ('win-message');
    winBlock.append(winMessage);
    const winBtn = document.createElement('button');
    winBtn.className = ('win-btn');
    winBtn.textContent = 'Shuffle and start';
    winBlock.append(winBtn);

  // score modal
    const scoreModal = document.createElement('div');
    scoreModal.className = ('score-modal');
    body.prepend(scoreModal);
    const scoreBlock = document.createElement('div');
    scoreBlock.className = ('score-block');
    scoreModal.append(scoreBlock);
    const scoreTitle = document.createElement('h3');
    scoreTitle.className = ('score-block__title');
    scoreBlock.append(scoreTitle);
    scoreTitle.textContent = 'Top results';
    const scoreSubtitle = document.createElement('pre');
    scoreSubtitle.className = ('score-block__subtitle');
    scoreTitle.append(scoreSubtitle);
    scoreSubtitle.textContent = '№     Time      Moves';
    const scoreList = document.createElement('ol');
    scoreList.className = ('score-block__list');
    scoreSubtitle.after(scoreList);
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
    sizeBtn3.className = ('size-btn');
    sizeBtn3.textContent = '3x3';
    sizeContainer.append(sizeBtn3);
    const sizeBtn4 = document.createElement('button');
    sizeBtn4.className = ('size-btn');
    sizeBtn4.classList.add('active');
    sizeBtn4.textContent = '4x4';
    sizeContainer.append(sizeBtn4);
    const sizeBtn5 = document.createElement('button');
    sizeBtn5.className = ('size-btn');
    sizeBtn5.textContent = '5x5';
    sizeContainer.append(sizeBtn5);
    const sizeBtn6 = document.createElement('button');
    sizeBtn6.className = ('size-btn');
    sizeBtn6.textContent = '6x6';
    sizeContainer.append(sizeBtn6);
    const sizeBtn7 = document.createElement('button');
    sizeBtn7.className = ('size-btn');
    sizeBtn7.textContent = '7x7';
    sizeContainer.append(sizeBtn7);
    const sizeBtn8 = document.createElement('button');
    sizeBtn8.className = ('size-btn');
    sizeBtn8.textContent = '8x8';
    sizeContainer.append(sizeBtn8);

  // new game
    const newGame = document.createElement('button');
    newGame.className = ('new-game');
    newGame.textContent = 'New Game';
    sizeContainer.after(newGame)

    //volume off
    sound.addEventListener('click', () => {
      sound.classList.toggle('off');
      if (sound.classList.contains('off')) {
        audioMove.volume = 0;
      } else {
        audioMove.volume = 0.9;
      }
    });

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

    const tileSize = 100;
    const empty  = {
      value: 0,
      top: 3,
      left: 3
    }
    const tiles = [];
    tiles.push(empty);
    const winner = []; //score arr
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

    //algoritm for win
    const newTiles = Array.from(tiles);
    newTiles.splice(0, 1)
      const isWon = newTiles.every(cell => {
        if (cell.value === cell.top * 4 + cell.left + 1) {
          return true;
        }
      });

      if (isWon) {
        setTimeout(() => {
          winModal.style.opacity = '1';
          winModal.style.visibility = 'visible'
          if (minutes < 10) {
            winMessage.textContent = `Hooray! You solved the puzzle in 0${minutes}:${seconds} and ${count} moves!`;
            winner.push(`  0${minutes}:${seconds}          ${count}`);
          } else {
            winMessage.textContent = `Hooray! You solved the puzzle in ${minutes}:${seconds} and ${count} moves!`;
            winner.push(`  ${minutes}:${seconds}          ${count}`);
          }
        }, 700);
      }
    }

    //render tiles
    let arrShuffle = [...Array(15).keys()].sort( () => Math.random() - 0.5);
    function renderField() {
      for (let i = 1; i <= 15; i++) {
        const tile = document.createElement('div');
        tile.className = ('tile');
        tile.setAttribute('draggable' , 'true');
        const tileSpan = document.createElement('span');
        tileSpan.className = ('tile__span');
        const value = arrShuffle[i - 1] + 1;
        tileSpan.innerHTML = value;

        let left;
        let top;

        if (i < 5) {
          left = i - 1;
          top = 0;
        } else if (i > 4 && i < 9) {
          left = i - 5;
          top = 1;
        } else if (i >= 9 && i < 13) {
          left = i - 9;
          top = 2;
        } else {
          left = i - 13;
          top = 3;
        }

        if (tiles.length === 0) {
          tiles.push(empty)
        }

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
          move(i)
        });
      }
    }
    renderField()

    //size-btn
    const sizeBtns = document.querySelectorAll('.size-btn');

    sizeContainer.addEventListener('click', (event) => {
      for (let btn of sizeBtns) {
        btn.classList.remove('active');
      }
      event.target.classList.add('active');
    });
    //remove field
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
      timerFlag = false;
    }

    function NewGame() {
      arrShuffle = [...Array(15).keys()].sort( () => Math.random() - 0.5);
      clearInterval(intervalID);
      winModal.style.opacity = '';
      winModal.style.visibility = '';
      count = 0;
      minutes = 0;
      seconds = 0;
      timerFlag = false;
      empty.left = 3;
      empty.top = 3;
      counterMoves.innerHTML = `Moves: 0`;
      counterTime.innerHTML = `Time: 00:00`;
      console.log(tiles)
      removeField()
      renderField()
    }

    function showScoreModal() {
      scoreModal.style.opacity = '1';
      scoreModal.style.visibility = 'visible';
      scoreList.innerHTML = winner.map((win) => {
        localStorage.setItem('win', JSON.stringify(winner));
        winner.length = 10;
        return `<li><pre>${win}<pre></li>`;
      }).join('');
    }

    score.addEventListener('click', showScoreModal);
    scoreModal.addEventListener('click', function() {
      scoreModal.style.opacity = '0';
      scoreModal.style.visibility = 'hidden';
    });
    newGame.addEventListener('click', NewGame);
    winBtn.addEventListener('click', NewGame);
  }
}

const container = new Render();
container.createField();