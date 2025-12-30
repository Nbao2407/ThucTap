import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';

const ProductList = () => {
    const products = PRODUCTS;
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState('featured');

    const [selectedGender, setSelectedGender] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

    const toggleGender = (gender: string) => {
        setSelectedGender(prev =>
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    const togglePrice = (priceRange: string) => {
        setSelectedPrice(prev =>
            prev.includes(priceRange) ? prev.filter(p => p !== priceRange) : [...prev, priceRange]
        );
    };

    // Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by Gender (Category)
        if (selectedGender.length > 0) {
            result = result.filter(product => {
                const categoryLower = product.category.toLowerCase();
                return selectedGender.some(g => {
                    if (g === 'Men') return categoryLower.includes("men") && !categoryLower.includes("women");
                    if (g === 'Women') return categoryLower.includes("women");
                    if (g === 'Unisex') return true; 
                    return false;
                });
            });
        }

        // Filter by Price
        if (selectedPrice.length > 0) {
            result = result.filter(product => {
                return selectedPrice.some(range => {
                    if (range === '0-50') return product.price <= 50;
                    if (range === '50-100') return product.price > 50 && product.price <= 100;
                    if (range === '100-150') return product.price > 100 && product.price <= 150;
                    if (range === '150+') return product.price > 150;
                    return false;
                });
            });
        }

        // Sort
        return result.sort((a, b) => {
            if (sortBy === 'price-low-high') return a.price - b.price;
            if (sortBy === 'price-high-low') return b.price - a.price;
            return 0;
        });
    }, [products, sortBy, selectedGender, selectedPrice]);

    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sticky top-0 bg-white z-10 py-4">
                <h1 className="text-2xl font-medium">Products<span className="text-gray-500 text-lg">({filteredProducts.length})</span></h1>

                <div className="flex items-center gap-6 mt-4 md:mt-0 relative">
                    <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="flex items-center gap-2 hover:text-gray-600 font-medium"
                    >
                        {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18H7.5M8.25 12h12m-12 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 12H5.25" /></svg>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 hover:text-gray-600 font-medium"
                        >
                            Sort By: <span className="text-gray-500">{sortBy === 'featured' ? 'Featured' : sortBy === 'price-low-high' ? 'Price: Low-High' : 'Price: High-Low'}</span>
                            <svg className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-2 border border-gray-100">
                                <button
                                    onClick={() => { setSortBy('featured'); setIsSortOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'featured' ? 'font-bold' : ''}`}
                                >
                                    Featured
                                </button>
                                <button
                                    onClick={() => { setSortBy('price-low-high'); setIsSortOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'price-low-high' ? 'font-bold' : ''}`}
                                >
                                    Price: Low-High
                                </button>
                                <button
                                    onClick={() => { setSortBy('price-high-low'); setIsSortOpen(false); }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'price-high-low' ? 'font-bold' : ''}`}
                                >
                                    Price: High-Low
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                {isFilterVisible && (
                    <div className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin transition-all duration-300">
                        <div className="border-t border-gray-200 py-4">
                            <h3 className="font-medium mb-3">Gender</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => toggleGender('Men')} checked={selectedGender.includes('Men')} />
                                    <label>Men</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => toggleGender('Women')} checked={selectedGender.includes('Women')} />
                                    <label>Women</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => toggleGender('Unisex')} checked={selectedGender.includes('Unisex')} />
                                    <label>Unisex</label>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 py-4">
                            <h3 className="font-medium mb-3">Shop By Price</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => togglePrice('0-50')} checked={selectedPrice.includes('0-50')} />
                                    <label>$0 - $50</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => togglePrice('50-100')} checked={selectedPrice.includes('50-100')} />
                                    <label>$50 - $100</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => togglePrice('100-150')} checked={selectedPrice.includes('100-150')} />
                                    <label>$100 - $150</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-gray-300" onChange={() => togglePrice('150+')} checked={selectedPrice.includes('150+')} />
                                    <label>$150+</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="group cursor-pointer animate-fade-in opacity-0"
                                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                            >
                                {/* Image */}
                                <div className="aspect-square bg-[#f5f5f5] mb-4 relative overflow-hidden">
                                    <Link to={`/products/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain mix-blend-multiply p-4"
                                        />
                                    </Link>
                                </div>

                                {/* Content */}
                                <div className="space-y-1">
                                    <p className="text-[#9e3500] font-medium text-base">Just In</p>
                                    <Link to={`/products/${product.id}`} className="block">
                                        <h3 className="font-medium text-base text-black">{product.title}</h3>
                                    </Link>
                                    <p className="text-gray-500 text-base">{product.category}</p>
                                    <p className="font-medium text-base mt-2 pt-2">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
