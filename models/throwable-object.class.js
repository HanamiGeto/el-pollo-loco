class ThrowableObject extends MovableObject {

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    AUDIO_BOTTLE = new Audio('audio/bottlebreak.mp3');

    constructor(x, y) {
        super().loadImg('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION)
        this.loadImages(this.IMAGES_BOTTLE_SPLASH)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 20;
        if (!world.character.otherDirection) {
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else {
            this.applyGravity();
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }
    }

    animate() {
        let intervalID = setInterval(() => {
            if (world.level.endboss[0].isColliding(this) || this.y > 300) {
                this.bottleSplashAnimation(intervalID);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 80);
    }

     bottleSplashAnimation(intervalID) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                if (world.gameSound) {
                    this.AUDIO_BOTTLE.volume = 0.2;
                    this.AUDIO_BOTTLE.play();
                }
                setTimeout(() => {
                    clearInterval(intervalID);
                }, 100)
     }

}