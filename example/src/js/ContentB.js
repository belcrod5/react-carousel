import React from "react";
import ReactDOM from "react-dom";
import { Carousel } from '@belcrod5/react-carousel';

import classes from "../css/ContentB.module.scss";


export class ContentB extends React.Component {

  /*-----------------------------------------------
   * constructor
  -----------------------------------------------*/
  constructor(props) {
    super(props);

    this.state = {
    };

    //this.onCallback = this.onCallback.bind(this);
  }

  /*-----------------------------------------------
   * componentDidMount
  -----------------------------------------------*/
  componentDidMount() {
    
  }

  /*-----------------------------------------------
   * render
  -----------------------------------------------*/
  render() {

    return (
      <div className={classes.root}>

          swipe change content. { this.props.index + 1 } / 5<br />
          *mobile only<br />
          <br />
          Main image
          <div className={ classes.mainimg }>
            <img src={"http://placekitten.com/g/200/" + (200 + this.props.index) } />
          </div>

          overflow-x
          <div className={ classes.subimg }>
          { Array(5).fill(0).map((v,index)=>(
            <img key={index} src={"http://placekitten.com/g/200/" + (200 + this.props.index + index) } />
          ))}
          </div>
          <div>
            Swiping over the overflow element does not slide.
          </div>

      </div>
    );

  }
}

