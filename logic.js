/**
 * @author Teagan Stewart
 * 
*/

//===================================================
//================ BOARD CLASS ======================
//===================================================

class Board {

    boardArray = [[]];

    /**
     * 
     * @param {*} boardFile 
     */
    fileParser(boardFile) {
        let rows = boardFile.split(/\n/);

        // Reads only the piece data of the board - not the design parts (|'s and -'s)
        for (let i = 0; i < 8; i++) {
            // let cols = rows[i].split("     |     ")
            // cols[0] = cols[0].split("|     ")[1];
            let cols = rows[i].split(" ");

            // Add pieces to the board
            this.boardArray[i] = []
            for (let j = 0; j < 8; j++) {
                // if piece is upper case - orange, if lower case - white
                this.boardArray[i].push(new Piece((cols[j] == "_") ? " " : cols[j], (cols[j] == cols[j].toUpperCase()) ? "orange" : "white"));

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

        let fuck = "";
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    parseBoard(rawFile.responseText);

                }
            }
        }

        rawFile.send(null);
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

function createBoard() {
    board.loadBoard();

}

function parseBoard(boardFile) {
    board.fileParser(boardFile);
    printBoard();
}



function printBoard() {

    let normalStyle = 'font-weight: normal, font-size 20px; color: lightgrey;'
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


// actual code

let board = new Board();

createBoard();


// console.log("----------------------------------------------------------");

// for(let i = 0; i < 8; i++) {
//     console.log("|           |           |           |           |           |           |           |           |           ");
//     console.log("----------------------------------------------------------");

//}