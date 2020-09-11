import React, { useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../types';
import recipes from '../../store/recipes';
import Button from '../Button/Button';
import styles from './EditRecipe.module.scss';
import trash from '../../assets/trash.svg';

const Ingredient = ({ name, remove }) => (
  <div className={ styles.ingredient }>
    <span>
      { name }
    </span>
    <img
      width={ 24 }
      src={ trash }
      alt="remove"
      onClick={ remove }
    />
  </div>
);

const EditRecipe = () => {
  const { id } = useParams();
  const recipe = useSelector((state: RootState) => state.recipes[id]);
  const history = useHistory();

  const dispatch = useDispatch();
  const saveRecipe = useCallback((recipe) => dispatch(recipes.actions.saveRecipe(recipe)), [dispatch]);

  const [ingredientName, setIngredientName] = useState('');
  const [values, setValues] = useState(recipe || {
    name: '',
    description: '',
    ingredients: [],
  });

  const addIngredient = () => {
    if (!ingredientName.length || values.ingredients.includes(ingredientName)) {
      return;
    }

    setValues({
      ...values,
      ingredients: [
        ...values.ingredients,
        ingredientName,
      ],
    });
    setIngredientName('');
  };

  const removeIngredient = (name: string) => {
    setValues({
      ...values,
      ingredients: values.ingredients.filter(ingredient => ingredient !== name),
    });
  };

  const handleSubmit = () => {
    saveRecipe({
      id: uuid(),
      ...values,
    });
    history.push('/');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className={ styles.wrapper }>
        <h2 className={ styles.heading }>
          { recipe
            ? `Edit recipe '${recipe.name}'`
            : 'Add new recipe' }
        </h2>

        <label className={ styles.label } htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          className={ styles.textInput }
          required
          value={ values.name }
          onChange={ e => setValues({ ...values, name: e.target.value }) }
        />

        <label className={ styles.label } htmlFor="description">Description:</label>
        <textarea
          className={ styles.textarea }
          rows={ 4 }
          cols={ 30 }
          value={ values.description }
          onChange={ e => setValues({ ...values, description: e.target.value }) }
        />

        <span className={ styles.label }> Ingredients: </span>
        { values.ingredients.map(ingredient => (
          <Ingredient
            key={ ingredient }
            name={ ingredient }
            remove={ () => removeIngredient(ingredient) }
          />
        )) }

        <form className={ styles.inputGroup }>
          <input
            type="text"
            value={ ingredientName }
            className={ styles.textInput }
            onChange={ e => setIngredientName(e.target.value) } 
          />
          <Button onClick={ () => addIngredient() }>
            Add
          </Button>
        </form>
      </div>

      <Button primary type="submit">
        Save recipe
      </Button>
    </form>
  );
};

export default EditRecipe;
