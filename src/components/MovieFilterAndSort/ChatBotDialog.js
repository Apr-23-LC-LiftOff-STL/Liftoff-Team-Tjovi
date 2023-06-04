import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo125 from "../../components/Logo_MovieDL_20230426_125x22.png";

import ChatBot from '../Chat/ChatBot';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="button is-link is-light" onClick={handleClickOpen}>
      AI Assistant &nbsp; <FontAwesomeIcon icon={faRobot} />
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth
  maxWidth="md">
        <DialogTitle><img src={logo125}></img></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask Chat GPT movie questions here!
          </DialogContentText>
<ChatBot />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
{/*           <Button type="submit">Submit</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}