document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("board")
    const keys = document.querySelectorAll('.keyboard-row button');

    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let word;
    let guessedWordCount = 0;
    let spaces = 1;

    fetch('https://raw.githubusercontent.com/LC-RVT/LC/main/wordlist.txt')
    .then( r => r.text())
    .then((data) => {
        let temp = data.split("\n");
        word = temp[Math.floor(Math.random() * temp.length)];
    })
    

    //pārbauda vai burts ir vārdā un attiecīgi iedod pareizo krāsu tam
    function getTileColor(letter, index) {
        const isCorrectLetter = word.toUpperCase().includes(letter);
        
        //burts nav
        if (!isCorrectLetter) {
            return "rgb(160, 40, 60)";
        }

        const letterInThatPosition = word.toUpperCase().charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;
        
        //burts ir pareizajā vietā
        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        } 
        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord () {
        //pārbauda vai ir ievadīti 5 burti
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !== 5) {
            window.alert("5 letter dipshit");
            return;
        }

        //animācija
        const currentWord = currentWordArr.join("")

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 100;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word.toUpperCase()) {
            window.alert("Congratulations!");
        }

        if (guessedWords.length === 6 && currentWord !== word.toUpperCase()) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
        }

        guessedWords.push([]);
        spaces += 5;
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    //pievieno masivam ievaditos burtus
    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace += 1;
            availableSpaceEl.textContent = letter;
        }
    }

    //atbild par burtu izdzēšanu attiecīgi pa rindām
    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
    
        guessedWords[guessedWords.length - 1] = currentWordArr;
    
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        let count = 0;
        if (availableSpace !== 1) {
            if (availableSpace > spaces ) {
                lastLetterEl.textContent = "";
                availableSpace -= 1;
            }
        } else {
            return;
        }
      }

    function createSquares() {
        //izveido spēles režģi
        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }

        //ievades un dzēšanas pogas
        for (let i = 0; i < keys.length; i++) {
            keys[i].onclick = ({target}) => {
                const letter = target.getAttribute("data-key");

                if (letter === 'enter') {
                    handleSubmitWord();
                    return;
                }

                if (letter === 'delete') {
                    handleDeleteLetter();
                    return;
                }

                updateGuessedWords(letter);
            }
        }
    }
});