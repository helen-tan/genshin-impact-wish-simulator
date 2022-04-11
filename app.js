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
        'primordial-jade-winged-spear',
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

function createCard(type, drawableItems, rarity) {
    const card = document.createElement('div');
    
    card.classList.add('card', `${rarity}`); 
    let result = drawableItems[Math.floor(Math.random() * drawableItems.length)];

    card.innerHTML = `<img src="images/${type}/${result}.png">`;
    if(rarity === 'five-stars'){
        card.style.background = '#B88B52';
    } else if(rarity === 'four-stars') {
        card.style.background = '#A18BB8';
    }
    cardContainer.appendChild(card);
}

// Make a Single Wish
function makeSingleWish(e) {
    //e.preventDefault();
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Increase pity count & totalPullCount by 1
    pity5++;
    pity4++;
    totalPullCount++;
    // Output total pull count to DOM
    totalPullsEl.innerText = `${totalPullCount}`;
    console.log(pity5, pity4);

    // Check for 5 star pity
    if (pity5 === 90) {
        // Output 5 star chracter or weapon (50% chance each)
        let val = Math.random();

        if (val > 0.5) {
            // Ouput 5 star character
            createCard('characters', characters.fiveStars, 'five-stars');
        } else {
            // Output 5 star weapon
            createCard('weapons', weapons.fiveStars, 'five-stars');
        }
        // Reset pity 5 count
        pity5 = 0;

        // Check for 4 star pity
    } else if (pity4 === 10) {
        // Output a 4 star character or weapon (50% chance each)
        let val = Math.random();
        if (val > 0.5) {
            // Ouput 4 star character
            createCard('characters', characters.fourStars, 'four-stars');

        } else {
            // Output 4 star weapon
            createCard('weapons', weapons.fourStars, 'four-stars');
        }

        // reset pity 4 count
        pity4 = 0;

    } else { // Normal non-pity pull - Need to check for 0.006, 0.05
        let val = Math.random();

        // Scenario: 5 star (Chance of 0.006)
        if (val < 0.006) {
            let val5star = Math.random();
            // Output 5 star chracter or weapon (50% chance each)
            if (val5star > 0.5) {
                // Ouput 5 star character
                createCard('characters', characters.fiveStars, 'five-stars');

            } else {
                // Output 5 star weapon
                createCard('weapons', weapons.fiveStars, 'five-stars');
            }
            // reset pity 5 count
            pity5 = 0;

            // Scenario: 4 star (Chance of 0.05)
        } else if (val < 0.05) {
            let val4star = Math.random();
            if (val4star > 0.5) {
                // Ouput 4 star character
                createCard('characters', characters.fourStars, 'four-stars');

            } else {
                // Output 4 star weapon
                createCard('weapons', weapons.fourStars, 'four-stars');
            }
            // reset pity 4 count
            pity4 = 0;

            // Scenario: 3 star (Chance of 0.944)
        } else {
            createCard('weapons', weapons.threeStars, 'three-stars');
        }
    }
}


// Make Ten Wishes
function makeTenWishes(e) {
    //e.preventDefault();

    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Make 10 single wishes
    let i = 0;

    while (i < 10) {
        // Check for 5 star pity
        if (pity5 === 90) {
            // Output 5 star chracter or weapon (50% chance each)
            let val = Math.random();

            if (val > 0.5) {
                // Ouput 5 star character
                createCard('characters', characters.fiveStars, 'five-stars');
            } else {
                // Output 5 star weapon
                createCard('weapons', weapons.fiveStars, 'five-stars');
            }
            // Reset pity 5 count
            pity5 = 0;

            // Check for 4 star pity
        } else if (pity4 === 10) {
            // Output a 4 star character or weapon (50% chance each)
            let val = Math.random();
            if (val > 0.5) {
                // Ouput 4 star character
                createCard('characters', characters.fourStars, 'four-stars');

            } else {
                // Output 4 star weapon
                createCard('weapons', weapons.fourStars, 'four-stars');
            }

            // reset pity 4 count
            pity4 = 0;

        } else { // Normal non-pity pull - Need to check for 0.006, 0.05
            let val = Math.random();

            // Scenario: 5 star (Chance of 0.006)
            if (val < 0.006) {
                let val5star = Math.random();
                // Output 5 star chracter or weapon (50% chance each)
                if (val5star > 0.5) {
                    // Ouput 5 star character
                    createCard('characters', characters.fiveStars, 'five-stars');

                } else {
                    // Output 5 star weapon
                    createCard('weapons', weapons.fiveStars, 'five-stars');
                }
                // reset pity 5 count
                pity5 = 0;

                // Scenario: 4 star (Chance of 0.05)
            } else if (val < 0.05) {
                let val4star = Math.random();
                if (val4star > 0.5) {
                    // Ouput 4 star character
                    createCard('characters', characters.fourStars, 'four-stars');

                } else {
                    // Output 4 star weapon
                    createCard('weapons', weapons.fourStars, 'four-stars');
                }
                // reset pity 4 count
                pity4 = 0;

                // Scenario: 3 star (Chance of 0.944)
            } else {
                createCard('weapons', weapons.threeStars, 'three-stars');
            }
        }
        // Increase pity count & totalPullCount by 1
        pity5++;
        pity4++;
        totalPullCount++;
        // Output total pull count to DOM
        totalPullsEl.innerText = `${totalPullCount}`;
        console.log(pity5, pity4);

        i++;
    }


}

// Event Listeners
singleWishBtn.addEventListener('click', makeSingleWish);
tenWishBtn.addEventListener('click', makeTenWishes);
