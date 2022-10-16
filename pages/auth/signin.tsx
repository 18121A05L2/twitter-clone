import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl p-6 rounded-[3rem] items-center flex flex-col gap-5 border ">
          <img
            className="h-[4rem] w-[4rem] hover:bg-blue-200 rounded-full p-[0.3rem] ml-4"
            src="https://links.papareact.com/drq"
            alt="twitter"
          ></img>
          <h1 className="font-bold text-[4rem]">Happening now</h1>
          <h2 className="font-bold text-[2rem]">Join Twitter today</h2>
          <div className="flex justify-between items-center border min-w-[15rem] p-3 px-6 rounded-full active:bg-twitter cursor-pointer transition duration-200 ">
            {Object.values(providers).map((provider) => (
              //   Here we are looping through all the authentication providers
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}

            <FcGoogle className="w-[1.5rem] h-[1.5rem]" />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
