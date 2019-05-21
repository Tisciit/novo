window.onload = () => {

    distributeRolls();
    startCycling();
    setInterval(cycleTimer, 100);

    window.addEventListener('keydown', (e) => {
        if (e.code === "Space") {
            const runningSlots = document.querySelectorAll('.cycle');

            switch (runningSlots.length) {
                case 1: {
                    showWins();
                }
            }
            runningSlots.length > 0 ?
                runningSlots[0].classList.remove('cycle') : startCycling();;
        }
    })
}

function distributeRolls() {
    const things = [{
        url: "assets/beer@2x.png",
        possibility: 0.2
    }, {
        url: "assets/blank@2x.png",
        possibility: 0.25
    }, {
        url: "assets/blush@2x.png",
        possibility: 0.2
    }, {
        url: "assets/burger40.png",
        possibility: 0.1
    }, {
        url: "assets/coffee@2x.png",
        possibility: 0.1
    }, {
        url: "assets/star@2x.png",
        possibility: 0.05
    }, {
        url: "assets/thumbs-up@2x.png",
        possibility: 0.1
    }]

    const imagesPerRoll = 200;

    const rolls = document.querySelectorAll(".slot");

    for (const roll of rolls) {

        for (let i = 0; i < imagesPerRoll; i++) {
            let rando = Math.random();
            let url = "";
            for (let thing of things) {
                rando -= thing.possibility;
                if (rando <= 0) {
                    url = thing.url;
                    break;
                }
            }

            //generate li
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = url;
            li.append(img);

            const ul = roll.querySelector("ul");
            ul.append(li);
        }
    }
}

function startCycling() {
    const slots = document.querySelectorAll('.slot ul');
    for (const slot of slots) {
        slot.classList.add('cycle');
    }

    const svgs = document.querySelectorAll('svg');
    for (const svg of svgs) {
        svg.classList.remove("rShown");
    }
}

function cycleTimer() {
    const slots = document.querySelectorAll('.cycle');

    for (const slot of slots) {
        cycle(slot);
    }
}

function cycle(slot) {
    const first = slot.firstElementChild;
    const last = slot.lastElementChild;
    slot.insertBefore(last, first);
    last.classList.add('newItem');
}

function showWins() {
    const wins = getWins();
    for (const win of wins) {
        const svgs = document.querySelectorAll(`.${win.where}`);

        svgs.forEach(el => {
            el.classList.add("rShown");
        });
    }
}

function getWins() {
    const slots = document.querySelectorAll('.slot ul');
    const icons = [];

    for (let i = 0; i < slots.length; i++) {
        const s = slots[i];
        icons[i] = [];
        for (let n = 1; n < 4; n++) {
            icons[i][n - 1] = s.children[n].innerHTML;
        }
    }

    console.log(icons);

    //Wins: each row (elemts on same level)

    const wins = [];

    for (let i = 0; i < 3; i++) {
        if (icons[0][i] === icons[1][i] && icons[0][i] === icons[2][i]) {
            wins.push({
                "where": `r${i}`,
                "value": icons[0][i]
            });
        }
    }

    if (icons[0][0] === icons[1][1] && icons[1][1] === icons[2][2]) {
        wins.push({
            "where": 'dd',
            "value": icons[0][0]
        });
    }

    if (icons[0][2] === icons[1][1] && icons[1][1] === icons[2][0]) {
        wins.push({
            "where": 'du',
            "value": icons[2][0]
        });
    }

    return wins;
}