import { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000');

interface ISocketProps {
    handleConnect: () => void;
    handleDisconnect: () => void;
    handleSyncObjectPosition: (value: string) => void;   
}

export function useSocket({ handleConnect, handleDisconnect, handleSyncObjectPosition }: ISocketProps) {

    const [isConnected, setIsConnected] = useState<boolean>(false)
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            handleConnect();
        }

        function onDisconnect() {
            setIsConnected(false);
            handleDisconnect();
        }

        function onSyncObjectPosition(value: string) {
            handleSyncObjectPosition(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('syncObjectPosition', onSyncObjectPosition);
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('syncObjectPosition', onSyncObjectPosition);
        }
    }, []);

    return { isConnected };
}