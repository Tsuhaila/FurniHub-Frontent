import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="bg-gray-100  flex flex-col justify-around">
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto ml-6 py-8 flex flex-col md:flex-row justify-between">

          <div className="mb-6 md:mb-0 ml-6">
            <h4 className="text-2xl font-bold">Furniture Store</h4>
            <p className="text-gray-400 mt-2">Your go-to destination for stylish <br></br>and modern furniture.</p>
          </div>


          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0">
              <h5 className="text-lg font-bold mb-2">Quick Links</h5>
              <ul>
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/products" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div className="mb-6 md:mb-0">
              <h5 className="text-lg font-bold mb-2">Contact Us</h5>
              <ul>
                <li className="text-gray-400">Furniture</li>
                <li className="text-gray-400">kerala</li>
                <li className="text-gray-400">Email: info@furniturestore.com</li>
                <li className="text-gray-400">Phone: 9645877112</li>
              </ul>
            </div>
          </div>


          <div className='mr-14'>
            <h5 className="text-lg font-bold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <Link to="https://www.linkedin.com/in/fathimathu-suhaila-461671318/" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.349c.733 0 1.325-.591 1.325-1.324v-21.351c0-.733-.592-1.325-1.325-1.325zm-14.431 20.243h-3.633v-10.945h3.633v10.945zm-1.817-12.471c-1.163 0-2.106-.944-2.106-2.105s.944-2.105 2.106-2.105 2.105.944 2.105 2.105c.001 1.161-.943 2.105-2.105 2.105zm12.465 12.471h-3.633v-5.897c0-1.403-.025-3.211-1.955-3.211-1.955 0-2.255 1.526-2.255 3.103v6.005h-3.633v-10.945h3.489v1.497h.049c.486-.919 1.676-1.889 3.448-1.889 3.683 0 4.363 2.424 4.363 5.573v6.764zm0 0" />
                </svg>
              </Link>
              <Link to="https://www.instagram.com/s_uhaila__/" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.977.24 2.432.403a4.9 4.9 0 011.675.97 4.902 4.902 0 01.971 1.675c.164.454.35 1.261.403 2.432.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.977-.403 2.432a4.89 4.89 0 01-.97 1.675 4.9 4.9 0 01-1.675.971c-.454.164-1.261.35-2.432.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.977-.24-2.432-.403a4.89 4.89 0 01-1.675-.97 4.9 4.9 0 01-.971-1.675c-.164-.454-.35-1.261-.403-2.432-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.977.403-2.432a4.9 4.9 0 01.971-1.675 4.9 4.9 0 011.675-.971c.454-.164 1.261-.35 2.432-.403 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.261 0-3.667.013-4.947.072-1.281.059-2.156.275-2.907.588a6.88 6.88 0 00-2.492 1.643 6.872 6.872 0 00-1.643 2.492c-.313.751-.53 1.626-.588 2.907-.059 1.281-.072 1.687-.072 4.947s.013 3.667.072 4.947c.059 1.281.275 2.156.588 2.907a6.88 6.88 0 001.643 2.492 6.872 6.872 0 002.492 1.643c.751.313 1.626.53 2.907.588 1.281.059 1.687.072 4.947.072s3.667-.013 4.947-.072c1.281-.059 2.156-.275 2.907-.588a6.88 6.88 0 002.492-1.643 6.872 6.872 0 001.643-2.492c.313-.751.53-1.626.588-2.907.059-1.281.072-1.687.072-4.947s-.013-3.667-.072-4.947c-.059-1.281-.275-2.156-.588-2.907a6.88 6.88 0 00-1.643-2.492 6.872 6.872 0 00-2.492-1.643c-.751-.313-1.626-.53-2.907-.588-1.281-.059-1.687-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.163a3.998 3.998 0 110-7.996 3.998 3.998 0 010 7.996zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                </svg>
              </Link>


            </div>
          </div>

        </div>


        <div className="bg-gray-900 py-4">
          <div className="container mx-auto text-center text-gray-500">
            © 2024 Furniture Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};



