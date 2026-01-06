import React, { useEffect ,useState} from 'react'
import MealItem from './MealItem'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [isLOading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() =>{
    const fetchMeals = async () => {
      try{
        const response = await fetch("http://localhost:3000/meals")
        if(!response.ok){
          throw new Error("Something went wrong")
        }
        const data = await response.json()
        setMeals(data)
      }catch(error){
        setError(error.message)
      }finally{
        setIsLoading(false)
      }
    }
    fetchMeals()
  },[])
  console.log(meals)

  if(isLOading) return <p>Loading...</p>;
  if(error) return <p>{error}</p>;
  return (
    <>
    {
      meals.maps((meal) =>(
        <div key={meal.id}>
          <MealItem meal={meal} />
        </div>
      ))
    }
    </>
  )
}
