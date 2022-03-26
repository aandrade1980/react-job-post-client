import React, { useState, useEffect, createRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './category.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { postCategory, deleteCategory } from '../redux/actions/categoryActions';
import { toastMessage } from '../redux/actions/toastActions';

// MUI
import { Button, TextField } from '@mui/material';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/DeleteOutline'

// Components
import CustomButton from './CustomButton';

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

const Categories = ({ classes }) => {
  const categories = useSelector(state => state.category.categories);
  const loading = useSelector(state => state.category.loading);
  const success = useSelector(state => state.category.success);
  const dispatch = useDispatch();
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
      dispatch(postCategory(categoryName));
      setCategoryName('');
    } else {
      dispatch(
        toastMessage(
          'Category Name cannot be empty',
          true,
          false,
          false,
          'top-center',
          'error'
        )
      );
    }
  };

  const isValidCatName = catName => catName.trim() !== '';

  const deleteCat = catId => dispatch(deleteCategory(catId));

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

export default withStyles(styles)(Categories);
