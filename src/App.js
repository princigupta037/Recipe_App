import React, { useEffect , useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const App_ID = '9b7c8cac';
  const APP_KEY = '6a923f3f7288e6d9693c3fd0130bd27f';
  // const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`;

  // const [counter , setCounter] = useState(0);

  const [recipes , setRecipes] = useState([]);
  const [search , setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  

  useEffect(() =>{
    getRecipes();
    // console.log('Effct working');
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log('data.hits',data.hits);
    // console.log('data',data);

    // fetch(exampleReq)
    // .then(response => {
    //   response.json();
    // });
  }

  const updateSearch = e => {
    setSearch(e.target.value);
 }  

 const getSearch = e => {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 }
 
 return(
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className ='search-bar' type='text' value={search} onChange={updateSearch}/>
          <button  className='search-button' type='submit'> Search </button>
        </form>
        {/* <h1 onClick={()=> setCounter(counter + 1)}> {counter}</h1> */}
        <div className='recipes'>
        {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories = {recipe.recipe.calories}
          image ={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))};
        </div>
       
    </div>
  )
}

export default App;
