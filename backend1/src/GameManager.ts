import { WebSocket } from "ws";
import { Game } from "./Game";
// User, Game
 
export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.user = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
    }

    removeUser(socket: WebSocket){
        this.user = this.users.filter(user => user!== socket);
        // Stop the game if the user left
    }

    private addhandler(){
        socket.on("message", (data) => {
            cont message = JSON.parse(data.toString());

            if (message.type === "INIT_GAME") {
                if (this.pendingUser){
                    // start a game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pending = null;

                } else {
                    this.pendingUser = socket;
                }
            }

            if (message.type === "MOVE"){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket, message.move);
                }
            }

        })
    }
}