import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo125 from "./Logo_MovieDL_20230426_125x22.png";

import ChatBot from "../Chat/ChatBot";

export default function FormDialog() {
  const [openChatBot, setOpenChatBot] = useState(false);

  const handleClickOpenChatBot = () => {
    setOpenChatBot(true);
  };

  const handleCloseChatBot = () => {
    setOpenChatBot(false);
  };

  return (
    <div>
      <div
        className="button is-link is-light is-small"
        onClick={handleClickOpenChatBot}
      >
        AI Assistant &nbsp; <FontAwesomeIcon icon={faRobot} />
      </div>
      <Dialog
        open={openChatBot}
        onClose={handleCloseChatBot}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <img src={logo125}></img>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask Chat GPT movie questions here!
          </DialogContentText>
          <ChatBot />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChatBot}>Cancel</Button>
          {/*           <Button type="submit">Submit</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
