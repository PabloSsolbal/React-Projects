/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DrumMenu, DrumMenuBtn } from "./DrumMenu";
import data from "./Sounds.json";

const Pad = ({ sound, type, LumineBg }) => {
  const handleSound = () => {
    new Audio(`/${sound}`).play();
  };

  return (
    <>
      <button
        onClick={() => {
          handleSound(), LumineBg(type);
        }}
        className={type}
      ></button>
    </>
  );
};

const DrumPad = ({ soundList, type, LumineBg }) => {
  return (
    <div className="PadLine">
      {soundList.map((sound, index) => (
        <Pad key={index} sound={sound} type={type} LumineBg={LumineBg} />
      ))}
    </div>
  );
};

export const DrumApp = () => {
  const [drums, setDrums] = useState(data[0].drums);
  const [guitars, setGuitars] = useState(data[0].guitar);
  const [pianos, setPianos] = useState(data[0].piano);
  const [synths, setSynths] = useState(data[0].synth);

  const [isDisplayed, setIsDisplayed] = useState(false);

  const [types, setTypes] = useState(["Drums", "Guitars", "Pianos", "Synths"]);

  const [isLumine, setIsLumine] = useState(false);

  const preLoadSounds = (sounds) => {
    sounds.forEach((sound) => {
      try {
        const audio = new Audio(`/${sound}`);
        console.log(audio);
        audio.preload = "auto";
        audio.load();
      } catch (e) {
        console.log(e);
      }
    });
  };

  const LuminePad = (padType) => {
    setTimeout(() => {
      padType.forEach((pad) => {
        pad.classList.add("lumine");
        setTimeout(() => {
          pad.classList.remove("lumine");
        }, 1500);
      });
    }, 500);
  };

  const LumineBg = (type) => {
    const bg = document.querySelector("body");
    bg.classList.add(type);
    setTimeout(() => {
      bg.classList.remove(type);
    }, 500);
  };

  useEffect(() => {
    preLoadSounds([
      ...data[0].drums,
      ...data[0].guitar,
      ...data[0].piano,
      ...data[0].synth,
      ...data[1].drums,
      ...data[1].guitar,
      ...data[1].piano,
      ...data[1].synth,
      ...data[2].drums,
      ...data[2].guitar,
      ...data[2].piano,
      ...data[2].synth,
      ...data[3].drums,
      ...data[3].guitar,
      ...data[3].piano,
      ...data[3].synth,
    ]);
  }, []);

  return (
    <>
      <p>Hybrid Sounds</p>
      <DrumMenuBtn isDisplayed={isDisplayed} setIsDisplayed={setIsDisplayed} />
      {isDisplayed && (
        <DrumMenu
          setDrums={setDrums}
          setGuitars={setGuitars}
          setPianos={setPianos}
          setSynths={setSynths}
          types={types}
          setIsDisplayed={setIsDisplayed}
          setIsLumine={setIsLumine}
          LuminePad={LuminePad}
        />
      )}
      <div className="Container">
        <div></div>
        <div className="PadContainer">
          {drums && guitars && pianos && synths ? (
            <>
              <DrumPad soundList={drums} type={types[0]} LumineBg={LumineBg} />
              <DrumPad
                soundList={guitars}
                type={types[1]}
                LumineBg={LumineBg}
              />
              <DrumPad soundList={pianos} type={types[2]} LumineBg={LumineBg} />
              <DrumPad soundList={synths} type={types[3]} LumineBg={LumineBg} />
            </>
          ) : (
            "No sounds"
          )}
        </div>
      </div>
    </>
  );
};
