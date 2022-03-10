"use strict"

const dogs = [
    { Name: "Pepper", ID: 23328, Sex: "Female", Age: "2Yrs 3Mths 1Wks", Status: "Spayed/Neutered", Breed: "American Pit Bull cross", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71168_th_600.jpeg" },
    { Name: "Hattie", ID: 23989, Sex: "Female", Age: "1Yrs 6Mths 2Wks", Status: "Spayed/Neutered", Breed: "American Pit Bull cross", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71438_th_600.jpg" },
    { Name: "Jimmy", ID: 24104, Sex: "Male", Age: "9Mths", Status: "Spayed/Neutered", Breed: "American Pit Bull cross", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71509_th_600.jpeg" },
    { Name: "Freya", ID: 23867, Sex: "Female", Age: "1Yrs 7Mths 1Wks", Status: "Spayed/Neutered", Breed: "Blue Heeler Cross", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71366_th_600.jpeg" },
    { Name: "Kimbo", ID: 23879, Sex: "Male", Age: "1Yrs 7Mths 1Wks", Status: "Spayed/Neutered", Breed: "Boxer mixed Mastiff", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71369_th_600.jpg" },
    { Name: "Quarterback", ID: 24142, Sex: "Male", Age: "3Yrs 6Mths", Status: "Spayed/Neutered", Breed: "Boxer mixed Mastiff", Img: "http://kentoncountypets.shelterbuddy.com/photos/lostfound/71541_th_600.jpg" },
]


function dog() {
    // create card parts array
    const CARDPARTS = {
        Card: document.createElement("div"),
        Img: document.createElement("img"),
        Name: document.createElement("h3"),
        Breed: document.createElement("p"),
        ID: document.createElement("p"),
        Sex: document.createElement("p"),
        Status: document.createElement("p"),
        Age: document.createElement("p")
    }

    // create the template card
    let dogTemplate = cardTemplater("dog", CARDPARTS, ".main-cardHolder");

    // use the template to make the needed cards
    cardLoader("dog", dogTemplate, dogDeck, dogs);

    // add all relevant classes

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
    let deck = document.createElement("div");
    deck.setAttribute("id", `${baseName}Deck`);

    // append deck to destination element
    document.querySelector(dest).appendChild(deck);

    // card creation loop
    for (let part in CARDPARTS) {
        // generates class name
        let className = baseName + ((part == "Card") ? "" : "Card-") + part

        // adds class name to current part
        CARDPARTS[part].classList.add(className);

        // append all card parts to template card node
        // skip "card" because you can't append the card to itself
        if (part == "Card") {
            continue;
        } else {
            CARDPARTS["Card"].appendChild(CARDPARTS[part]);
        }
    }

    // append template card to deck
    deck.appendChild(CARDPARTS["Card"]);

    // set ID for card Template
    CARDPARTS["Card"].setAttribute("id", baseName + "CardTemplate");

    // hide template card
    document.querySelector("#" + baseName + "CardTemplate").hidden = true;

    return CARDPARTS["Card"];
}

/**
 * Generates a card based on a provided list with custom class names. 
 * @param {string} baseName the prefix of all class names for card parts
 * @param {object} cardTemplate hidden card template element on page
 * @param {string} dest destination node a card is appeneded to, usually a deck
 * @param {array} data Array of objects used to populate cards.
 * @returns {string} string representing the ID of the template card
 */
function cardLoader(baseName, cardTemplate, dest, data) {
    for (let i = 0; i < data.length; i++) {
        //retrieve current entru
        let entry = data[i];

        // clone hidden node template
        let newCard = cardTemplate.cloneNode(true);

        // replace ID
        newCard.setAttribute("id", `${baseName}-${entry.ID}`);

        // set attributes of new Card:
        // > all data except image is appended to element. Images have source set
        for (let attribute in entry) {
            // if image, set source
            if (attribute == "Img") {
                let imageHolder = newCard.querySelector(`.${baseName}Card-Img`);
                imageHolder.setAttribute("src", entry.Img);

                // add an event listener that handles 404 errors for images
                imageHolder.addEventListener("error", () => {
                    imageHolder.setAttribute("src", placeholderImage("No Image Found"));
                });
                continue;
            } else {
                newCard.querySelector("." + baseName + "Card-" + attribute).append(entry[attribute]);
            }
        }

        let cardSleeve = document.createElement("a");
        cardSleeve.href = `./detail.html?id=?${entry.ID}`;
        cardSleeve.classList.add("main-cardSleeve");

        newCard.hidden = false;

        cardSleeve.appendChild(newCard);
        cardFormatter(cardSleeve);
        dest.appendChild(cardSleeve);
    }
}


/**
 * <div class="dogCard" id="dog-23989">
 * <img class="dogCard-Img" src="http://kentoncountypets.shelterbuddy.com/photos/lostfound/71438_th_600.jpg">
 * <h3 class="dogCard-Name">Hattie</h3>
 * <p class="dogCard-Breed">American Pit Bull cross</p>
 * <p class="dogCard-ID">23989</p>
 * <p class="dogCard-Sex">Female</p>
 * <p class="dogCard-Status">Spayed/Neutered</p>
 * <p class="dogCard-Age">1Yrs 6Mths 2Wks</p>
 * </div>
 */

/**
 * Adds bootstrap classes to generated cards
 * @param {HTMLAnchorElement} cardSleeve link to the <a> tag element holding a card
 */
function cardFormatter(cardSleeve) {
    // add to card sleeve
    cardSleeve.classList.add("d-flex");

    // dogCard
    cardSleeve.querySelector(".dogCard").classList.add("card" /*, "flex-row"*/ );

    // dogCard-Img
    cardSleeve.querySelector(".dogCard-Img").classList.add();

    // dogCard-Name
    cardSleeve.querySelector(".dogCard-Name").classList.add();

    // dogCard-Breed
    cardSleeve.querySelector(".dogCard-Breed").classList.add();

    // dogCard-ID
    cardSleeve.querySelector(".dogCard-ID").classList.add();

    // dogCard-Sex
    cardSleeve.querySelector(".dogCard-Sex").classList.add();

    // dogCard-Status
    cardSleeve.querySelector(".dogCard-Status").classList.add();

    // dogCard-Age
    cardSleeve.querySelector(".dogCard-Age").classList.add();
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

function nextpage() {
    let i = 1;
    while (i < 5) {
        document.write("<a class=\"page\"href=\"?page=", i - 1, "\">", i, "</a>");
        i++;
    }
    document.write("<a class=\"page\"href=\"?page=", i - 1, "\">\>\></a>");
}