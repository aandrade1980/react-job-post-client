import React, { Component } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

// Redux
import { connect } from "react-redux";
import { postJob, showModal } from "../redux/actions/jobActions";

class NewJobForm extends Component {
  state = {
    title: "",
    description: "",
    company: "",
    email: ""
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = evt => {
    if (this.node.contains(evt.target)) {
      return;
    }

    this.handleClickOutside();
  };

  handleClickOutside = () => this.props.showModal(false);

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  handleImageChange = evt => {
    const image = evt.target.files[0];
    this.setState({
      image
    });
  };

  handleSubmit = () => this.props.postJob(this.state);

  render() {
    return (
      <FormContainer ref={node => (this.node = node)}>
        <form>
          <div>
            <TextField
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Title"
            />
          </div>
          <div>
            <TextField
              type="text"
              name="company"
              id="company"
              value={this.state.company}
              onChange={this.handleChange}
              placeholder="Company"
            />
          </div>
          <div>
            <TextField
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>
          <div>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              id="imageInput"
              onChange={this.handleImageChange}
            />
          </div>
          <div className="buttonContainer">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
  background: whitesmoke;
  border-radius: 4px;
  padding: 25px;
  form {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    div {
      margin-bottom: 10px;
      width: 100%;
    }
    textarea {
      width: 98%;
    }
    .buttonContainer {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
`;

const mapActionsToProps = {
  postJob,
  showModal
};

export default connect(
  null,
  mapActionsToProps
)(NewJobForm);
