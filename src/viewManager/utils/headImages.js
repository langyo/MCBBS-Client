import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import KeyboardArrowLeft from "mdi-material-ui/ChevronLeft";
import KeyboardArrowRight from "mdi-material-ui/ChevronRight";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "8px"
  },
  img: {
    display: "block",
    overflow: "hidden",
    width: "100%",
    height: "260px",
    borderRadius: "4px"
  },
  titleBarText: {
    top: 0,
    margin: 10,
    position: "absolute",
    width: "100%",
    height: 16,
    color: "#FFF",
    fontWeight: "bold"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)",
    top: 0,
    position: "absolute",
    width: "100%",
    height: 32
  },
  stepper: {

  }
});

class HeadImages extends Reflux.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep:
        prevState.activeStep + 1 >= this.props.headImages.length
          ? 0
          : prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep:
        prevState.activeStep - 1 < 0
          ? this.props.headImages.length - 1
          : prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.headImages.length;

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.props.headImages.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div>
                  <img className={classes.img} src={step.img} alt={step.href} />
                  <div className={classes.titleBar} />
                  <Typography
                    variant="subtitle1"
                    className={classes.titleBarText}
                  >
                    {step.title}
                  </Typography>
                </div>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack}>
              <KeyboardArrowLeft />
            </Button>
          }
          className={classes.stepper}
        />
      </div>
    );
  }
}

HeadImages.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(HeadImages);
