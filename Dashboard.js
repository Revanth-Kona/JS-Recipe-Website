const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Get favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

// Save favorites to localStorage
const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Check if recipe is in favorites
const isFavorite = (id) => {
    const favorites = getFavorites();
    return favorites.some(recipe => recipe.idMeal === id);
};

// Toggle favorite status
const toggleFavorite = (recipe) => {
    let favorites = getFavorites();
    if (isFavorite(recipe.idMeal)) {
        favorites = favorites.filter(item => item.idMeal !== recipe.idMeal);
    } else {
        favorites.push(recipe);
    }
    saveFavorites(favorites);
};

// Fetch recipes
const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching your Recipes ...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipecontainer.innerHTML = '';

        response.meals.forEach(meals => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meals.strMealThumb}">
                <h3>${meals.strMeal}</h3>
                <p>${meals.strArea} Dish<i class="bi bi-heart-fill heart-icon ${isFavorite(meals.idMeal) ? 'active' : ''}"></i></p>
                <p>${meals.strCategory}</p>
            `;

            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Recipe';
            recipeDiv.appendChild(viewButton);

            // Add event listener to the heart icon
            const heartIcon = recipeDiv.querySelector('.heart-icon');
            heartIcon.addEventListener('click', () => {
                heartIcon.classList.toggle('active');
                toggleFavorite(meals);
            });

            // Add event listener to view button
            viewButton.addEventListener('click', () => {
                openRecipePopup(meals);
            });

            recipecontainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipecontainer.innerHTML = "<h2>Error in Fetching Recipes ...</h2>";
    }
};

// Fetch ingredients
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

// Popup for details
const openRecipePopup = (meals) => {
    recipeDetailsContent.innerHTML = `
        <h2>Recipe Details<h2>
        <img src="${meals.strMealThumb}">
        <h2 class="recipeName">${meals.strMeal}</h2>
        <h3 class="recipe">Ingredients :</h3>
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

// Search button event
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipecontainer.innerHTML = '<h2>Type the recipe in the search box.</h2>';
        return;
    }
    fetchRecipes(searchInput);
});
