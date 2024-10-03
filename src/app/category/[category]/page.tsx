"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Meal } from '../../types/types';

export default function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`/api/meals?mealType=${category}`);
                setMeals(response.data.meals);
            } catch (error) {
                console.error('Error fetching meals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [category]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='category-container'>
            <h1>{category} Meals</h1>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <h2>{meal.strMeal}</h2>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
