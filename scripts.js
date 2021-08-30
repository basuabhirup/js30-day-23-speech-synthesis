const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;


// Set options at the voicesDropdown Menu:
speechSynthesis.addEventListener('voiceschanged', function() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
  .filter(voice => voice.lang.includes('en'))
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
  .join("");
})

// Set voice from the voicesDropdown Menu:
voicesDropdown.addEventListener('change', function() {
  msg.voice = voices.find(voice => voice.name === this.value);
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
})

// Set options
options.forEach(option => option.addEventListener('change', function() {
  msg[this.name] = this.value;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}))

// Set the Start button
speakButton.addEventListener('click', () => {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
})

// Set the Stop button
stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
})
