import React from 'react';
import { RiLinkedinFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import './Footer.scss';

import logo from '../../assets/icons/quick-penny-icon.png';
export const Footer = () => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(`/${path}`);
  };
  return (
    <>
      <div className="footer">
        <div className="footer__container">
          <div className="flex-row space-between">
            <img
              src={logo}
              alt="QuickPenny"
              className="footer__logo cursor-pointer"
              height="47"
              onClick={() => routeChange('/login')}
            />
            <a
              href="https://www.linkedin.com/company/quickpenny/about/"
              target="_blank"
              rel="noreferrer"
            >
              <RiLinkedinFill size={22} color="white" />
            </a>
          </div>

          <div>
            <div className="flex-row mt-2" aria-label="Navigation Menu">
              <div role="none">
                <a
                  href="https://www.quickpenny.com/cookies"
                  role="menuitem"
                  target="_self"
                  className="color-white"
                >
                  Cookie Policy
                </a>
              </div>
              <div role="none">
                <a
                  href="https://www.quickpenny.com/privacy"
                  role="menuitem"
                  target="_self"
                  className="color-white"
                >
                  Privacy Policy
                </a>
              </div>
              <div role="none">
                <a
                  href="https://www.quickpenny.com/terms"
                  role="menuitem"
                  target="_self"
                  className="color-white"
                >
                  Terms
                </a>
              </div>
              <div role="none">
                <a
                  href="https://www.quickpenny.com/msa"
                  role="menuitem"
                  target="_self"
                  className="color-white"
                >
                  Services Agreement
                </a>
              </div>
            </div>
            <div className="color-white mt-3">
              © 2022 QuickPenny LLC. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
