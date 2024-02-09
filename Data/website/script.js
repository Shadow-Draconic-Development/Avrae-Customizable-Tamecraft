let creatures = {};
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

    creatures[creatureName] = {};

    const requiredInputs = ["succ", "fail", "cooldown"];
    const optionalInputs = ["lvl", "cost", "xp", "color"];
    // Define default values for optional inputs
    const defaultValues = {
        lvl: 1,
        cost: 0,
        xp: 0,
        color: "",
    };

    const creatureDiv = document.createElement("div");
    creatureDiv.className = "creature-container";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = creatureName;
    nameInput.addEventListener("input", () => {
        const newName = nameInput.value.trim();
        if (newName && newName !== creatureName) {
            creatures[newName] = creatures[creatureName];
            delete creatures[creatureName];
            creatureName = newName;
        }
    });
    creatureDiv.appendChild(nameInput);

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
                // Reset the value of xp when it's cleared
                inputBox.value = "";
            } else {
                creatures[creatureName][key] = value;
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
        // Set default value if available
        if (defaultValues[key] !== undefined) {
            inputBox.value = defaultValues[key];
            creatures[creatureName][key] = defaultValues[key]; // Store default value in creatures object
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
            creatures[creatureName][key] = value;
        });
        creatureDiv.appendChild(inputBox);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () =>
        removeCreature(creatureDiv.parentNode)
    );
    creatureDiv.appendChild(removeButton);

    const creatureLabel = document.createElement("span");
    creatureLabel.textContent = `Creature #${creatureCount}: `;
    creatureDiv.insertBefore(creatureLabel, nameInput);

    document.getElementById("creatures-container").appendChild(creatureDiv);
}

function removeCreature(creatureContainer) {
    if (confirm(`Are you sure you want to remove this creature?`)) {
        const creatureName =
            creatureContainer.querySelector('input[type="text"]').value;
        delete creatures[creatureName];
        creatureContainer.remove();
        creatureCount--;
        const creatureContainers = document.querySelectorAll(
            ".creature-container"
        );
        creatureContainers.forEach((container, index) => {
            container.querySelector("span").textContent = `Creature #${
                index + 1
            }: `;
        });
    }
}

function generateJSON() {
    try {
        const defaultLevel = 1;
        const defaultCost = 0;
        const defaultXP = 0;

        for (const creatureName in creatures) {
            const creature = creatures[creatureName];
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

            const characterLevel = creature["lvl"];
            if (characterLevel !== undefined) {
                if (isNaN(characterLevel) || characterLevel < 0) {
                    alert(
                        `Please provide a non-negative number for the field "Required Character Level" for creature "${creatureName}".`
                    );
                    return;
                } else {
                    creatures[creatureName]["lvl"] = Math.floor(characterLevel);
                }
            } else {
                // Set default value for character level
                creatures[creatureName]["lvl"] = defaultLevel;
            }

            const experienceGain = creature["xp"];
            if (experienceGain !== undefined && experienceGain !== "") {
                if (experienceGain < 0) {
                    alert(
                        `Please provide a non-negative number for the field "Experience Gain" for creature "${creatureName}".`
                    );
                    return;
                } else {
                    const validatedXP = validatePositiveInteger(experienceGain);
                    if (validatedXP === null) {
                        alert(
                            `Please provide a non-negative number for the field "Experience Gain" for creature "${creatureName}".`
                        );
                        return;
                    }
                    creatures[creatureName]["xp"] = validatedXP;
                }
            } else {
                // Set default value for experience gain
                creatures[creatureName]["xp"] = defaultXP;
            }

            let tamingCost = creature["cost"];
            if (tamingCost !== undefined && tamingCost !== "") {
                tamingCost = parseFloat(tamingCost);
                if (isNaN(tamingCost)) {
                    alert(
                        `Please provide a number for the field "Taming Cost (in GP)" for creature "${creatureName}".`
                    );
                    return;
                }
                creatures[creatureName]["cost"] = tamingCost;
            } else {
                // Set default value for taming cost
                creatures[creatureName]["cost"] = defaultCost;
            }

            // Remove optional fields with default values
            if (creatures[creatureName]["lvl"] === defaultLevel) {
                delete creatures[creatureName]["lvl"];
            }
            if (creatures[creatureName]["xp"] === defaultXP) {
                delete creatures[creatureName]["xp"];
            }
            if (creatures[creatureName]["cost"] === defaultCost) {
                delete creatures[creatureName]["cost"];
            }
            if (creatures[creatureName]["color"] === "") {
                delete creatures[creatureName]["color"]
            }
        }

        for (const creatureName in creatures) {
            const creatureColor = creatures[creatureName]["color"];
            if (creatureColor) {
                creatures[creatureName]["color"] = "#" + creatureColor;
            }
        }

        const jsonString = JSON.stringify(creatures);

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

// Define validateInteger function globally
function validateInteger(value) {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) ? intValue : null;
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDarkMode = html.classList.toggle("dark-mode");

    // Update scrollbar colors based on dark mode
    updateScrollbarColors(isDarkMode);

    // Update creature container styles based on dark mode
    const creatureContainers = document.querySelectorAll(".creature-container");
    creatureContainers.forEach((container) => {
        container.classList.toggle("dark-mode", isDarkMode);
    });

    // Update Discord widget theme
    const discordWidget = document.querySelector(
        "iframe[src^='https://discord.com/widget']"
    );
    if (discordWidget) {
        const newSrc = discordWidget.src.replace(
            /theme=(\w+)/,
            `theme=${isDarkMode ? "dark" : "light"}`
        );
        discordWidget.src = newSrc;
    }

    // Save the dark mode state to local storage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Check if system prefers dark mode initially
const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDarkMode) {
    toggleDarkMode(); // Apply dark mode if system prefers it
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
