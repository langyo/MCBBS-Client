package net.mcbbs.client.socketserver;

public enum CommandSource {
    HTML5("H5"), JAVA("java"), NODE("node");

    private final String sourceName;

    CommandSource(String h5) {
        sourceName = h5;
    }

    public String getSourceName() {
        return sourceName;
    }
}