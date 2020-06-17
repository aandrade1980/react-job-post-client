import React, { useState, useEffect, createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './category.css';

// Redux
import { connect } from 'react-redux';
import { postCategory, deleteCategory } from '../redux/actions/categoryActions';
import { toastMessage } from '../redux/actions/toastActions';

// MUI
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

// Components
import CustomButton from './CustomButton';
import Spinner from './Spinner';

const styles = theme => ({
  ...theme.spinner,
  container: {
    display: 'flex'
  },
  wrapper: {
    marginLeft: theme.spacing(2),
    position: 'relative'
  },
  form: {
    margin: 50,
    padding: 30,
    width: 'fit-content',
    backgroundColor: 'whitesmoke',
    border: 'solid 1px lightgrey',
    borderRadius: 4
  },
  ul: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridColumnGap: 45
  }
});

const Categories = ({
  categories,
  loading,
  success,
  classes,
  postCategory,
  deleteCategory,
  toastMessage
}) => {
  const inputRef = createRef();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = evt => setCategoryName(evt.target.value);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (isValidCatName(categoryName)) {
      postCategory(categoryName);
      setCategoryName('');
    } else {
      toastMessage(
        'Category Name cannot be empty',
        true,
        false,
        false,
        'top-center',
        'error'
      );
    }
  };

  const isValidCatName = catName => catName.trim() !== '';

  const deleteCat = catId => deleteCategory(catId);

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.container}>
          <div>
            <TextField
              type="text"
              name="categoryName"
              id="categoryName"
              value={categoryName}
              onChange={handleChange}
              placeholder="Category Name..."
              required
              inputRef={inputRef}
            />
          </div>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
              className={success ? classes.successButton : ''}
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
            <TransitionGroup component="ul" className={classes.ul}>
              {categories.map(cat => {
                return (
                  <CSSTransition
                    key={cat.id}
                    timeout={{ enter: 500, exit: 500 }}
                    classNames="move"
                  >
                    <li>
                      {cat.name}{' '}
                      <CustomButton
                        title="Delete"
                        onClick={() => deleteCat(cat.id)}
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
};

const mapStateToProps = ({ category: { categories, loading, success } }) => ({
  categories,
  loading,
  success
});

export default connect(mapStateToProps, {
  postCategory,
  deleteCategory,
  toastMessage
})(withStyles(styles)(Categories));
