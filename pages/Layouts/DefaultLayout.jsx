import { useRouter } from "next/router";

const DefaultLayout = ({ children }) => {
  const router = useRouter();

  // Check if user is already logged in, redirect to Main Layout if true

  return <div>{children}</div>;
};

export default DefaultLayout;
