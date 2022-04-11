const singleWishBtn = document.getElementById('single-wish');
const tenWishBtn = document.getElementById('ten-wish');
const totalPullsEl = document.getElementById('total-pulls'); 
const cardContainer = document.getElementById('card-container');

let totalPullCount = 0;

let pity = {
    fiveStars: 0,
    fourStars: 0
}

const odds = {
    fiveStars: {
        chance: 0.006,
        softPityChance: 0.2,
        pity: 90,
        softPity: 75
    },
    fourStars:{
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
        'Yun Jin',
        'Thoma',
        'Sayu',
        'Kujou Sara'
    ] 
}

const weapons = {
    fiveStars: [
        'Aquila Favonia',
        'Lost Prayer to the Sacred Winds',
        'Primodial Jade Winged-Spear',
        "Wolf's Gravestone",
        "Amos'Bow",
        'Skyward Blade',
        'Skyward Pride',
        'Skyward Spine',
        'Skyward Harp',
        'Skyward Atlas'
    ],
    fourStars: [
        'Rust',
        'Sacrificial Bow',
        'Sacrificial Fragments',
        'Sacrificial Greatsword',
        'Sacrificial Sword',
        'The Stringless',
        'The Widsith',
        'The Bell',
        'The Flute',
        'Favonius Warbow',
        'Favonius Lance',
        'Favonius Codex',
        'Favonius Greatsword',
        'Favonius Sword',
        "Dragon's Bane",
        'Rainslasher',
        "Lion's Roar",
        'Eye of Perception'
    ],
    threeStars: [
        'Slingshot',
        'Thrilling Tales of Dragon Slayers',
        "Sharpshooter's Oath",
        'Ferrous Shadow',
        'Skyrider Sword',
        'Cool Steel',
        'Debate Club',
        'Black Tassel',
        'Bloodstained Greatsword',
        'Magic Guide',
        'Emerald Orb',
        'Raven Bow',
        'Harbinger of Dawn'
    ]
}

function getRandomChar() {
    return characters.fiveStars[Math.floor(Math.random() * characters.fiveStars.length)];
}

// Make a Single Wish
function makeSingleWish(e) {
    e.preventDefault();
    // Remove any existing cards in the DOM
    cardContainer.innerHTML = '';

    // Increase pity count & totalPullCount by 1
    pity.fiveStars++;
    pity.fourStars++;
    totalPullCount++;
    totalPullsEl.innerText = `${totalPullCount}`;
    console.log(pity.fiveStars, pity.fourStars);

    // Create card
    const card = document.createElement('div');
    card.classList.add('card');
    let char = getRandomChar();

    card.innerHTML = `<img src="images/characters/${char}.png">`;
    cardContainer.appendChild(card);


    // Output pullCount to totalPullsEl in DOM
    // Paint the DOM with the card
}

// Make Ten Wishes
function makeTenWishes(e) {
    e.preventDefault();

}

// Event Listeners
singleWishBtn.addEventListener('click', makeSingleWish);
tenWishBtn.addEventListener('click', makeTenWishes);
