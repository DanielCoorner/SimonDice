
const btnGreen = document.getElementById('btn-green')
const btnRed = document.getElementById('btn-red')
const btnYellow = document.getElementById('btn-yellow')
const btnBlue = document.getElementById('btn-blue')
const btnStartContainer = document.getElementById('btn-start-container')
const MAX_LEVEL = 10

class Game {
    constructor() {
        this.initialize = this.initialize.bind(this)
        this.initialize()
        this.generateSequence()
        setTimeout(this.nextLevel, 500);
    }

    initialize() {
        this.selectColor = this.selectColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toggleBtnStart()
        this.level = 3
        this.colorsBtns = { 
            green: btnGreen,
            red: btnRed,
            yellow: btnYellow,
            blue: btnBlue
        }
    }

    toggleBtnStart() {
        if(btnStartContainer.classList.contains('hide')) {
            btnStartContainer.classList.remove('hide')
        } else {
            btnStartContainer.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.subLevel = 0
        this.illuminateSequence()
    }

    transformNumberToColor(number) {
        switch (number) {
            case 0:
                return 'green'
            case 1:
                return 'red'
            case 2:
                return 'yellow'
            case 3: 
                return 'blue'
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'green':
                return 0
            case 'red':
                return 1
            case 'yellow':
                return 2
            case 'blue': 
                return 3
        }
    }

    illuminateSequence() {
        this.removeClickEvents()
        for (let i = 0; i < this.level; i++) {
            let color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i) 
        }
        setTimeout(() => this.addClickEvents(), 1000 * (this.level - 1));
    }

    illuminateColor(color) {
        this.colorsBtns[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }

    turnOffColor(color) {
        this.colorsBtns[color].classList.remove('light')
    } 

    addClickEvents() {
        this.colorsBtns.green.addEventListener('click', this.selectColor)
        this.colorsBtns.red.addEventListener('click', this.selectColor)
        this.colorsBtns.yellow.addEventListener('click', this.selectColor)
        this.colorsBtns.blue.addEventListener('click', this.selectColor)
    }
    
    removeClickEvents() {
        this.colorsBtns.green.removeEventListener('click', this.selectColor)
        this.colorsBtns.red.removeEventListener('click', this.selectColor)
        this.colorsBtns.yellow.removeEventListener('click', this.selectColor)
        this.colorsBtns.blue.removeEventListener('click', this.selectColor)
    }

    selectColor(ev) {
        const selectedColor = ev.target.dataset.color
        const numberOfSelectedColor = this.transformColorToNumber(selectedColor)
        this.illuminateColor(selectedColor)
        if(numberOfSelectedColor === this.sequence[this.subLevel]) {
            this.subLevel++
            if(this.subLevel === this.level) {
                this.level++
                this.removeClickEvents()
                if(this.level === (MAX_LEVEL + 1)) {
                    this.winTheGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.removeClickEvents()
            this.loseTheGame()
        } 
    }

    winTheGame() {
        swal('Simón dice:', '🎉Felicidades, ganaste🎊', 'success')
            .then(this.initialize)
    }

    loseTheGame() {
        swal('Simón dice:', '💢Lo lamento, perdiste🤔', 'error')
            .then(this.initialize)
    }

}

function startGame() {
    window.game = new Game()
}