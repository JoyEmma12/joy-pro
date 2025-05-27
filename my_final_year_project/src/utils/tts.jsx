// utils/tts.js
export const speak = (text, language = "en") => {
  if (!text || !window.speechSynthesis) return;

//   this code defines the tts (text-to-speech) function that uses the Web Speech API to convert text to speech. 
// The function creates a new SpeechSynthesisUtterance object with the provided text and sets its language based on the specified language. 
// It also attempts to match a preferred voice based on the language and speaks the utterance using the speech synthesis API.
  const utterance = new SpeechSynthesisUtterance(text);

  
  switch (language.toLowerCase()) {
    case "igbo":
    utterance.lang = "eg-NG";  //this code uses nigerian english as the language code for igo
      break;
    case "yoruba":
      utterance.lang = "en-NG"; //this code uses nigerian english as the language code for yoruba
      break;
    case "hausa":
      utterance.lang = "en-NG";  //this code uses nigerian english as the language code for hausa
      break;
    case "ibibio":
      utterance.lang = "en-NG"; //this code uses nigerian english as the language code for ibibio
      break;
    default:
      utterance.lang = "en-US";
  }

    // Sets the voice based on the language
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) =>
    v.lang.toLowerCase().includes(utterance.lang.toLowerCase()) 
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

    // Sets the pitch and rate of the speech
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance); // Speak the utterance
};
