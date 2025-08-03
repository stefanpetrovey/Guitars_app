'use client';

import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/apollo-client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
