class SmallChicken extends MovableObject {
    y = 370;
    height = 60;
    width = 60;
    energy = 2.5;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 1000; // Zahl zwischen 200 - 700
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        let intervalID = setInterval(() => {
            if (this.isDead()) {
                this.chickenDeadAnimation(intervalID);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    chickenDeadAnimation(intervalID) {
        this.loadImg('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
                this.speed = 0;
                if (world.gameSound) {
                    this.AUDIO_ENEMY_HURT.volume = 0.1;
                    this.AUDIO_ENEMY_HURT.play();
                }
                setTimeout(() => {
                    clearInterval(intervalID);
                }, 100)
    }
}