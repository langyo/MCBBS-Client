package net.mcbbs.client.socketserver;

public enum CommandDirection {
    TO_LEFT("<-"), TO_RIGHT("->");

    public CommandDirection reverse() {
        if (this == TO_LEFT) return TO_RIGHT;
        else return TO_LEFT;
    }
}