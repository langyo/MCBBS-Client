import expect from 'expect';
import <%= metadata.reducerKeyProperty %>Reducer from '../reducer';

describe('<%= metadata.reducerKeyProperty %>Reducer', () => {
    it('returns the initial state', () => {
        expect(<%= metadata.reducerKeyProperty %>Reducer(undefined, {})).toEqual({ name: 'Sample Name' });
    });
});
