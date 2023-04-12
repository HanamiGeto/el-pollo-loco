class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 50;
    energy = 10;

    offset = {
        top: 80,
        left: 20,
        right: 30,
        bottom: 30
    }

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImg(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.speed = 1.5;
        this.x = 2900;
        this.animate();
    }

    animate() {

        let intervalEndboss = setInterval(() => {
            if (this.endbossTriggered && !this.isDead() || this.x <= 2600 && !this.isHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        let intervalID2 = setInterval(() => {
            if (this.isDead()) {
                this.endbossPlayDeadAnimation(intervalEndboss, intervalID2);
            } else if (this.isHurt() && !this.isDead()) {
                this.endbossPlayHurtAnimation();
            } else if (this.x <= 2600) {
                this.endbossGotTriggered();
            } else if (this.endbossTriggered) {
                this.endbossWalking();
            }
        }, 200);
    }

    playHurtaudio() {
        if (world.gameSound) {
            this.AUDIO_ENEMY_HURT.volume = 0.1;
            this.AUDIO_ENEMY_HURT.play();
        }
    }

    endbossPlayDeadAnimation(intervalEndboss, intervalID2) {
        this.playHurtaudio();
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(intervalEndboss);
        setTimeout(() => {
            clearInterval(intervalID2);
            this.loadImg('img/4_enemie_boss_chicken/5_dead/G26.png');
        }, 200)
    }

    endbossPlayHurtAnimation() {
        this.speed = 0;
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtaudio();
    }

    endbossGotTriggered() {
        if (this.endbossTriggered) {
            this.playAnimation(this.IMAGES_ALERT);
            this.speed = 0;
            setTimeout(() => {
                this.speed = 4;
            }, 800)
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
            this.speed = 4;
        }
    }

    endbossWalking() {
        this.speed = 3;
        this.playAnimation(this.IMAGES_WALKING);
    }
}