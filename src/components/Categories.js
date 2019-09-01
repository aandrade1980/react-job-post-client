import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { postCategory, deleteCategory } from "../redux/actions/categoryActions";

// MUI
import { Button, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

// Components
import CustomButton from "./CustomButton";

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

  handleSubmit = () => this.props.postCategory(this.state.categoryName);

  deleteCategory = catId => {
    console.log("CatID => ", catId);
    this.props.deleteCategory(catId);
  };

  render() {
    const { categories } = this.props;

    return (
      <div>
        <form style={{ margin: "50px" }}>
          <div style={{ marginBottom: "25px" }}>
            <TextField
              type="text"
              name="categoryName"
              id="categoryName"
              value={this.state.categoryName}
              onChange={this.handleChange}
              placeholder="Category Name..."
            />
            <Button
              style={{ marginLeft: "15px" }}
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
          <div>
            {categories && (
              <ul>
                {categories.map(cat => {
                  return (
                    <li key={cat.id}>
                      {cat.name}{" "}
                      <CustomButton
                        title="Delete"
                        onClick={() => this.deleteCategory(cat.id)}
                      >
                        <DeleteIcon color="error" />
                      </CustomButton>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ category: { categories } }) => ({
  categories
});

export default connect(
  mapStateToProps,
  { postCategory, deleteCategory }
)(Categories);
