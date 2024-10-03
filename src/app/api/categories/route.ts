import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        return NextResponse.json({ categories: response.data.categories });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
