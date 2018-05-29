import React, {Component} from "react";

import data from "./data.json";

import kittensAndPuppies from './images/kittensAndPuppies.jpg';
import coffee from './images/d229V-nstxA6tZdi.gif'

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
        selectedOption: ''
      });
    } else {
      this.setState({
        questionID: 0,
        selectedOption: ''
      });
    }
  }

  render() {
    return ( 
      <div >
        <br />
        <h1 > 
          {JSON.stringify(data[this.state.questionID].question)} 
        </h1> 
        <img 
          src = {this.imageURL()} 
          alt = {data[this.state.questionID].altText}
          style={{"maxWidth":"80%","maxHeight":"20%"}}
        />
        <hr />
        <form
          onSubmit={this.handleFormSubmit} >
        {data[this.state.questionID].choices.map((item, index) => {
          return(
          <div className='radio' key={index}>
            <label>
              <input 
                type='radio' 
                key={index}
                value={`option${index}`}
                name={item}
                checked={this.state.selectedOption===`option${index}`}
                onChange={this.handleOptionChange} />
              {data[this.state.questionID].choices[index]}
            </label>
          </div>
          )
        })}
        <br />
        <button className='submit button' type='submit'>Check Answer</button>
        </form>
        <br />
        <div>
          <button className='nextQuestion' onClick={this.handleNextButton} >Next Question</button>
        </div>
      </div>
    );
  }
}
