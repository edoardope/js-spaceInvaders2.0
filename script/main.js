class Player {
    constructor(game) {
        this.game = game;
        //dimensioni player
        this.width = 100;
        this.height = 100;

        //posizionamento player relativo alle dimensioni di game
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;

        //velocita di movimento player
        this.speed = 0; //valori positivi muovono verso destra negativi verso sinistra
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    //metodo di aggiornamento posizione player
    update() {
        this.x += this.speed;
    }
}

class Projectiles {

}

class Enemy {

}

class Game {
    constructor(canvas) {
        //definiamo anche qui le dimensioni di canvas1 
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height

        //definiamo l'istanza player
        this.Player = new Player(this);
    }
    render(context) {

        this.Player.draw(context);

        this.Player.update();

    }

}

window.addEventListener('load', function () { //renderiziamo gli elementi solo una volta che la finestra a finito il caricamento

    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d');
    //impostare larghezza e altezza in js eviterà distorsioni
    canvas.width = 600;
    canvas.height = 800;

    //inizializiamo il gioco
    const game = new Game(canvas);

    //loop di animazione
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})