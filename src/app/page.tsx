"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import type { Category } from './types/types';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='home-container'>
      <h1>Meal Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <Link href={`/category/${category.strCategory}`}>
              {category.strCategory}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
