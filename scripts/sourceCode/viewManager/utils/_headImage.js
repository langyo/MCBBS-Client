import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const mainPage = {
  headImages: [
    {
      href: "thread-829068-1-1.html",
      img:
        "http://attachment.mcbbs.net/forum/201812/09/235920hi6f9ez6vkixq31i.png",
      title: "1"
    },
    {
      href: "thread-828658-1-1.html",
      img:
        "https://raw.githubusercontent.com/Tollainmear/PicRepo/master/%E7%A7%91%E6%8A%80%E7%A9%BA%E5%B2%9B/%E9%A6%96%E9%A1%B5N%E6%A0%BC.jpg",
      title: "1444444444444444444444444"
    },
    {
      href: "thread-827490-1-1.html",
      img: "http://wx2.sinaimg.cn/large/005UHtVDgy1fxi7tl5xbsj32nu0y2npi.jpg",
      title: "1"
    },
    {
      href: "thread-830195-1-1.html",
      img: "http://wx2.sinaimg.cn/mw690/8d60bc48gy1fx9fw29jchj20hd06mwk8.jpg",
      title: "1"
    },
    {
      href: "thread-823489-1-1.html",
      img:
        "http://attachment.mcbbs.net/forum/201811/15/075403rzirr25c2szh89tk.png.thumb.jpg",
      title: "1"
    }
  ],
  forumGroups: {}
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  img: {
    display: "block",
    overflow: "hidden",
    width: "100%",
    height: "100%"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    top: 0,
    padding: 12,
    position: "absolute",
    width: "100%",
    height: 16
  }
});

class HeadImages extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = mainPage.headImages.length;

    return (
      <div className={classes.root}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {mainPage.headImages.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <div>
                  <img className={classes.img} src={step.img} alt={step.href} />
                  <div className={classes.titleBar}>
                    <Typography variant="subtitle1">{step.title}</Typography>
                  </div>
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
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Button>
          }
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
