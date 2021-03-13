import React from 'react';
import style from './recipe.module.css'

const Recipe = ({title, readyInMinutes, healthScore,protein,summary,ingredients, image}) => {
    return(
        <div className={style.divmap}>
            <h1>{title}</h1>
            <h2>Health score: {healthScore}</h2>
            
            <p>Ready in: {readyInMinutes} minutes</p>
            <p>Protein: {protein}</p>
            
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.name}  {ingredient.amount}%</li>
                ))}
            </ol>
            <img className = {style.image} src={image} alt=""/>
        </div>
    );
}

export default Recipe;