"use client";

import { gql } from "@apollo/client";
import client from "@/app/GraphQL/apollo-client";
import { useSearchParams } from "next/navigation";


const GET_MODEL_BY_ID = gql`
  query FindUniqueModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default async function ModelPage({ params }: { params: { id: string; brand: string } }) {

  const searchParams = useSearchParams();
  const brandId = searchParams.get("brandId");

  const { data } = await client.query({
    query: GET_MODEL_BY_ID,
    variables: {
      brandId: brandId!,
      modelId: params.id,
    },
  });

  const model = data.findUniqueModel;

  return (
    <div className="max-w-3xl mx-auto p-6">
      hello {model.name}
    </div>
  );
}
