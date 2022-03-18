// keeps track of the current dog, and which dog is to be loaded next
let dogCounter = 0;

/**
 * Generates a template if needed, appends 2 cards every iterations
 */
function dog() {
    // create card parts array
    const CARDPARTS = {
        Card: document.createElement("a"),
        Img: document.createElement("img"),
        Name: document.createElement("h3"),
        Breed: document.createElement("h4"),
        ID: document.createElement("small"),
        Sex: document.createElement("span"),
        Status: document.createElement("p"),
        Age: document.createElement("p")
    }

    // declare and designate the template
    let dogTemplate;

    // if it doesn't exist, make it, otherwise use the existing template
    if (document.querySelector("#dogCardTemplate") == null) {
        dogTemplate = cardTemplater("dog", CARDPARTS, ".main-cardHolder");
    } else {
        dogTemplate = document.querySelector("#dogCardTemplate");
    }

    // use the template to make the needed cards
    return cardLoader("dog", dogTemplate, dogDeck, dogs, 2);
}

/**
 * Generates a card based on a provided list with custom class names. 
 * @param {string} baseName the prefix of all class names for card parts
 * @param {HTMLElement} cardTemplate hidden card template element on page
 * @param {string} dest destination node a card is appeneded to, usually a deck
 * @param {[{}]} data Array of objects used to populate cards.
 * @returns {string} string representing the ID of the template card
 */
function cardLoader(baseName, cardTemplate, dest, data, perPage) {
    let endMan = dogCounter + perPage;
    for (; dogCounter < data.length && dogCounter < endMan; dogCounter++) {
        //retrieve current entru
        let entry = data[dogCounter];

        // clone hidden node template
        let newCard = cardTemplate.cloneNode(true);

        // replace ID
        newCard.setAttribute("id", `${baseName}-${entry.ID}`);

        // set attributes of new Card:
        // > all data except image is appended to element. Images have source set
        attrLoop: for (let attribute in entry) {
            // if image, set source and add listener for 404 errors
            // if sex, add proper notation
            switch (attribute) {
                case "desc":
                    break attrLoop;
                case "Img":
                    let imageHolder = newCard.querySelector(`.${baseName}Card-Img`);
                    imageHolder.setAttribute("src", entry.Img);

                    // add an event listener that handles 404 errors for images
                    imageHolder.addEventListener("error", () => {
                        imageHolder.setAttribute("src", placeholderImage("No Image Found"));
                    });
                    break;
                case "Sex":
                    // turns the sex indicator into a symbol
                    let sexBadge = newCard.querySelector("." + baseName + "Card-" + attribute);
                    sexBadge.classList.add(`bi-gender-${entry[attribute]}`, `bg-${entry[attribute]}`);
                    sexBadge.append(" ");
                    break;
                default:
                    newCard.querySelector("." + baseName + "Card-" + attribute).prepend(entry[attribute]);
            }
        }

        // create the link for the detail page
        newCard.href = `./detail.html?id=?${dogCounter}`;

        // format the card
        cardFormatter(newCard, dest, "card m-3 text-dark text-decoration-none")

        newCard.hidden = false;
    }

    if (dogCounter >= data.length) return -1;
    else return dogCounter;
}

/**
 * Adds listener to a button that executes a function until the function returns -1. The button is then hidden.
 * @param {HTMLElement} buttonMan Element referring to a button
 * @param {function} callbackFunction function to be executed. Must return -1 at some point.
 */
function loadMoreLoader(buttonMan, callbackFunction) {
    // add listener to load more button for click
    buttonMan.addEventListener("click", (e) => {
        // if dog returns -1, hide the button, as there are no more dogs to load
        if (callbackFunction() == -1) {
            e.target.classList.add("visually-hidden")
        }
    });
}