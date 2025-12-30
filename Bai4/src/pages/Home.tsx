import { Link } from 'react-router-dom';
import Home1 from '../assets/nike-just-do-it6.avif';
import Home2 from '../assets/nike-just-do-it7.avif';
import Home3 from '../assets/nike-just-do-it3.avif';
import Home4 from '../assets/nike-just-do-it5.avif';

// Product
import FlexTrain from '../assets/flex-train-workout-shoes-wPNoQhlS.avif';
import FreeMetcon6SE from '../assets/free-metcon-6-se-workout-shoes-0bwmKRU3.avif';
import FreeMetcon6 from '../assets/free-metcon-6-workout-shoes-Q3pWcF.avif';
import InSeasonTR14 from '../assets/in-season-tr-14-workout-shoes-sBJblR.avif';
import Metcon10 from '../assets/metcon-10-workout-shoesl.avif';
import MotivaSE from '../assets/motiva-se-walking-shoes-4JKxCrKf.avif';
import Reax8TR from '../assets/reax-8-tr-workout-shoes-K4q2TBes.avif';

const carouselProducts = [
    { id: 1, name: 'Flex Train', category: 'Workout Shoes', price: '$80', image: FlexTrain },
    { id: 2, name: 'Free Metcon 6 SE', category: 'Workout Shoes', price: '$120', image: FreeMetcon6SE },
    { id: 3, name: 'Free Metcon 6', category: 'Workout Shoes', price: '$110', image: FreeMetcon6 },
    { id: 4, name: 'In-Season TR 14', category: 'Workout Shoes', price: '$75', image: InSeasonTR14 },
    { id: 5, name: 'Metcon 10', category: 'Workout Shoes', price: '$150', image: Metcon10 },
    { id: 6, name: 'Motiva SE', category: 'Walking Shoes', price: '$90', image: MotivaSE },
    { id: 7, name: 'Reax 8 TR', category: 'Workout Shoes', price: '$85', image: Reax8TR },
];

const Home = () => {
    return (
        <div className="font-sans text-gray-900 pb-20">
            {/* Promo Banner */}
            <div className="bg-[#f5f5f5] py-2 text-center text-sm font-medium border-b border-gray-100">
                <p>Free Delivery & Returns</p>
                <Link to="/products" className="underline hover:text-gray-600 text-xs mt-0.5 block">
                    Join Now
                </Link>
            </div>

            {/* Hero Section */}
            <div className="w-full relative h-[600px] lg:h-[700px] mb-12">
                <img
                    src=''
                    alt="Hero Banner"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-20 text-center flex flex-col items-center justify-center p-4">
                    <p className="text-white font-bold tracking-widest uppercase mb-2 animate-slide-up">Luka 2</p>
                    <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 drop-shadow-lg animate-slide-up delay-200" style={{ fontFamily: 'Impact, sans-serif' }}>
                        BAD LUKA! NICE SHOES
                    </h1>
                    <div className="flex gap-4 animate-slide-up delay-500">
                        <Link to="/products" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Section - 2x2 Grid */}
            <div className="w-full mx-auto  mb-20">
                <h2 className="text-2xl font-medium mb-6">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Grid Item 1 */}
                    <Link to="/products" className="relative h-[600px] group cursor-pointer block">
                        <img
                            src={Home1}
                            alt="Kids"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="font-medium text-lg mb-4">Nike Style</p>
                            <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200">
                                Shop Lifestyle
                            </button>
                        </div>
                    </Link>

                    {/* Grid Item 2 */}
                    <Link to="/products" className="relative h-[600px] group cursor-pointer block aspect-ratio-1">
                        <img
                            src={Home2}
                            alt="Woman Running"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="font-medium text-lg mb-4">Running</p>
                            <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200">
                                Shop Running
                            </button>
                        </div>
                    </Link>

                    {/* Grid Item 3 */}
                    {/* Grid Item 3 */}
                    <Link to="/products" className="relative h-[600px] group cursor-pointer block">
                        <img
                            src={Home3}
                            alt="Mens Style"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="font-medium text-lg mb-4">Training</p>
                            <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200">
                                Shop Training
                            </button>
                        </div>
                    </Link>

                    {/* Grid Item 4 */}
                    {/* Grid Item 4 */}
                    <Link to="/products" className="relative h-[600px] group cursor-pointer block">
                        <img
                            src={Home4}
                            alt="Women Style"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-10 left-10 text-white">
                            <p className="font-medium text-lg mb-4">Jordan</p>
                            <button className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200">
                                Shop Jordan
                            </button>
                        </div>
                    </Link>
                </div>
            </div>

            {/* New You, New Year - Carousel */}
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-medium">New Year, New You</h2>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 font-bold">&lt;</button>
                        <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold">&gt;</button>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                    {carouselProducts.map((product) => (
                        <Link to={`/products/${product.id}`} key={product.id} className="min-w-[300px] lg:min-w-[calc(33.33%-16px)] snap-start cursor-pointer group block">
                            <div className="bg-[#f5f5f5] aspect-square mb-4 relative">
                                <img
                                    src={product.image}
                                    className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform group-hover:scale-105"
                                    alt={product.name}
                                />
                            </div >
                            <div>
                                <h3 className="font-medium text-base">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.category}</p>
                                <p className="font-medium mt-1">{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div >
            </div >

        </div >
    );
};

export default Home;
