import React from 'react'

export default function MealItem({meal}) {
  return (
    <div>
        <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <strong>${meal.price}</strong>
    </div>
  )
}
