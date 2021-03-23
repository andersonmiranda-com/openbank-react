import React from "react";
import { useTranslation } from "react-i18next";

import OpenbankLogo from "../../assets/img/logo_openbank.png";
import "./index.scss";

function Header(props) {
  const { t, i18n } = useTranslation();
  const setLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={OpenbankLogo} alt="logo" />
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={setLanguage("en")}>
                  EN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={setLanguage("es")}>
                  ES
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
