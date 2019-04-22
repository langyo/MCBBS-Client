package net.mcbbs.client.socketserver;

public enum SystemCommandType {
    CALL("call"),
    RECEIVE("receive"),
    EXIT("exit");

    private final String type;

    SystemCommandType(String typ) {
        type = typ;
    }

    public String getType() {
        return type;
    }
}