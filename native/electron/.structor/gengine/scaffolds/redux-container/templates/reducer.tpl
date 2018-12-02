/**
 * <% if (namespace) {%><%= namespace + '/'%><%}%><%= componentName %>Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { SAMPLE_ACTION } from './constants';

// The initial state of the App
const initialState = {
    name: 'Sample Name',
};

function <%= metadata.reducerKeyProperty %>Reducer(state = initialState, action) {
    switch (action.type) {
        case SAMPLE_ACTION:
            return Object.assign({}, state, {name: action.name});
        default:
            return state;
    }
}

export default <%= metadata.reducerKeyProperty %>Reducer;
