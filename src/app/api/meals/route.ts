import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const mealType = url.searchParams.get('mealType');

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`);
        return NextResponse.json({ meals: response.data.meals });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 });
    }
}
