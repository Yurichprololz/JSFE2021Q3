const AUDIO_BTN = document.getElementById("audio-btn") as HTMLDivElement;

const changeAudio = (e: Event) => {
  const target = e.target as HTMLDivElement;
  const audio = document.getElementById("audio") as HTMLAudioElement;
  target.classList.toggle("volume_active");
  if (target.classList.contains("volume_active")) {
    audio.play();
  } else {
    audio.pause();
  }
};

AUDIO_BTN.addEventListener("click", changeAudio);
