import React, { Component } from "react";

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

  handleSubmit = () => this.props.postJob(this.state);

  render() {
    return (
      <div
        style={{ background: "white", height: "250px" }}
        ref={node => (this.node = node)}
      >
        <form>
          <div>
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description:
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={this.state.description}
                onChange={this.handleChange}
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="company">
              Company:
              <input
                type="text"
                name="company"
                id="company"
                value={this.state.company}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="company">
              Email:
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="button" value="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

const mapActionsToProps = {
  postJob,
  showModal
};

export default connect(
  null,
  mapActionsToProps
)(NewJobForm);
