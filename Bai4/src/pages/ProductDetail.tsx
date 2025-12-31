import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useState } from 'react';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Find the product from local data
    const product = PRODUCTS.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button onClick={() => navigate('/products')} className="underline">Back to Products</button>
            </div>
        );
    }

    const sizes = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11'];

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-gray-900 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 sticky top-24 h-fit">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="aspect-square bg-[#f5f5f5] rounded-md overflow-hidden relative animate-fade-in">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply p-8 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="lg:col-span-4 lg:pl-8 animate-slide-up delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-2xl font-medium mb-1">{product.title}</h1>
                    <p className="text-base font-medium mb-2">{product.category}</p>
                    <p className="text-base font-medium mb-6">${product.price}</p>

                    {/* Size Selection */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Select Size</span>
                            <span className="text-gray-500 text-sm cursor-pointer hover:text-black">Size Guide</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 rounded-md border text-center text-sm font-medium hover:border-black transition-colors ${selectedSize === size ? 'border-black text-black' : 'border-gray-200 text-gray-900'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 mb-8">
                        <button className="w-full py-4 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                            Add to Bag
                        </button>
                        <button className="w-full py-4 rounded-full border border-gray-300 font-medium hover:border-black transition-colors flex items-center justify-center gap-2">
                            Favorite <span className="text-xl">♡</span>
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <p className="leading-relaxed text-base">
                            {product.description}
                        </p>
                        <ul className="list-disc list-inside mt-4 text-base pl-2 space-y-1">
                            <li>Colour Shown: Multi-Color/Black/White</li>
                            <li>Style: {`NK-${product.id}00${product.id}`}</li>
                        </ul>
                    </div>

                    {/* Accordions (Simulated) */}
                    <div className="border-t border-gray-200 py-4 cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">Shipping & Returns</span>
                            <span className="transform group-hover:rotate-180 transition-transform">▼</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 py-4 cursor-pointer group">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-lg">Reviews (0)</span>
                            <span className="transform group-hover:rotate-180 transition-transform">▼</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
