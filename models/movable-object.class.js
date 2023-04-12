class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    shortIdle = 5;
    longIdle = 10;
    money = 0;
    sauce = 0;
    collectedBottles = 0;
    endbossTriggered = false;
    intervalIds = [];
    AUDIO_ENEMY_HURT = new Audio('audio/chickenhit (mp3cut.net)(1).mp3');
    AUDIO_PEPE_JUMP = new Audio('audio/jump.mp3');
    AUDIO_ITEM_PICKUP = new Audio('audio/getitemssound.mp3');


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable object should always fall
            return true;
        } else {
            return this.y < 155;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 2.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 0.5;
    }

    idle() {
        this.shortIdle -= 0.2;
        this.longIdle -= 0.2;
        if (this.longIdle < 0) {
            this.longIdle = 0;
        } else if (this.shortIdle < 0) {
            this.shortIdle = 0;
        }
    }

    isShortIdle() {
        return this.shortIdle == 0;
    }

    isLongIdle() {
        return this.longIdle == 0;
    }

    isDead() {
        return this.energy == 0;
    }

    getCoins() {
        this.money += 20;
        if (this.money > 100) {
            this.money = 100;
        }
    }

    getBottles() {
        this.sauce += 20;
        this.collectedBottles++;
        if (this.sauce > 100) {
            this.sauce = 100;
        }
    }

    buttonPressed() {
        return this.world.keyboard.D || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.SPACE || this.world.keyboard.DOWN;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
        if (world.gameSound) {
            this.AUDIO_PEPE_JUMP.volume = 0.2;
            this.AUDIO_PEPE_JUMP.play();
        }
    }

    killEnemie(index) {
        this.world.level.enemies.splice(index, 1);
    }

    playAudio(src) {
        let audio = new Audio(src);
        audio.volume = 0.2;
        audio.play();
    }

    /* Alternative (quick and dirty), um alle Intervalle zu beenden. */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

}