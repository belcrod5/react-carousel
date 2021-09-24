import React from "react";
import ReactDOM from "react-dom";
import { Carousel } from '@belcrod5/react-carousel';
import { ContentB } from './ContentB';

import classes from "../css/ContentA.module.scss";


export class ContentA extends React.Component {

  /*-----------------------------------------------
   * constructor
  -----------------------------------------------*/
  constructor(props) {
    super(props);
    
    this.slider = React.createRef();

    this.state = {
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  /*-----------------------------------------------
   * componentDidMount
  -----------------------------------------------*/
  componentDidMount() {
    
  }

  /*-----------------------------------------------
   * next
  -----------------------------------------------*/
  next() {
    this.slider.current.next();
  }

  /*-----------------------------------------------
   * prev
  -----------------------------------------------*/
  prev() {
    this.slider.current.previous();
  }

  /*-----------------------------------------------
   * render
  -----------------------------------------------*/
  render() {
    
    return (
      <div className={ classes.root }>

          
        <nav>
          <button onClick={ this.prev }>Prev</button>
          <button onClick={ this.next }>Next</button>
        </nav>


        <Carousel

          ref={this.slider}
          transitionDuration={200}
          minimumTouchDrag={50}
          afterChange={ this.afterChange }
        
        >
        { Array(5).fill(0).map((v,index)=>(
          <ContentB key={index} index={index} />
        ))}
        </Carousel>
      </div>
    );

  }
}







