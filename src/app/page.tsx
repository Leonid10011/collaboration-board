import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center p-4 pt-16 w-full h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Welcome to the Collaboration Board.</h1>
        <hr className="pt-16" />
        <Link
          className="bg-blue-600 hover:bg-blue-500 hover:cursor-default p-2 rounded text-white text-center text-lg"
          href={"/projects"}
        >
          Test without registriation
        </Link>
        <h1 className="self-center text-lg font-bold">OR</h1>
        <Link
          className="bg-blue-600 hover:bg-blue-500 hover:cursor-default p-2 rounded text-white text-center text-lg"
          href={"/signup"}
        >
          Sign-in / Sign-up{" "}
        </Link>
      </div>
    </div>
  );
}
