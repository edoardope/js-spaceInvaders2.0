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
        this.speed = 5; //valori positivi muovono verso destra negativi verso sinistra
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    //metodo di aggiornamento posizione player
    update() {

        //movimento orizzontale
        //controlliamo se la freccia sta venendo premuta e aggiorniamo il posizionamento del player
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;

        //limiti movimento orizzontale
        if (this.x < 0) this.x = 0;
        else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

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

        //array tasti premuti
        this.keys = [];

        //definiamo l'istanza player
        this.Player = new Player(this);

        //event listner per tasti premuti
        window.addEventListener('keydown', e => {

            //controlla che il tasto premuto non faccia parte dell'array keys
            if (this.keys.indexOf(e.key) === -1)
                //pusshamo il tasto premuto all'array
                this.keys.push(e.key);
        });

        //event listner per rilascio tasto
        window.addEventListener('keyup', e => {

            //troviamo l'index dell'elemento all'inetrno dell'array keys corrispondente all tasto rilasciato
            const index = this.keys.indexOf(e.key);

            //rimuoviamo dall'array keys il tasto rilasciato 
            if (index > -1) this.keys.splice(index, 1);
        });
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