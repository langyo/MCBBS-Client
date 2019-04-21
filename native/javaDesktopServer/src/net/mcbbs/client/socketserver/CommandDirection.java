package net.mcbbs.client.socketserver;

public enum CommandDirection
{
    RESPONSE("<-"), REQUEST("->");

    CommandDirection(String s) {
        direction=s;
    }
    private final String direction;

    public String getDirection() {
        return direction;
    }

    public CommandDirection reverse()
    {
        if(this == RESPONSE) return REQUEST;
        else return RESPONSE;
    }
}