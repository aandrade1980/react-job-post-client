import React, { Component } from "react";
import styled from "styled-components";

// Redux
import { connect } from "react-redux";
import { postJob, updateJob, openModal } from "../redux/actions/jobActions";

// MUI
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button, TextField } from "@material-ui/core";

// Components
import Spinner from "./Spinner";

const styles = theme => ({
  ...theme.spinner
});

class NewJobForm extends Component {
  state = {
    title: "",
    description: "",
    company: "",
    email: "",
    categories: []
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);

    if (this.props.modal.edit) {
      this.setState({
        ...this.props.currentJob
      });
    }
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

  handleClickOutside = () => this.props.openModal(false);

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

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.modal.edit
      ? this.props.updateJob(this.state)
      : this.props.postJob(this.state);
  };

  handleCheckbox = catId => event => {
    if (event.target.checked) {
      this.setState({
        categories: [...this.state.categories, catId]
      });
    } else {
      this.setState({
        categories: this.state.categories.filter(_cat => _cat !== catId)
      });
    }
  };

  render() {
    const { loading, classes } = this.props;
    return (
      <FormContainer ref={node => (this.node = node)}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Title"
              required
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
            <FormGroup style={{ maxHeight: "250px" }}>
              {this.props.categories.map(cat => {
                return (
                  <FormControlLabel
                    key={cat.id}
                    control={
                      <Checkbox
                        checked={this.state.categories.includes(cat.id)}
                        value={cat.name}
                        onChange={this.handleCheckbox(cat.id)}
                      />
                    }
                    label={cat.name}
                  />
                );
              })}
            </FormGroup>
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
              type="button"
              variant="text"
              onClick={() => this.props.openModal(false)}
              className="cancelButton"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
            {loading && (
              <Spinner size={24} className={classes.buttonProgress} />
            )}
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
    min-width: 450px;
    display: flex;
    flex-direction: column;
    div {
      margin-bottom: 10px;
      width: 100%;
    }
    textarea {
      width: 98%;
      font-size: 1rem;
      line-height: 1.5;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
    .buttonContainer {
      position: relative;
      margin-left: auto;
      width: fit-content;
    }
  }
  .cancelButton {
    display: none;
  }
  @media only screen and (max-device-width: 667px) {
    border-radius: 0;
    width: 100vw;
    form {
      min-width: auto;
    }
    .cancelButton {
      display: inline-block;
      margin-right: 8px;
    }
  }
`;

const mapStateToProps = ({
  category: { categories },
  job: { currentJob, modal, loading }
}) => ({
  categories,
  currentJob,
  modal,
  loading
});

const mapActionsToProps = {
  postJob,
  openModal,
  updateJob
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewJobForm));
