document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("board")
    const keys = document.querySelectorAll('.keyboard-row button');

    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let word;
    let guessedWordCount = 0;
    let spaces = 1;

    function fetchWord() {
        fetch('https://raw.githubusercontent.com/LC-RVT/LC/main/wordlist.txt')
            .then(r => r.text())
            .then((data) => {
                let temp = data.split("\n");
                word = temp[Math.floor(Math.random() * temp.length)]
                console.log(word);
                const link = 'https://tezaurs.lv/' + word;
                console.log(link)
            })
    }

    fetchWord()


    //pārbauda vai burts ir vārdā un attiecīgi iedod pareizo krāsu tam
    function getTileColor(letter, index) {

        let letterCount = {};
        for (let i = 0; i < word.length; i++) {
            letterInWord = word[i];
            if (letterCount[letterInWord]) {
                letterCount[letterInWord] += 1;
            } else {
                letterCount[letterInWord] = 1;
            }
        }

        const isCorrectLetter = word.toUpperCase().includes(letter);
        const letterInThatPosition = word.toUpperCase().charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        for (let i = 0; i < word.length; i++) {
            if (isCorrectPosition && isCorrectLetter) {
                return "rgb(83, 141, 78)"; //green
            }
            if (isCorrectLetter) {
                return "rgb(181, 159, 59)"; //orange
            }
            return "rgb(160, 40, 60)"; //red
        }


        // return "rgb(83, 141, 78)"; //green
        // return "rgb(181, 159, 59)"; //orange
        // return "rgb(160, 40, 60)"; //red
    }

    function handleSubmitWord() {
        //pārbauda vai ir ievadīti 5 burti
        const currentWordArr = getCurrentWordArr()
        const currentWord = currentWordArr.join("")

        fetch('https://raw.githubusercontent.com/LC-RVT/LC/main/wordlist.txt')
            .then(r => r.text())
            .then((data) => {

                let temp = data.split("\n");
                for (let i = 0; i < temp.length; i++) {
                    if (currentWord === temp[i].toUpperCase()) {

                        const firstLetterId = guessedWordCount * 5 + 1;
                        const interval = 200;
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
                            if (window.confirm("Apsveicu tu esi atminējis vārdu pareizi!\nVārda definīciju var apskatīt spiežot OK")) {
                                window.location.href = "https://tezaurs.lv/" + currentWord.toLowerCase()
                            } else {
                                window.location.href = "https://burtnieks-main-z5o2nlcpra-wm.a.run.app/"
                            }
                        }

                        if (guessedWords.length === 6 && currentWord !== word.toUpperCase()) {
                            window.alert(`Tu neesi uzminējis vārdu, pareizais vārds bija ${word}.`);
                        }

                        guessedWords.push([]);
                        spaces += 5;
                        return;
                    }
                }
                if (currentWordArr.length !== 5) {
                    window.alert("Jāievada 5 burti");
                    return;
                }

                window.alert("Tāds vārds nepastāv");
                const lastLetterEl = document.getElementById(String(availableSpace - 1));
                for (let i = 0; i < 5; i++) {

                }
            });
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    //pievieno masīvam ievaditos burtus
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
            if (availableSpace > spaces) {
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
            keys[i].onclick = ({ target }) => {
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