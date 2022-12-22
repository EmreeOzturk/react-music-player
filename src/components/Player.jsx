import React from "react";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import moti from "../assets/moti.mp3";
const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });
  const [seconds, setSeconds] = useState();
  const [play, { pause, duration, sound }] = useSound(moti);
  const durationMin = Math.floor(duration / 1000 / 60);
  const durationSec = Math.floor((duration / 1000) % 60);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(sound.seek([])); // setting the seconds state with the current state
      const min = Math.floor(sound.seek([]) / 60);
      const sec = Math.floor(sound.seek([]) % 60);
      setCurrTime({
        min,
        sec,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);
  return (
    <div className="component">
      <h1>Playing Now</h1>
      <img
        className="musicCover"
        src="https://images.genius.com/23a8cc49960a62c7a1d6f5fe784f6162.640x640x1.png"
        alt="motive"
      />
      <div>
        <h3 className="title">Motive</h3>
        <p className="subTitle">Olumsuz</p>
      </div>

      <div>
        <button className="playButton">
          <BiSkipPrevious />
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <AiFillPlayCircle />
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <AiFillPauseCircle />
          </button>
        )}
        <button className="playButton">
          <BiSkipNext />
        </button>
      </div>
      <div
        style={{
          width: "90%",
        }}
      >
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {durationMin}:{durationSec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
