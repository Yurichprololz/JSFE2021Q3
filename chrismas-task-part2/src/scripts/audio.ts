const changeAudio = (e: Event): void => {
  const target = e.target as HTMLDivElement;
  const audio = document.getElementById("audio") as HTMLAudioElement;
  target.classList.toggle("volume_active");
  if (target.classList.contains("volume_active")) {
    audio.play();
    localStorage.setItem("play-audio", "true");
  } else {
    audio.pause();
    localStorage.setItem("play-audio", "false");
  }
};

const audioListener = (): void => {
  const AUDIO_BTN = document.getElementById("audio-btn") as HTMLDivElement;
  AUDIO_BTN.addEventListener("click", changeAudio);
};
export { audioListener };
