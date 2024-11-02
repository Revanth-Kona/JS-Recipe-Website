const favoritesContainer = document.getElementById('favorites-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// Get favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

// Save updated favorites to localStorage
const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Remove recipe from favorites
const removeRecipe = (id) => {
    const favorites = getFavorites().filter(recipe => recipe.idMeal !== id);
    saveFavorites(favorites);
    displayFavorites(); // Refresh the list after removal
};

// Display favorite recipes
const displayFavorites = () => {
    const favorites = getFavorites();
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<h2>No favorites added.</h2>';
        return;
    }

    favorites.forEach(meals => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meals.strMealThumb}">
            <h3>${meals.strMeal}</h3>
            <p>${meals.strArea} Dish</p>
            <p>${meals.strCategory}</p>
        `;
        
        // Button Container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        // View Recipe Button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Recipe';
        viewButton.classList.add('view-btn');
        viewButton.addEventListener('click', () => {
            openRecipePopup(meals);
        });
        buttonContainer.appendChild(viewButton);
        
        // Remove Recipe Button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Recipe';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            removeRecipe(meals.idMeal);
        });
        buttonContainer.appendChild(removeButton);
        
        recipeDiv.appendChild(buttonContainer);
        favoritesContainer.appendChild(recipeDiv);
        
    });
};

// Display ingredients in a list
const fetchIngredients = (meals) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meals[`strIngredient${i}`];
        if (ingredient) {
            const measure = meals[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

// Popup to show recipe details
const openRecipePopup = (meals) => {
    recipeDetailsContent.innerHTML = `
        <h2>Recipe Details<h2>
        <img src="${meals.strMealThumb}">
        <h2 class="recipeName">${meals.strMeal}</h2>
        <h3 class="recipeh3">Ingredients :</h3>
        <ul class="ingredientList">${fetchIngredients(meals)}</ul>
        <div class="instructions">
            <h3>Instructions : </h3>
            <p>${meals.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// Close popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

// Display favorites on page load
document.addEventListener('DOMContentLoaded', displayFavorites);
