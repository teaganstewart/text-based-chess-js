/**
 * @author Teagan Stewart
 * 
*/

const STARTUPMESSAGE = "Welcome to Text Based Chess. \nAll code was written in Javascript.\n\n" +
    "HOW TO PLAY: \nGrab a mate and come play some chess, the world's favourite classic board game!\n\n" +
    "*PLEASE NOTE THIS GAME DOESN'T USE PROPER CHESS NOTATION YET*\n\n" +
    "Input format: a3-a5.\n" +
    "The letter represents the column you are in; A-H from left to right.\n\n\n" +
    "And remember.... have fun!!\n\n"

let roundCount = 0;

//===================================================
//================ BOARD CLASS ======================
//===================================================

class Board {

    boardArray = [[]];

    /**
     * Parses the board file into the board array.
     * 
     * @param {*} boardFile 
     */
    fileParser(boardFile) {
        let rows = boardFile.split(/\n/);

        // Reads only the piece data of the board - not the design parts (|'s and -'s)
        for (let i = 0; i < 8; i++) {
            let cols = rows[i].split(" ");

            // Add pieces to the board
            this.boardArray[i] = []
            for (let j = 0; j < 8; j++) {
                // if piece is upper case - orange, if lower case - white
                this.boardArray[i].push(new Piece((cols[j] == "_") ? " " : cols[j], (cols[j] == cols[j].toUpperCase())
                    ? "orange" : "white"));

            }
        }

    }

    /**
     * Reads board from a file. Teaching me how to read from files - may teach me about dependencies too.
     * 
     * RESULT: Not sure if this is the best practice but it works for a constant file (which is what I wanted).
     */
    loadBoard() {

        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "board.txt", false);

        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    parseBoard(rawFile.responseText);

                }
            }
        }

        rawFile.send(null);
    }

    /**
     * Parses the moves then updates and prints the board.
     * 
     * @param {The validated and converted move coordinates} moveArray 
     */
    parseMove(moveArray) {
        this.boardArray[moveArray[2]][moveArray[3]].setValue = this.boardArray[moveArray[0]][moveArray[1]].getValue;
        this.boardArray[moveArray[0]][moveArray[1]].setValue = " ";
        printBoard();
    }
}


//===================================================
//================ PIECE CLASS ======================
//===================================================

/**
 * Board pieces are represented by letters. These are:
 * 
 * 
 * Pawn - p
 * Knight - N
 * Bishop - B
 * Rook - R
 * Queen - Q
 * King - K
 * 
 */
class Piece {

    whiteStyle = 'font-weight: bold; font-size: 20px; color: white;)';
    orangeStyle = 'font-weight: bold; font-size: 20px; color: orange;)';
    normalStyle = 'font-weight: normal, font-size 20px; color: lightgrey;'

    constructor(value, color) {
        this.value = value;
        this.color = color;
    }

    get getValue() {
        return this.value;
    }

    set setValue(newVal) {
        this.value = newVal;
    }

    get getStyle() {
        if (this.color == "white") {
            return this.whiteStyle;
        }
        else if (this.color == "orange") {
            return this.orangeStyle;
        }

        return this.normalStyle; // i dont think this will ever be used.
    }

}


//===================================================
//============== BOARD FUNCTIONS ====================
//===================================================

/**
 * Pre-loads the board file.
 */
function createBoard() {
    board.loadBoard();

}

/**
 * Parses the board file then starts the game.
 * 
 * @param {The text file containing the board} boardFile 
 */
function parseBoard(boardFile) {
    board.fileParser(boardFile);
    printBoard();
    playGame();

}

/**
 * The game loop - playing state.
 */
function playGame() {

    let move = ""

    while (move != "quit") {
        move = prompt("Please make a move: ")
        if (checkValidInput(move) != null) board.parseMove(checkValidInput(move));
    }
}


/**
 * Validates whether the input is a valid move or not.
 * 
 * @param {The users move input} move 
 * @returns 
 */
function checkValidInput(move) {
    if (move.length != 5) return;

    const moveArray = [...move];
    let coordArray = [moveArray[1] - 1, moveArray[0].charCodeAt(0) - 97, moveArray[4] - 1, moveArray[3].charCodeAt(0) - 97]
    for (let coord in coordArray) {
        if (coord < 0 || coord > 7) {
            console.log("Invalid input. Please follow format a1-h8. Col values: a - h, row values: 1 - 8")
            return null;
        }
    }

    return (moveArray[2] == "-") ? coordArray : null;
}


/**
 * A function to print the board in a stylized way.
 */
function printBoard() {

    console.log("\n\n\n")
    let normalStyle = 'color: lightgrey;'
    // let whiteStyle = 'font-weight: bold; font-size: 20px;color: white;';
    // let blackStyle = 'font-weight: bold; font-size: 20px;color: orange;';
    // let normalStyle = 'font-weight: normal, font-size 12px; color: lightgrey;'

    // let string = [whiteStyle, blackStyle, whiteStyle, blackStyle, whiteStyle, blackStyle, whiteStyle, whiteStyle]
    // console.log("%c%s %c%s %c%s %c%s %c%s %c%s %c%s %c%s", string[0], "R", string[1], "R", string[2], "R", string[3], "R",
    //     string[4], "R", string[5], "R", string[6], "R", string[7], "R");

    for (var i = 0; i < 8; i++) {
        let colours = [];
        var str = "%c|\t\t";
        for (var j = 0; j < 8; j++) {

            if (board.boardArray[i][j].getValue == " ") {
                str += "%c" + "\t\t\t%c|\t\t";
            }
            else {
                str += "%c" + board.boardArray[i][j].getValue.toUpperCase() + " \t\t%c|\t\t";
            }
            colours.push(board.boardArray[i][j].getStyle);
        }


        console.log(str, normalStyle, colours[0], normalStyle, colours[1], normalStyle, colours[2], normalStyle, colours[3], normalStyle,
            colours[4], normalStyle, colours[5], normalStyle, colours[6], normalStyle, colours[7], normalStyle);
        console.log("-----------------------------------------------------------------------------------------------------")
    }
}


// starting code
let board = new Board();
setTimeout(function () { //allows the html to load first
    console.log(STARTUPMESSAGE);
    createBoard();
}, 200)



// console.log("----------------------------------------------------------");

// for(let i = 0; i < 8; i++) {
//     console.log("|           |           |           |           |           |           |           |           |           ");
//     console.log("----------------------------------------------------------");

//}