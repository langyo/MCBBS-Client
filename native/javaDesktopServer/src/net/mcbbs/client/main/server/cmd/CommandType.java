package net.mcbbs.client.main.server.cmd;

public enum CommandType {
    EXECUTE("execute"),
    DATA("data"),
    LOG("log"),
    SYSTEM("system"),
    CALLBACK("callback");

    CommandType(String typename) {
        typeName=typename;
    }

    public String getTypeName() {
        return typeName;
    }

    private final String typeName;
}