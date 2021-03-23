import React, { useState } from "react";

import "./index.scss";
import Stepper from "../Stepper";

function WizardForm(props) {
  const [step, setStep] = useState(0);
  const [password1, setpassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [tip, setTip] = useState("");

  const previousStep = () => {
    const newStep = step - 1;
    if (newStep >= 0) setStep(newStep);
  };

  const nextStep = () => {
    const newStep = step + 1;
    if (newStep < 3) setStep(newStep);
  };

  const step1 = (
    <section>
      <h2 className="section-heading">Create your password </h2>
      <p>In the next step you will be asked to create your password</p>
    </section>
  );

  const step2 = (
    <section>
      <h2 className="section-heading">Enter your password</h2>
      <div className="form-group">
        <label for="password1" className="sr-only">
          Password
        </label>
        <input
          type="password"
          name="password1"
          id="password1"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <label for="password2" className="sr-only">
          Confirm password
        </label>
        <input
          type="password"
          name="password2"
          id="password2"
          className="form-control"
          placeholder="Confirm password"
        />
      </div>
      <div className="form-group">
        <label for="phoneNumber" className="sr-only">
          Phone Number
        </label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          className="form-control"
          placeholder="Phone Number"
        />
      </div>
    </section>
  );

  const step3 = (
    <section>
      <h2 className="section-heading">Congratulations!</h2>
      <p>Your password was created with success</p>
    </section>
  );

  const steps = [step1, step2, step3];

  return (
    <div className="wizard">
      <div className="content">
        <Stepper step={step} />
        {steps[step]}

        <div className="row mt-5">
          <div className="col-sm">
            <button
              className="btn btn-secondary mr-2"
              onClick={previousStep}
              disabled={step === 0}
            >
              Previous
            </button>
          </div>

          <div className="col-sm">
            <button
              className="btn btn-secondary float-right"
              onClick={nextStep}
              disabled={step === 2}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WizardForm;
