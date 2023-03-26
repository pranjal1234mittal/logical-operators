import React, { useState } from "react";

function SelectOption() {
  const [inputs, setInputs] = useState([{ arg: "My Arg", value: true }]);
  const [operator, setOperator] = useState("select...");
  const [andInputs, setAndInputs] = useState([]);
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [TwoOrInputFields, setTwoOrInputFields] = useState("");

  const handleInputChange = (index, event) => {
    const values = [...inputs];
    values[index].arg = event.target.value;
    setInputs(values);
  };

  const handleSelectChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value === "true";
    setInputs(values);
  };

  const handleAddClick = () => {
    const values = [...inputs];
    values.push({ arg: "My Arg", value: true });
    setInputs(values);
  };

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
    if (event.target.value === "and") {
      setAndInputs([
        { arg: "My Arg", type: "constant" },
        { arg: "My Arg", type: "argument" }
      ]);
    } else {
      setAndInputs([]);
    }

    if (event.target.value === "constant") {
      setShowSecondSelect(true);
    } else {
      setShowSecondSelect(false);
    }
  };

  const handleAndInputChange = (index, event) => {
    const values = [...andInputs];
    values[index].arg = event.target.value;
    setAndInputs(values);
  };

  const handleAndSelectChange = (index, event) => {
    const values = [...andInputs];
    values[index].type = event.target.value;
    setAndInputs(values);
  };

  const inputDelete = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(inputs.length - 1, 1);
    setInputs(newInputs);
  };

  const getAndResult = () => {
    const constants = andInputs.filter((input) => input.type === "constant");
    const argument = andInputs.find((input) => input.type === "argument");
    if (
      constants.every((constant) => constant.arg === "true") &&
      argument &&
      inputs.some((input) => input.arg === argument.arg && input.value)
    ) {
      return "Result: True";
    } else {
      return "Result: False";
    }
  };

  const getOrResult = () => {
    if (inputs.every((input) => !input.value)) {
      return "Result: True";
    } else {
      return "Result: False";
    }
  };

  function twoOrInputs(event) {
    return setTwoOrInputFields(event.target.value);
  }

  function list() {
    setOperator("select...");
    setTwoOrInputFields("");
  }

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index}>
          <input
            type="text"
            value={input.arg}
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            value={input.value ? "true" : "false"}
            onChange={(event) => handleSelectChange(index, event)}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      ))}
      <button onClick={handleAddClick}>Add</button>
      <button onClick={(index) => inputDelete(index)}>Delete</button>
      <div>
        {showSecondSelect ? (
          <select
            onChange={(event) => handleSelectChange(0, event)}
            value={inputs[0].value ? "true" : "false"}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        ) : (
          <select
            value={operator}
            onChange={(event) => {
              handleOperatorChange(event);
              twoOrInputs(event);
            }}
          >
            <option value="select...">select...</option>
            <option value="constant">constant</option>
            <option value="argument">argument</option>
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
        )}
        <button
          value="select..."
          onClick={(event) => {
            list();
            {
              handleOperatorChange(event);
            }
          }}
        >
          {" "}
          X{" "}
        </button>
        {TwoOrInputFields === "or" && (
          <div>
            <input type="text" />
            <br />
            <input type="text" />
          </div>
        )}
        {operator === "and" && (
          <>
            {andInputs.map((input, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={input.arg}
                  onChange={(event) => handleAndInputChange(index, event)}
                />
                <select
                  value={input.type}
                  onChange={(event) => handleAndSelectChange(index, event)}
                >
                  <option value="constant">True</option>
                  <option value="argument">False</option>
                </select>
              </div>
            ))}
            <div>{getAndResult()}</div>
          </>
        )}
        {operator === "select..." && <div>{getOrResult()}</div>}
        {operator === "argument" && <div>{getOrResult()}</div>}
        {operator === "or" && <div>{getOrResult()}</div>}
        {operator === "constant" && <div>{getOrResult()}</div>}
      </div>
    </div>
  );
}

export default SelectOption;
