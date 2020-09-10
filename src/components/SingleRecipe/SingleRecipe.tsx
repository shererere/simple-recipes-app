import React, { useCallback } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import recipes from '../../store/recipes';
import Button from '../Button/Button';
import styles from './SingleRecipe.module.scss';

const SingleRecipe = () => {
  const { id } = useParams();
  const recipe = useSelector((state: RootState) => state.recipes[id]);
  const history = useHistory();

  const dispatch = useDispatch();
  const removeRecipe = useCallback(id => dispatch(recipes.actions.removeRecipe(id)), [dispatch]);

  const handleRemove = (id) => {
    removeRecipe(id);
    history.push('/');
  };

  if (!recipe) {
    return <Redirect to="/" />;
  }

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.header }>
        <div>
          <h2 className={ styles.heading }>{ recipe.name }</h2>
          <p>Description: { recipe.description }</p>
        </div>
        <div>
          <Button onClick={ () => history.push(`/${recipe.id}/edit`) }>
            Edit
          </Button>
          <Button danger onClick={ () => handleRemove(recipe.id) }>
            Remove
          </Button>
        </div>
      </div>

      <h3>Ingredients:</h3>
      <ul>
        { !recipe.ingredients.length
            ? <li>None :(</li>
            : recipe.ingredients.map(ingredient => (
                <li key={ ingredient }>{ ingredient } </li>
            )) }
      </ul>
    </div>
  );
};

export default SingleRecipe;
