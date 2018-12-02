<%
    var defaultModel = Object.assign({}, model);
    defaultModel.props = {};
    defaultModel.type = componentName;
    if (namespace && namespace.length > 0) {
        defaultModel.namespace = namespace;
    }
    if (metadata.hasChildrenIncluded) {
        defaultModel.children = [];
    }
%>
[
<%= JSON.stringify(defaultModel, null, 4)%>
]
