import { send, register, receive, connectionEvents } from "./webSocketServer";

connectionEvents.on('h5', () => {
    register('h5', {
        test: {
            test: () => "hello!"
        }
    })
});