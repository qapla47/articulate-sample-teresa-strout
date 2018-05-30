import React, {Component} from "react";

import data from "./data.json";

import kittensAndPuppies from './images/kittensAndPuppies.jpg';
import coffee from './images/d229V-nstxA6tZdi.gif';
import tRex from './images/T-Rex.jpg';

export default class UglyFunctional extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionID: 0,
      checked: false,
      selectedOption: '',
      answerChosen: '',
      correctAnswer: null
    };

  }

  imageURL = name => {
    switch (data[this.state.questionID].image) {
      case 'coffee':
        return coffee;
      case 'kittensAndPuppies':
        return kittensAndPuppies;
      case "tRex":
        return tRex;
        break;
      default:
        return coffee;
    }
  }

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value,
      answerChosen: e.target.name
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    console.log(data[this.state.questionID].answer)

    if(this.state.answerChosen === data[this.state.questionID].answer) {
      this.setState({
        correctAnswer: true
      }, () => {
        console.log("correct!");
      })
    } else {
      console.log("Sorry, try again...");
      return false;
    }
  }

  handleRenderValidation = e => {
    if(this.handleFormSubmit) {
      console.log('form submit is true');
    }
  }

  handleNextButton = () => {
    if(this.state.questionID !== data.length-1) {
      this.setState({
        questionID: this.state.questionID + 1,
        selectedOption: '',
        correctAnswer: null
      });
    } else {
      this.setState({
        questionID: 0,
        selectedOption: '',
        correctAnswer: null
      });
    }
  }

  render() {
    return ( 
      <div className="quiz-page">
        <h1 className="quiz-title"> 
          {JSON.stringify(data[this.state.questionID].question)} 
        </h1> 

        <img 
          className="quiz-image"
          src = {this.imageURL()} 
          alt = {data[this.state.questionID].altText}
          style={{"maxHeight":"400px", "maxWidth":"1000px"}}
        />

        <hr />

        <form 
          className="quiz-form"  
          onSubmit={this.handleFormSubmit} 
        >
          {data[this.state.questionID].choices.map((item, index) => {
            return(
              <div className='radio' key={index} style={{"display":"inline", "margin-left":"40px"}}>
                <label>
                  <input 
                    type='radio' 
                    key={index}
                    value={`option${index}`}
                    name={item}
                    checked={this.state.selectedOption===`option${index}`}
                    onChange={this.handleOptionChange} 
                    style={{"margin":"5px"}}
                    />
                  {data[this.state.questionID].choices[index]}
                </label>
              </div>
              )
            })}
            <br />
          <button 
            className='submit button' 
            type='submit'
            style={{"margin":"5px"}}
          >
            Check Answer
          </button>

          <button 
            className='nextQuestion' 
            onClick={this.handleNextButton} 
            disabled={this.state.correctAnswer===null || this.state.correctAnswer===false ? true : false}
          >
            Next Question
          </button>

        </form>
      </div>
    );
  }
}
