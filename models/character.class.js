class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 80;//155;
    speed = 10;

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    }


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;

    AUDIO_HURT = new Audio('audio/pepehurt.mp3');
    AUDIO_WALK = new Audio('audio/walk.mp3');


    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.characterMovements();
        let intervalID = setInterval(() => {
            if (this.isDead()) {
                this.characterPlayDeadAnimation(intervalID);
            } else if (this.isHurt()) {
                this.characterPlayHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.characterPlayWalklAnimation();
            } else {
                this.characterPlayIdleAnimation();
            }
        }, 100);
    }

    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }

    triggerEndboss() {
        let endboss = this.world.level.endboss[0];
        if (this.x >= 2000 && endboss.x > 2550) {
            this.endbossTriggered = true;
            endboss.endbossTriggered = true;
        } else {
            endboss.endbossTriggered = false;
        }
    }

    characterMovements() {
        setInterval(() => {
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            this.triggerEndboss();
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
    }

    characterPlayDeadAnimation(intervalID) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            clearInterval(intervalID);
            this.loadImg('img/2_character_pepe/5_dead/D-57.png');
        }, 250)
    }

    characterPlayHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.world.gameSound) {
            this.AUDIO_HURT.volume = 0.2;
            this.AUDIO_HURT.play();
        }
    }

    characterPlayWalklAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.world.gameSound) {
            this.AUDIO_WALK.volume = 0.2;
            this.AUDIO_WALK.play();
        }
    }

    characterPlayIdleAnimation() {
        if (this.isLongIdle()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (this.isShortIdle()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

}