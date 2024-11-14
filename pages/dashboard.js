let utterance;
let currentText = '';
let currentVoice = null;
let currentRate = 1;
let isPaused = false;
let audioBlob;
let audioUrl;

// Reset all settings and states
function resetState() {
    cancelSpeech();
    resetForm();
    resetVariables();
    resetButtons();
}

// Cancel any ongoing speech synthesis
function cancelSpeech() {
    window.speechSynthesis.cancel();
}

// Reset the form inputs
function resetForm() {
    document.getElementById('text-input').value = '';
    document.getElementById('voice-select').value = '';
    document.getElementById('language-select').value = 'en-US';
}

// Reset the global variables
function resetVariables() {
    utterance = null;
    currentText = '';
    currentVoice = null;
    currentRate = 1;
    isPaused = false;
    audioBlob = null;
    audioUrl = null;
}

// Reset the button states
function resetButtons() {
    document.getElementById('play-btn').disabled = true;
    document.getElementById('download-btn').disabled = true;
    document.querySelectorAll('.control-group button').forEach(button => button.disabled = true);
}

// Detect language based on selected language from dropdown
function detectLanguage() {
    const selectedLanguage = document.getElementById('language-select').value;
    return selectedLanguage || 'en-US';
}

// Prepare the speech synthesis utterance and settings
function prepareSpeech() {
    setupUtterance();
    selectVoice();
    enableControlButtons();
    recordSpeech();
}

// Setup the utterance with current text and language
function setupUtterance() {
    currentText = document.getElementById('text-input').value;
    utterance = new SpeechSynthesisUtterance(currentText);
    utterance.rate = currentRate;
    utterance.lang = detectLanguage();
}

// Select the voice based on user selection
function selectVoice() {
    const selectedVoice = document.getElementById('voice-select').value;
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        const chosenVoice = voices.find(voice => voice.name === selectedVoice && voice.lang === utterance.lang);
        utterance.voice = chosenVoice || voices.find(voice => voice.lang === utterance.lang) || voices[0];
        currentVoice = utterance.voice;
    }
}

// Enable control buttons after preparing speech
function enableControlButtons() {
    document.getElementById('play-btn').disabled = false;
    document.querySelectorAll('.control-group button').forEach(button => button.disabled = false);
}

// Play, pause, or resume the speech
function togglePlayPause() {
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
        synth.pause();
        isPaused = true;
    } else if (synth.paused) {
        synth.resume();
        isPaused = false;
    } else {
        synth.speak(utterance);
    }
    updatePlayPauseButton();
}

// Update play/pause button icon
function updatePlayPauseButton() {
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (isPaused) {
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    } else if (window.speechSynthesis.speaking) {
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
    }
}

// Replay the speech from the beginning
function replaySpeech() {
    cancelSpeech();
    if (currentText && currentVoice) {
        setupUtterance();
        utterance.voice = currentVoice;
        window.speechSynthesis.speak(utterance);
    }
}

// Increase speech rate
function increaseSpeed() {
    if (currentRate < 2) {
        currentRate += 0.1;
        adjustSpeechRate();
    }
}

// Decrease speech rate
function decreaseSpeed() {
    if (currentRate > 0.5) {
        currentRate -= 0.1;
        adjustSpeechRate();
    }
}

// Adjust speech rate and replay speech
function adjustSpeechRate() {
    cancelSpeech();
    if (currentText && currentVoice) {
        setupUtterance();
        utterance.voice = currentVoice;
        utterance.rate = currentRate;
        window.speechSynthesis.speak(utterance);
    }
}

// Download the generated speech as an audio file
function downloadSpeech() {
    if (!audioBlob) {
        alert('Please generate the speech first.');
        return;
    }
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'speech.mp3';
    link.click();
}

// Record the generated speech using Web Audio API
function recordSpeech() {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const dest = context.createMediaStreamDestination();
    const recorder = new MediaRecorder(dest.stream, { mimeType: 'audio/mp3' });
    let chunks = [];

    recorder.ondataavailable = event => chunks.push(event.data);
    recorder.onstop = () => {
        audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('download-btn').disabled = false;
        showSuccessPopup();
    };

    const source = context.createMediaStreamSource(dest.stream);
    source.connect(dest);

    utterance.onend = () => recorder.stop();
    recorder.start();
}

// Show a success popup when audio is generated
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.id = 'success-popup';
    popup.textContent = 'Audio generated successfully!';
    Object.assign(popup.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    });
    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 2000);
}

// Load available voices and populate the voice select dropdown
speechSynthesis.onvoiceschanged = () => {
    const voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '<option value="">Select a voice...</option>';

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
};

// Add hover effect to change color to orange
document.querySelectorAll('.control-group .icon-button').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.color = '#ff4400';
    });

    button.addEventListener('mouseleave', function () {
        this.style.color = '#fff';
    });
});

// Event listeners
document.getElementById('generate-btn').addEventListener('click', prepareSpeech);
document.getElementById('play-btn').addEventListener('click', togglePlayPause);
document.getElementById('replay-btn').addEventListener('click', replaySpeech);
document.getElementById('increase-speed-btn').addEventListener('click', increaseSpeed);
document.getElementById('decrease-speed-btn').addEventListener('click', decreaseSpeed);
document.getElementById('download-btn').addEventListener('click', downloadSpeech);

// Reset state when the page loads
window.addEventListener('load', resetState);
