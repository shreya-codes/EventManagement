import Link from "next/link";
import React, { useEffect, useState } from "react";
import useMutation from "../hooks/useMutation";
import { useRouter } from "next/router";

interface IProps {
  heading: string;
}

const Header: React.FC<IProps> = ({ heading }) => {
  const { postRequest, isMutating } = useMutation();
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const token = document.cookie.includes("token");
      setHasToken(token);
    }
  }, [hasToken]);

  const handleLogout = async ({}) => {
    await postRequest("/auth/logout", {
      options: { data: {} },
      successMessage: "Logged out Successful",
      onSuccess(data) {
        router.push("/");
      },
    });
  };

  return (
    <nav className="border-b h-16 bg-white w-full md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <h1 className="text-2xl font-bold">{heading}</h1>
        </div>
        <div className="hidden md:inline-block ml-auto">
          {!hasToken && (
            <>
              <div className="inline-block px-4 py-2font-medium ">
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Login
                </Link>
              </div>
              <div className="inline-block px-4 py-2font-medium ">
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </>
          )}

          {hasToken && <button onClick={handleLogout}>Logout</button>}
        </div>{" "}
      </div>
    </nav>
  );
};

export default Header;
