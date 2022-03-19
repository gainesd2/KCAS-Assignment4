/**
 * clears the deck, generates a template if needed, and fills the deck with cards
 * @param {int} currentPage current page number
 */
function animal(currentPage = 1) {
    // clear the deck
    animalDeck.innerHTML = "";

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
    let animalTemplate;

    // if it doesn't exist, make it, otherwise use the existing template
    if (document.querySelector("#animalCardTemplate") == null) {
        animalTemplate = cardTemplater("animal", CARDPARTS, ".main-cardHolder");
    } else {
        animalTemplate = document.querySelector("#animalCardTemplate");
    }

    // use the template to make the needed cards
    cardLoader("animal", animalTemplate, animalDeck, animals, currentPage - 1, parseInt(numSelector.value));
}

/**
 * Generates a card based on a provided list with custom class names. 
 * @param {string} baseName the prefix of all class names for card parts
 * @param {HTMLElement} cardTemplate hidden card template element on page
 * @param {string} dest destination node a card is appeneded to, usually a deck
 * @param {[{}]} data Array of objects used to populate cards.
 * @returns {string} string representing the ID of the template card
 */
function cardLoader(baseName, cardTemplate, dest, data, current, cardsPerPage) {
    for (let i = 0 + (current * cardsPerPage); i < data.length && i < (cardsPerPage + (current * cardsPerPage)); i++) {
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
        newCard.href = `./detail.html?id=${i}`;

        // format the card
        cardFormatter(newCard, dest, "card m-3 text-dark text-decoration-none")

        newCard.hidden = false;
    }
}

/**
 * Calls paginator and sets up listener to reload pagination anytime the cardsPerPage is changed
 * @param {HTMLElement} numSelector the dropdown selector that selects how many cards are displayed per page
 */
function nextPage(numSelector) {
    // when a new numberPerPage is selected
    numSelector.addEventListener("change", (e) => {
        // reload cards
        animal(document.querySelector("#paginator").value);

        // reload pagination
        paginator(numSelector.value, animals, "#paginator");
    });

    // run paginator on first run
    paginator(numSelector.value, animals, "#paginator");
}

/**
 * Generates the pagination
 * @param {int} cardsPerPage number of cards to appear on each page
 * @param {array[object]} data the data to be displayed
 * @param {string} destString a query selector string used to place the pagination
 * @returns 
 */
function paginator(cardsPerPage, data, destString) {
    let dest = document.querySelector(destString);
    dest.innerHTML = "";

    // count full pages
    let fullPages = Math.floor(data.length / cardsPerPage);


    // add partial page if needed
    let partialPages = ((data.length % cardsPerPage > 0) ? 1 : 0);

    // combine
    let pages = fullPages + partialPages + 1;

    let i = 1;
    while (i < pages) {
        buttonMaker(i, dest);
        i++;
    }
    i--;

    document.querySelector(`#btnRadio1`).toggleAttribute("checked");

    // when a new page is selected
    dest.addEventListener("change", function(e) {
        animal(e.target.value);
    });

    return i;
}

/**
 * Generates a radio Pagination button, appends it to a destination
 * @param {int} labelValue the value give to, and displayed on the button
 * @param {HTMLElement} dest Element the button is to be appended to
 */
function buttonMaker(labelValue, dest) {
    // input, hidden
    let inMan = document.createElement("input");

    // set type to radio
    inMan.setAttribute("type", "radio");

    // set name
    inMan.setAttribute("name", "btnradio");

    // set ID, e.g. btnRadio1
    inMan.setAttribute("id", `btnRadio${labelValue}`);

    // the value used to parse the current page
    inMan.setAttribute("value", `${labelValue}`);

    // not using this breaks it
    inMan.setAttribute("autocomplete", "off");

    // bootstrap formatting
    inMan.classList.add("btn-check");

    // label, what's actually displayed. Formatted like a button
    let label = document.createElement("label");
    label.setAttribute("for", `btnRadio${labelValue}`);

    // bootstrap formatting
    label.classList.add("btn", "btn-outline-primary");

    // set ID e.g. btnRadio1Label
    label.setAttribute("id", `btnRadio${labelValue}Label`);

    // number displayed
    label.innerHTML += `${labelValue}`;

    // append to pagination
    dest.appendChild(inMan);
    dest.appendChild(label);
}