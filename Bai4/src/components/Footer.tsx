import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 font-sans">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-b border-gray-800 pb-12">
                    {/* Column 1 - Main Nav */}
                    <div className="flex flex-col gap-4">
                        <Link to="/products" className="font-bold text-sm uppercase hover:text-gray-400 transition-colors">Find A Store</Link>
                        <Link to="/products" className="font-bold text-sm uppercase hover:text-gray-400 transition-colors">Become A Member</Link>
                        <Link to="/products" className="font-bold text-sm uppercase hover:text-gray-400 transition-colors">Send Us Feedback</Link>
                    </div>

                    {/* Column 2 - Help */}
                    <div>
                        <h3 className="font-bold text-sm uppercase mb-4 text-white">Get Help</h3>
                        <ul className="flex flex-col gap-2 text-xs text-gray-400">
                            <li><Link to="#" className="hover:text-white transition-colors">Order Status</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Delivery</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Returns</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Payment Options</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 - About */}
                    <div>
                        <h3 className="font-bold text-sm uppercase mb-4 text-white">About Nike</h3>
                        <ul className="flex flex-col gap-2 text-xs text-gray-400">
                            <li><Link to="/about" className="hover:text-white transition-colors">News</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Investors</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 - Socials (Placeholder) */}
                    <div className="flex justify-start md:justify-end gap-4">
                        <SocialIcon />
                        <SocialIcon />
                        <SocialIcon />
                        <SocialIcon />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                        <span className="text-white">© 2025 Nike, Inc. All Rights Reserved</span>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Guides</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Sale</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = () => (
    <div className="w-8 h-8 bg-gray-600 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
);

export default Footer;
