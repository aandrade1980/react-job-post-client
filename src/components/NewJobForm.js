import React, { Component } from 'react';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { postJob, updateJob, openModal } from '../redux/actions/jobActions';

// MUI
// import { withStyles } from '@material-ui/core/styles';
import { withStyles } from '@mui/styles';
// import {
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   TextField
// } from '@material-ui/core';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// Components
import Spinner from './Spinner';

const styles = theme => ({
  ...theme.spinner
});

class NewJobForm extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.removeClickOutsideEventListener =
      this.removeClickOutsideEventListener.bind(this);
    this.addClickOutsideEventListener =
      this.addClickOutsideEventListener.bind(this);
  }

  state = {
    title: '',
    description: '',
    company: '',
    email: '',
    categories: [],
    postedDate: new Date()
  };

  componentDidMount() {
    this.addClickOutsideEventListener();

    if (this.props.modal.edit) {
      this.setState({
        ...this.props.currentJob
      });
    }

    this.textInput.current.focus();
  }

  componentWillUnmount() {
    this.removeClickOutsideEventListener();
  }

  addClickOutsideEventListener() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  removeClickOutsideEventListener() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = evt =>
    !this.node.contains(evt.target) && this.handleClickOutside();

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
      if (Array.isArray(this.state.categories)) {
        return this.setState({ categories: [...this.state.categories, catId] });
      }
      const categories = this.state.categories.split(',');
      categories.push(catId);

      this.setState({ categories });
    } else {
      this.setState({
        categories: this.state.categories.filter(_cat => _cat !== catId)
      });
    }
  };

  handleDateChange = postedDate => this.setState({ postedDate });

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
              label="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
              inputRef={this.textInput}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="company"
              id="company"
              value={this.state.company}
              onChange={this.handleChange}
              label="Company"
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={this.state.postedDate}
              onChange={this.handleDateChange}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={this.state.postedDate}
              onChange={this.handleDateChange}
              label="Posted Date"
              format="dd/MM/yyyy"
              onOpen={this.removeClickOutsideEventListener}
              onClose={this.addClickOutsideEventListener}
            />
          </MuiPickersUtilsProvider> */}
          <div>
            <TextField
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
            />
          </div>
          <div>
            <FormGroup
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)'
              }}
            >
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
    min-width: 550px;
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
    /* Posted Date field icon */
    .MuiInputAdornment-root {
      justify-content: flex-end;
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
    textarea {
      height: 125px;
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
