let xp = 0; //semi colons are optional
let health = 100;
let gold = 50;
let currentWeapon = 0;
//var, let or const to declare variable
//use ctrl+d to select and change next occurence of a word simultaneously
let fighting;
let monsterHealth;
//let inventory= "stick"; -string
let inventory = ["stick"]; //array of strings
// var allows most changing, introduces bugs
// const allows least amount of changing

//get selectors in variable names for comfort for each html element

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


//an array of objects that have many elements in form of key: value pairs, values can be arrays also

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store.\""
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You entered the \"store\"."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave, you see some monsters"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    //so last  button secretly takes u to easter egg
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arghh!" as it dies. You gain experience points and find gold.'
    //another way to allow quotes inside string- use different type for outside
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. "
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! XD"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
]

// comment single line
/* multi line comment */

//initialise buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


//function written to avoid repitition in following functions
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  //could write locations["text"]
  //. notation like here works only for single word like here not for "button functions" etc.
}

function goTown() {
  // button1.innerText = "Go to store";
  // button2.innerText = "Go to cave";
  // button3.innerText = "Fight dragon";
  // button1.onclick = goStore;
  // button2.onclick = goCave;
  // button3.onclick = fightDragon;
  // text.innerText = "You are in the town square. You see a sign that says store.";

  //above code was needed if update function was not there

  update(locations[0]);
}

function goStore() {
  // button1.innerText = "Buy 10 health (10 gold)";
  // button2.innerText = "Buy weapon (30 gold)";
  // button3.innerText = "Go to town square";
  // button1.onclick = buyHealth;
  // button2.onclick = buyWeapon;
  // button3.onclick = goTown;
  // text.innerText = "You entered the \"store\"."; //backslash used to tell string that the double quotes dont mean to end string but inside the string

  //above code was needed if update function was not there

  update(locations[1]);
}

//in replit, click wrench to open console
//console.log("Going to cave"); to display in console
function goCave() {
  //console.log("Going to cave")
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold = gold - 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      //+= in innertext to add after previous text
      //directly print inventory shows comma separated all elements
    }
    else {
      text.innerText = "You do not have enough gold to buy a weapon."
    }
  }
  else {
    text.innerText = "You already have the most powerful weapon! ";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    //shift function removes first element from array and shifts each element back one index
    //let variable declared in other scope with same name doesnt affect old variable
    //is outside and inside currentWeapon was var then it would affect outer current Weapon as well.
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else {
    text.innerText = "Don't sell your only weapon!"
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  //.style can change styling(css) properties
  // console.log(monsterHealth);
  // console.log(monsters[fighting].name);
  monsterNameText.innerHTML = monsters[fighting].name;
  monsterHealthText.innerHTML = monsterHealth;

}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks:";
  text.innerText += "You attack with your " + weapons[currentWeapon].name + ".";
  //not always will u be able to attack him
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
    //decreasing health based on monster's level & xp
  }
  else {
    text.innerText += "You miss.";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  //based on xp we also want monster health to decrement
  //math.random() gives random no. between 0 & 1, multiply with xp and add 1
  //whole formula gives a random no. between 1 and xp
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    if (fighting === 2) {
      //= assignment operator
      //== checks equality after type conversions
      //=== checks type equality as well
      winGame();
    }
    else {
      defeatMonster();
    }
    //OR->
    // fighting===2 ? wingame() : defeatMonster();
  }

  //10% chance that ur weapon breaks after attacking dragon only if inventory has more than 1 weapon
  //!= means !+==
  //!== means !+===
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    //popped last element of inventory and returned it
    currentWeapon--;

  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  // console.log(hit);
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
  // || OR
  // && And
  //random gives b/w 0 to 1
  //if random>0.2 then return true else false
  //i.e. for 80% of the time ans will be true- can attack, and 20% missed
  //we also want to always be able to attack is health of player <20
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

//a hidden feature of game
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ", Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  //indexOf returns -1 if no. not present
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
  }
  else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
