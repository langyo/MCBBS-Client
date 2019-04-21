package net.mcbbs.client.util.network.processor.coder;

public abstract class AbstractDECoder<E,D> implements IDEcoder<E,D> {
    @Override
    public Class getInputType() {
        return null;
    }

    @Override
    public Class getOutputType() {
        return null;
    }

    @Override
    public void setValue(Object value) {

    }

    @Override
    public Object value() {
        return null;
    }
}
