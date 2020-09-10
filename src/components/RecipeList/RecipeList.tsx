import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { RootState, Recipe } from '../../types';
import styles from './RecipeList.module.scss';
import Button from '../Button/Button';

const RecipeListItem = ({ id, name }: Recipe) => (
    <li className={ styles.listItem }>
        <Link to={ `${id}` }>
            { name }
        </Link>
    </li>
);

const NoRecipes = () => (
    <li className={ styles.wrapper }>
        Sadly, there are no recipes yet :/
    </li>
);

const RecipeList = () => {
    const history = useHistory();
    const recipes = useSelector((state: RootState) => Object.values(state.recipes));
    
    return (
        <ul className={ styles.list }>
            { recipes.length
                ? recipes.map((recipe: Recipe) => (
                    <RecipeListItem
                        { ...recipe }
                        key={ recipe.id }
                    /> 
                ))
                : <NoRecipes /> }
            <Button primary onClick={ () => history.push('/add') }>
                Add new recipe
            </Button>
        </ul>
    );
};

export default RecipeList;
