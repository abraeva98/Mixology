import React from "react";
import { connect } from "react-redux";
import { getAllIngredientsThunk} from "../redux/ingredients";
// import { Link } from "react-router-dom";
// import AddSpotForm from './AddSpotForm'

class AllIngredients extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId;
    console.log('the id is',id)
    this.props.getIngredients(id);
  }
  render() {
    
    // const ingredients = this.props.ingredients;
    console.log('all ingredients are',this.props)
    return (
      <div>
        <h1>Welcome to all ingredients page!</h1>
        
      </div>
    
    );
  }
}

const mapState = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getIngredients: (id) => dispatch(getAllIngredientsThunk(id)),
    // addSpot:(id,name,image,description)=>dispatch(addSpotThunk(id,name,image,description)),
    // removeSpot:(id)=>dispatch(removeSpotThunk(id))
  };
};

export default connect(mapState, mapDispatch)(AllIngredients);
