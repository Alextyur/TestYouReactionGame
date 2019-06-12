/* -------GAME REACTION----------------------
* -----It's an educational HTML game-page----
* Press START button to start
* This game draws figures on your screen
* Click on the appeared figures one by one
* Your reaction - time to press on seen figure is calculated
* Press FINISH to get your result
* Number of attempts is provided and average reaction time
* -------------------------------------------
* What I did not do:
* 1. A figure can appear of a white color, and any very light one
* 2. Last figure of a previous session is still displayed when press FINISH, then close alert
* ------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () { //wait till the whole document is loaded and do:
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    //Getting random figure from the array of figures
    const figures = ['circle','ellipse','rectangle','triangle','trapezoid','square'];
    function getRandomFigure() {
        let rand = Math.floor(Math.random()*(figures.length));
        return figures[rand];
    }

    //Getting random color
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //Getting random size of the figure from interval [50px, 100px]
    function getRandSize() {
        return Math.random()*50+50;
    }

    //Getting random position of the figure X and Y
    function getPositionX(){
        return Math.random()*(screenWidth - 150);//trapezoid takes more place to be drawn
    }

    function getPositionY() {
        return Math.random()*(screenHeight - 186)+43; //buttons 'start' and 'finish' take 43px
    }

    let reactionArray = [];
    let figClassName = "";

    //Main function which draws figures and calculate your reaction
    function changeFigure (figureClassName) {
        const divFigure = document.getElementsByClassName(figureClassName);
        let reactionTime = 0;
        let prevClickTime = 0;
        let currClickTime = 0;
        reactionArray = [];

        divFigure[0].addEventListener("click", function () {
            this.classList.remove(figureClassName);
            let newFigureClass = getRandomFigure();
            this.classList.add(newFigureClass);
            figureClassName = newFigureClass;

            currClickTime = new Date;
            if (prevClickTime !== 0) {
                reactionTime = currClickTime - prevClickTime;
                reactionArray.push(reactionTime);
            }
            prevClickTime = currClickTime;

            //getting random position and assigning it
            this.style.top = getPositionY() + "px";
            this.style.left = getPositionX() + "px";

            //getting random color and size, and assigning them
            const randColor = getRandomColor();
            let size = getRandSize();

            switch (newFigureClass){
                case 'circle':
                case 'square':
                    this.style.background = randColor;
                    this.style.setProperty('border','none');
                    this.style.setProperty('width', size + 'px');
                    this.style.setProperty('height', size + 'px');
                    break;
                case 'rectangle':
                case 'ellipse':
                    this.style.background = randColor;
                    this.style.setProperty('border','none');
                    this.style.setProperty('width', size  + 'px');
                    this.style.setProperty('height', size/2  + 'px');
                    break;
                case 'triangle':
                case 'trapezoid':
                    this.style.setProperty('background', 'white');
                    const borValue = size + "px solid" + randColor;
                    this.style.setProperty('border-bottom', borValue);
                    this.style.setProperty('border-left', size/2 + 'px solid transparent');
                    this.style.setProperty('border-right', size/2 + 'px solid transparent');
                    break;
            }
            figClassName = figureClassName;
        });

    }

    //Draws first random figure and returns its name
    function drawFirstFigure() {
        //Enable FINISH button
        document.getElementById("finishBtn").disabled = false;
        //getting the figure
        let divFigure = document.getElementsByClassName("firstFigure");
        let firstFigureClass = getRandomFigure();
        divFigure[0].classList.add(firstFigureClass);
        divFigure = document.getElementsByClassName(firstFigureClass);
        divFigure[0].classList.remove("firstFigure");

        divFigure[0].style.top = getPositionY() + "px";
        divFigure[0].style.left = getPositionX() + "px";
        const randColor = getRandomColor();
        let size = getRandSize();

        switch (firstFigureClass){
            case 'circle':
            case 'square':
                divFigure[0].style.background = randColor;
                divFigure[0].style.setProperty('border','none');
                divFigure[0].style.setProperty('width', size + 'px');
                divFigure[0].style.setProperty('height', size + 'px');
                break;
            case 'rectangle':
            case 'ellipse':
                divFigure[0].style.background = randColor;
                divFigure[0].style.setProperty('border','none');
                divFigure[0].style.setProperty('width', size  + 'px');
                divFigure[0].style.setProperty('height', size/2  + 'px');
                break;
            case 'triangle':
            case 'trapezoid':
                divFigure[0].style.setProperty('background', 'white');
                const borValue = size + "px solid" + randColor;
                divFigure[0].style.setProperty('border-bottom', borValue);
                divFigure[0].style.setProperty('border-left', size/2 + 'px solid transparent');
                divFigure[0].style.setProperty('border-right', size/2 + 'px solid transparent');
                break;
        }
        return firstFigureClass;
    }

    //when a START button is pressed
    document.getElementById("startBtn").onclick = function() {
        const firstFig = drawFirstFigure();
        figClassName = changeFigure(firstFig);
    };
    //when a FINISH button is pressed
    document.getElementById("finishBtn").onclick = function() {
        //disabling FINISH button
        document.getElementById("finishBtn").disabled = true;

        let divFigure = document.getElementsByClassName(figClassName);
        //deleting eventListener
        divFigure[0].outerHTML = divFigure[0].outerHTML;

        divFigure[0].classList.add("firstFigure");
        divFigure = document.querySelectorAll('.'+figClassName,".firstFigure");
        divFigure[0].classList.remove(figClassName);

        //evaluating average reaction time
        let sum = 0;
        for (let i = 0; i < reactionArray.length; i++){
            sum += reactionArray[i];
        }
        alert("Well done! You did " + reactionArray.length + " attempts. And your average reaction time is "
            + sum/reactionArray.length + " ms.");
        reactionArray = [];
    };
});