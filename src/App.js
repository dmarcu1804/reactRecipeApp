import './App.css';
import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';


const App = () =>{
  const API_KEY = "234bc8af840f47c89ed2b61f22326c44";
  //const exampleReq = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${API_KEY}`

  //state recipes
  const [recipes, setRecipes] = useState([]);
  //state search
  const [search, setSearch] = useState("");
  //state to only request when search button is pressed
  const [query, setQuery] = useState('chicken');


  useEffect( () => {
    getRecipes();
    console.log("Effect running");
    }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=True&addRecipeNutrition=True`);
    const data = await response.json();

    console.log(data.results);
    //adding data to recipes state
    setRecipes(data.results);
  }

  //every time you get an onChange, you will get this event
  const updateSearch = e => {
    //setting search state to value of the input
    setSearch(e.target.value);
    //console.log(search);
  }

  //function that will search for new things - it will help that only when the search button is pressed, only one request is made
  //form on  submit event
  const getSearch = e => {
    //stops page refresh
    e.preventDefault();
    //updating state to the input of search
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="divmap">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.title}
          title={recipe.title} 
          readyInMinutes = {recipe.readyInMinutes} 
          healthScore = {recipe.healthScore} 
          protein = {recipe.nutrition.caloricBreakdown.percentProtein}
          summary = {recipe.summary}
          ingredients = {recipe.nutrition.ingredients}
          image={recipe.image} 
        />
      ))};
      </div>
    </div>
  );
  
}

export default App;
