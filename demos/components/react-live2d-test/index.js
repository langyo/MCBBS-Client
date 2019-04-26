import React from 'react';
import ReactDOM from 'react-dom';

class CoolBackground extends React.Component {
    componentDidMount() {
        loadlive2d("live2d", "./live2d/model/tia/model.json");
    }

    render() {
        return (<canvas width="400" height="600" id="live2d" />);
    }
}

ReactDOM.render(<CoolBackground />, document.querySelector('#content'));
