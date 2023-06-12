import * as React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faCircleDown, faX } from "@fortawesome/free-solid-svg-icons";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";
import logoLaunchCode from "./Logo_LaunchCode.svg";

export default function DownloadDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="button is-ghost" onClick={handleClickOpen}>
        <FontAwesomeIcon icon={faCircleDown} className="icon is-normal"/>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img className="mt-4" src={logo125} width="112" height="28" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="has-text-centered">
              MovieDL web app is for entertainment & education purposes only, no
              films are actually available for download, nor is payment charged via the Stripe payment UI component.
            </div>
            <hr />
            <div className="has-text-centered is-italic">
              This web app was created and developed by students of the<br />
              <Link to="https://www.launchcode.org" target="_blank">LaunchCode</Link> LC101 "LiftOff" program, Q2 2023.
              <Link to="https://www.launchcode.org" target="_blank">
              <div className="has-text-centered">
              {logoLaunchCode && <img src={logoLaunchCode} style={{width: '200px'}}/>}
              </div>
              </Link>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div
            className="button is-light is-outlined mb-2 mr-2"
            onClick={handleClose}
            autoFocus
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
