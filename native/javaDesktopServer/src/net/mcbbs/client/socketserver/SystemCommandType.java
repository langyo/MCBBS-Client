package net.mcbbs.client.socketserver;

public enum SystemCommandType {
    CALL("call"),
    RECEIVE("receive"),
    EXIT("exit");

    SystemCommandType(String typ) {
        type=typ;
    }

    public String getType() {
        return type;
    }

    private final String type;
}