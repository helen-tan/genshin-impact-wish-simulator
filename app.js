const singleWishBtn = document.getElementById('single-wish');
const tenWishBtn = document.getElementById('ten-wish');
const totalPullsEl = document.getElementById('total-pulls');
const cardContainer = document.getElementById('card-container');

let totalPullCount = 0;

let pity4 = 0;
let pity5 = 0;

const odds = {
    fiveStars: {
        chance: 0.006,
        softPityChance: 0.2,
        pity: 90,
        softPity: 75
    },
    fourStars: {
        chance: 0.05,
        pity: 10
    },
    threeStars: {
        chance: 0.944
    }
}

const characters = {
    fiveStars: ['Keqing', 'Mona', 'Qiqi', 'Diluc', 'Jean'],
    fourStars: [
        'Rosaria',
        'Lisa',
        'Amber',
        'Diona',
        'Kaeya',
        'Barbara',
        'Bennett',
        'Noelle',
        'Fischl',
        'Razor',
        'Sucrose',
        'Yanfei',
        'Ningguang',
        'Xinyan',
        'Beidou',
        'Xiangling',
        'Chongyun',
        'Xingqiu',
        'Sayu',
        'Kujou-Sara'
    ]
}

const weapons = {
    fiveStars: [
        'aquila-favonia',
        'lost-prayer-to-the-sacred-winds',
        'primodial-jade-winged-spear',
        "wolfs-gravestone",
        "amos-bow",
        'skyward-blade',
        'skyward-pride',
        'skyward-spine',
        'skyward-harp',
        'skyward-atlas'
    ],
    fourStars: [
        'rust',
        'sacrificial-bow',
        'sacrificial-fragments',
        'sacrificial-greatsword',
        'sacrificial-sword',
        'the-stringless',
        'the-widsith',
        'the-bell',
        'the-flute',
        'favonius-warbow',
        'favonius-lance',
        'favonius-codex',
        'favonius-greatsword',
        'favonius-sword',
        "dragons-bane",
        'rainslasher',
        "lions-roar",
        'eye-of-perception'
    ],
    threeStars: [
        'slingshot',
        'thrilling-tales-of-dragon-slayers',
        "sharpshooters-oath",
        'ferrous-shadow',
        'skyrider-sword',
        'cool-steel',
        'debate-club',
        'black-tassel',
        'bloodtainted-greatsword',
        'magic-guide',
        'emerald-orb',
        'raven-bow',
        'harbinger-of-dawn'
    ]
}

function randomPull() {
    return weapons.threeStars[Math.floor(Math.random() * weapons.threeStars.length)];
}

// Make a Single Wish
function makeSingleWish(e) {
    e.preventDefault();
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Increase pity count & totalPullCount by 1
    pity5++;
    pity4++;
    totalPullCount++;
    // Output total pull count to DOM
    totalPullsEl.innerText = `${totalPullCount}`;
    console.log(pity5, pity4);


    // Check for 4 star pity
    if (pity4 === 10) {
        // Output a 4 star character or weapon
        let val = Math.random();
        if (val > 0.5) {
            // Ouput 4 star character
            const card = document.createElement('div');
            card.classList.add('card');
            let char4Star = characters.fourStars[Math.floor(Math.random() * characters.fourStars.length)];

            card.innerHTML = `<img src="images/characters/${char4Star}.png">`;
            cardContainer.appendChild(card);

        } else {
            // Output 4 star weapon
            const card = document.createElement('div');
            card.classList.add('card');
            let weapon4Star = weapons.fourStars[Math.floor(Math.random() * weapons.fourStars.length)];

            card.innerHTML = `<img src="images/weapons/${weapon4Star}.png">`;
            cardContainer.appendChild(card);
        }

        // reset pity 4 count
        pity4 = 0;

    } else { // Normal non-pity pull -///////Need to check for 0.006, 0.05
        let val = Math.random();

        // Scenario: 5 star (Chance of 0.006)
        if (val < 0.006) {
            let val5star = Math.random();
            if (val5star > 0.5) {
                // Ouput 5 star character
                const card = document.createElement('div');
                card.classList.add('card');
                let char5Star = characters.fiveStars[Math.floor(Math.random() * characters.fiveStars.length)];

                card.innerHTML = `<img src="images/characters/${char5Star}.png">`;
                cardContainer.appendChild(card);

            } else {
                // Output 5 star weapon
                const card = document.createElement('div');
                card.classList.add('card');
                let weapon5Star = weapons.fiveStars[Math.floor(Math.random() * weapons.fiveStars.length)];

                card.innerHTML = `<img src="images/weapons/${weapon5Star}.png">`;
                cardContainer.appendChild(card);
            }
            // reset pity 5 count
            pity5 = 0;

        } else if (val < 0.05) { // Scenario: 4 star (Chance of 0.05)
            let val4star = Math.random();
            if (val4star > 0.5) {
                // Ouput 4 star character
                const card = document.createElement('div');
                card.classList.add('card');
                let char4Star = characters.fourStars[Math.floor(Math.random() * characters.fourStars.length)];

                card.innerHTML = `<img src="images/characters/${char4Star}.png">`;
                cardContainer.appendChild(card);

            } else {
                // Output 4 star weapon
                const card = document.createElement('div');
                card.classList.add('card');
                let weapon4Star = weapons.fourStars[Math.floor(Math.random() * weapons.fourStars.length)];

                card.innerHTML = `<img src="images/weapons/${weapon4Star}.png">`;
                cardContainer.appendChild(card);
            }
            // reset pity 4 count
            pity4 = 0;

        } else { // Scenario: 3 star (Chance of 0.944)
            // Create card
            const card = document.createElement('div');
            card.classList.add('card');
            let weapon3Star = weapons.threeStars[Math.floor(Math.random() * weapons.threeStars.length)];

            card.innerHTML = `<img src="images/weapons/${weapon3Star}.png">`;
            cardContainer.appendChild(card);
        }
    }



    // Paint the DOM with the card
}

// Make Ten Wishes
function makeTenWishes(e) {
    e.preventDefault();

}

// Event Listeners
singleWishBtn.addEventListener('click', makeSingleWish);
tenWishBtn.addEventListener('click', makeTenWishes);
