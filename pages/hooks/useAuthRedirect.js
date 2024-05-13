import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuthRedirect({ redirectTo }) {
 
const router=useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      let accessToken = localStorage.getItem("token");

      if (accessToken) {
        router.push(redirectTo);
      }
    }
  }, [redirectTo]);
}

