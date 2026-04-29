import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarDemo } from "../NavbarDemo";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Background decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="z-10 text-center px-4 max-w-lg mx-auto">
          {/* Glassmorphism Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl rounded-3xl p-10 transform transition-all hover:scale-105 duration-500">
            
            <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2 mt-4">
              404
            </h1>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Looks like this page had a breakout.
            </h2>
            
            <p className="text-gray-500 mb-8 leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it's just doing its skincare routine.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
              >
                Go Back
              </button>
              
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
