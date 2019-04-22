package net.mcbbs.client.socketserver;

public enum CommandDirection {
    RESPONSE("<-"), REQUEST("->");

    private final String direction;

    CommandDirection(String s) {
        direction = s;
    }

    public String getDirection() {
        return direction;
    }

    public CommandDirection reverse() {
        if (this == RESPONSE) return REQUEST;
        else return RESPONSE;
    }
}