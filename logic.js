/**
 * @author Teagan Stewart
 * 
*/

//===================================================
//================ BOARD CLASS ======================
//===================================================

class Board {

    board = [[]];
    
    fileParser(boardFile) {
        let rows = boardFile.split(/\n/);

        // Reads only the piece data of the board - not the design parts (|'s and -'s)
        for(let i = 1; i < 6; i++) {            
            let cols = rows[(i*2)-1].split("     |     ")
            cols[0] = cols[0].split("|     ")[1];
            
            // Add pieces to the board
            this.board[i] = []
            for(let j = 0; j < 8; j++) {
                this.board[i].push(cols[j]);
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
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
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
    board.loadBoard();
      
}

function parseBoard(boardFile) {
    console.log(boardFile)
    board.fileParser(boardFile);
}


// actual code

let board = new Board();

createBoard();

// console.log("----------------------------------------------------------");

// for(let i = 0; i < 8; i++) {
//     console.log("|           |           |           |           |           |           |           |           |           ");
//     console.log("----------------------------------------------------------");

//}