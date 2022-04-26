import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import { Link } from 'react-router-dom';

export default class GetRecipeButton extends Component {
  render() {
    const recipe = this.props.recipe;
    const wide = this.props.wide;

    if (wide){
        return (     
            <div>
                <Link to={{
                pathname: "/recipe_guide",
                state: recipe
                }}>
                <button className={styles.getRecipeButton}>Get recipe!</button> 
                </Link>
            </div>
    );
    } else {
        return (     
            <div>
                <Link to={{
                pathname: "/recipe_guide",
                state: recipe
                }}>
                <button class="btn btn-outline-success">Get recipe!</button>
                </Link>
            </div>
        );  
    }
  }
}