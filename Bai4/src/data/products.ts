// Product Imports
import FlexTrain from '../assets/flex-train-workout-shoes-wPNoQhlS.avif';
import FreeMetcon6SE from '../assets/free-metcon-6-se-workout-shoes-0bwmKRU3.avif';
import FreeMetcon6 from '../assets/free-metcon-6-workout-shoes-Q3pWcF.avif';
import InSeasonTR14 from '../assets/in-season-tr-14-workout-shoes-sBJblR.avif';
import Metcon10 from '../assets/metcon-10-workout-shoesl.avif';
import MotivaSE from '../assets/motiva-se-walking-shoes-4JKxCrKf.avif';
import Reax8TR from '../assets/reax-8-tr-workout-shoes-K4q2TBes.avif';
import nike from '../assets/AIR+MAX+TL+2.5.avif';
import shox from '../assets/NIKE+SHOX+RIDE+2.avif';

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export const PRODUCTS: Product[] = [
    { id: 1, title: 'Flex Train', category: 'Workout Shoes', price: 80, image: FlexTrain, description: 'Flexible and comfortable for daily workouts.' },
    { id: 2, title: 'Free Metcon 6 SE', category: 'Workout Shoes', price: 120, image: FreeMetcon6SE, description: 'Special edition with enhanced stability.' },
    { id: 3, title: 'Free Metcon 6', category: 'Workout Shoes', price: 110, image: FreeMetcon6, description: 'The ultimate training shoe used by athletes.' },
    { id: 4, title: 'In-Season TR 14', category: 'Workout Shoes', price: 75, image: InSeasonTR14, description: 'Great for cardio and light lifting.' },
    { id: 5, title: 'Metcon 10', category: 'Workout Shoes', price: 150, image: Metcon10, description: 'The latest in the Metcon series, built for power.' },
    { id: 6, title: 'Motiva SE', category: 'Walking Shoes', price: 90, image: MotivaSE, description: 'Designed for comfort on long walks.' },
    { id: 7, title: 'Reax 8 TR', category: 'Workout Shoes', price: 85, image: Reax8TR, description: 'Responsive cushioning for every step.' },
    { id: 8, title: 'Nike Air Max TL 2.5', category: 'Men\'s Shoes', price: 170, image: nike, description: 'Bringing back the late-90s aesthetic with full-length Max Air cushioning.' },
    { id: 9, title: 'Nike Shox Ride 2', category: 'Men\'s Shoes', price: 180, image: shox, description: 'Responsive cushioning with four columns of support under the heel.' },
];
