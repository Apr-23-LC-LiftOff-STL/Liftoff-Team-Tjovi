import React, { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";

import { Fade } from "@mui/material";

function ChatBot({ handleCloseChatBot }) {
  const data = useActionData();

  const [userInput, setUserInput] = useState("");
  const [lastUserInput, setLastUserInput] = useState("");
  const [chatReply, setChatReply] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userInput.length < 10) {
      setLastUserInput("");
      setErrorMessage("Query must be over 10 characters long.");
      return;
    }

    setErrorMessage("");
    setLastUserInput(userInput);

    const response = await fetch("http://localhost:8080/bot/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (response.ok) {
      const data = await response.json();
      const message = data.choices[0].text;
      setChatReply(message);
    } else {
      setChatReply("Error occurred while communicating with server.");
    }

    setUserInput("");
  };

  const inputStyleHandler = {
    color: "black",
    width: "100%",
    pointerEvents: "auto",
  };

  const chatSampleQs = [
    "Example: What are some movies like 'The Hudsucker Proxy'?",
    "Example: How many Oscars did 'Parasite' win?",
    "Example: Who directed 'Braveheart'?",
    "Example: Where was 'The Motorcycle Diaries' filmed?",
    "Example: How many 'Spiderman' films have been released in total?",
    "Example: What year was 'Crouching Tiger, Hidden Dragon' released?",
    "Example: In what film was the line 'You're the man now, dog'?",
    "Example: Is 'Fargo' actually based on a true story?",
    "Example: What language are the actors actually speaking in 'RRR'?",
    "Example: What kind of motorcycle did Steve McQueen ride in 'The Great Escape'?",
    "Example: I love the movie 'Big Night' - please recommend some similar movies.",
    "Example: What is the run time of 'Akira'?",
    "Example: Has Björk been in any movies other than 'Dancer In The Dark'?",
    "Example: What was director Spike Lee's first feature film?",
  ];

  const [randomSampleQ, setRandomSampleQ] = useState(
    chatSampleQs[Math.floor(Math.random() * chatSampleQs.length)]
  );

  console.log(chatReply);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div class="field has-addons mx-4">
          <div className="control is-expanded">
            <input
              className="input has-background-white-ter"
              type="text"
              name="query"
              placeholder={randomSampleQ}
              value={userInput}
              onChange={handleInputChange}
              style={inputStyleHandler}
            />
          </div>
          <div className="control">
            <div className="button is-info" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faRobot} />
            </div>
          </div>
        </div>
      </Form>
      <div className="has-text-weight-semibold mx-4 pt-4">Your Question:</div>
      <div className="is-italic has-text-info mx-4">{lastUserInput}</div>

      <div className="is-italic has-text-danger mx-4 mb-2">
        {errorMessage && (
          <Fade in timeout={500}>
            <p>{errorMessage}</p>
          </Fade>
        )}
      </div>

      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="has-text-weight-semibold mx-4 mb-2">
          Response:{" "}
        </div>
{/*         <div
            className="button is-info is-light is-outlined is-small mx-4"
            onClick={() =>
              navigator.clipboard.writeText(chatReply)
            }
          >
            Copy
          </div> */}
      </div>
      {chatReply === "Error occurred while communicating with server." && (
        <div className="is-italic has-text-danger mx-4">{chatReply}</div>
      )}
      {chatReply !== "Error occurred while communicating with server." && (
        <div className="is-italic has-text-info mx-4">{chatReply}</div>
      )}
    </div>
  );
}
export default ChatBot;
