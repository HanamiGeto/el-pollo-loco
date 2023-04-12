class Coin extends MovableObject {
    y = 370;
    height = 120;
    width = 120;

    offset = {
        top: 30, 
        left: 30,
        right: 30,
        bottom: 30
    }

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = Math.random() * 2000; 
        this.y = Math.random() * 300 + 70;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 300);
    }
}