const singleWishBtn = document.getElementById('single-wish');
const tenWishBtn = document.getElementById('ten-wish');
const totalPullsEl = document.getElementById('total-pulls');
const pity5El = document.getElementById('pity5-pulls');
const pity4El = document.getElementById('pity4-pulls');
const cardContainer = document.getElementById('card-container');
const summaryEl = document.getElementById('summary');

let totalPullCount = 0;

let pity4 = 0;
let pity5 = 0;

// Output total pull count, pity5, pity4 values to DOM
totalPullsEl.innerText = `${totalPullCount}`;
pity5El.innerText = `${pity5}`;
pity4El.innerText = `${pity4}`;

let pullData = [
    /*
    {name: 'Keqing', count: 2},
    {name: 'Diluc', count: 4}
    */
];

/*
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
*/

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

// Output character or weapon (50% chance each)
function charOrWeaponSelect(rarity) {
    let val = Math.random();

    if (val > 0.5) {
        if (rarity === 'five-stars') {
            // Ouput 5 star character
            createCard('characters', characters.fiveStars, rarity);
        } else if (rarity === 'four-stars') {
            // Ouput 4 star character
            createCard('characters', characters.fourStars, rarity);
        }
    } else {
        if (rarity === 'five-stars') {
            // Ouput 5 star weapon
            createCard('weapons', weapons.fiveStars, rarity);
        } else if (rarity === 'four-stars') {
            // Ouput 4 star weapon
            createCard('weapons', weapons.fourStars, rarity);
        }
    }
    console.log('50% chance of char or weapon');
}

// Create card & output to DOM
function createCard(type, drawableItems, rarity) {
    const card = document.createElement('div');

    card.classList.add('card', `${rarity}`);
    let result = drawableItems[Math.floor(Math.random() * drawableItems.length)];

    // Change name from 'cool-steel' to 'Cool Steel'
    let formattedName = (result.replace(/-/g, ' ')).replace(/\b\w/g, letter => letter.toUpperCase());

    let fiveStarsIcon = `<i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        `;

    let fourStarsIcon = `<i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        `;

    let threeStarsIcon = `<i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        `;

    let rarityIcon;

    if (rarity === 'five-stars') {
        rarityIcon = fiveStarsIcon;
        card.style.background = '#B88B52';
    } else if (rarity === 'four-stars') {
        rarityIcon = fourStarsIcon;
        card.style.background = '#A18BB8';
    } else {
        rarityIcon = threeStarsIcon;
    }

    card.innerHTML = `
                    <img src="images/${type}/${result}.png">
                    <p class="item-name">${formattedName}</p>
                    <div class="rarity-icon">${rarityIcon}</div>
                    `;

    // Add 'slide-in' class after 0.2s (CSS applied to 'slide-in' class)
    setTimeout(() => card.classList.add('slide-in'), 300);

    // Update pullData arr
    updateData(formattedName);

    cardContainer.appendChild(card);
}

function itemExists(name) {
    return pullData.some(item => { return item.name === name });
}


// Add item to pullData arr
function updateData(itemName) {
    // If value of the key 'name' already exist, increase the count
    if(itemExists(itemName) === true) {
        pullData.forEach(item => {
            if (itemName === item.name) {
                item.count++;
            }
        });
    // If value of the key 'name' doesnt exist - push a new item into the pullData array
    } else {
        pullData.push({
            name: itemName,
            count: 1
        });
    }
    // console.log(pullData);

    updateSummaryEl()
}

// output each item to DOM
function updateSummaryEl() {
    let output = '';

    pullData.forEach(item => {
        output += `
            <li>
                <span><strong> ${item.name} </strong></span>
                <span> x${item.count} </span>
            </li>
        `;
    });

    summaryEl.innerHTML = `
        <ul class="summary-data">
            ${output}
        </ul>
    `;
}

// Check for 5 star SOFT pity
function softPityCheck() {
    let val = Math.random();

    // Scenario: 5 star (Chance of 0.2 - increased due to soft pity)
    if (val < 0.25 && val >= 0.05) {
        // Output 5 star chracter or weapon (50% chance each)
        charOrWeaponSelect('five-stars');
        console.log('Soft pity activated');

        // reset pity 5 count
        pity5 = 0;

        // Scenario: 4 star (Chance of 0.05)
    } else if (val < 0.05) {
        // Output 4 star character or weapon (50% chance each)
        charOrWeaponSelect('four-stars');

        // reset pity 4 count
        pity4 = 0;

        // Scenario: 3 star (Chance of 0.944)
    } else {
        createCard('weapons', weapons.threeStars, 'three-stars');
    }
}

// Make a Single Wish
function makeSingleWish() {
    //e.preventDefault();
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Increase pity count & totalPullCount by 1
    pity5++;
    pity4++;
    totalPullCount++;

    // Output total pull count, pity5, pity4 values to DOM
    totalPullsEl.innerText = `${totalPullCount}`;
    pity5El.innerText = `${pity5}`;
    pity4El.innerText = `${pity4}`;

    console.log(pity5, pity4);

    // Check for 5 star SOFT pity && 4 star pity (occur at the same time)
    if (pity5 >= 75 && pity5 < 90 && pity4 === 10) {
        // 4 star first - if pity4 === 10, output a 4 star char or weapon 
        // Output a 4 star character or weapon (50% chance each)
        charOrWeaponSelect('four-stars');

        // reset pity 4 count
        pity4 = 0;

        // Check for 5 star SOFT pity
    } else if (pity5 >= 75 && pity5 < 90) {
        softPityCheck();

        // Check for 5 star pity
    } else if (pity5 === 90) {
        // Output 5 star chracter or weapon (50% chance each)
        charOrWeaponSelect('five-stars');

        // Reset pity 5 count
        pity5 = 0;

        // Check for 4 star pity
    } else if (pity4 === 10) {
        // Output a 4 star character or weapon (50% chance each)
        charOrWeaponSelect('four-stars');

        // reset pity 4 count
        pity4 = 0;

    } else { // Normal non-pity pull - Need to check for 0.006, 0.05
        let val = Math.random();

        // Scenario: 5 star (Chance of 0.006)
        if (val < 0.006) {
            // Output 5 star character or weapon (50% chance each)
            charOrWeaponSelect('five-stars');

            // reset pity 5 count
            pity5 = 0;

            // Scenario: 4 star (Chance of 0.05)
        } else if (val < 0.056 && val >= 0.006) {
            // Output 4 star character or weapon (50% chance each)
            charOrWeaponSelect('four-stars');

            // reset pity 4 count
            pity4 = 0;

            // Scenario: 3 star (Chance of 0.944)
        } else {
            createCard('weapons', weapons.threeStars, 'three-stars');
        }
    }
}


// Make Ten Wishes
function makeTenWishes() {
    //e.preventDefault();

    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Make 10 single wishes
    let i = 0;

    while (i < 10) {
        // Check for 5 star SOFT pity && 4 star pity (occur at the same time)
        if (pity5 >= 75 && pity5 < 90 && pity4 === 10) {
            // 4 star first - if pity4 === 10, output a 4 star char or weapon 
            // Output a 4 star character or weapon (50% chance each)
            charOrWeaponSelect('four-stars');

            // reset pity 4 count
            pity4 = 0;

            // Check for 5 star SOFT pity
        } else if (pity5 >= 75 && pity5 < 90) {
            softPityCheck();


            // Check for 5 star pity
        } else if (pity5 === 90) {
            // Output 5 star chracter or weapon (50% chance each)
            charOrWeaponSelect('five-stars');

            // Reset pity 5 count
            pity5 = 0;

            // Check for 4 star pity
        } else if (pity4 === 10) {
            // Output a 4 star character or weapon (50% chance each)
            charOrWeaponSelect('four-stars');
            console.log('4 star pity');

            // reset pity 4 count
            pity4 = 0;

        } else { // Normal non-pity pull - Need to check for 0.006, 0.05
            let val = Math.random();

            // Scenario: 5 star (Chance of 0.006)
            if (val < 0.006) {
                // Output 5 star chracter or weapon (50% chance each)
                charOrWeaponSelect('five-stars');

                // reset pity 5 count
                pity5 = 0;

                // Scenario: 4 star (Chance of 0.05)
            } else if (val < 0.056 && val >= 0.006) {
                // Output a 4 star character or weapon (50% chance each)
                charOrWeaponSelect('four-stars');
                console.log('4 star non-pity');

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

        // Output total pull count, pity5, pity4 values to DOM
        totalPullsEl.innerText = `${totalPullCount}`;
        pity5El.innerText = `${pity5}`;
        pity4El.innerText = `${pity4}`;

        console.log(pity5, pity4);

        i++;
    }


}

// Event Listeners
singleWishBtn.addEventListener('click', makeSingleWish);
tenWishBtn.addEventListener('click', makeTenWishes);
