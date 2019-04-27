import React from 'react';
import ReactDOM from 'react-dom';

class Secretary extends React.Component {
    componentDidMount() {
        loadlive2d("live2d", "./live2d/model/tia/model.json");
    }

    render() {
        return <canvas width="400" height="600" id="live2d" styles={{
            bottom: 0,
            right: 0,
            position: 'absolute'
        }}/>;
    }
}

export default Secretary;