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
      <img src={`public/images/${type}.png`} />
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
}) => {
  const handleSet = (setNumber, type) => {
    if (type === "Drums") {
      setDrums(data[setNumber].drums);
    } else if (type === "Guitars") {
      setGuitars(data[setNumber].guitar);
    } else if (type === "Pianos") {
      setPianos(data[setNumber].piano);
    } else if (type === "Synths") {
      setSynths(data[setNumber].synth);
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
