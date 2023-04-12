class EndbossHealthbar extends DrawableObject {

    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 10;
    otherDirection = true;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.x = 470;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(10); 
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 .... 5
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage >= 8) {
            return 4;
        } else if (this.percentage >= 6) {
            return 3;
        }else if (this.percentage >= 4) {
            return 2;
        } else if (this.percentage >= 2) {
            return 1;   
        } else {
            return 0;
        }
    }
}