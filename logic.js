/**
 * @author Teagan Stewart
 * 
*/

//===================================================
//================ BOARD CLASS ======================
//===================================================

class Board {

    /**
     * Reads board from a file. Teaching me how to read from files - may teach me about dependencies too.
     * 
     * RESULT: Not sure if this is the best practice but it works for a constant file (which is what I wanted).
     */
    loadBoard() {
    
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "board.txt", false);

        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    console.log(allText);
                }
            }
        }
        rawFile.send(null);
    }
}


//===================================================
//================ PIECE CLASS ======================
//===================================================

// class Piece {

// }


const PADDING = "    ";

//TODO: method for printing the board + creating and storing the board.

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

function createBoard() {
    let board = new Board();
    board.loadBoard();

}




createBoard();

console.log("----------------------------------------------------------");

for(let i = 0; i < 8; i++) {
    console.log("|           |           |           |           |           |           |           |           |           ");
    console.log("----------------------------------------------------------");

}