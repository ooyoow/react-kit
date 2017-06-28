import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.changeTime = this.changeTime.bind(this);
    this.state = {
      time: new Date().toLocaleTimeString(),
    };
  }
  componentDidMount() {
    setInterval(this.changeTime, 0);
  }

  componentWillUnMount() {
    clearInterval(this.changeTime);
  }
  render() {
    const { time } = this.state;
    return (
      <div>
        <h1>react启动脚手架</h1>
        <h2>现在是：{time}.</h2>
      </div>
    );
  }

  changeTime() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    });
  }
}

export default HomePage;