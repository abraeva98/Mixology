import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllIngredients from './components/AllIngredients'
import Request from './request-test'
import {Route, Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

const RequestFilter = (props) => {
    let {ingreds, fields, inputLen} = props
      // Handles ingredients with spaces 
    const [valid, setValid] = useState(false)
    const [validIng, setValidIng] = useState([])

    useEffect( () => {
        const reqValidator = async (ing) => {
            try{
                if(ing.includes(' ')) ing = ing.split(' ').join('_')
                // makes call to API DB .. if there is a drinks object present, set to true otherwise set to false
                const {data} = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
                if(data.drinks && !validIng.includes(ing)) {
                        setValid(true)
                        setValidIng(prev => [...prev, ing])

                } else {
                    setValid(false)

                }
            } catch(err) {
                console.log(err)
            }
            
        }

        ingreds.forEach(async ing => await reqValidator(ing))

    }, [inputLen])
    
    return (
        
        <div>
    <p>{validIng.map( (ingred) => 
    <div>
    {console.log('inside validIng.map: ', ingred)}
    <p> <AllIngredients ingred={ingred} /></p> 
      </div>
    )}</p>
    {/* {done && <AllIngredients ingreds={validIng} />} */}

    <p>See your results: </p>
    {console.log('validIng: ', validIng)}
    <Request ingreds={validIng} />
  


    
    </div>

    )}


export default RequestFilter

