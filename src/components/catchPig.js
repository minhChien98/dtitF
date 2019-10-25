import React from "react";
import pig from "../img/pig2.png";

class CatchPig extends React.Component {
  state = {
    widthScreen: 100,
    heightScreen: 100,
    square: 25
  };

  render() {
    const { square, widthScreen, heightScreen } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: `${square}px`,
            height: `${square}px`,
            position: "absolute",
            top: `${heightScreen}px`,
            left: `${widthScreen}px`
          }}
          onClick={this.getNewPosition}
        >
          <img src={pig} alt="" width="100%" height="100%" />
        </div>
      </div>
    );
  }

  getNewPosition = () => {
    const square = this.getRandomArbitrary(25, 50);
    const widthScreen = this.getRandomArbitrary(10, window.screen.width - 50);
    const heightScreen = this.getRandomArbitrary(10, window.screen.height - 50);
    this.props.handleCatchPig();

    this.setState({ square, widthScreen, heightScreen });
  };

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };
}

export default CatchPig;
