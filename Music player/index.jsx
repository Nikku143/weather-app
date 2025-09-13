import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Fetch dummy API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        // Attach dummy mp3 URLs to dummy API results
        const soundHelix = [
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        ];
        const adapted = data.map((item, i) => ({
          id: item.id,
          title: item.title.substring(0, 20),
          artist: `Dummy Artist ${i + 1}`,
          cover: item.thumbnailUrl,
          src: soundHelix[i % soundHelix.length], // attach real playable mp3
        }));
        setTracks(adapted);
      });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [index]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() =>
          alert("Click Play button to start (browser blocks autoplay)")
        );
    }
  }

  function next() {
    setIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 200);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 200);
  }

  function seekTo(time) {
    audioRef.current.currentTime = time;
    setProgress(time);
  }

  function formatTime(sec = 0) {
    if (!isFinite(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  if (tracks.length === 0) {
    return <h2 style={{ color: "gray", textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#222",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#333",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <img
          src={tracks[index].cover}
          alt={tracks[index].title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <h3 style={{ margin: "10px 0 0" }}>{tracks[index].title}</h3>
        <p style={{ margin: "5px 0 15px", fontSize: "14px", color: "#aaa" }}>
          {tracks[index].artist}
        </p>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <button
            onClick={prev}
            style={{
              margin: "0 10px",
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              background: "#555",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            style={{
              margin: "0 10px",
              padding: "15px",
              borderRadius: "50%",
              border: "none",
              background: "#1db954",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={next}
            style={{
              margin: "0 10px",
              padding: "10px",
              borderRadius: "50%",
              border: "none",
              background: "#555",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ⏭
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "12px" }}
        >
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={(e) => seekTo(parseFloat(e.target.value))}
            style={{ flex: 1, margin: "0 10px" }}
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Playlist */}
        <ul
          style={{ marginTop: "15px", maxHeight: "120px", overflowY: "auto" }}
        >
          {tracks.map((t, i) => (
            <li
              key={t.id}
              onClick={() => {
                setIndex(i);
                setIsPlaying(true);
                setTimeout(() => audioRef.current.play(), 200);
              }}
              style={{
                padding: "8px",
                borderRadius: "8px",
                background: i === index ? "#444" : "transparent",
                cursor: "pointer",
                marginBottom: "5px",
              }}
            >
              {t.title} - {t.artist}
            </li>
          ))}
        </ul>

        <audio ref={audioRef} src={tracks[index].src} />
      </div>
    </div>
  );
}
