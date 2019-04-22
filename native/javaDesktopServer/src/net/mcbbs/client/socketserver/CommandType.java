package net.mcbbs.client.socketserver;

public enum CommandType {
    EXECUTE("execute"),
    DATA("data"),
    LOG("log"),
    SYSTEM("system"),
    CALLBACK("callback");

    private final String typeName;

    CommandType(String typename) {
        typeName = typename;
    }

    public String getTypeName() {
        return typeName;
    }
}