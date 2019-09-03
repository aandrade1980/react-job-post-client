import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./category.css";

// Redux
import { connect } from "react-redux";
import { postCategory, deleteCategory } from "../redux/actions/categoryActions";

// MUI
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

// Components
import CustomButton from "./CustomButton";
import Spinner from "./Spinner";

const styles = theme => ({
  ...theme.spinner,
  container: {
    display: "flex"
  },
  wrapper: {
    marginLeft: theme.spacing(2),
    position: "relative"
  },
  form: {
    margin: 50,
    padding: 30,
    width: "fit-content",
    backgroundColor: "whitesmoke",
    border: "solid 1px lightgrey",
    borderRadius: 4
  }
});

class Categories extends Component {
  state = {
    categoryName: ""
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.postCategory(this.state.categoryName);
    this.setState({
      categoryName: ""
    });
  };

  deleteCategory = catId => this.props.deleteCategory(catId);

  render() {
    const { categories, loading, success, classes } = this.props;

    return (
      <div>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.container}>
            <div>
              <TextField
                type="text"
                name="categoryName"
                id="categoryName"
                value={this.state.categoryName}
                onChange={this.handleChange}
                placeholder="Category Name..."
                required
              />
            </div>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
                className={success ? classes.successButton : ""}
              >
                Submit
              </Button>
              {loading && (
                <Spinner size={24} className={classes.buttonProgress} />
              )}
            </div>
          </div>
          <div>
            {categories && (
              <TransitionGroup component="ul">
                {categories.map(cat => {
                  return (
                    <CSSTransition
                      key={cat.id}
                      timeout={{ enter: 500, exit: 500 }}
                      classNames="move"
                    >
                      <li>
                        {cat.name}{" "}
                        <CustomButton
                          title="Delete"
                          onClick={() => this.deleteCategory(cat.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </CustomButton>
                      </li>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ category: { categories, loading, success } }) => ({
  categories,
  loading,
  success
});

export default connect(
  mapStateToProps,
  { postCategory, deleteCategory }
)(withStyles(styles)(Categories));
