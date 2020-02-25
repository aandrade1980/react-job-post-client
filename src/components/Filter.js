import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Redux
import { connect } from "react-redux";
import { setFilteredJobs, openModal } from "../redux/actions/jobActions";

// MUI
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton
} from "@material-ui/core";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

const Filter = ({ allCategories, setFilteredJobs, openModal }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const formContainerEl = useRef(null);

  const handleClick = ({ target }) =>
    !formContainerEl.current.contains(target) && handleClickOutside();

  const handleClickOutside = () => openModal(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setFilteredJobs(selectedCategories);
  }, [selectedCategories, setFilteredJobs]);

  const handleCheckbox = (evt, catId) =>
    evt.target.checked
      ? setSelectedCategories([...selectedCategories, catId])
      : setSelectedCategories(selectedCategories.filter(cat => cat !== catId));

  const closeModal = () => openModal(false);

  return (
    <FormContainer ref={formContainerEl}>
      <IconButton
        onClick={closeModal}
        style={{ position: "absolute", right: 0, top: 0, padding: 5 }}
      >
        <CancelTwoToneIcon />
      </IconButton>
      <FormGroup style={{ maxHeight: "250px" }}>
        {allCategories.map(({ id, name }) => {
          return (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(id)}
                  value={name}
                  onChange={evt => handleCheckbox(evt, id)}
                />
              }
              label={name}
            />
          );
        })}
      </FormGroup>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  position: relative
  background: whitesmoke;
  border-radius: 4px;
  padding: 25px;
  min-width: 450px;
`;

const mapStateToProps = ({ category: { categories } }) => ({
  allCategories: categories
});

export default connect(mapStateToProps, { setFilteredJobs, openModal })(Filter);
