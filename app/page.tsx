'use client';
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import client from '../app/GraphQL/apollo-client';
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_BRANDS);
  const [showAll, setShowAll] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const brands = data.findAllBrands;
  const visibleBrands = showAll ? brands : brands.slice(0, 8);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 text-black">
          <div className="container text-center md:w-1/2 mx-[200px] my-[60px]">
            <div className="logo">
              <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401177683269779537/Screenshot_2025-08-02_113106.png?ex=688f53e8&is=688e0268&hm=3e13e4b79e63a3c62a196e50da6177015a8e50cf0ae80c261539801bcca81d96&" alt=".." className="w-[200px] h-auto"/>
            </div>
            <div className="mt-[130px]">
              <h1 className="text-5xl font-bold mb-4">Browse top quality</h1>
              <h1 className="text-5xl font-bold mb-4"><span className="text-orange-600">Guitars</span> online</h1>
            <p>Explore 50k+ latest collections of branded guitars</p><p>online with VibeStrings.</p>
            </div>
          </div>
          <div className="flex flex-row md:w-1/2 p-4 justify-end">
            <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401182321696309299/Screenshot_2025-08-02_112925.png?ex=688f583a&is=688e06ba&hm=00982d242095c94875e96426bdc92d01b12ddaba87767781603cedf0e0d15238&" 
            alt=".." 
            className="top-0 right-0 w-[800px] h-auto"/>
          </div>
      </div>
      <div className="mt-[80px] px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            Featuring the <span className="text-orange-600">best brands</span>
          </h1>
          <p>
            Select your preferred brand and explore our exquisite collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {visibleBrands.map((brand: any) => (
            <div
              key={brand.id}
              className="bg-white rounded p-4 flex flex-col items-center">
              <Link href={`/brand/${brand.id}`} className="w-full">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[150px] object-cover rounded mb-2 opacity-50 hover:opacity-100 transition"
                />
              </Link>
            </div>
          ))}
        </div>


        {!showAll && brands.length > 8 && (
          <div className="text-center mt-6 mb-[200px]">
            <button
              onClick={() => setShowAll(true)}
              className="text-orange-600 font-medium hover:underline"
            >
              See more...
            </button>
          </div>
        )}
      </div>
      <div className="bg-[#121212] min-h-screen text-white pt-[100px]">
        <div className="mt-5">
          <h1 className="text-4xl text-center pb-4">Why try <span className="text-orange-600">Vibestrings?</span></h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-[100px] pt-[50px] pb-[1px]">
          <div className="container text-center md:w-1/3 flex flex-col items-center mt-[50px]">
            <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401262647512403979/Screenshot_2025-08-02_195633.png?ex=688fa309&is=688e5189&hm=181d27a21ee8bea39f485a579bd81506c6eebb104f4127250f211fee6f23dc0a&" 
              alt=".." 
              className="w-[90px] h-[90px] mb-6"/>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">SMOOTH BROWNSING</h3>
              <p className="text-gray-500">Lorem ipsum dolor sit amet,</p>
              <p className="text-gray-500">consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="container text-center md:w-1/3 flex flex-col items-center mt-[50px]">
            <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401262647722381462/Screenshot_2025-08-02_195647.png?ex=688fa309&is=688e5189&hm=0e4b505ae297b16a05edcd5eb5750cb65623b3a0f145ddb0105f06a2b26ebd5e&" 
            alt=".." 
            className="w-[90px] h-[90px] mb-6"/>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">EASY DELIVERY </h3>
              <p className="text-gray-500">Lorem ipsum dolor sit amet,</p>
              <p className="text-gray-500">consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="container text-center md:w-1/3 flex flex-col items-center mt-[50px]">
            <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401262647961194578/Screenshot_2025-08-02_195700.png?ex=688fa309&is=688e5189&hm=ccddd7426e08a2cbb70c3a5d39833450db59d67b425a88d5e6480320fcd5e526&" 
            alt=".." 
            className="w-[90px] h-[90px] mb-6"/>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">SWIFT PAYMENTS</h3>
              <p className="text-gray-500">Lorem ipsum dolor sit amet,</p>
              <p className="text-gray-500">consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 text-black py-[50px]">
        <div className="container text-center md:w-1/2 mx-[1px] my-[250px]">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Browse and buy your</h1>
            <h1 className="text-5xl font-bold mb-4"><span className="text-orange-600">favorite guitars</span> with</h1>
            <h1 className="text-5xl font-bold mb-4">Vibestrings</h1>
          </div>
          <div className="flex justify-center items-center mt-8">
            <div className="flex gap-4">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row md:w-1/2 p-4 mr-[30px] mt-[50px]">
          <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401268152427347978/Screenshot_2025-08-02_113313.png?ex=688fa829&is=688e56a9&hm=9894b7b06964e8ca46ae6d10eb8a2901ff0b6ccb9eef634df198a8ca5ec866c8&" 
            alt=".." 
            className="w-[700px] h-[600px]"/>
        </div>
      </div>
    </div>
  );
}
