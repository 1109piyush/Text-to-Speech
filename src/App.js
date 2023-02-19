import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const onVoicesChanged = () => {
      setVoice(synth.getVoices()[0]);
    };
    synth.onvoiceschanged = onVoicesChanged;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setVoice(synth.getVoices()[event.target.value]);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    synth.speak(utterance);
    setSpeaking(true);
  };

  const handleStop = () => {
    synth.cancel();
    setSpeaking(false);
  };

  return (
    <div className="App">
      <h1>Text to Speech</h1>
      <form className="form">
        <label htmlFor="text">Enter text to speak:</label>
        <textarea id="text" value={text} onChange={handleTextChange} />
        <label htmlFor="voice">Select a voice:</label>
        <select id="voice" onChange={handleVoiceChange}>
          {synth &&
            synth.getVoices().map((voice, index) => (
              <option key={index} value={index}>
                {voice.name}
              </option>
            ))}
        </select>
        <label htmlFor="rate">Rate:</label>
        <input
          id="rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
        <label htmlFor="pitch">Pitch:</label>
        <input
          id="pitch"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
        <button
          type="button"
          onClick={speaking ? handleStop : handleSpeak}
          disabled={!text || !voice}
        >
          {speaking ? "Stop" : "Speak"}
        </button>
      </form>
    </div>
  );
}

export default App;
