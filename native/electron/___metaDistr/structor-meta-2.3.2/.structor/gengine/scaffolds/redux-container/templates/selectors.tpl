/**
 * <% if (namespace) {%><%= namespace + '/'%><%}%><%= componentName %> selectors
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the <% if (namespace) {%><%= namespace + '.'%><%}%><%= metadata.reducerKeyProperty %> state domain
 */
const select<%= _.capitalize(metadata.reducerKeyProperty) %> = () => (state) => state.<% if (namespace) {%><%= namespace + '.'%><%}%><%= metadata.reducerKeyProperty %>;

/**
 * Other specific selectors
 */
const selectName = () => createSelector(
    select<%= _.capitalize(metadata.reducerKeyProperty) %>(),
    (<%= metadata.reducerKeyProperty %>State) => <%= metadata.reducerKeyProperty %>State.name
);

export default select<%= _.capitalize(metadata.reducerKeyProperty) %>;

export {
    selectName
};
