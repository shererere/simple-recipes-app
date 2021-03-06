import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import styles from './App.module.scss';

const RecipeListComponent = lazy(() => import('../RecipeList/RecipeList'));
const SingleRecipeComponent = lazy(() => import('../SingleRecipe/SingleRecipe'));
const EditRecipeComponent = lazy(() => import('../EditRecipe/EditRecipe'));

const App = () => (
  <>
    <Helmet>
      <title>Recipes app!</title>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
    </Helmet>
    <div className={ styles.pageWrapper }>
      <Header />
      <Suspense fallback={ Loader() }>
        <Switch>
          <Route path="/:id/edit" component={ EditRecipeComponent } />
          <Route path="/add" component={ EditRecipeComponent } />
          <Route path="/:id" component={ SingleRecipeComponent } />
          <Route path="/" component={ RecipeListComponent } />
        </Switch>
      </Suspense>
    </div>
  </>
);

export default App;
