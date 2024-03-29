import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { setFilteredJobs, openModal } from '../redux/actions/jobActions';

// MUI
import { Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const Filter = ({ allCategories, setFilteredJobs, openModal }) => {
  const [selectedCategories, setSelectedCategories] = useState(
    JSON.parse(localStorage.getItem('selectedCategories')) || []
  );
  const formContainerEl = useRef(null);

  const handleClickCallback = useCallback(
    ({ target }) => {
      !formContainerEl.current.contains(target) && openModal(false);
    },
    [openModal]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickCallback);
    return () => document.removeEventListener('mousedown', handleClickCallback);
  }, [handleClickCallback]);

  useEffect(() => {
    setFilteredJobs(selectedCategories);
    localStorage.setItem(
      'selectedCategories',
      JSON.stringify(selectedCategories)
    );
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
        style={{ position: 'absolute', right: 0, top: 0, padding: 5 }}
      >
        <CancelTwoToneIcon />
      </IconButton>
      <FormGroup
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}
      >
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
  position: relative;
  background: whitesmoke;
  border-radius: 4px;
  padding: 25px;
  min-width: 450px;
`;

const mapStateToProps = ({ category: { categories } }) => ({
  allCategories: categories
});

export default connect(mapStateToProps, { setFilteredJobs, openModal })(Filter);
