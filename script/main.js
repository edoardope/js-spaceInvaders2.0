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
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;

    }
    //metodo per attivare il loop di sparo
    shoot() {
        //ritorna il projectile disponibile
        const projectile = this.game.getProjectile();
        //se esiste un projectile disponibile chiama il metodo start con la posizione attuale del player come argomento
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
}

class Projectile {

    constructor() {
        this.width = 4;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;

        //questa variabile servirà a definire se l'elemento è libero e pronto ad essere riutilizzato
        this.free = true;
    }
    draw(context) {
        //disegnamo il projectile solo se non è free
        if (!this.free) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    update() {
        //aggiorniamo il projectile solo se non è free
        if (!this.free) {
            this.y -= this.speed;
            //rendiamo i projectile dinuovo disponibili una volta usciti dallo schermo invocando il metodo reset
            if (this.y < - this.height) this.reset();
        }
    }

    //metodo attivo quando il projectile viene utilizzato
    start(x, y) { //siccome i projectiles partiranno dal player passiamo le coordinate come argomento

        //impostiamo free a falso
        this.free = false;

        //impostiamo le coordinate
        this.x = x - this.width * 0.5;
        this.y = y;
    }
    //metodo attivo quando il projectile non viene utilizzato
    reset() {
        this.free = true;
    }
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

        this.ProjectilesPool = [];
        //numero projectiles riutilizzabili per migliorare le performance ne useremo 10 da riutilizzare
        this.numberOfProjectiles = 10;

        //appena il gioco è avviato chiamiamo la funzione che riempie la pool di projectiles disponibili
        this.createProjectiles();

        //event listner per tasti premuti
        window.addEventListener('keydown', e => {

            //controlla che il tasto premuto non faccia parte dell'array keys
            if (this.keys.indexOf(e.key) === -1)
                //pusshamo il tasto premuto all'array
                this.keys.push(e.key);

            //controlla se il tasto premuto è 1 corrispondente all'attaco base
            if (e.key === '1') this.Player.shoot();
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

        //renderizza attacco base
        this.ProjectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })

    }
    //metodo per riempire la pool con projectiles inattivi
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++) {
            this.ProjectilesPool.push(new Projectile());
        }
    }
    //metodo per recuperare un projectile non utilizzato quando serve
    getProjectile() {
        for (let i = 0; i < this.ProjectilesPool.length; i++) {
            if (this.ProjectilesPool[i].free) return this.ProjectilesPool[i];
        }
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