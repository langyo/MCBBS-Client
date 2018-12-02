import React from 'react';
<% pagesModel.forEach(function(page, index ){ %>import <%= page.pageName %> from './<%= page.pageName %>';<%= '\n' %><% }); %>

class App extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default {
	path: '/',
	component: App,
	indexRoute: { component: <%= pagesModel[0].pageName %> },
	childRoutes: [<% pagesModel.forEach(function( page, index ){ %>
		{
			path: '<%= page.pagePath %>',
			name: '<%= page.pagePath %>',
			component: <%= page.pageName %>,
		},<% });  %>
		{
			path: '*',
			name: 'notfound',
			component: <%= pagesModel[0].pageName %>,
		},
	],
};
