let score = 0;
var maxScore = 10;
var randomTime = 3000;
var roundTime = 30;
var timeCount;
var level = 1;
function getSadInterval() {
    return Date.now() - 1000;
}
function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}
function getHungryInterval() {
    return Date.now() + Math.floor(Math.random() * randomTime) + 1000;
}
function timer() {
    document.querySelector('.timer-container').innerHTML = `${roundTime}`;   
    if(roundTime == -1) {
         clearInterval(timeCount);
         if(score < maxScore) {
             document.querySelector('.timer-container').classList.add("hide");
             document.querySelector('.bg').classList.add("hide");
             document.querySelector('.lose').classList.remove("hide");
         }
    }
    roundTime--;
}
const moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-0")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-1")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-2")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-3")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-4")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-5")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-6")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-7")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-8")
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-9")
    }
];
function getNextStatus(mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
            mole.next = getSadInterval();
            mole.status = "leaving";
            if (mole.king) {
                mole.node.children[0].src = './king-mole-leaving.png';
            } else {

                mole.node.children[0].src = './mole-leaving.png';
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = "gone";
            mole.node.children[0].classList.add("gone");
            break;
        case "gone":
            mole.status = "hungry";
            mole.next = getHungryInterval();
            mole.king = getKingStatus();
            mole.node.children[0].classList.add("hungry");
            mole.node.children[0].classList.remove("gone");
            if (mole.king) {
                mole.node.children[0].src = './king-mole-hungry.png';
            } else {

                mole.node.children[0].src = './mole-hungry.png';
            }
            break;
        case "hungry":
            mole.status = "sad";
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove("hungry");
            if(mole.king) {
                mole.node.children[0].src = './king-mole-sad.png';
            }
            mole.node.children[0].src = './mole-sad.png';
            break;
    }

}
function getKingStatus() {
    return Math.random() > .9
}
function feed(event) {
    if (event.target.tagName !== 'IMG' || !event.target.classList.contains("hungry")) {
        return;
    }
    const mole = moles[parseInt(event.target.dataset.index)];
    mole.status = "fed";
    mole.next = getSadInterval();
    if(mole.king) {
        mole.node.children[0].src = './king-mole-fed.png';
        score+=2;
    } else {
        mole.node.children[0].src = './mole-fed.png';
        score++;
    }
    mole.node.children[0].classList.remove("hungry");
    document.querySelector('.worm-container').style.width = `${score / maxScore * 100}%`;
    if (score >= maxScore) {
        setTimeout(win, 1000);
    }
}

function win() {
    document.querySelector('.timer-container').classList.add("hide");
    document.querySelector('.bg').classList.add("hide");
    if(level==6) {
        document.querySelector('.win').children[0].src = './you-win.jpg';
        document.querySelector('.nextlevel').classList.add("hide");
        document.querySelector('.level-container').classList.add("hide");

    }
    document.querySelector('.win').classList.remove("hide");
    clearInterval(timeCount);
}
function init() {
    score = 0;
    level++;
    document.querySelector('.level-container').innerHTML = `Level ${level}`;
    roundTime = 30;
    for(x in moles) {
        moles[x] = {
            status: "sad",
            next: getSadInterval(),
            king: false,
            node: document.getElementById(`hole-${x}`)
        }
    }
    if(randomTime >= 600) randomTime -= 600;
    document.querySelector('.worm-container').style.width = "5%";
    document.querySelector('.win').classList.add("hide");
    document.querySelector('.bg').classList.remove("hide");
    timeCount = setInterval(timer,1000);
    document.querySelector('.timer-container').innerHTML = roundTime;
    document.querySelector('.timer-container').classList.remove("hide");
}
timeCount = setInterval(timer,1000);
document.querySelector('.nextlevel').addEventListener("click", init)
let runAgainAt = Date.now() + 100;
function nextFrame() {
    const now = Date.now();
    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}
document.querySelector('.bg').addEventListener("click", feed);
nextFrame();
