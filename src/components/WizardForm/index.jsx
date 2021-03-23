import React, { useState } from "react";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsExclamationDiamond } from "react-icons/bs";

import "./index.scss";
import Stepper from "../Stepper";
import { submitForm } from "../../services/api";

function WizardForm(props) {
  //state variables
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [formdata, setFormData] = useState({
    pass: "",
    repass: "",
    hint: "",
  });
  const [formSending, setFormSending] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  //password pattern
  const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/;

  // ------------------------------------------------------
  // form handling functions

  const handleInputChange = (event) => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });

    //remove form error for this field
    const errors = formErrors.filter((e) => e !== event.target.name);
    setFormErrors(errors);
  };

  const toggleConsent = () => {
    setConsent(!consent);
  };

  const previousStep = () => {
    const newStep = step - 1;
    if (newStep >= 0) setStep(newStep);
  };

  const nextStep = () => {
    const newStep = step + 1;
    if (newStep < 3) setStep(newStep);
  };

  const restart = () => {
    setConsent(false);
    setStep(0);
  };

  // ------------------------------------------------------
  // form validation functions

  const checkPassword = async () => {
    //validate fields

    const { pass, repass, hint } = formdata;
    const errors = [];
    if (!passPattern.test(pass) || pass.length === 0) errors.push("pass");
    if (repass !== pass) errors.push("repass");
    if (hint.length > 255) errors.push("hint");
    setFormErrors(errors);

    if (errors.length === 0) {
      //submit data, call backend
      try {
        setFormSending(true);
        const result = await submitForm(pass, repass, hint);
        setFormSending(false);
        result.status === 200 ? setFormSuccess(true) : setFormSuccess(false);
      } catch (e) {
        setFormSending(false);
        setFormSuccess(false);
      }
      const newStep = step + 1;
      setStep(newStep);
    }
  };

  const formHasError = (key) => {
    return formErrors.indexOf(key) !== -1;
  };

  // Steps components

  const step1 = (
    <section>
      <h2 className="section-heading">Welcome!</h2>
      <p>
        Thank you for choosing <strong>"Cuenta Corriente OpenClose"</strong>.
      </p>

      <p>
        In the next steps we will you provide some information and you will be
        ask the set up your password.
      </p>
      <br />
      <div className="form-check mt-5">
        <input
          type="checkbox"
          className="form-check-input"
          id="consent"
          name="consent"
          defaultChecked={consent}
          onChange={toggleConsent}
        />

        <label for="consent" className="form-check-label text-small">
          <small>
            I am of legal age and I accept that my data be treated according to
            the data <a href="#">privacy policy</a>.
          </small>
        </label>
      </div>

      <div className="row mt-2">
        <div className="col-sm"></div>

        <div className="col-sm">
          <button
            className="btn btn-secondary float-right"
            onClick={nextStep}
            disabled={!consent}
          >
            Next <BsChevronRight />
          </button>
        </div>
      </div>
    </section>
  );

  const step2 = (
    <section>
      <h2 className="section-heading">Password setup</h2>

      <p>
        First, you need setup your password: <br />
        <small>
          (It must cointains from 8 to 24 characters and at least 1 capital
          letter and 1 number ask the set up your password)
        </small>
      </p>
      <form>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label for="pass" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="pass"
              id="pass"
              required
              className={
                formHasError("pass")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="Password"
              onChange={handleInputChange}
            />
            <small className={formHasError("pass") ? "text-danger" : "d-none"}>
              Invalid password
            </small>
          </div>
          <div className="col-md-6">
            <label for="repass" className="sr-only">
              Confirm password
            </label>
            <input
              type="password"
              name="repass"
              id="repass"
              required
              className={
                formHasError("repass")
                  ? "form-control is-invalid"
                  : "form-control"
              }
              placeholder="Confirm password"
              onChange={handleInputChange}
            />
            <small
              className={formHasError("repass") ? "text-danger" : "d-none"}
            >
              Passwords does not match
            </small>
          </div>{" "}
        </div>

        <p>You can also create a hint to help you remember your password:</p>

        <div className="form-group">
          <label for="phoneNumber" className="sr-only">
            Hint
          </label>
          <input
            type="text"
            name="hint"
            id="hint"
            required
            className={
              formHasError("hint") ? "form-control is-invalid" : "form-control"
            }
            placeholder="Hint"
            onChange={handleInputChange}
          />
          <small className={formHasError("hint") ? "text-danger" : "d-none"}>
            Hint too long
          </small>
        </div>
      </form>

      <div className="row mt-5">
        <div className="col-sm">
          <button className="btn btn-light float-left" onClick={previousStep}>
            <BsChevronLeft />
            Previous
          </button>
        </div>

        <div className="col-sm">
          <button
            className="btn btn-secondary float-right"
            onClick={checkPassword}
            disabled={formSending}
          >
            {formSending ? (
              <div
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></div>
            ) : (
              ""
            )}
            Next <BsChevronRight />
          </button>
        </div>
      </div>
    </section>
  );

  const step3 = (
    <section>
      {formSuccess ? (
        <div>
          <h2 className="section-heading">
            <BsCheckCircle className="successIcon" /> Congratulations!
          </h2>
          <p>Your password was saved successfully.</p>
          <p>You can start to use your account now.</p>{" "}
          <div className="row mt-5">
            <div className="col-sm">
              <button className="btn btn-light float-left" onClick={restart}>
                <BsChevronLeft />
                Restart
              </button>
            </div>
            <div className="col-sm">
              <button className="btn btn-secondary float-right">
                Access my account
                <BsChevronRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="section-heading">
            <BsExclamationDiamond className="errorIcon" /> An error was occurred
            :(
          </h2>
          <p>Was not possible save your password. Please try agian later.</p>
          <div className="row mt-5">
            <div className="col-sm">
              <button
                className="btn btn-secondary float-left"
                onClick={restart}
              >
                <BsChevronLeft />
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  const steps = [step1, step2, step3];

  return (
    <div className="wizard">
      <div className="content">
        <Stepper step={step} />
        {steps[step]}
      </div>
    </div>
  );
}

export default WizardForm;
