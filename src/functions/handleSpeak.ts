import { errorToast } from "../components/Toast";

export const handleSpeak = (text: string) => {
  if ("speechSynthesis" in window) {
    const speechSynthesis = window.speechSynthesis;
    const availableVoices = speechSynthesis.getVoices();

    const englishVoices = availableVoices.filter((voice) =>
      voice.lang.startsWith("en")
    );

    if (englishVoices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = englishVoices[0];
      utterance.pitch = 0.9;
      utterance.rate = 0.8;

      speechSynthesis.speak(utterance);
    } else errorToast("An error occurred, try again");
  } else {
    errorToast("Error: SpeechSynthesis API is not supported");
  }
};
