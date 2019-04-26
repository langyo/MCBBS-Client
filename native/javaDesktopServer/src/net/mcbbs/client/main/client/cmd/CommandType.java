package net.mcbbs.client.main.client.cmd;

public enum CommandType {
    /**
     * 执行
     */
    EXECUTE("execute"),
    /**
     * 数据
     */
    DATA("data"),
    /**
     * 日志
     */
    LOG("log"),
    /**
     * 系统
     */
    SYSTEM("system"),
    /**
     * 回调
     */
    CALLBACK("callback");

    private final String typeName;

    CommandType(String typename) {
        typeName = typename;
    }

    public String getTypeName() {
        return typeName;
    }
}