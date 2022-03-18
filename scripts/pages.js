"use strict"

/**
 * Calls paginator and sets up listener to reload pagination anytime the cardsPerPage is changed
 * @param {HTMLElement} numSelector the dropdown selector that selects how many cards are displayed per page
 */
function nextPage(numSelector) {
    // when a new numberPerPage is selected
    numSelector.addEventListener("change", (e) => {
        // reload cards
        dog(document.querySelector("#paginator").value);

        // reload pagination
        paginator(numSelector.value, dogs, "#paginator");
    });

    // run paginator on first run
    paginator(numSelector.value, dogs, "#paginator");
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
        dog(e.target.value);
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