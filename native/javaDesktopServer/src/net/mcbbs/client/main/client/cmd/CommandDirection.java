package net.mcbbs.client.main.client.cmd;

public enum CommandDirection {
    /**
     * RESPONSE
     */
    RESPONSE("<-"),
    /**
     * REQUEST
     */
    REQUEST("->");

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