import Home3 from '../assets/nike-just-do-it3.avif';
import Home2 from '../assets/nike-just-do-it7.avif';

const About = () => {
    return (
        <div className="font-sans text-gray-900 pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[500px] mb-20 overflow-hidden">
                <img
                    src={Home3}
                    alt="About Hero"
                    className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-8">
                    <h1 className="text-6xl md:text-8xl font-black uppercase text-white mb-6 animate-slide-up" style={{ fontFamily: 'Impact, sans-serif' }}>
                        ABOUT US
                    </h1>
                    <p className="text-white text-xl md:text-2xl font-medium max-w-2xl animate-slide-up delay-200">
                        IF YOU HAVE A BODY, YOU ARE AN ATHLETE.
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mission Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                    <div className="animate-slide-up delay-300">
                        <h2 className="text-4xl font-bold mb-6 tracking-tight">Our Mission</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Our mission is what drives us to do everything possible to expand human potential.
                            We do that by creating groundbreaking sport innovations, by making our products more sustainably,
                            by building a creative and diverse global team and by making a positive impact in communities where we live and work.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Based in Beaverton, Oregon, NIKE, Inc. includes the Nike, Converse, and Jordan brands.
                        </p>
                    </div>
                    <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden animate-slide-in-right delay-300">
                        <img
                            src={Home2}
                            alt="Innovation"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Stats / Impact Section */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-wider">The Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors animate-slide-up delay-200">
                            <div className="text-5xl font-black text-black mb-4">50+</div>
                            <h3 className="text-xl font-bold mb-2">Years of Innovation</h3>
                            <p className="text-gray-500">Redefining sport for the next generation.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors animate-slide-up delay-300">
                            <div className="text-5xl font-black text-black mb-4">100%</div>
                            <h3 className="text-xl font-bold mb-2">Renewable Energy</h3>
                            <p className="text-gray-500">Powering our owned and operated facilities.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors animate-slide-up delay-500">
                            <div className="text-5xl font-black text-black mb-4">$140M</div>
                            <h3 className="text-xl font-bold mb-2">Invested in Communities</h3>
                            <p className="text-gray-500">Driving positive impact around the globe.</p>
                        </div>
                    </div>
                </div>

                {/* Join Us CTA */}
                <div className="bg-black text-white rounded-2xl p-16 text-center animate-fade-in delay-200">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                        JOIN THE TEAM
                    </h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Be a part of something bigger. Discover your potential with us.
                    </p>
                    <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Careers at Nike
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
