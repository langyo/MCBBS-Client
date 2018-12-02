<%
function getComponentClassMemberImports (imports) {
    var result = '';
    var importsMap = {};
    imports.forEach(function (item) {
        if (item.member) {
            importsMap[item.relativeSource] = importsMap[item.relativeSource] || [];
            importsMap[item.relativeSource].push(item.name);
        }
    });
    var joined;
    _.forOwn(importsMap, function (members, relativeSource) {
        joined = members.join(',');
        result += 'import {' + joined + '} from \'' + relativeSource + '\';\n';
    });
    return result;
}

function getComponentClassNamespaceImports (imports) {
    var result = '';
    var importsMap = {};
    imports.forEach(function (item) {
        if (item.namespace) {
            importsMap[item.relativeSource] = importsMap[item.relativeSource] || [];
            importsMap[item.relativeSource].push(item.name);
        }
    });
    _.forOwn(importsMap, function (name, relativeSource) {
        result += 'import * as ' + name + ' from \'' + relativeSource + '\';\n';
    });
    return result;
}

function getComponentClassDefaultImports (imports) {
    var result = '';
    var importsMap = {};
    imports.forEach(function (item) {
        if (!item.member && !item.namespace) {
            importsMap[item.relativeSource] = importsMap[item.relativeSource] || [];
            importsMap[item.relativeSource].push(item.name);
        }
    });
    _.forOwn(importsMap, function (name, relativeSource) {
        result += 'import ' + name + ' from \'' + relativeSource + '\';\n';
    });
    return result;
}

function processChild (model) {
    var result = '<' + model.type + (_.isEmpty(model.props) ? '' : ' ' + processProps(model.props)) + '>';
    if (model.children && model.children.length > 0) {
        _.forEach(model.children, function (child) {
            result += processChild(child);
        });
    } else if (model.text && model.text.length > 0) {
        result += model.text;
    }
    result += '</' + model.type + '>';
    return result;
}

function processStyle (styleObject) {
    var result = '';
    if (styleObject && !_.isEmpty(styleObject)) {
        _.forOwn(styleObject, function (value, prop) {
            if (_.isString(value) && value.length > 0) {
                result += ' ' + prop + ": '" + value + "',";
            } else if (_.isBoolean(value) || _.isNumber(value)) {
                result += ' ' + prop + ": " + value + ",";
            }
        });
        result = result.substr(0, result.length - 1);
    }
    return result;
}

function processProps (props) {
    var result = '';
    if (props && !_.isEmpty(props)) {
        _.forOwn(props, function (value, prop) {
            if (_.isString(value) && value.length > 0) {
                result += prop + "=\"" + value + "\"";
            } else if (_.isBoolean(value) || _.isNumber(value)) {
                result += prop + "={" + value + "} ";
            } else if (_.isObject(value) && !_.isEmpty(value)) {
                if (value['type']) {
                    result += prop + "={ " + processChild(value) + " }";
                } else if(value.newPropName) {
                    result += prop + "={ " + value.newPropName + " } ";
                }
            }
        });
    }
    return result;
}

function processPrimitive (value, prop) {
    var result = '';
    if (_.isString(value) && value.length > 0) {
        if (prop) {
            result += prop + ": '" + value + "'";
        } else {
            result += "'" + value + "'";
        }
    } else if (_.isBoolean(value) || _.isNumber(value)) {
        if (prop) {
            result += prop + ": " + value;
        } else {
            result += value;
        }
    }
    return result;
}

function processArray (array) {
    var result = '';
    if (array) {
        array.forEach(function (item) {
            if (_.isObject(item)) {
                result += processObject(item) + ',';
            } else {
                result += processPrimitive(item) + ',';
            }
        });
        result = '[' + result.substr(0, result.length - 1) + ']';
    }
    return result;
}

function processObject (obj) {
    var result = '';
    if (obj) {
        _.forOwn(obj, function (value, prop) {
            if (_.isArray(value)) {
                result += prop + ': ' + processArray(value) + ',';
            } else if (_.isObject(value)) {
                result += prop + ': ' + processObject(value) + ',';
            } else {
                result += processPrimitive(value, prop) + ',';
            }
        });
        result = '{ ' + result.substr(0, result.length - 1) + '}';
    }
    return result;
}

function processObjects (objects) {
    var result = '';
    if (objects && objects.length > 0) {
        objects.forEach(function (obj) {
          if (obj.isArray) {
              result += 'const ' + obj.newPropName + '= ' + processArray(obj.objectValue) + ';\n';
          } else if (obj.isObject) {
              result += 'const ' + obj.newPropName + '= ' + processObject(obj.objectValue) + ';\n';
          }
        });
    }
    return result;
}
%>/**
*
* <%= componentName %>
*
*/
<% if(metadata.componentType === 'ES6 Class (Pure)') { %>
import React, {PureComponent} from 'react';
    <% if(metadata.isPropertiesExample || !metadata.hasChildrenIncluded) { %>
    import PropTypes from 'prop-types';
    <% } %>
<% } else if(metadata.componentType === 'ES6 Class') { %>
import React, {Component} from 'react';
    <% if(metadata.isPropertiesExample || !metadata.hasChildrenIncluded) { %>
    import PropTypes from 'prop-types';
    <% } %>
<% } %>
<% if(metadata.hasChildrenIncluded) { %>
    <%= getComponentClassMemberImports(imports) %>
    <%= getComponentClassDefaultImports(imports) %>
    <%= getComponentClassNamespaceImports(imports) %>
<% } %>
<%= processObjects(foundObjects)  %>
<% if(metadata.componentType === 'ES6 Class (Pure)') { %>
class <%= componentName %> extends PureComponent {
<% } else if(metadata.componentType === 'ES6 Class') { %>
class <%= componentName %> extends Component {
<% } %>
    <% if(metadata.hasConstructor) { %>
    constructor(props) {
        super(props);
            this.state = {
            exampleValue: '',
        };
    }
    <% } %>
    render(){
        <% if(metadata.hasConstructor) { %>const { exampleValue } = this.state; // eslint-disable-line<% } %>
        <% if(metadata.isPropertiesExample) { %>const { exampleProp } = this.props; // eslint-disable-line<% } %>
        return (
            <<%= (model.type === componentName ? 'div' : model.type) + (_.isEmpty(model.props) ? '' : ' ' + processProps(model.props)) %>>
                <% if(metadata.hasChildrenIncluded) { %>
                    <% if(model.children && model.children.length > 0) {
                        _.forEach(model.children, function(child) { %>
                            <%= processChild(child) %>
                        <% });
                    } %>
                <% } else { %>
                    <% if(model.children && model.children.length > 0) { %>
                        {this.props.children}
                    <% } %>
                <% } %>
            </<%= (model.type === componentName ? 'div' : model.type) %>>
        );
    }
}
<% if(metadata.isPropertiesExample || !metadata.hasChildrenIncluded) { %>
<%= componentName %>.propTypes = {
    <% if(metadata.isPropertiesExample) { %>exampleProp: PropTypes.string,<% } %>
    <% if(!metadata.hasChildrenIncluded) { %>children: PropTypes.node,<% } %>
};
<%= componentName %>.defaultProps = {
    <% if(metadata.isPropertiesExample) { %>exampleProp: '',<% } %>
    <% if(!metadata.hasChildrenIncluded) { %>children: null,<% } %>
};
<% } %>

export default <%= componentName %>;
