/* jshint browser:true, devel:true, esversion:6 */

//Create the map
var map = [];

map[0] = "A treasure chest.";
map[1] = "A nice waterfall.";
map[2] = "A sword in the stone.";
map[3] = "Beware of the Sea Monster.";
map[4] = "House in the middle of nowhere.";
map[5] = "A magnificent ship.";
map[6] = "A shovel.";
map[7] = "A mountain top view.";
map[8] = "A potion shop.";

//Set the player's start location
var mapLocation = 4;

//Set the images
var images = [];

images[0] = "chest.jpeg";
images[1] = "waterfall.jpeg";
images[2] = "sword.jpeg";
images[3] = "seamonster.jpeg";
images[4] = "home.jpeg";
images[5] = "boat.jpeg";
images[6] = "shovel.jpg";
images[7] = "viewpoint.jpeg";
images[8] = "shop.jpeg";

//Set the blocked path messages
var blockedPathMessages = [];

blockedPathMessages[0] = "Theres nothing beyond this point except desert.";
blockedPathMessages[1] = "No passage way.";
blockedPathMessages[2] = "Nothing but forest is ahead.";
blockedPathMessages[3] = "You can't swim near the sea monster.";
blockedPathMessages[4] = "";
blockedPathMessages[5] = "You need a key to operate the ship.";
blockedPathMessages[6] = "Nothing but jungle ahead.";
blockedPathMessages[7] = "Cant go this way unless you have a death wish.";
blockedPathMessages[8] = "No exit here.";

//Set the help path messages
var helpMessages = [];

helpMessages[0] = "Perhaps a 'shovel' could dig out the chest.";
helpMessages[1] = "";
helpMessages[2] = "Perhaps a 'strength potion' might help you take out the sword.";
helpMessages[3] = "Maybe if you had a sword, you could slay the sea monster, and earn a key?";
helpMessages[4] = "";
helpMessages[5] = "Perhaps a 'key' is needed to operate the boat.";
helpMessages[6] = "The 'shovel' could be handy";
helpMessages[7] = "";
helpMessages[8] = "If you had 'money', a 'strength potion' could be useful.";

//Create the objects and set their locations
var items = ["shovel", "key", "sword", "potion", "money"];
var itemLocations = [6, 3, 2, 8, 0];

//check if items have been used
let swordUsed = false;
let shovelUsed = false;
let potionUsed = false;
let moneyUsed = false;

//check if user won
let won = false;

//An array to store what the player is carrying
var backpack = [];

//Initialize the player's input
var playersInput = "";

//Initialize the gameMessage
var gameMessage = "<br>Welcome to the Island of Tortuga! ";
gameMessage += "Try any of these words: ";
gameMessage += "north, east, south, west, take, drop, ";
gameMessage += "use, sword, key, money, potion, shovel, restart, help.";
gameMessage += " Use take, drop, use commands followed by the item. ";
gameMessage += "Example: take shovel, use shovel, drop shovel.";
gameMessage += " Click the Map/Note Icon for help anytime during the game!";

//Create an array of actions the game understands
//and a variable to store the current action
var actionsIKnow
	= ["north", "east", "south", "west",
		"help", "take", "use", "drop", "restart"];
var action = "";

//An array of items the game understands
//and a variable to store the current item
var itemsIKnow = ["shovel", "money", "sword", "key", "potion"];
var item = "";

//The img element
var image = document.querySelector("img");

//The input and output fields
var output = document.querySelector("#output");
var input = document.querySelector("#input");

//The button
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
button.addEventListener("mousedown", mousedownHandler, false);
button.addEventListener("mouseout", mouseoutHandler, false);

//Listen for enter key presses
window.addEventListener("keydown", keydownHandler, false);

var mapIcon = document.querySelector(".mapIcon");
var mapImage = document.querySelector(".map");
var noteIcon = document.querySelector(".noteIcon");
var noteImage = document.querySelector(".note");
var closeBtnMap = document.querySelector(".map .closeBtn");
var closeBtnNote = document.querySelector(".note .closeBtn");

mapIcon.addEventListener("click", () => {
	mapImage.classList.remove("hideMap");
});
closeBtnMap.addEventListener("click", () => {
	mapImage.classList.add("hideMap");
	// mapImage.style.display = "none";
});

noteIcon.addEventListener("click", () => {
	noteImage.classList.remove("hideNote");
});
closeBtnNote.addEventListener("click", () => {
	noteImage.classList.add("hideNote");
	// mapImage.style.display = "none";
});

//Dispay the player's location
render();

function mousedownHandler() {

	button.style.background =
		"-webkit-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
	button.style.background =
		"-moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
	button.style.background =
		"linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
}

function mouseoutHandler() {

	button.style.background =
		"-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
	button.style.background =
		"-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
	button.style.background =
		"linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
}

function clickHandler() {

	button.style.background =
		"-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
	button.style.background =
		"-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
	button.style.background =
		"linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";

	playGame();
}

function keydownHandler(event) {

	if (event.keyCode === 13) {

		playGame();
	}
}

function playGame() {

	//Get the player's input and convert it to lowercase
	playersInput = input.value;
	playersInput = playersInput.toLowerCase();

	//Reset these variables from the previous turn
	gameMessage = "";
	action = "";

	//Figure out the player's action
	for (let i = 0; i < actionsIKnow.length; i++) {

		if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
			action = actionsIKnow[i];
			console.log("player's action: " + action);
			break;
		}
	}

	//Figure out the item the player wants
	for (let i = 0; i < itemsIKnow.length; i++) {

		if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
			item = itemsIKnow[i];
			console.log("player's item: " + item);
		}
	}

	//Choose the correct action
	switch (action) {
		case "restart":
			won = false;
			location.reload();
			break;
		case "north":
			if (mapLocation >= 3) {
				mapLocation -= 3;
			} else {
				gameMessage = blockedPathMessages[mapLocation];
			}
			break;

		case "east":
			if (mapLocation % 3 != 2) {
				mapLocation += 1;
			} else {
				gameMessage = blockedPathMessages[mapLocation];
			}
			break;

		case "south":
			if (mapLocation < 6) {
				mapLocation += 3;
			} else {
				gameMessage = blockedPathMessages[mapLocation];
			}
			break;

		case "west":
			if (mapLocation % 3 !== 0) {
				mapLocation -= 1;
			} else {
				gameMessage = blockedPathMessages[mapLocation];
			}
			break;

		case "help":
			//Display a hint if there is one for this location
			if (helpMessages[mapLocation] !== "") {
				gameMessage = helpMessages[mapLocation] + " ";
			}

			gameMessage += "Try any of these words: ";
			gameMessage += "north, east, south, west, take, drop, ";
			gameMessage += "use, sword, money, shovel, potion, key, restart.";
			gameMessage += "<br>Use take, drop, use commands followed by the item. ";
			gameMessage += "Example: take shovel, use shovel, drop shovel.";
			gameMessage += "<br>Click the Map/Note Icon for help anytime during the game!";
			break;

		case "take":
			takeItem();
			break;

		case "drop":
			dropItem();
			break;

		case "use":
			useItem();
			break;

		default:
			gameMessage = "I don't understand that.";

	}	// end switch

	//Render the game
	render();

}	// end function playGame

var takeItem = () => {

	//Find the index number of the item in the items array
	var itemIndexNumber = items.indexOf(item);
	console.log(itemLocations[itemIndexNumber]);
	console.log(mapLocation);
	//Does the item exist in the game world
	//and is it at the player's current location?
	if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
		//grabbing shovel
		if ((itemLocations[itemIndexNumber] === mapLocation) && (items[itemIndexNumber] === "shovel")) {
			gameMessage = "You take the " + item + ".";

			//Add the item to the player's backpack 
			backpack.push(item);

			//Remove the item from the game world
			items.splice(itemIndexNumber, 1);
			itemLocations.splice(itemIndexNumber, 1);

			//Display in the console for testing
			console.log("World items: " + items);
			console.log("backpack items: " + backpack);
		}

		//checking if sword has been used to pick up key!
		else if ((itemLocations[itemIndexNumber] === mapLocation) && (items[itemIndexNumber] === "key" && swordUsed === true)) {
			gameMessage = "You take the " + item + ".";

			//Add the item to the player's backpack 
			backpack.push(item);

			//Remove the item from the game world
			items.splice(itemIndexNumber, 1);
			itemLocations.splice(itemIndexNumber, 1);

			//Display in the console for testing
			console.log("World items: " + items);
			console.log("backpack items: " + backpack);
		}

		//checking if shovel has been used to pick up money
		else if (itemLocations[itemIndexNumber] === mapLocation && (items[itemIndexNumber] === "money" && shovelUsed === true)) {
			gameMessage = "You take the " + item + ".";

			//Add the item to the player's backpack 
			backpack.push(item);

			//Remove the item from the game world
			items.splice(itemIndexNumber, 1);
			itemLocations.splice(itemIndexNumber, 1);

			//Display in the console for testing
			console.log("World items: " + items);
			console.log("backpack items: " + backpack);
		}

		//checking if potion has been used to pick up the sword
		else if (itemLocations[itemIndexNumber] === mapLocation && (items[itemIndexNumber] === "sword" && potionUsed === true)) {
			gameMessage = "You take the " + item + ".";

			//Add the item to the player's backpack 
			backpack.push(item);

			//Remove the item from the game world
			items.splice(itemIndexNumber, 1);
			itemLocations.splice(itemIndexNumber, 1);

			//Display in the console for testing
			console.log("World items: " + items);
			console.log("backpack items: " + backpack);
		}

		//checking if money has been used to buy the potion
		else if (itemLocations[itemIndexNumber] === mapLocation && (items[itemIndexNumber] === "potion" && moneyUsed === true)) {
			gameMessage = "You take the " + item + ".";

			//Add the item to the player's backpack 
			backpack.push(item);

			//Remove the item from the game world
			items.splice(itemIndexNumber, 1);
			itemLocations.splice(itemIndexNumber, 1);

			//Display in the console for testing
			console.log("World items: " + items);
			console.log("backpack items: " + backpack);
		}
		else {
			gameMessage = `You must do something before you can take the '${items[itemIndexNumber].fontsize(12).toUpperCase()}'!`;
		}

	} else {
		//Message if you try and take an item
		//that isn't in the current location
		gameMessage = "You can't do that.";
	}	// end if

}	// end function takeItem

function dropItem() {

	//Try to drop the item only if the backpack isn't empty
	if (backpack.length !== 0) {
		//Find the item's array index number in the backpack
		var backpackIndexNumber = backpack.indexOf(item);

		//The item is in the backpack if backpackIndex number isn't -1
		if (backpackIndexNumber !== -1) {

			//Tell the player that the item has been dropped
			gameMessage = "You drop the " + item + ".";

			console.log(mapLocation);
			//Add the item from the backpack to the game world 
			items.push(backpack[backpackIndexNumber]);
			itemLocations.push(mapLocation);
			console.log(itemLocations);
			console.log(items);

			//Remove the item from the player's backpack 
			backpack.splice(backpackIndexNumber, 1);
		} else {
			//Message if the player tries to drop
			//something that's not in the backpack
			gameMessage = "You can't do that.";
		}	// end if 

	} else {
		//Message if the backpack is empty
		gameMessage = "You're not carrying anything.";
	}	// end if 
}	// end function dropItem

function useItem() {

	//1. Find out if the item is in the backpack

	//Find the item's array index number in the backpack
	var backpackIndexNumber = backpack.indexOf(item);

	//If the index number is -1, then it isn't in the backpack.
	//Tell the player that he or she isn't carrying it.
	if (backpackIndexNumber === -1) {
		gameMessage = "You're not carrying it.";
	}

	//If there are no items in the backpack, then
	//tell the player the backpack is empty
	if (backpack.length === 0) {
		gameMessage += " Your backpack is empty";
	}

	//2. If the item is found in the backpack
	//figure out what to do with it
	if (backpackIndexNumber !== -1) {

		switch (item) {
			case "shovel":
				if (mapLocation === 0) {
					gameMessage = "You have dug a chest.";
					gameMessage += "You have found a lot of money, ";
					gameMessage += "perhaps you can buy a potion with it!";
					gameMessage += " Don't forget to take the money";

					//shovel has been used!
					shovelUsed = true;
					// itemLocations.push(mapLocation);

					//Remove the money from the player's backpack 
					backpack.splice(backpackIndexNumber, 1);

					//Reset the location's help message
					helpMessages[mapLocation] = "";

				} else {
					gameMessage = "Digging here is not useful, ";
					gameMessage += "but it may be useful somewhere else.";

				}	// end if
				break;

			case "sword":
				if (mapLocation === 3) {
					gameMessage = "You have swung the sword! ";
					gameMessage += "It was a close fight! ";
					gameMessage += "Nonetheless you have managed to slay the Sea Monster! "
					gameMessage += "Take the key to your freedom!";

					//sword has been used
					swordUsed = true;

					// itemLocations.push(mapLocation);

					//Remove the money from the player's backpack 
					backpack.splice(backpackIndexNumber, 1);

					//Reset the location's help message
					helpMessages[mapLocation] = "";

				} else {
					gameMessage = "You swing the sword listlessly.";
				}	// end if
				break;

			case "money":
				if (mapLocation === 8) {
					gameMessage = "You have purchased the strength potion.";
					gameMessage += " Take the potion!";
					gameMessage += " May it help you during your journey!";

					//money has been used
					moneyUsed = true;

					// itemLocations.push(mapLocation);
					//Remove the money from the player's backpack 
					backpack.splice(backpackIndexNumber, 1);

					//Reset the location's help message
					helpMessages[mapLocation] = "";

				} else {
					gameMessage = "You cannot use your money here. ";
					gameMessage += "Please try elsewhere.";
				}   // end if
				break;

			case "key":
				if (mapLocation === 5) {
					won = true;
					//Reset the location's help message
					helpMessages[mapLocation] = "";

					// itemLocations.push(mapLocation);
					//remove key from backpack
					backpack.splice(backpackIndexNumber, 1);

					gameMessage = "You have turned on the boat.";
					gameMessage += " And currently sailing to your freedom!";
					gameMessage += " Congratulations!";
					gameMessage += "\nType 'restart' to play again!!"


				} else {
					gameMessage = "You cannot use the key here. ";
					gameMessage += "Please try elsewhere.";
				}   // end if
				break;

			case "potion":
				if (mapLocation === 2) {
					gameMessage = "You have used the strength potion.";
					gameMessage += " You are worthy of pulling out the sword!";
					gameMessage += " You may take the sword!"

					//potion has been used!
					potionUsed = true;
					// itemLocations.push(mapLocation);

					//Remove the stone from the player's backpack 
					backpack.splice(backpackIndexNumber, 1);

					//Reset the location's help message
					helpMessages[mapLocation] = "";

				} else {
					gameMessage = "Use it elsewhere. ";
				}   // end if
				break;
		}	// end switch
	}	// end if (backpackIndexNumber !== -1)

}	// end function useItem

function render() {

	//Render the location
	if (won === true) {
		image.src = "images/win.gif";
		output.innerHTML = "You Win";
	}
	else {
		output.innerHTML = map[mapLocation];
		image.src = "images/" + images[mapLocation];
	}

	//Display an item if there's one in this location
	//1. Loop through all the game items
	console.log("mapLocation: ", mapLocation);
	console.log("itemlocations: ", itemLocations);
	for (let i = 0; i < items.length; i++) {
		//Find out if there's an item at this location
		if (mapLocation === itemLocations[i]) {
			//Display it
			output.innerHTML += "<br>You see a <strong>" +
				items[i] +
				"</strong> here.";
		}
	}	// end for

	//Display the player's backpack contents
	if (backpack.length !== 0) {
		output.innerHTML += "<br>You are carrying: " + backpack.join(", ");
	}

	//Display the game message
	output.innerHTML += "<br><em>" + gameMessage + "</em>";

	//Clear the input field
	input.value = "";
}

