import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
        <div style={{width: '100%'}}>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="chat-item">
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-rounded has-background-white-ter"
                            type="text" 
                            placeholder="What are some movies like...?"
                            value={userInput} 
                            onChange={handleInputChange}
                            style={inputStyleHandler}
                        />
                    </div>
                </div>
                <button type="submit" style={{marginTop: '10px'}}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
            {response && <div>{response}</div>}
        </div>
    );
    }
export default ChatBot;
