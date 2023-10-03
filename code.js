// Selecting DOM elements
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".pass-btn");

// Character sets for generating passwords - Definierar olika teckenuppsättningar för att generera lösenord
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
};

// Function to generate a random password - Funktion för att generera lösenord
const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    // Loop through options and build the static part of the password - Loopar genom valen och skapar en statisk del av lösenordet
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    // Generate the random part of the password - Genererar ett slumpmässigt lösenord baserat på användarvalen
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            // Ensure no duplicates if requested - Utesluter dubbletter om alternativet är markerat
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    // Update the password input field - Uppdaterar inmatningsfältet med det genererade lösenordet
    passwordInput.value = randomPassword;
};

// Function to update the password strength indicator -  Funktion för att uppdatera skjutreglaget och generera ett nytt lösenord
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};

// Function to update the slider and generate a new password - Funktion för att uppdatera skjutreglaget och generera ett nytt lösenord
const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};
updateSlider(); // Kör uppdateringen när sidan laddas

// Function to copy the generated password to the clipboard -// Funktion för att kopiera det genererade lösenordet till urklipp
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#438bff";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#777";
    }, 1500);
};

// Event listeners for clicking the copy icon, changing the slider, and generating the password
copyIcon.addEventListener("click", copyPassword);          // Lyssnar på klick på kopieringsikonen
lengthSlider.addEventListener("input", updateSlider);     // Lyssnar på ändringar i skjutreglaget för lösenordslängd
generateBtn.addEventListener("click", generatePassword); // Lyssnar på klick på knappen för att generera lösenord
