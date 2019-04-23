package net.mcbbs.client.main.server.cmd;

public enum CommandSource {
    /**
     * from HTML5
     */
    HTML5("H5"),
    /**
     * from JAVA
     */
    JAVA("java"),
    /**
     * from NODE
     */
    NODE("node");

    private final String sourceName;

    CommandSource(String h5) {
        sourceName = h5;
    }

    public String getSourceName() {
        return sourceName;
    }
}