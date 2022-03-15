export class Board {

    loadBoard() {
        const fs = require('fs')
  
        fs.readFile('board.txt', (err, data) => {
            if (err) throw err;
        
            console.log(data.toString());
        })
    }
}
