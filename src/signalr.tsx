import * as signalR from '@microsoft/signalr';
import { useEffect, useMemo, useState } from 'react';

import type { EventMessageReceived } from './Listener';

export const makeUseSignalRListenerHook = (name: string) => {
    return function useSignalRListener(listener: EventListener) {
        useEffect(() => {
            if (!name || !listener) return;

            window.addEventListener(name, listener);

            return () => {
                window.removeEventListener(name, listener);
            };
        }, [listener]);
    };
};
const makeSignalRConnection = (hub: string) => {
    return new signalR.HubConnectionBuilder()
        .withUrl(hub, {
            transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
};
export const useSignalRConnection = (
    hub: string,
    eventName: string,
    onEvent: (event: EventMessageReceived) => void,
) => {
    const [connection, setConnection] = useState(() =>
        makeSignalRConnection(hub),
    );
    useEffect(() => {
        if (!connection) return;

        connection.on(eventName, onEvent);

        connection
            .start()
            .then(() => {
                console.log('Connected to SignalR Hub: ', hub);
            })
            .catch((err) => {
                console.group('SignalR Error');
                console.error(
                    'There was an error trying to connect to SignalR Hub: ',
                    hub,
                );
                console.error('ERROR: ', err);
                console.groupEnd();
            });
    }, [connection, eventName, onEvent, hub]);

    return useMemo(
        () => ({
            connection,
            reconnect: () => {
                connection
                    .stop()
                    .then(() => {
                        setConnection(() => makeSignalRConnection(hub));
                    })
                    .catch((err) => console.error(err));
            },
            send: async (message: string) => {
                try {
                    await connection.send('ping', message);
                    return true;
                } catch (err) {
                    console.error('There was an error: ', err);
                    return false;
                }
            },
        }),
        [connection, hub],
    );
};
