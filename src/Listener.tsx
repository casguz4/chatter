import { useState } from 'react';

import { makeUseSignalRListenerHook } from './signalr';

export const EVENT_NAME = 'notification';
export interface EventMessageReceived {
    username: number;
    message: string;
}
const useSignalRListener = makeUseSignalRListenerHook(EVENT_NAME);
export const Listener = () => {
    const [count, setCount] = useState(0);
    useSignalRListener((event: Event) => {
        const {
            detail: { username, message },
        } = event as CustomEvent<EventMessageReceived>;
        console.group('LISTENING');
        console.log('USERNAME: ', username);
        console.log('MESSAGE: ', message);
        console.groupEnd();
        setCount((prev) => prev + 1);
    });
    return (
        <div className='card'>
            how many messages have come in through signalR: {count}
        </div>
    );
};
