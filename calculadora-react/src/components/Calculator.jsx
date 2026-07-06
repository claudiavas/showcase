import React, { useState, useCallback } from "react";

const Calculator = ({ classicHeader, darkTheme }) => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const inputDigit = useCallback(
    (digit) => {
      if (waitingForOperand) {
        setDisplay(String(digit));
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? String(digit) : display + digit);
      }
    },
    [display, waitingForOperand]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const handleOperator = useCallback(
    (nextOperator) => {
      const inputValue = parseFloat(display);

      if (prevValue !== null && !waitingForOperand) {
        const result = calculate(prevValue, inputValue, operator);
        const resultStr = formatResult(result);
        setDisplay(resultStr);
        setExpression(resultStr + " " + nextOperator);
        setPrevValue(result);
      } else {
        setExpression(display + " " + nextOperator);
        setPrevValue(inputValue);
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    },
    [display, prevValue, operator, waitingForOperand]
  );

  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : "Error";
      default: return b;
    }
  };

  const formatResult = (value) => {
    if (value === "Error") return "Error";
    const str = String(parseFloat(value.toFixed(10)));
    return str.length > 12 ? parseFloat(value.toPrecision(8)).toString() : str;
  };

  const handleEquals = useCallback(() => {
    if (operator === null || waitingForOperand) return;
    const inputValue = parseFloat(display);
    const result = calculate(prevValue, inputValue, operator);
    const resultStr = formatResult(result);
    setExpression(expression + " " + display + " =");
    setDisplay(resultStr);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, prevValue, operator, waitingForOperand, expression]);

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setWaitingForOperand(false);
    setOperator(null);
    setPrevValue(null);
  };

  const handleDelete = useCallback(() => {
    if (waitingForOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display, waitingForOperand]);

  const handleToggleSign = useCallback(() => {
    setDisplay(String(parseFloat(display) * -1));
  }, [display]);

  const handlePercent = useCallback(() => {
    setDisplay(String(parseFloat(display) / 100));
  }, [display]);

  const buttons = [
    { label: "AC", action: handleClear, type: "function" },
    { label: "+/-", action: handleToggleSign, type: "function" },
    { label: "%", action: handlePercent, type: "function" },
    { label: "÷", action: () => handleOperator("÷"), type: "operator" },
    { label: "7", action: () => inputDigit("7"), type: "digit" },
    { label: "8", action: () => inputDigit("8"), type: "digit" },
    { label: "9", action: () => inputDigit("9"), type: "digit" },
    { label: "×", action: () => handleOperator("×"), type: "operator" },
    { label: "4", action: () => inputDigit("4"), type: "digit" },
    { label: "5", action: () => inputDigit("5"), type: "digit" },
    { label: "6", action: () => inputDigit("6"), type: "digit" },
    { label: "-", action: () => handleOperator("-"), type: "operator" },
    { label: "1", action: () => inputDigit("1"), type: "digit" },
    { label: "2", action: () => inputDigit("2"), type: "digit" },
    { label: "3", action: () => inputDigit("3"), type: "digit" },
    { label: "+", action: () => handleOperator("+"), type: "operator" },
    { label: "DEL", action: handleDelete, type: "function" },
    { label: "0", action: () => inputDigit("0"), type: "digit" },
    { label: ".", action: inputDecimal, type: "digit" },
    { label: "=", action: handleEquals, type: "equals" },
  ];

  return (
    <section
      id="calculator"
      className={"section " + (darkTheme ? "bg-dark-1" : "")}
    >
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        <div className="position-relative d-flex text-center mb-5">
          <h2
            className={
              "text-24 text-uppercase fw-600 w-100 mb-0 " +
              (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")
            }
          >
            Calculator
          </h2>
          <p
            className={
              "text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " +
              (darkTheme ? "text-white" : "text-dark")
            }
          >
            Calculator
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className={"calc-wrapper rounded-4 overflow-hidden shadow-lg " + (darkTheme ? "calc-dark" : "calc-light")}>
              {/* Display */}
              <div className="calc-display p-3 text-end">
                <div className="calc-expression text-muted small text-truncate" style={{ minHeight: "1.2em" }}>
                  {expression || " "}
                </div>
                <div
                  className="calc-result fw-light"
                  style={{
                    fontSize: display.length > 9 ? "1.8rem" : "2.8rem",
                    lineHeight: 1.1,
                  }}
                >
                  {display}
                </div>
              </div>

              {/* Buttons */}
              <div className="calc-buttons p-2">
                {buttons.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className={
                      "calc-btn " +
                      (btn.type === "operator" ? "calc-btn-operator " : "") +
                      (btn.type === "equals" ? "calc-btn-equals " : "") +
                      (btn.type === "function" ? "calc-btn-function " : "") +
                      (btn.type === "digit" ? "calc-btn-digit " : "")
                    }
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
