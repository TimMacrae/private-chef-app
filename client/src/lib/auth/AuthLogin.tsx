import { Button } from "@/components/ui/button";
import Image from "next/image";
import TestImage from "../../../public/BCD490FE-35D8-4D99-AD26-C3699FBF2840.jpeg";
import { apiConfig } from "../api/apiConfig";

export async function AuthLogin() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src={TestImage}
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-4 right-4 flex items-center justify-center">
        <Button variant="outline" className="mr-4">
          <a href={apiConfig.URL.AUTH_REGISTER}>Register</a>
        </Button>
        <Button>
          <a href={apiConfig.URL.AUTH_LOGIN}>Login</a>
        </Button>
      </div>
    </div>
  );
}
