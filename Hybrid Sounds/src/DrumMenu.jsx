/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import data from "./Sounds.json";

export const DrumMenuBtn = ({ isDisplayed, setIsDisplayed }) => {
  const handleClick = () => {
    setIsDisplayed(!isDisplayed);
  };
  return (
    <button className="InstrumentsToggler" onClick={() => handleClick()}>
      {isDisplayed ? "Hidde Instruments" : "Show Instruments"}
    </button>
  );
};

const MenuCard_SetBtn = ({ type, handleSet, number }) => {
  return (
    <button onClick={() => handleSet(parseInt(number - 1), type)}>
      {number}
    </button>
  );
};

const MenuCard = ({ type, handleSet }) => {
  const [setNumbers, setSetNumbers] = useState([1, 2, 3, 4]);
  return (
    <div className={["MenuCard", type].join(" ")}>
      {type}
      <img src={`/images/${type}.png`} />
      <div className="MenuCardBtnsContainer">
        {setNumbers &&
          setNumbers.map((setNumber, index) => (
            <MenuCard_SetBtn
              handleSet={handleSet}
              type={type}
              key={index}
              number={setNumber}
            />
          ))}
      </div>
    </div>
  );
};

export const DrumMenu = ({
  setDrums,
  setGuitars,
  setPianos,
  setSynths,
  types,
  setIsDisplayed,
  setIsLumine,
  LuminePad,
}) => {
  const handleSet = (setNumber, type) => {
    setTimeout(() => {
      setIsDisplayed(false);
    }, 500);
    if (type === "Drums") {
      setDrums(data[setNumber].drums);
      LuminePad(document.querySelectorAll("button.Drums"));
    } else if (type === "Guitars") {
      setGuitars(data[setNumber].guitar);
      LuminePad(document.querySelectorAll("button.Guitars"));
    } else if (type === "Pianos") {
      setPianos(data[setNumber].piano);
      LuminePad(document.querySelectorAll("button.Pianos"));
    } else if (type === "Synths") {
      setSynths(data[setNumber].synth);
      LuminePad(document.querySelectorAll("button.Synths"));
    }
  };

  return (
    <div className="InstrumentsContainer">
      <MenuCard type={types[0]} handleSet={handleSet} />
      <MenuCard type={types[1]} handleSet={handleSet} />
      <MenuCard type={types[2]} handleSet={handleSet} />
      <MenuCard type={types[3]} handleSet={handleSet} />
    </div>
  );
};
