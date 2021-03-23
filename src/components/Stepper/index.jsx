import React from "react";

function Stepper(props) {
  const steps = [1, 2, 3];
  return (
    <div className="steps">
      <ul>
        {steps.map((s) => (
          <li className={s <= parseInt(props.step) + 1 ? "done" : ""} key={s}>
            <span className="number">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
