class Bottle extends MovableObject {
    y = 370;
    height = 80;
    width = 80;

    offset = {
        top: 15, 
        left: 15,
        right: 15,
        bottom: 15
    }

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImg('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = Math.random() * 2000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 300);
    }
}