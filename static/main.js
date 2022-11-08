document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    function createSquares() {
        const gameBoard = document.getElementById("board")

        let guessedWords = [[]];
        let availableSpace = 1;
        let word = "kaķis";

        const keys = document.querySelectorAll('.keyboard-row button');

        function handleSubmitWord () {
            const currentWordArr = getCurrentWordArr()
            if (currentWordArr.length !== 5) {
                window.alert("5 letter dipshit");
            }

            const currentWord = currentWordArr.join("")

            if (currentWord === word.toUpperCase()) {
                window.alert("mental");
                console.log(currentWord, word);
            }

            if (guessedWords.length === 6) {
                window.alert("SUCK YA MUM");
            }

            guessedWords.push([]);
        }

        function getCurrentWordArr() {
            const numberOfGuessedWords = guessedWords.length;
            return guessedWords[numberOfGuessedWords - 1];
        }

        function updateGuessedWords(letter) {
            const currentWordArr = getCurrentWordArr();

            if (currentWordArr && currentWordArr.length < 5) {
                currentWordArr.push(letter);

                const availableSpaceEl = document.getElementById(String(availableSpace));
                availableSpace += 1;
                availableSpaceEl.textContent = letter;
            }
        }

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }

        for (let i = 0; i < keys.length; i++) {
            keys[i].onclick = ({target}) => {
                const letter = target.getAttribute("data-key");

                if (letter === 'enter') {
                    handleSubmitWord();
                    return;
                }

                updateGuessedWords(letter);
            }
        }
    }
})
