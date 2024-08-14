

import React from 'react';

export const Footer = () => {
  return (
    <div className="bg-gray-100  flex flex-col justify-between">
     

   
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between">
       
          <div className="mb-6 md:mb-0 ml-6">
            <h4 className="text-2xl font-bold">Furniture Store</h4>
            <p className="text-gray-400 mt-2">Your go-to destination for stylish and modern furniture.</p>
          </div>

    
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0">
              <h5 className="text-lg font-bold mb-2">Quick Links</h5>
              <ul>
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/shoppage" className="text-gray-400 hover:text-white">Shop</a></li>
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

      
          <div className='ml'>
            {/* <h5 className="text-lg font-bold mb-2">Follow Us</h5> */}
            <div className="flex space-x-4">
              {/* <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.349c.733 0 1.325-.591 1.325-1.324v-21.351c0-.733-.592-1.325-1.325-1.325zm-14.431 20.243h-3.633v-10.945h3.633v10.945zm-1.817-12.471c-1.163 0-2.106-.944-2.106-2.105s.944-2.105 2.106-2.105 2.105.944 2.105 2.105c.001 1.161-.943 2.105-2.105 2.105zm12.465 12.471h-3.633v-5.897c0-1.403-.025-3.211-1.955-3.211-1.955 0-2.255 1.526-2.255 3.103v6.005h-3.633v-10.945h3.489v1.497h.049c.486-.919 1.676-1.889 3.448-1.889 3.683 0 4.363 2.424 4.363 5.573v6.764zm0 0"/>
                </svg>
              </a> */}
              {/* <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M24 4.556c-.883.392-1.833.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.565-2.005.974-3.127 1.194-.897-.956-2.177-1.555-3.594-1.555-2.719 0-4.92 2.201-4.92 4.92 0 .385.043.76.127 1.118-4.088-.205-7.719-2.164-10.141-5.144-.423.725-.665 1.566-.665 2.465 0 1.701.866 3.2 2.181 4.078-.804-.026-1.561-.247-2.226-.616v.061c0 2.377 1.692 4.358 3.937 4.809-.413.112-.849.171-1.296.171-.318 0-.627-.031-.929-.089.631 1.965 2.464 3.396 4.632 3.435-1.698 1.33-3.84 2.122-6.166 2.122-.401 0-.798-.024-1.188-.069 2.198 1.41 4.807 2.231 7.611 2.231 9.125 0 14.114-7.557 14.114-14.113 0-.215-.005-.429-.014-.643.968-.699 1.804-1.57 2.465-2.563z"/>
                </svg>
              </a> */}
             
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



