import React from 'react';
import about from '../Assets/Furniture.jpg';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div>

      <section className="container mx-auto p-6 mt-12 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center mt-6 ml-8">
          <div className="md:w-1/3">
            <img
              src={about}
              alt="Furniture display"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:pl-6">
            <h3 className="text-3xl font-bold text-gray-800 text-left">About Us</h3>
            <p className="text-gray-600 leading-relaxed mt-4">
              Welcome to Furniture Store! We are passionate about providing high-quality, stylish furniture that transforms your home into a comfortable and beautiful space. With years of experience in the industry, our mission is to offer a wide range of furniture pieces that cater to every taste and budget.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our team is dedicated to helping you find the perfect furniture to suit your needs. Whether you're looking for a cozy sofa, a sturdy dining table, or a sleek office chair, we have something for everyone. We believe that great furniture should be accessible to all, and we strive to deliver exceptional value and service to our customers.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Thank you for choosing Furniture Store. We look forward to helping you create the home of your dreams.
            </p>
            <div className="mt-6">
              <Link to="/contact">
                <button className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
