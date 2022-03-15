/**
 * @author Teagan Stewart
 * 
*/

import { Board } from "./board";

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




console.log("----------------------------------------------------------");

for(let i = 0; i < 8; i++) {
    console.log("|           |           |           |           |           |           |           |           |           ");
    console.log("----------------------------------------------------------");

}