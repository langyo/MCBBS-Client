package net.mcbbs.client.main.client.cmd;

public enum SystemCommandType {
    /**
     * call
     */
    CALL("call"),
    /**
     * 接受
     */
    RECEIVE("receive"),
    /**
     * 退出
     */
    EXIT("exit");

    private final String type;

    SystemCommandType(String typ) {
        type = typ;
    }

    public String getType() {
        return type;
    }
}