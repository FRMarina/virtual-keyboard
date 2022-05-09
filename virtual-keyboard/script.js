let body = document.querySelector('body');
const arrayOfButtons = [
    {
        row: 1,
        arrayOfValues: ['`', '1', '2', '3', '4','5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        sup: {
            '`': '~',
            '1': '!',
            '2': '@',
            '3': '#',
            '4': '$',
            '5': '%',
            '6': ':',
            '7': '?',
            '8': '*',
            '9': '(',
            '0': ')',
            '-': `${String.fromCharCode(8212)}`,
            '=': '+',
        },
        styles: {
            '`': ['side_btn'],
            'Backspace': ['space', 'side_btn'],
        }
    },
    {
        row: 2,
        arrayOfValues: ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
        sup: {
            '\\': '/',
        },
        styles: {
            'Tab': ['side_btn'],
            'DEL': ['space', 'side_btn'],
        }
    },
    {
        row: 3,
        arrayOfValues: ['Caps Lock', 'A', 'S', 'D','F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
        styles: {
            'Caps Lock': ['space', 'side_btn'],
            'ENTER': ['space', 'side_btn'],
        }
    },
    {
        row: 4,
        arrayOfValues: ['Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '/', `${String.fromCharCode(8593)}`, 'Shift'],
        styles: {
            'Shift': ['space', 'side_btn'],
            "↑": ['side_btn'],
        }
    },
    {
        row: 5,
        arrayOfValues: ['Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', `${String.fromCharCode(8592)}`, `${String.fromCharCode(8595)}`, `${String.fromCharCode(8594)}`],
        styles: {
            'Ctrl': ['space', 'side_btn'],
            'Win': ['side_btn'],
            'Alt': ['side_btn'],
            '': ['big_space'],
            "←": ['side_btn'],
            "↓": ['side_btn'],
            "→": ['side_btn'],
        }
    }

];
let createContainers = () => {
    let container = document.createElement('div');
    container.classList.add('container-center');
    body.appendChild(container);
    let keyboardContainer = document.createElement('div');
    keyboardContainer.classList.add('keyboard_container');
    container.appendChild(keyboardContainer);
    arrayOfButtons.forEach((e, i) => {
        if(i+1 === e.row){
            let keyboardRow = document.createElement('div');
            keyboardRow.classList.add('keyboard-row');
            for(let j = 0, jLen = e.arrayOfValues.length; j < jLen; j++){
                let btn = document.createElement('div');
                let currentValue = e.arrayOfValues[j]
                btn.innerText = `${currentValue}`;
               
                    for(let key in e.sup){
                        if(currentValue === key){
                            let sup = document.createElement('sup');
                            sup.innerText = e.sup[currentValue];
                            btn.prepend(sup);
                        }
                    }
                    
                btn.classList.add('keyboard_button');
                if(e.styles[currentValue]){
                    e.styles[currentValue].forEach(e =>{
                       if(currentValue === 'Shift' && j === (jLen-1)){
                        btn.classList.add('side_btn');
                       }else{
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
}

document.addEventListener('DOMContentLoaded', createContainers);
