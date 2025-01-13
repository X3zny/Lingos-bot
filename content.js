let words = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autofill") {
    words = request.words;

    const currentWordElement = document.getElementById("flashcard_main_text");
    if (currentWordElement) {
      const currentWord = currentWordElement.innerText.trim();
      const translatedWord = words[currentWord];

      if (translatedWord) {
        const inputField = document.getElementById("flashcard_answer_input");
        if (inputField) {
          inputField.value = translatedWord;
          inputField.dispatchEvent(new Event("input", { bubbles: true }));

          const enterButton = document.getElementById("enterBtn");
          if (enterButton) {
            enterButton.click();
          }
        }
      }
    }
  } else if (request.action === "newWord") {
    const enterButton = document.getElementById("enterBtn");
    if (enterButton) {
      enterButton.click();
    }
  }
});
