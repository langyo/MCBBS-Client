package net.mcbbs.client.api.plugin.event.net;

public abstract class SocketEvent extends NetEvent {
    public abstract String data();
    public static class Receive extends NetEvent {
        @Override
        public Object source() {
            return null;
        }

        @Override
        public String data() {
            return null;
        }
    }
}
