// Link do zaproszenia na Discord
const DISCORD_INVITE_LINK = "https://discord.gg/h6FWqZP8da";

// Obsługa przycisku "Uzupełnij"
document.getElementById("autofill").addEventListener("click", () => {
  const selectedLanguage = document.getElementById("languageSelect").value;
  const jsonFile = `lang/${selectedLanguage}.json`;

  // Pobranie pliku JSON
  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Wysłanie wiadomości do aktywnej zakładki
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              action: "autofill",
              words: data,
            },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message:",
                  chrome.runtime.lastError
                );
              } else {
                console.log("Autofill message sent successfully:", response);
              }
            }
          );
        } else {
          console.error("No active tab found.");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON file:", error);
      alert("Nie udało się załadować pliku językowego.");
    });
});

// Obsługa przycisku "Dalej"
document.getElementById("newWord").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "newWord" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
        } else {
          console.log("New word message sent successfully:", response);
        }
      });
    } else {
      console.error("No active tab found.");
    }
  });
});

// Obsługa przycisku "Dołącz do Discorda"
document.getElementById("discordButton").addEventListener("click", () => {
  chrome.tabs.create({ url: DISCORD_INVITE_LINK });
});

// Animacje kliknięcia dla przycisków
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.95)";
  });
  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1)";
  });
});
