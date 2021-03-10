import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteDrinks } from "../redux/drinks";
import { Link } from 'react-router-dom';

const AllFavorites = () => {
  const user = useSelector(state => state.user)
  const favorites = useSelector(state => state.drinks.favorites)
  const dispatch = useDispatch()

  useEffect(() => {
    if(user.favorites) dispatch(getFavoriteDrinks(user.favorites, 'favorites'))
  }, [user.favorites])

  return (
    <div className='for-centering-container'>
      <h3>{user.userName && `${user.userName}'s Favorites`}</h3>
      <div className='all-drinks-container'>
      {
        favorites.map(drink =>
          <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='drink-list-thumb mui-like' key={drink.idDrink} >
            <img src={drink.strDrinkThumb} className='drink-img-all' />
            {drink.strDrink}
          </Link>
        )
      }
      </div>
    </div>
  )
}

export default AllFavorites;
