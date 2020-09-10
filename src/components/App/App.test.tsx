import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import recipes from '../../store/recipes';
import App from './App';

test('app renders new recipe button', async () => {
    const store = configureStore({ reducer: { recipes: recipes.reducer } });
    render(
        <Provider store={ store }>
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    const lazyElement = await screen.findByText(/Add new recipe/i);
    expect(lazyElement).toBeInTheDocument();
});

test('app renders recipe form', async () => {
    const store = configureStore({ reducer: { recipes: recipes.reducer } });
    render(
        <Provider store={ store }>
            <MemoryRouter initialEntries={["/add"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    const lazyElement = await screen.findByText(/Adding new recipe/i);
    expect(lazyElement).toBeInTheDocument();
});

test('app renders single recipe page', async () => {
    const preloadedState = {
        recipes: {
            test: {
                id: 'test',
                name: 'test',
                ingredients: [],
            },
        },
    };
    const store = configureStore({ reducer: { recipes: recipes.reducer }, preloadedState });
    render(
        <Provider store={ store }>
            <MemoryRouter initialEntries={["/test"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    const lazyElement = await screen.findByText(/Description/i);
    expect(lazyElement).toBeInTheDocument();
});

test('app redirects to index if recipe doesnt exist', async () => {
    const store = configureStore({ reducer: { recipes: recipes.reducer } });
    render(
        <Provider store={ store }>
            <MemoryRouter initialEntries={["/test"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    const lazyElement = await screen.findByText(/Add new recipe/i);
    expect(lazyElement).toBeInTheDocument();
});

test('app redirects to /add after clicking button', async () => {
    const store = configureStore({ reducer: { recipes: recipes.reducer } });
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/test"]}>
                <App />
            </MemoryRouter>
        </Provider>
    );
    const button = await screen.findByText(/Add new recipe/i);
    fireEvent.click(button);

    const lazyElement = await screen.findByText(/Adding new recipe/i);
    expect(lazyElement).toBeInTheDocument();
});