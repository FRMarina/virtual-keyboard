const body = document.querySelector('body');
const arrayOfButtons = [
  {
    row: 1,
    arrayOfValues: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    sup: {
      '`': '~',
      1: '!',
      2: '@',
      3: '#',
      4: '$',
      5: '%',
      6: ':',
      7: '?',
      8: '*',
      9: '(',
      0: ')',
      '-': `${String.fromCharCode(8212)}`,
      '=': '+',
    },
    styles: {
      '`': ['side_btn'],
      Backspace: ['space', 'side_btn'],
    },
  },
  {
    row: 2,
    arrayOfValues: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
    sup: {
      '\\': '/',
    },
    styles: {
      Tab: ['side_btn'],
      DEL: ['space', 'side_btn'],
    },
  },
  {
    row: 3,
    arrayOfValues: ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    styles: {
      'Caps Lock': ['space', 'side_btn'],
      ENTER: ['space', 'side_btn'],
    },
  },
  {
    row: 4,
    arrayOfValues: ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '/', `${String.fromCharCode(8593)}`, 'Shift'],
    styles: {
      Shift: ['space', 'side_btn'],
      '↑': ['side_btn'],
    },
  },
  {
    row: 5,
    arrayOfValues: ['Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', `${String.fromCharCode(8592)}`, `${String.fromCharCode(8595)}`, `${String.fromCharCode(8594)}`],
    styles: {
      Ctrl: ['space', 'side_btn'],
      Win: ['side_btn'],
      Alt: ['side_btn'],
      '': ['big_space'],
      '←': ['side_btn'],
      '↓': ['side_btn'],
      '→': ['side_btn'],
    },
  },

];

const valuesOfKeydown = [{ '~\n`': 'Backquote' }, { '!\n1': 'Digit1' }, { '@\n2': 'Digit2' }, { '#\n3': 'Digit3' }, { '$\n4': 'Digit4' }, { '%\n5': 'Digit5' }, { ':\n6': 'Digit6' }, { '?\n7': 'Digit7' }, { '*\n8': 'Digit8' }, { '(\n9': 'Digit9' }, { ')\n0': 'Digit0' }, { '—\n-': 'Minus' }, { '+\n=': 'Equal' }, { Backspace: 'Backspace' },
  { Tab: 'Tab' }, { Q: 'KeyQ' }, { W: 'KeyW' }, { E: 'KeyE' }, { R: 'KeyR' }, { T: 'KeyT' }, { Y: 'KeyY' }, { U: 'KeyU' }, { I: 'KeyI' }, { O: 'KeyO' }, { P: 'KeyP' }, { '[': 'BracketLeft' }, { ']': 'BracketRight' }, { '\\': 'Backslash' }, { DEL: 'Delete' },
  { 'Caps Lock': 'CapsLock' }, { A: 'KeyA' }, { S: 'KeyS' }, { D: 'KeyD' }, { F: 'KeyF' }, { G: 'KeyG' }, { H: 'KeyH' }, { J: 'KeyJ' }, { K: 'KeyK' }, { L: 'KeyL' }, { ';': 'Semicolon' }, { "'": 'Quote' }, { ENTER: 'Enter' },
  { Shift: 'ShiftLeft' }, { '\\': 'Backslash' }, { Z: 'KeyZ' }, { X: 'KeyX' }, { C: 'KeyC' }, { V: 'KeyV' }, { B: 'KeyB' }, { N: 'KeyN' }, { M: 'KeyM' }, { '.': 'Period' }, { ',': 'Comma' }, { '/': 'Slash' }, { '↑': 'ArrowUp' }, { Shift: 'ShiftRight' },
  { Ctrl: 'ControlLeft' }, { Win: 'MetaLeft' }, { Alt: 'AltLeft' }, { '': 'Space' }, { Alt: 'AltRight' }, { Ctrl: 'ControlRight' }, { '←': 'ArrowLeft' }, { '↓': 'ArrowDown' }, { '→': 'ArrowRight' }];

function createContainers() {
  const promise = new Promise((resolve) => {
    const container = document.createElement('div');
    container.classList.add('container-center');
    body.appendChild(container);
    const keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard_container');
    container.appendChild(keyboardContainer);
    arrayOfButtons.forEach((e, i) => {
      if (i + 1 === e.row) {
        const keyboardRow = document.createElement('div');
        keyboardRow.classList.add('keyboard-row');
        for (let j = 0, jLen = e.arrayOfValues.length; j < jLen; j++) {
          const btn = document.createElement('div');
          const currentValue = e.arrayOfValues[j];
          btn.innerText = `${currentValue}`;

          for (const key in e.sup) {
            if (currentValue === key) {
              const sup = document.createElement('sup');
              sup.innerText = e.sup[currentValue];
              btn.prepend(sup);
            }
          }

          btn.classList.add('keyboard_button');
          if (e.styles[currentValue]) {
            e.styles[currentValue].forEach((e) => {
              if (currentValue === 'Shift' && j === (jLen - 1)) {
                btn.classList.add('side_btn');
              } else {
                btn.classList.add(e);
              }
            });
          }

          keyboardRow.appendChild(btn);
        }

        keyboardContainer.appendChild(keyboardRow);
        i++;
      }
    });
    const btnsCollection = document.querySelectorAll('.keyboard_button');
    return resolve(btnsCollection);
  });
  promise.then((btnsCollection) => {
    document.addEventListener('keydown', (event) => {
      for (let i = 0; i < btnsCollection.length; i++) {
        const pressedBtn = event.code;
        const currentValue = btnsCollection[i].innerText;
        valuesOfKeydown.forEach((e) => {
          if (e[currentValue] === pressedBtn) {
            btnsCollection[i].classList.add('highlight');
          }
        });
      }
    });
    document.addEventListener('keyup', (event) => {
      for (let j = 0; j < btnsCollection.length; j++) {
        const upBtn = event.code;
        const currentValue = btnsCollection[j].innerText;
        valuesOfKeydown.forEach((e) => {
          if (e[currentValue] === upBtn) {
            btnsCollection[j].classList.remove('highlight');
          }
        });
      }
    });
  });
}
createContainers();
