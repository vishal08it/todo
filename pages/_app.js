import client from "@/graphql/apollo_client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import DefaultLayout from "./Layouts/DefaultLayout";
import ProtectedRoute from "@/Utils/protected_route";
import AuthProvider from "@/Utils/auth_provider";

export default function App({ Component, pageProps }) {
  const Layout = DefaultLayout || DefaultLayout;
  return (
    <ApolloProvider client={client}>
      {" "}
      <AuthProvider>
        <ProtectedRoute>
          {" "}
          <Component {...pageProps} />
        </ProtectedRoute>{" "}
      </AuthProvider>
    </ApolloProvider>
  );
}
