import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import { API_URL } from '../utils/api_constants';

const socket = io(API_URL);

interface ISocketProps {
    handleSyncObjectPosition: (value: string) => void;   
}

export function useSocket({ handleSyncObjectPosition }: ISocketProps) {

    const [isConnected, setIsConnected] = useState<boolean>(false)
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onSyncObjectPosition(value: string) {
            handleSyncObjectPosition(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('position', onSyncObjectPosition);
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('position', onSyncObjectPosition);
        }
    }, []);

    return { isConnected };
}