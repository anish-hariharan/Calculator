import { useState } from "react";
import "./Calculator.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from '@mui/icons-material/Clear';

const Calculator = () => {
  const [operand, setOperand] = useState("");
  const [result, setResult] = useState("0");
  const [firstNumber, setFirstNumber] = useState("");
  const [maxLen, setMaxLen] = useState(false);
  const [isAssigned, setAssigned] = useState(false);

  const operations = {
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div",
  };

  console.log(firstNumber)
  console.log(result)

  const handleNumber = (e) => {

    if (isAssigned) {
      handleClear();
      setFirstNumber(e);
      setAssigned(false);
      return;
    }

    if (firstNumber.length >= 15) {
      setMaxLen(true);
      return;
    }

    setMaxLen(false);
    setFirstNumber(firstNumber + e);
  };

  const handleDot = () => {
    const hasDot = firstNumber.indexOf(".") >= 0;

    if (!hasDot) {
      setFirstNumber(firstNumber + ".");
      return;
    }
  };

  const handleCalculation = (operation) => {
    if (!firstNumber) {
      return;
    }

    const calculation = {
      add: Number(firstNumber) + Number(result),
      sub: Number(result) - Number(firstNumber),
      mul: Number(result) * Number(firstNumber),
      div: Number(result) / Number(firstNumber),
    };

    result === "0" ? setResult(firstNumber) : setResult(calculation[operation]);
    setFirstNumber("");
  };

  const handleOperator = (event) => {
    setMaxLen(false);

    if (operand !== event && !!firstNumber) {
      handleCalculation(operations[operand]);
      setOperand(event);
      return;
    }

    setOperand(event);

    handleCalculation(operations[event]);
  };

  const handleAssign = () => {
    setAssigned(true);
    handleCalculation(operations[operand]);
  };

  const handleClear = () => {
    setFirstNumber("");
    setResult("0");
    setOperand("");
    setMaxLen(false);
  };

  const handleBackSpace = () => {
    if (firstNumber.length) {
      setFirstNumber(firstNumber.slice(0, firstNumber.length - 1));
      return;
    }

    return;
  };

  return (
    <>
      <div className="parentContainer">
        <div className="calculatorContainer">
          <div className="inputContainer">
            <p className="text">{firstNumber === "" ? "0" : firstNumber}</p>
            <p className="text">{result}</p>
            <div className="clearOptionsContainer">
              <button onClick={handleClear} className="clearBtn"><ClearIcon/></button>
              <button onClick={handleBackSpace} className="clearBtn">
                <KeyboardBackspaceIcon />
              </button>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="btn"
              onClick={() => handleNumber("1")}
              disabled={maxLen}
            >
              1
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("2")}
              disabled={maxLen}
            >
              2
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("3")}
              disabled={maxLen}
            >
              3
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("4")}
              disabled={maxLen}
            >
              4
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("5")}
              disabled={maxLen}
            >
              5
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("6")}
              disabled={maxLen}
            >
              6
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("7")}
              disabled={maxLen}
            >
              7
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("8")}
              disabled={maxLen}
            >
              8
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("9")}
              disabled={maxLen}
            >
              9
            </button>
            <button
              className="btn"
              onClick={() => handleNumber("0")}
              disabled={maxLen}
            >
              0
            </button>
            <button className="btn" onClick={handleDot} disabled={maxLen}>
              .
            </button>
            <button className="btn" onClick={() => handleOperator("+")}>
              +
            </button>
            <button className="btn" onClick={() => handleOperator("-")}>
              -
            </button>
            <button className="btn" onClick={() => handleOperator("*")}>
              x
            </button>
            <button className="btn" onClick={() => handleOperator("/")}>
              %
            </button>
            <button className="btn" onClick={handleAssign}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
