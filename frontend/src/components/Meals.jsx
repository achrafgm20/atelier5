import React, { useEffect ,useState} from 'react'
import MealItem from './MealItem'

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() =>{
    const fetchMeals = async () => {
      try{
        const response = await fetch(`${API_URL}/meals`)
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
  },)
 

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>{error}</p>;

  const mealList = () =>{
    if(meals.length > 0){
      return   meals.map((meal) =>(
        <div key={meal.id}>
          <MealItem meal={meal} />
        </div>
      ))
    }else {
      return <p>No meals found</p>
    }
  }
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold text-center mb-8'>
        All Meals
      </h2>
       
      <div className="grid w-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealList()}
      </div>
    </div>
  )
}
