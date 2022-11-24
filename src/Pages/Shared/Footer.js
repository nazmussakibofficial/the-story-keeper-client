import React from 'react';

const Footer = () => {
    return (
        <div className='pt-10'>
            <footer className="footer grid-rows-2 p-10 bg-neutral text-neutral-content">
                <div>
                    <span className="footer-title">Services</span>
                    <a href='/' className="link link-hover">Branding</a>
                    <a href='/' className="link link-hover">Design</a>
                    <a href='/' className="link link-hover">Marketing</a>
                    <a href='/' className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a href='/' className="link link-hover">About us</a>
                    <a href='/' className="link link-hover">Contact</a>
                    <a href='/' className="link link-hover">Jobs</a>
                    <a href='/' className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a href='/' className="link link-hover">Terms of use</a>
                    <a href='/' className="link link-hover">Privacy policy</a>
                    <a href='/' className="link link-hover">Cookie policy</a>
                </div>
                <div>
                    <span className="footer-title">Social</span>
                    <a href='/' className="link link-hover">Twitter</a>
                    <a href='/' className="link link-hover">Instagram</a>
                    <a href='/' className="link link-hover">Facebook</a>
                    <a href='/' className="link link-hover">Github</a>
                </div>
                <div>
                    <span className="footer-title">Explore</span>
                    <a href='/' className="link link-hover">Features</a>
                    <a href='/' className="link link-hover">Enterprise</a>
                    <a href='/' className="link link-hover">Security</a>
                    <a href='/' className="link link-hover">Pricing</a>
                </div>
                <div>
                    <span className="footer-title">Apps</span>
                    <a href='/' className="link link-hover">Mac</a>
                    <a href='/' className="link link-hover">Windows</a>
                    <a href='/' className="link link-hover">iPhone</a>
                    <a href='/' className="link link-hover">Android</a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;