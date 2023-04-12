class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottelBar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    endbossHealthbarIcon = new EndbossHealthbarIcon();
    throwableBottles = [];
    isBottleThrown = false;
    endboss = this.level.endboss[0];
    restart = false;
    AUDIO_BACKGROUND = new Audio('audio/gamebackgroundmusic3 (mp3cut.net).mp3#t=0.5');
    AUDIO_BOSSBATTLE = new Audio('audio/bossbattle3.mp3');
    AUDIO_LOST = new Audio('audio/gamelost2.mp3');
    AUDIO_WIN = new Audio('audio/win2.mp3');
    AUDIO_RESTART = new Audio('audio/bossbattle2.mp3');
    gameSound = true;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkShortIdle();
            this.checkGameEnd();
            if (this.gameSound) {
                this.playBackgroundmusic();
            }
        }, 50);
        setInterval(() => {
            this.characterCollidingWithChickens();
        }, 200)
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.collectedBottles > 0 && !this.isBottleThrown && !this.endboss.isHurt()) {
            if (!this.character.otherDirection) {
            this.bottleToThrow = new ThrowableObject(this.character.x + this.character.width, this.character.y);
            } else {
                this.bottleToThrow = new ThrowableObject(this.character.x, this.character.y);
            }
            this.throwableBottles.push(this.bottleToThrow);
            this.character.collectedBottles--;
            this.character.sauce -= 20;
            this.bottelBar.setPercentage(this.character.sauce);
            this.isBottleThrown = true;
        }
    }

    checkCollisions() {
        this.characterCollidingWithEndboss();
        this.characterCollidingWithCoins();
        this.characterCollidingWithBottles();
        this.bottleCollidingWithChickens();
        this.bottleCollidingWithEndboss();
        this.stompOnEnemies();
    }

    characterCollidingWithChickens() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    characterCollidingWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    characterCollidingWithCoins() {
        this.level.coins.forEach((coin, coinIndex) => {
            if (this.character.isColliding(coin) && this.character.money < 100) {
                this.character.getCoins();
                this.playPickupaudio();
                this.coinBar.setPercentage(this.character.money);
                this.level.coins.splice(coinIndex, 1);
            }
        });
    }

    characterCollidingWithBottles() {
        this.level.bottles.forEach((bottle, bottleIndex) => {
            if (this.character.isColliding(bottle) && this.character.collectedBottles < 5) {
                this.character.getBottles();
                this.playPickupaudio();
                this.bottelBar.setPercentage(this.character.sauce);
                this.level.bottles.splice(bottleIndex, 1);
            }
        });
    }

    bottleCollidingWithEndboss() {
        this.throwableBottles.forEach((bottle, bottleIndex) => {
            if (this.endboss.isColliding(bottle) && this.isBottleThrown) {
                this.endboss.hit();
                this.endbossHealthbar.setPercentage(this.endboss.energy);
                this.isBottleThrown = false;
                setTimeout(() => {
                    this.throwableBottles.splice(bottleIndex, 1);
                }, 100);
            } else if (bottle.y >= 380) {
                setTimeout(() => {
                    this.throwableBottles.splice(0);
                    this.isBottleThrown = false;
                }, 100);
            }
        });
    }

    bottleCollidingWithChickens() {
        this.level.enemies.forEach((enemy, index) => {
            this.throwableBottles.forEach((bottle) => {
                if (enemy.isColliding(bottle) && this.isBottleThrown) {
                    this.isBottleThrown = false;
                    this.level.enemies[index].hit();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1)
                    }, 500)
                }
            });
        });
    }

    stompOnEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.level.enemies[index].hit();
                setTimeout(() => {
                    this.character.killEnemie(index);
                }, 500)
                this.character.jump();
            }
        });
    }

    checkShortIdle() {
        if (this.character.buttonPressed()) {
            this.character.shortIdle = 5;
            this.character.longIdle = 10;
        } else {
            this.character.idle();
        }
    }

    checkGameEnd() {
        if (this.character.isDead() || this.endboss.isDead() || this.character.x > this.endboss.x) {
            this.endGame();
        }
    }

    showEndScreen() {
        this.character.clearAllIntervals();
        document.getElementById('end-screen').classList.remove('d-none');
        document.getElementById('end-screen').classList.add('end-screen-animation');
        world.restart = true;
    }

    showRestartScreen() {
        document.getElementById('restart-screen').classList.remove('d-none');
        document.getElementById('start-btn').classList.remove('d-none');
        if (this.gameSound) {
            this.AUDIO_LOST.pause();
            this.AUDIO_WIN.pause();
            this.AUDIO_RESTART.volume = 0.1;
            this.AUDIO_RESTART.play();
        }
    }

    showStartScreen() {
        document.getElementById('start-screen').classList.remove('d-none');
        document.getElementById('end-screen').classList.add('d-none');
        document.getElementById('start-btn').classList.remove('d-none');
        document.getElementById('restart-screen').classList.add('d-none');
        document.getElementById('mute').classList.add('d-none');
        this.character.clearAllIntervals();
        this.AUDIO_RESTART.pause();
    }

    endGame() {
        setTimeout(() => {
            this.showEndScreen();
            setTimeout(() => {
                this.showRestartScreen();
                setInterval(() => {
                    if (document.getElementById('restart-counter').innerHTML > 0 && world.restart) {
                        document.getElementById('restart-counter').innerHTML -= 1;
                    } else if (document.getElementById('restart-counter').innerHTML == 0) {
                        this.showStartScreen()
                    } else if (!world.restart) {
                        this.AUDIO_RESTART.pause();
                    }
                }, 1000)
            }, 2000);
        }, 1000);
    }

    playPickupaudio() {
        if (this.gameSound) {
            this.character.AUDIO_ITEM_PICKUP.volume = 0.1;
            this.character.AUDIO_ITEM_PICKUP.play();
        }
    }

    playBackgroundmusic() {
        if (this.character.isDead() && this.gameSound) {
            this.playLostaudio();
        } else if (this.endboss.isDead() && this.gameSound) {
            this.playWinaudio();
        } else if (this.character.endbossTriggered && this.gameSound) {
            this.playBossbattleaudio();
        } else if (this.gameSound) {
            this.playBackgroundaudio();
        }
    }

    playLostaudio() {
        this.AUDIO_BACKGROUND.pause();
        this.AUDIO_BOSSBATTLE.pause();
        this.AUDIO_LOST.volume = 0.1;
        this.AUDIO_LOST.play();
    }

    playWinaudio() {
        this.AUDIO_BACKGROUND.pause();
        this.AUDIO_BOSSBATTLE.pause();
        this.AUDIO_WIN.volume = 0.1;
        this.AUDIO_WIN.play();
    }

    playBossbattleaudio() {
        this.AUDIO_BACKGROUND.pause();
        this.AUDIO_BOSSBATTLE.volume = 0.1;
        this.AUDIO_BOSSBATTLE.play();
    }

    playBackgroundaudio() {
        this.AUDIO_BACKGROUND.volume = 0.1;
        this.AUDIO_BACKGROUND.loop = true;
        this.AUDIO_BACKGROUND.play();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addAllMovabaleObjectsToMap();
        // ------ Space for fixed objects --------
        this.addAllFixedObjectsToMap();
        //  draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    addAllMovabaleObjectsToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableBottles);
        this.ctx.translate(-this.camera_x, 0); // back
    }

    addAllFixedObjectsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottelBar);
        if (this.character.endbossTriggered) {
            this.addToMap(this.endbossHealthbar);
            this.addToMap(this.endbossHealthbarIcon);
        }
        this.ctx.translate(this.camera_x, 0); // forward
        this.ctx.translate(-this.camera_x, 0);
    }
}