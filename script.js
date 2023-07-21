//Variables
let class_choice;
let enemyDefend = false;
let playerDefend = false;
let bigAttack = false;

let battleTextWeather = $("#battle-text-weather");

let battleWon;

//Random Number Generator
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get the current weather using an API
const apiKey = "43d0f8169431361f076ec36feacb7606";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=hindman"

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    if (data.weather[0].main === "Clouds") {
        battleTextWeather.html("It's a cloudy day...");
    } else if (data.weather[0].main === "Clear") {
        battleTextWeather.html("It's a clear day!");
    } else if (data.weather[0].main === "Atmosphere") {
        battleTextWeather.html("There's an ominous fog everywhere...");
    } else if (data.weather[0].main === "Snow") {
        battleTextPlayer.html("Snow falls to the ground!");
    } else if (data.weather[0].main === "Rain") {
        battleTextWeather.html("It's raining!");
    } else if (data.weather[0].main === "Drizzle") {
        battleTextPlayer.html("There's a drizzle...");
    } else if (data.weather[0].main === "Thunderstorm") {
        battleTextWeather.html("There's a huge storm!");
    } else {
        battleTextWeather.html("Something went wrong...");
    }

}

battleTextWeather.hide();
checkWeather(); // Set the weather text to the current weather

//Classes
class Character {
    constructor(name, hp, att, arm, spd, magic) {
        this.name = name;
        this.hp = hp;
        this.att = att;
        this.arm = arm;
        this.spd = spd;
        this.magic = magic;
    }
}

let warrior = {name: 'Warrior', hp: 100, att: 15, arm: 12, spd: 20, magic: 3};
let mage = {name: 'Mage', hp: 50, att: 5, arm: 5, spd: 35, magic: 25};
let rogue = {name: 'Rogue', hp: 30, att: 10, arm: 7, spd: 45, magic: 10}
let player;

//Enemies
let enemy1 = {name: 'Bandit', ORIGINAL_HP: 35, hp: 35, att: 10, arm: 5, spd: 5, magic: 1};
let enemy2 = {name: 'Monkey', ORIGINAL_HP: 25, hp: 25, att: 20, arm: 0, spd: 50, magic: 0};
let enemy3 = {name: 'Bat', ORIGINAL_HP: 15, hp: 15, att: 10, arm: 0, spd: 75, magic: 0};
let enemy4 = {name: 'Cave Troll', ORIGINAL_HP: 150, hp: 150, att: 40, arm: 5, spd: 0, magic: 3};
let enemy5 = {name: 'Seagull', ORIGINAL_HP: 15, hp: 15, att: 10, arm: 0, spd: 65, magic: 0};
let enemy6 = {name: 'Giant Crab', ORIGINAL_HP: 75, hp: 75, att: 10, arm: 15, spd: 0, magic: 0};

//Game Start
gameStart = $("#game-start");
resetButton = $("#reset-button");
gameStart.click(() => {
    gameStart.css("display", "none");
    document.getElementById('choose-class').style.display = 'block';
    document.getElementById('class-choice').innerHTML =
        "Choose Class<br>" +
        "------------<br>" +
        "<button type='button' id='choice-warrior' class='class-button'>Warrior</button>" +
        "<button type='button' id='choice-mage' class='class-button'>Mage</button>" +
        "<button type='button' id='choice-rogue' class='class-button'>Rogue</button>";


    // This is for the mobile users
    if ($(window).width() < 700) {
        $('#choice-warrior').click(() => {
            class_choice = warrior;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            document.getElementById('mobile-button').style.display = 'block';
        });

        $('#choice-mage').click(() => {
            class_choice = mage;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            document.getElementById('mobile-button').style.display = 'block';
        });

        $('#choice-rogue').click(() => {
            class_choice = rogue;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            document.getElementById('mobile-button').style.display = 'block';
        });

        $('#mobile-button').click(() => {
            document.getElementById('choose-class').style.display = 'none';
            player = class_choice;
            adventureLoop();
        });

        // This is for the desktop users
    } else {
        $('#choice-warrior').mouseover(() => {
            class_choice = warrior;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            $('#choice-warrior').click(() => {
                document.getElementById('choose-class').style.display = 'none';
                player = class_choice;
                adventureLoop();
            });
        });

        $('#choice-mage').mouseover(() => {
            class_choice = mage;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            $('#choice-mage').click(() => {
                document.getElementById('choose-class').style.display = 'none';
                player = class_choice;
                adventureLoop();
            });
        });

        $('#choice-rogue').mouseover(() => {
            class_choice = rogue;

            document.getElementById('stats').style.display = 'block';
            document.getElementById('stats').innerHTML =
                "HP: " + class_choice.hp + "<br>" +
                "Attack: " + class_choice.att + "<br>" +
                "Armor: " + class_choice.arm + "<br>" +
                "Speed: " + class_choice.spd + "<br>" +
                "Magic: " + class_choice.magic;

            $('#choice-rogue').click(() => {
                document.getElementById('choose-class').style.display = 'none';
                player = class_choice;
                adventureLoop();
            });
        });
    }
});

//Adventure Loop
let adventureText = $('#adventure-text');
let adventureChoices = $('#adventure-choices');
let choice1 = $('#choice1');
let choice2 = $('#choice2');

function adventureLoop() {

    adventureText.css("display", "block");
    adventureChoices.css("display", "block");

    let rng = random(1, 3);
    let enemyChoice;

    switch (rng) {
        case 1:
            adventureText.html("You find yourself wandering down a forest path...");
            choice1.html("Head further in");
            choice2.html("Turn back");

            choice1.click(() => {
                rng = random(1, 2);
                if (rng === 1) {
                    enemyChoice = enemy1;
                } else {
                    enemyChoice = enemy2;
                }

                adventureText.html("Oh No! You come across a " + enemyChoice.name + "!");
                adventureChoices.css("display", "none");
                document.getElementById('fight-button').style.display = 'block';

                $('#fight-button').click(() => {
                    adventureText.css('display', 'none');
                    document.getElementById('fight-button').style.display = 'none';
                    battleLoop(enemyChoice);
                });
            });

            choice2.click(() => {
                adventureText.html("You made it out alive! You Win!");

                resetButton.css("display", "block");
                adventureChoices.css("display", "none");

                resetButton.click(() => {
                    document.getElementById('choose-class').style.display = 'block';
                    resetButton.css("display", "none");
                    adventureText.html('');
                });

            });

            break;
        case 2:
            adventureText.html("You wake up deep in a cave...");
            choice1.html("Head further in");
            choice2.html("Leave the cave");

            choice1.click(() => {
                rng = random(3, 4);
                if (rng === 3) {
                    enemyChoice = enemy3;
                } else {
                    enemyChoice = enemy4;
                }

                adventureText.html("Oh No! You come across a " + enemyChoice.name + "!");
                adventureChoices.css("display", "none");
                document.getElementById('fight-button').style.display = 'block';

                $('#fight-button').click(() => {
                    adventureText.css("display", "none");
                    document.getElementById('fight-button').style.display = 'none';
                    battleLoop(enemyChoice);
                });

            });

            choice2.click(() => {
                adventureText.html("You made it out alive! You Win!");

                resetButton.css("display", "block");
                adventureChoices.css("display", "none");

                resetButton.click(() => {
                    document.getElementById('choose-class').style.display = 'block';
                    resetButton.css("display", "none");
                    adventureText.html('');
                });

            });

            break;
        case 3:
            adventureText.html("You walk out onto an island beach...");
            choice1.html("Walk along the beach");
            choice2.html("Go back into the jungle");

            choice1.click(() => {
                rng = random(5, 6);
                if (rng === 5) {
                    enemyChoice = enemy5;
                } else {
                    enemyChoice = enemy6;
                }

                adventureText.html("Oh No! You come across a " + enemyChoice.name + "!");
                adventureChoices.css("display", "none");
                document.getElementById('fight-button').style.display = 'block';

                $('#fight-button').click(() => {
                    adventureText.css("display", "none");
                    document.getElementById('fight-button').style.display = 'none';
                    battleLoop(enemyChoice);
                });

            });

            choice2.click(() => {
                adventureText.html("You made it out alive! You Win!");

                resetButton.css("display", "block");
                adventureChoices.css("display", "none");

                resetButton.click(() => {
                    document.getElementById('choose-class').style.display = 'block';
                    resetButton.css("display", "none");
                    adventureText.html('');
                });

            });

            break;
        default:
            alert("Something has gone horribly wrong...")
    }

} //End of Adventure Loop

//Battle Loop
let battleTextPlayer = $("#battle-text-player");
let battleTextEnemy = $("#battle-text-enemy");
let playerStats = $("#player-stats");
let enemyStats = $("#enemy-stats");

function battleLoop(enemy) {
    battleTextWeather.show();
    battleTextPlayer.show();
    battleTextEnemy.show();
    playerStats.show();
    enemyStats.show();
    document.getElementById("battle-choices").style.display = 'grid';

    showStats(enemy);

    //alert("Enemy HP is currently " + enemy.hp);

    battleTextEnemy.html("The " + enemy.name + " notices you...");

    $('#option-fight').click(() => {
        battleTextPlayer.html("You hit the " + enemy.name + " for " + (Math.max(0, player.att - enemy.arm)) + " damage!");
        enemy.hp -= Math.max(0, (player.att - enemy.arm));

        showStats(enemy);

        //alert("Enemy HP is currently " + enemy.hp);

        if (enemy.hp <= 0) {
            battleWon = true;
            endBattle(enemy, battleWon);
        }

        enemyTurn(enemy);

    });

    $('#option-block').click(() => {
        battleTextPlayer.html("You increase your defenses for a turn!");

        playerDefend = true;
        player.arm *= 2;

        showStats(enemy);

        //alert("Enemy HP is currently " + enemy.hp);

        if (enemy.hp <= 0) {
            battleWon = true;
            endBattle(enemy, battleWon);
        }

        enemyTurn(enemy);

        if (playerDefend) {
            player.arm /= 2;
            playerDefend = false;
        }

    });

    $('#option-magic').click(() => {
        let magicEffect = random(1, 6);

        switch (magicEffect) {
            case 1:
                player.hp += player.magic;
                battleTextPlayer.html("You feel strange forces increase your HP!");
                break;
            case 2:
                player.att += player.magic;
                battleTextPlayer.html("You feel strange forces increase your Attack!");
                break;
            case 3:
                player.arm += player.magic;
                battleTextPlayer.html("You feel strange forces increase your Armor!");
                break;
            case 4:
                player.spd += player.magic;
                battleTextPlayer.html("You feel strange forces increase your Speed");
                break;
            case 5:
                player.magic += player.magic;
                battleTextPlayer.html("You feel strange forces increase your Magic!");
                break;
            case 6:
                enemy.hp -= player.magic;
                battleTextPlayer.html("You feel strange forces attack the enemy for " + player.magic + " damage!");
                break;
            default:
                alert("Something went terribly wrong.");
        }

        showStats(enemy);

        //alert("Enemy HP is currently " + enemy.hp);

        if (enemy.hp <= 0) {
            battleWon = true;
            endBattle(enemy, battleWon);
        }

        enemyTurn(enemy);


    });

    $('#option-run').click(() => {
        let runChance = (player.spd / 2) / 100;
        let runSuccess = random(0, 100) / 100;

        //DEBUG alert("RunChance is " + runChance + " and runSuccess is " + runSuccess);

        if (runChance >= runSuccess) {
            battleTextPlayer.html("You did it?");
            battleWon = true;
            endBattle(enemy, battleWon);
        } else {
            battleTextPlayer.html("You failed to run!");

            enemyTurn(enemy);
        }
    });


} //End of Battle Loop

//Show Stats
function showStats(enemy) {
    playerStats.html(
        "PLAYER<br>" +
        "----------<br>" +
        "HP: " + player.hp + "<br>" +
        "Attack: " + player.att + "<br>" +
        "Armor: " + player.arm + "<br>" +
        "Speed: " + player.spd + "<br>" +
        "Magic: " + player.magic
    );

    enemyStats.html(
        enemy.name + "<br>" +
        "----------<br>" +
        "HP: " + enemy.hp + "<br>" +
        "Attack: " + enemy.att + "<br>" +
        "Armor: " + enemy.arm + "<br>" +
        "Speed: " + enemy.spd + "<br>" +
        "Magic: " + enemy.magic
    );
}

//Enemy Turn
function enemyTurn(enemy) {

    if (enemyDefend) {
        enemy.arm /= 2;
        enemyDefend = false;
    }

    if (bigAttack) {
        battleTextEnemy.html("The " + enemy.name + " lands a collossal blow for " + Math.max(0, (enemy.att * 2 - player.arm)) + " damage!");
        player.hp -= Math.max(0, (enemy.att * 2 - player.arm));
        bigAttack = false;
    } else {
        enemyAction = random(1, 3);

        switch (enemyAction) {

            case 1:
                battleTextEnemy.html("The " + enemy.name + " attacks for " + Math.max(0, (enemy.att - player.arm)) + " damage!");

                player.hp -= Math.max(0, (enemy.att - player.arm));
                break;
            case 2:
                battleTextEnemy.html("The " + enemy.name + " raises its guard!");

                enemyDefend = true;
                break;
            case 3:
                battleTextEnemy.html("The " + enemy.name + " is readying a huge blow!");

                bigAttack = true;
                break;
            default:
                alert("Something has gone horribly wrong...");
        }
    }

    if (enemyDefend) {
        enemy.arm *= 2;
    }

    if (player.hp <= 0) {
        battleWon = false;
        endBattle(enemy, battleWon);
    }

    showStats(enemy);
}

// End battle function
function endBattle(enemy, battleWon) {
    battleTextWeather.hide();
    battleTextPlayer.hide();
    battleTextEnemy.hide();
    playerStats.hide();
    enemyStats.hide();
    $('#battle-choices').hide();
    adventureText.show();
    resetButton.show();

    //alert("Enemy HP is currently " + enemy.hp);

    player = class_choice;

    if (battleWon) {
        adventureText.html("You made it out alive! You Win!");
    } else {
        adventureText.html("You died to the " + enemy.name + "! You Lose!");
    }


    resetButton.click(() => {
        // Reset the player's stats
        class_choice = null;
        document.getElementById('choose-class').style.display = 'block';
        $('#choose-class').show();
        resetButton.hide();
        adventureText.hide();
        adventureText.html('');
    });
}

//Debug
$('#random-button').click(() => {
    alert("The number is " + random(0, 9));
});
$('#class-button').click(() => {
    alert("The player's class is " + player.name);
});
$('#run-button').click(() => {
    alert("The player's chance to run is " + player.spd / 2 + "%");
});
$('#runTest-button').click(() => {
    alert("The run roll is " + (random(0, 100) / 100))
});