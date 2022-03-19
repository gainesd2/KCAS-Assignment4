function detailLauncher(animID) {
    let currentAnimal = animals[animID];

    // once animal is gotten
    // append title and table attributesN
    attrLoop: for (attribute in currentAnimal) {
            switch (attribute) {
                case "whereAmI":
                    let location = "";
                    if (currentAnimal[attribute] == "FC") {
                        // if animal is in foster care
                        location += "I am in foster care, please contact Kenton County Animal Shelter for details."
                    } else {
                        // otherwise, assume at KCAS
                        location += "I am at the Kenton County Animal Shelter location."
                    }

                    document.querySelector("#contactor").append(location);
                    continue attrLoop;
                case "chipped":
                    // second if needed, redundant, but best solution I can think of
                    if (currentAnimal[attribute]) {
                        // add the chip number
                        let chipNumberHolder = document.createElement("span");
                        chipNumberHolder.append("Microchip Number: ");
                        chipNumberHolder.id = "chipNum";

                        document.querySelector("#animalIdentification").appendChild(chipNumberHolder)
                    }
                case "healthChecked":
                case "vaxxedToDate":
                case "wormingToDate":
                    if (currentAnimal[attribute]) {
                        medRecordGenerator(attribute);
                    }
                    continue attrLoop;
                case "Img":
                    document.querySelector("#imgHolder").setAttribute("src", currentAnimal[attribute]);
                    continue attrLoop;
                case "size":
                case "declawed":
                    // get the element
                    let destEl = document.querySelector("#declawedOrSize");
                    destEl.querySelector("th").append(`${attribute}:`);
                    destEl.querySelector("td").append(currentAnimal[attribute]);

                    continue attrLoop;
                default:
                    document.querySelector(`#${attribute}`).append(currentAnimal[attribute]);
            }
        }
        /*
            suitabilityGuide: [] */
}

/**
 * 
 * @param {string} attributeName 
 */
function medRecordGenerator(attributeName) {
    // possible messages
    const MESSAGES = {
        healthChecked: "My health has been checked.",
        vaxxedToDate: "My vaccinations are up to date.",
        wormingToDate: "My worming is up to date.",
        chipped: "I have been microchipped."
    }

    // generate list item
    let messageHolder = document.createElement("li");

    // set its id
    messageHolder.id = attributeName;

    // set the message
    messageHolder.append(MESSAGES[attributeName]);

    // append the list item
    document.querySelector("#stats").appendChild(messageHolder);
}