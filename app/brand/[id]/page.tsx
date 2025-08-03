"use client";

import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import client from "@/app/GraphQL/apollo-client";
import Link from "next/link";

// GraphQL Queries
const SEARCH_MODELS_BY_NAME = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

const GET_MODELS_SORTED = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

export default function BrandPage({ params }: { params: { id: string } }) {
  const [selectedType, setSelectedType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [models, setModels] = useState([]);

  const [searchModels] = useLazyQuery(SEARCH_MODELS_BY_NAME, { client });
  const [getSortedModels] = useLazyQuery(GET_MODELS_SORTED, { client });

  const fetchModels = async () => {
    const { data } = await getSortedModels({
      variables: {
        id: params.id,
        sortBy: { field: "name", order: "ASC" },
      },
    });
    if (data?.findBrandModels) {
      setModels(data.findBrandModels);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [params.id]);

  useEffect(() => {
    if (searchText.trim()) {
      searchModels({
        variables: { brandId: params.id, name: searchText },
      }).then(({ data }) => {
        if (data?.searchModels) setModels(data.searchModels);
      });
    } else {
      fetchModels();
    }
  }, [searchText]);

  const filteredModels = selectedType
    ? models.filter((m: any) => m.type === selectedType)
    : models;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 text-black">
          <div className="container text-center md:w-1/2 mx-[200px] my-[60px]">
            <div className="logo">
              <img src="https://cdn.discordapp.com/attachments/1385609400923717773/1401177683269779537/Screenshot_2025-08-02_113106.png?ex=688f53e8&is=688e0268&hm=3e13e4b79e63a3c62a196e50da6177015a8e50cf0ae80c261539801bcca81d96&" alt=".." className="w-[200px] h-auto"/>
            </div>
            <div className="mt-[100px]">
              <h1 className="text-5xl font-bold mb-[50px]">Play like a <span className="text-orange-600">Rock star</span></h1>
              <p>With a legacy dating back to the 1950s, Ibanez blends expert<br/>
              craftsmanship with cutting-edge innovation to deliver guitars that<br/>
              inspire creativity and elevate your performance. Trusted by top<br/>
              artists worldwide, Ibanez guitars are built to play fast, sound bold,<br/>
              and stand out on any stage.<br/>
              Ask ChatGPT</p>

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
            Check out the <span className="text-orange-600">selection</span>
          </h1>
          <div className="flex justify-center">
            <div className="flex items-center gap-4 mb-6">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-60 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                <option value="">Filter by Type</option>
                <option value="Bass">Bass</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Electric">Electric</option>
              </select>

              <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded border border-gray-300 w-64">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  type="search"
                  required
                  placeholder="Search"
                  className="bg-transparent focus:outline-none w-full text-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {filteredModels.map((model: any) => (
              <Link
                key={model.id}
                href={`/model/${model.id}?brandId=${params.id}`}
              >
                <div className="bg-white p-4 rounded cursor-pointer hover:shadow-md transition">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="object-cover rounded mb-[80px]"
                  />
                  <h2 className="text-xl font-semibold">{model.name}</h2>
                  <p className="mt-2 text-gray-600 font-bold">${model.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-around m-8">
          <div className="text-gray-600 text-sm">
            <p>Showing {filteredModels.length} results from 400</p>
          </div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">1</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">3</button>
            <span className="text-sm text-gray-500">...</span>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Next ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
