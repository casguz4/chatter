import { useEffect, useRef } from 'react';

import './App.css';
import { EVENT_NAME, type EventMessageReceived, Listener } from './Listener';
import reactLogo from './assets/react.svg';
import { useSignalRConnection } from './signalr';
import viteLogo from '/vite.svg';

function App() {
    const connection = useSignalRConnection('/hub', EVENT_NAME, (args) => {
        const { username, message } = args as EventMessageReceived;
        console.log('%cTHERE WAS A NOTIFICATION', 'color: hotpink;');
        const event = new CustomEvent(EVENT_NAME, {
            detail: {
                message,
                username,
            },
        });

        dispatchEvent(event);
    });
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!connection) return;
        setTimeout(() => {
            console.log('%cGOING TO RECONNECT NOW', 'color: red');
            connection.reconnect();
        }, 30_000 /* 30s */);
    }, [connection]);

    const handleSubmit = () => {
        if (!inputRef.current) return;

        connection
            .send(inputRef.current.value)
            .catch((err) => console.error(err));
    };

    return (
        <>
            <div>
                <img src={viteLogo} className='logo' alt='Vite logo' />
                <img src={reactLogo} className='logo react' alt='React logo' />
            </div>
            <h1>Vite + React</h1>
            <p>
                Using signalR for websocket connections and CustomEvents to send
                the message accross the window instead of in a store
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handleSubmit();
                }}
            >
                <label htmlFor='text'></label>
                <input ref={inputRef} name='text' id='text' />

                <button type='submit'>Send Message</button>
            </form>

            <Listener />
        </>
    );
}

export default App;
