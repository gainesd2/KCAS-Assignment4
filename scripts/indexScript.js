"use strict"

/**
 * clears the deck, generates a template if needed, and fills the deck with cards
 * @param {int} currentPage current page number
 */
function dog(currentPage = 1) {
    // clear the deck
    dogDeck.innerHTML = "";

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
    cardLoader("dog", dogTemplate, dogDeck, dogs);
}

/**
 * Generates a template card based on a provided list with custom class names. 
 * @param {string} baseName the prefix of all class names for card parts
 * @param {object} CARDPARTS constant array of created Node objects. Requires an element called "Card"
 * @param {string} dest string used in querySelector. Format accordingly.
 * @returns {string} string representing the ID of the template card
 */
function cardTemplater(baseName, CARDPARTS, dest) {
    // create deck element to hold cards
    let deck = document.querySelector(dest);

    // card creation loop
    for (let part in CARDPARTS) {
        // generates class name
        let className = baseName + ((part == "Card") ? "" : "Card-") + part

        // adds class name to current part
        CARDPARTS[part].classList.add(className);
    }

    templateLoader(CARDPARTS, deck);

    // set ID for card Template
    CARDPARTS["Card"].setAttribute("id", baseName + "CardTemplate");

    // hide template card
    document.querySelector("#" + baseName + "CardTemplate").hidden = true;

    return CARDPARTS["Card"];
}

/**
 * 
 * @param {object} CARDPARTS object with list of card parts
 * @param {HTMLElement} deck Element into which the cards are placed
 */
function templateLoader(CARDPARTS, deck) {
    // * list classes like html class list here
    let cardClasses = "p-1 link-dark";
    let imgClasses = "card-img";
    let IDClasses = "";
    let nameClasses = "card-title";
    let sexClasses = "badge bi rounded-pill ms-2";
    let breedClasses = "card-subtitle text-muted";
    let ageClasses = "fs-5";
    let statusClasses = "fs-6";

    // add card-body
    let cardBody = document.createElement("div");
    let cardBodyClasses = "card-body"

    // define image holder to prevent overflow
    let imageHolder = document.createElement("div");
    let imgHolderClasses = "card-imgHolder";

    // card

    cardFormatter(imageHolder, CARDPARTS["Card"], imgHolderClasses)

    // add card-img-top
    cardFormatter(CARDPARTS["Img"], imageHolder, imgClasses);

    // add ID to cardBody
    cardFormatter(CARDPARTS["ID"], cardBody, IDClasses);

    // Format name and add it to cardBody
    cardFormatter(CARDPARTS["Name"], cardBody, nameClasses);

    // Format Sex and add it to Breed
    cardFormatter(CARDPARTS["Sex"], CARDPARTS["Name"], sexClasses);

    // Format Breed and add it to cardBody
    cardFormatter(CARDPARTS["Breed"], cardBody, breedClasses);

    cardBody.appendChild(document.createElement("hr"));

    // add age to cardBody
    cardFormatter(CARDPARTS["Age"], cardBody, ageClasses);

    // add status to cardBody
    cardFormatter(CARDPARTS["Status"], cardBody, statusClasses);

    // format cardBody and add it to the card
    cardFormatter(cardBody, CARDPARTS["Card"], cardBodyClasses);

    // add card template to the deck
    cardFormatter(CARDPARTS["Card"], deck, cardClasses);
}

/** Example Resultant card from cardLoader
<a href="./detail.html?id=?23328" class="main-cardSleeve card w-50">
    <div class="dogCard" id="dog-23328">
        <img class="dogCard-Img card-img-top" src="http://kentoncountypets.shelterbuddy.com/photos/lostfound/71168_th_600.jpeg">
        <div class="card-body">
            <small class="dogCard-ID">23328</small>
            <h3 class="dogCard-Name card-title">Pepper</h3>
            <h4 class="dogCard-Breed card-subtitle text-muted">American Pit Bull cross
                <span class="dogCard-Sex badge bi rounded-pill ms-2 bi-gender-female bg-female"> </span>
            </h4>
            <p class="dogCard-Age">2Yrs 3Mths 1Wks</p>
            <p class="dogCard-Status">Spayed/Neutered</p>
        </div>
    </div>
</a>
 */
/**
 * Generates a card based on a provided list with custom class names. 
 * @param {string} baseName the prefix of all class names for card parts
 * @param {HTMLElement} cardTemplate hidden card template element on page
 * @param {string} dest destination node a card is appeneded to, usually a deck
 * @param {[{}]} data Array of objects used to populate cards.
 * @returns {string} string representing the ID of the template card
 */
function cardLoader(baseName, cardTemplate, dest, data, current, cardsPerPage) {
    for (let i = 0; i < data.length; i++) {
        //retrieve current entru
        let entry = data[i];

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
        newCard.href = `./detail.html?id=?${i}`;

        // format the card
        cardFormatter(newCard, dest, "card m-3 text-dark text-decoration-none")

        newCard.hidden = false;
    }
}

/**
 * adds classes from class list string to the card part and appends it to the destination
 * @param {HTMLElement} cardPart The part to be formatted
 * @param {HTMLElement} destination The destination HTML element
 * @param {string} classList A space-seperated string of class names. Formatted like an html classlist "class1 class2 etc"
 */
function cardFormatter(cardPart, destination, classList = "") {
    if (classList !== "") {
        classList = classList.split(" ");
        cardPart.classList.add(...classList);
    }

    destination.appendChild(cardPart);
}

/**
 * Generates url for placeholder image
 * @param {int} height Height of placeholder image
 * @param {int} width Width of placeholder image
 * @param {string} fileType file extension of placeholder image. Do not include dot.
 * @param {string} text Text placed over placeholder image
 * @returns {string} string representing URL of placeholder image
 * @tutorial https://placeholder.com/
 */
function placeholderImage(text = "", height = 500, width = 500, fileType = "png") {
    let URL = `https://via.placeholder.com/${height}x${width}.${fileType}`;

    if (text !== "") {
        let textRay = text.split(" ");
        text = "";
        for (let word in textRay) {
            text += textRay[word];
            if (word < textRay.length - 1) {
                text += "+";
            }
        }

        URL += `?text=${text}`;
    }

    return URL;

}