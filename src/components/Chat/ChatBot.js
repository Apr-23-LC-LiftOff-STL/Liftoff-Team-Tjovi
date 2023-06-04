import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";


function ChatBot() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8080/bot/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (response.ok) {
            const data = await response.json();
            const message = data.choices[0].text;
            setResponse(message);
        } else {
            setResponse("Error occurred while communicating with server.");
        }

        setUserInput('');
    };

    const inputStyleHandler = {
        color: 'black',
        width: '100%',
        pointerEvents: 'auto',
    };

    return (
        <div>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="chat-item">
                    <div className="control">
                    <span className="icon is-small is-left">
          </span>
                        <input
                            className="input has-background-white-ter"
                            type="text" 
                            placeholder="Example: What are some movies like 'The Hudsucker Proxy'?"
                            value={userInput} 
                            onChange={handleInputChange}
                            style={inputStyleHandler}
                        />
                    </div>
                    <button className="button is-link is-light" type="submit" style={{marginTop: '10px'}}><span>Submit &nbsp;</span><span><FontAwesomeIcon icon={faRobot} />
                    </span></button>
                <br></br>
                </div>

            </form>
            {response && <div className="box is-shadowless is-italic">{response}</div>}
        </div>
        </div>
    );
    }
export default ChatBot;
