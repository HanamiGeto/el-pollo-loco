class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindKeyPressEvents();
        setTimeout(() => {
            this.bindBtnsPressEvents();
        }, 100)
    }

    bindKeyPressEvents() {
        this.keyDownEvent();
        this.keyUpEvent();
    }


    bindBtnsPressEvents() {
       this.touchStartEvent();
       this.touchEndEvent();
    }

    keyDownEvent() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }

            if (event.keyCode == 37) {
                this.LEFT = true;
            }

            if (event.keyCode == 38) {
                this.UP = true;
            }

            if (event.keyCode == 40) {
                this.DOWN = true;
            }

            if (event.keyCode == 32) {
                this.SPACE = true;
            }

            if (event.keyCode == 68) {
                this.D = true;
            }
        })
    }

    keyUpEvent() {
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }

            if (event.keyCode == 37) {
                this.LEFT = false;
            }

            if (event.keyCode == 38) {
                this.UP = false;
            }

            if (event.keyCode == 40) {
                this.DOWN = false;
            }

            if (event.keyCode == 32) {
                this.SPACE = false;
            }

            if (event.keyCode == 68) {
                this.D = false;
            }
        })
    }

    touchStartEvent() {
        document.getElementById('btn-left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        })

        document.getElementById('btn-right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        })

        document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        })

        document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        })
    }

    touchEndEvent() {
        document.getElementById('btn-left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        })

        document.getElementById('btn-right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        })

        document.getElementById('btn-jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        })

        document.getElementById('btn-throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        })
    }

}