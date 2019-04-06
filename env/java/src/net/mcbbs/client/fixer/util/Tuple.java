package net.mcbbs.client.fixer.util;

/**
 * @param <V1> the type of the first value
 * @param <V2> the type of the second value
 * @author InitAuther97
 */
public final class Tuple<V1, V2> {

    private V1 v1;
    private V2 v2;

    private Tuple(V1 v1, V2 v2) {
        this.v1 = v1;
        this.v2 = v2;
    }

    public static <V1, V2> Tuple<V1, V2> asTuple(V1 v1, V2 v2) {
        return new Tuple<>(v1, v2);
    }

    public V1 getV1() {
        return v1;
    }

    public V2 getV2() {
        return v2;
    }
}
