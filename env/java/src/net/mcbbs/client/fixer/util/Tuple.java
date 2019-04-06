package net.mcbbs.client.fixer.util;

/**
 * Utility that make a key-value pair or a two-value collection.
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

    /**
     *
     * @param v1 A value
     * @param v2 A value
     * @param <V1> A generic parameter
     * @param <V2> A generic parameter
     * @return A {@code net.mcbbs.client.fixer.util.Tuple} with two value.
     */
    public static <V1, V2> Tuple<V1, V2> of(V1 v1, V2 v2) {
        return new Tuple<>(v1, v2);
    }

    /**
     * @return Value 1
     */
    public V1 getV1() {
        return v1;
    }
    /**
     * @return Value 2
     */
    public V2 getV2() {
        return v2;
    }
}
