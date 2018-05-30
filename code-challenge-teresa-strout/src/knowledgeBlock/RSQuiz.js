import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Row
} from "reactstrap";

import data from "./data.json";

import kittensAndPuppies from "./images/kittensAndPuppies.jpg";
import coffee from "./images/d229V-nstxA6tZdi.gif";
import tRex from "./images/T-Rex.jpg";

export default class RSQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionID: 0,
      checked: false,
      selectedOption: "",
      answerChosen: "",
      correctAnswer: null,
      modal: false
    };
  }

  imageURL = () => {
    switch (data[this.state.questionID].image) {
      case "coffee":
        return coffee;
        break;
      case "kittensAndPuppies":
        return kittensAndPuppies;
        break;
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

    if (this.state.answerChosen === data[this.state.questionID].answer) {
      this.setState(
        {
          correctAnswer: true
        }
      );
    } else {
      this.setState({
        correctAnswer: false
      });
    }
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleNextButton = () => {
    if (this.state.questionID !== data.length - 1) {
      this.setState({
        questionID: this.state.questionID + 1,
        selectedOption: "",
        correctAnswer: null
      });
    } else {
      this.toggleModal();
    }
  }

  handleYes = () => {
    this.setState({
      questionID: 0,
        selectedOption: "",
        correctAnswer: null
    });
    this.toggleModal()
  }

  handleNo = () => {
    this.toggleModal();
  }

  render() {
    return (
      <div className="knowledge-block" style={{"margin-top":"10px"}}>
        {/*<br /> for spacing without css*/}
        <Col sm="3" md={{ size: 6, offset: 3 }}>

          <Card 
            className="quiz-card"
            body 
            outline
            color={this.state.correctAnswer===null ? "disabled" :
              this.state.correctAnswer ? "success" : "danger"}
          >

            <CardTitle className="quiz-card header" tag="h3" style={{"margin-bottom":"15px"}}>
              {JSON.stringify(data[this.state.questionID].question)}
            </CardTitle>

            <CardImg
              className="quiz-card image"
              src={this.imageURL()}
              alt={data[this.state.questionID].altText}
              style={{"maxHeight":"400px"}}
            />

            <CardBody className="quiz-card form">
              <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                  <Row className="quiz-options">
                    {data[this.state.questionID].choices.map((item, index) => {
                      return (
                        <Col className="radio" key={index} sm={{ size: 'auto', offset: 1}} style={{"margin-bottom":"15px"}}>
                          <Input
                            type="radio"
                            key={index}
                            value={`option${index}`}
                            name={item}
                            checked={
                              this.state.selectedOption === `option${index}`
                            }
                            onChange={this.handleOptionChange}
                          />
                          {data[this.state.questionID].choices[index]}
                        </Col>
                      );
                    })}
                  </Row>


                  <Row className="quiz-buttons" >
                    <Col sm={{ size: 'auto', offset: 2 }}>
                      <Button className="submit button">
                        Check Answer
                      </Button>
                    </Col>
                    
                    <Col sm={{ size: 'auto', offset: 2 }}>
                      <Button
                        className="nextQuestion"
                        onClick={this.handleNextButton}
                        color={this.state.correctAnswer===null ? "secondary" :
                          this.state.correctAnswer ? "success" : "danger"}
                        disabled={this.state.correctAnswer===null || this.state.correctAnswer===false ? true : false}
                      >
                        Next Question
                      </Button>
                    
                      <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                        <ModalHeader 
                          className="quiz-modal header" 
                          toggle={this.toggle}
                        >
                          Congratulations!
                        </ModalHeader>

                        <ModalBody className="quiz-modal body">
                          You've completed your quiz!
                          Would you like to take it again?
                        </ModalBody>

                        <ModalFooter className="quiz-modal footer">
                          <Button color="success" onClick={this.handleYes}>Yes!</Button>
                          <Button color="secondary" onClick={this.handleNo}>No, thanks!</Button>
                        </ModalFooter>
                      </Modal>

                    </Col>
                  </Row>

                </FormGroup>
              </Form>
            </CardBody>
                    
            <CardFooter className="quiz-card footer">
              {data[this.state.questionID].response}
            </CardFooter>

          </Card>
        </Col>
      </div>
    );
  }
}
