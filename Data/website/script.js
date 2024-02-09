let creatureContainers = {};
let creatureCount = 0;

function getLabel(key) {
    const labels = {
        succ: "Successes Required",
        fail: "Maximum Failures",
        cooldown: "Cooldown (in seconds)",
        lvl: "Required Character Level",
        cost: "Taming Cost (in GP)",
        xp: "Experience Gain",
        color: "Hex Color",
    };
    return labels[key] || key;
}

function addCreature() {
    creatureCount++;

    let creatureName = prompt("Enter creature name:");
    if (!creatureName) {
        alert("Creature name is required.");
        creatureCount--;
        return;
    }

    creatureName = creatureName.trim(); // Normalize the creature name
    if (creatureContainers.hasOwnProperty(creatureName.toLowerCase())) {
        alert("Creature name already exists. Please choose a unique name.");
        creatureCount--;
        return;
    }

    creatureContainers[creatureName] = {
        number: creatureCount
    };

    const creatureDiv = document.createElement("div");
    creatureDiv.className = "creature-container";
    creatureDiv.id = `creature-${creatureCount}`;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = creatureName;
    nameInput.addEventListener("input", () => {
        const newName = nameInput.value.trim();
        if (newName.toLowerCase() !== creatureName.toLowerCase()) {
            if (creatureContainers.hasOwnProperty(newName.toLowerCase())) {
                alert("Creature name already exists. Please choose a unique name.");
                nameInput.value = creatureName; // Revert to the original name
                return;
            }
            delete creatureContainers[creatureName]; // Remove the old name from the container
            creatureName = newName; // Update the creature name
            creatureContainers[creatureName] = { number: creatureCount }; // Update container with new name
        }
    });
    creatureDiv.appendChild(nameInput);

    const requiredInputs = ["succ", "fail", "cooldown"];
    const optionalInputs = ["lvl", "cost", "xp", "color"];
    const defaultValues = {
        lvl: 1,
        cost: 0,
        xp: 0,
        color: "",
    };

    requiredInputs.forEach((key) => {
        const inputLabel = document.createElement("label");
        inputLabel.innerHTML = `${getLabel(key)}${
            isRequired(key) ? ' <span class="required">*</span>' : ""
        }`;
        creatureDiv.appendChild(inputLabel);

        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = getLabel(key);
        inputBox.addEventListener("input", () => {
            let value = inputBox.value.trim();
            if (key === "color") {
                value = validateColor(value);
            } else if (key === "cost") {
                value = validateFloat(value);
            } else {
                value = validateInteger(value);
            }
            if (key === "xp" && value === "") {
                inputBox.value = "";
            } else {
                creatureContainers[creatureName][key] = value;
            }
        });
        creatureDiv.appendChild(inputBox);
    });

    optionalInputs.forEach((key) => {
        const inputLabel = document.createElement("label");
        inputLabel.textContent = getLabel(key);
        creatureDiv.appendChild(inputLabel);

        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = getLabel(key);
        if (defaultValues[key] !== undefined) {
            inputBox.value = defaultValues[key];
            creatureContainers[creatureName][key] = defaultValues[key];
        }
        inputBox.addEventListener("input", () => {
            let value = inputBox.value.trim();
            if (key === "color") {
                value = validateColor(value);
            } else if (key === "cost") {
                value = validateFloat(value);
            } else {
                value = validateInteger(value);
            }
            creatureContainers[creatureName][key] = value;
        });
        creatureDiv.appendChild(inputBox);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () =>
        removeCreature(creatureName)
    );
    creatureDiv.appendChild(removeButton);

    const creatureLabel = document.createElement("span");
    creatureLabel.textContent = `Creature #${creatureCount}: `;
    creatureDiv.insertBefore(creatureLabel, nameInput);

    document.getElementById("creatures-container").appendChild(creatureDiv);
}

function removeCreature(creatureName) {
    if (!creatureContainers.hasOwnProperty(creatureName)) {
        console.error(`Creature container not found for creature "${creatureName}"`);
        return;
    }

    if (confirm(`Are you sure you want to remove creature "${creatureName}"?`)) {
        // Remove creature from backend
        delete creatureContainers[creatureName];

        // Remove the HTML element of the removed creature
        const creatureDiv = document.querySelector(`#creatures-container > div`);
        if (creatureDiv) {
            creatureDiv.remove();
        }

        // Update labels for all remaining creatures
        const allCreatureContainers = document.querySelectorAll(".creature-container");
        allCreatureContainers.forEach((container, index) => {
            const currentCreatureNumber = index + 1;
            const creatureLabel = container.querySelector("span");
            if (creatureLabel) {
                creatureLabel.textContent = `Creature #${currentCreatureNumber}: `;
            }

            // Update the ID of the creature div
            container.id = `creature-${currentCreatureNumber}`;
        });

        // Update the count of creatures
        creatureCount--;
    }
}

function generateJSON() {
    try {
        const defaultValues = getDefaultValues();
        const creatureNames = new Set();

        for (const creatureName in creatureContainers) {
            const normalizedCreatureName = creatureName.toLowerCase();
            if (creatureNames.has(normalizedCreatureName)) {
                alert(`Duplicate creature name found: ${creatureName}. Please use unique names.`);
                return;
            }
            creatureNames.add(normalizedCreatureName);

            const creature = creatureContainers[creatureName];
            const requiredInputs = ["succ", "fail", "cooldown"];
            for (const key of requiredInputs) {
                const value = creature[key];
                const label = getLabel(key);
                if (isNaN(value) || value < 0) {
                    alert(
                        `Please provide a non-negative number for the field "${label}" for creature "${creatureName}".`
                    );
                    return;
                }
                if (
                    value === "" ||
                    (typeof value === "string" && value.trim() === "")
                ) {
                    alert(
                        `Please provide a value for the required field "${label}" for creature "${creatureName}".`
                    );
                    return;
                }
            }

            const optionalInputs = ["lvl", "cost", "xp", "color"];
            optionalInputs.forEach((key) => {
                if (creature[key] === undefined) {
                    creature[key] = defaultValues[key];
                }
            });

            if (creature["lvl"] === defaultValues.lvl) {
                delete creature["lvl"];
            }
            if (creature["xp"] === defaultValues.xp) {
                delete creature["xp"];
            }
            if (creature["cost"] === defaultValues.cost) {
                delete creature["cost"];
            }
            if (creature["color"] === "") {
                delete creature["color"];
            }

            const creatureColor = creature["color"];
            if (creatureColor) {
                creature["color"] = "#" + creatureColor;
            }
        }

        const jsonString = JSON.stringify(creatureContainers);

        navigator.clipboard
            .writeText(jsonString)
            .then(() => alert("JSON copied to clipboard."))
            .catch((err) => alert(`Error copying to clipboard: ${err}`));
    } catch (error) {
        console.error("Error generating JSON:", error);
        alert("Error generating JSON. Please check your input data.");
    }
}


function validatePositiveInteger(value) {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue >= 0 ? intValue : null;
}

function validateFloat(value) {
    const floatValue = parseFloat(value);
    return !isNaN(floatValue) ? floatValue.toFixed(2) : null;
}

function isRequired(key) {
    const requiredInputs = ["succ", "fail", "cooldown"];
    return requiredInputs.includes(key);
}

function validateInteger(value) {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) ? intValue : null;
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDarkMode = html.classList.toggle("dark-mode");

    const creatureContainersArray = Object.values(creatureContainers);
    creatureContainersArray.forEach((container) => {
        container.classList.toggle("dark-mode", isDarkMode);
    });

    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDarkMode) {
    toggleDarkMode();
}

function updateScrollbarColors(isDarkMode) {
    const scrollbarBgColor = isDarkMode ? "#333" : "#fff";
    const scrollbarThumbColor = isDarkMode ? "#888" : "#ccc";
    const scrollbarThumbHoverColor = isDarkMode ? "#555" : "#999";
    const scrollbarTrackColor = isDarkMode ? "#222" : "#f1f1f1";

    document.documentElement.style.setProperty(
        "--scrollbar-bg-color",
        scrollbarBgColor
    );
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const json = JSON.parse(e.target.result);
            for (const creatureName in json) {
                if (json.hasOwnProperty(creatureName)) {
                    addCreatureFromJSON(creatureName, json[creatureName]);
                }
            }
            alert("Creatures added from the uploaded file.");

            // Clear the input field after successfully processing the file
            event.target.value = '';
        } catch (error) {
            alert("Error parsing JSON file.");
            console.error("Error parsing JSON:", error);
        }
    };

    reader.readAsText(file);
}


function addCreatureFromJSON(creatureName, creatureData) {
    creatureName = creatureName.trim(); // Normalize the creature name
    if (creatureContainers.hasOwnProperty(creatureName.toLowerCase())) {
        alert("Creature name already exists. Please choose a unique name.");
        return;
    }

    creatureCount++;
    creatureContainers[creatureName] = {
        number: creatureCount
    };

    const creatureDiv = document.createElement("div");
    creatureDiv.className = "creature-container";
    creatureDiv.id = `creature-${creatureCount}`;

    const creatureLabel = document.createElement("span");
    creatureLabel.textContent = `Creature #${creatureCount}: `;
    creatureDiv.appendChild(creatureLabel);

    creatureData.number = creatureCount;

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = creatureName;
    nameInput.addEventListener("input", () => {
        const newName = nameInput.value.trim();
        if (newName.toLowerCase() !== creatureName.toLowerCase()) {
            if (creatureContainers.hasOwnProperty(newName.toLowerCase())) {
                alert("Creature name already exists. Please choose a unique name.");
                nameInput.value = creatureName; // Revert to the original name
                return;
            }
            delete creatureContainers[creatureName]; // Remove the old name from the container
            creatureName = newName; // Update the creature name
            creatureContainers[creatureName] = { number: creatureCount }; // Update container with new name
        }
    });
    creatureDiv.appendChild(nameInput);

    const requiredInputs = ["succ", "fail", "cooldown"];
    const optionalInputs = ["lvl", "cost", "xp", "color"];
    const defaultValues = {
        lvl: 1,
        cost: 0,
        xp: 0,
        color: "",
    };

    const succInputLabel = document.createElement("label");
    succInputLabel.textContent = getLabel("succ");
    creatureDiv.appendChild(succInputLabel);

    const succInputBox = document.createElement("input");
    succInputBox.type = "text";
    succInputBox.value = creatureData["succ"] || "";
    succInputBox.placeholder = getLabel("succ");
    succInputBox.addEventListener("input", () => {
        let value = succInputBox.value.trim();
        value = validatePositiveInteger(value);
        creatureData["succ"] = value;
        creatureContainers[creatureName]["succ"] = value;
    });
    creatureDiv.appendChild(succInputBox);

    requiredInputs.forEach((key) => {
        if (key !== "succ") {
            const inputLabel = document.createElement("label");
            inputLabel.textContent = getLabel(key);
            creatureDiv.appendChild(inputLabel);

            const inputBox = document.createElement("input");
            inputBox.type = "text";
            inputBox.value = creatureData[key] || "";
            inputBox.placeholder = getLabel(key);
            inputBox.addEventListener("input", () => {
                let value = inputBox.value.trim();
                if (key === "color") {
                    value = validateColor(value);
                } else if (key === "cost") {
                    value = validateFloat(value);
                } else {
                    value = validateInteger(value);
                }
                creatureData[key] = value;
                creatureContainers[creatureName][key] = value;
            });
            creatureDiv.appendChild(inputBox);
        }
    });

    optionalInputs.forEach((key) => {
        const inputLabel = document.createElement("label");
        inputLabel.textContent = getLabel(key);
        creatureDiv.appendChild(inputLabel);

        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.value = creatureData[key] !== undefined ? creatureData[key] : defaultValues[key];
        inputBox.placeholder = getLabel(key);
        inputBox.addEventListener("input", () => {
            let value = inputBox.value.trim();
            if (key === "color") {
                value = validateColor(value);
            } else if (key === "cost") {
                value = validateFloat(value);
            } else {
                value = validateInteger(value);
            }
            creatureData[key] = value;
            creatureContainers[creatureName][key] = value;
        });
        creatureDiv.appendChild(inputBox);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () =>
        removeCreature(creatureName)
    );
    creatureDiv.appendChild(removeButton);

    document.getElementById("creatures-container").appendChild(creatureDiv);
}

function getDefaultValues() {
    return {
        lvl: 1,
        cost: 0,
        xp: 0,
        color: "",
    };
}
