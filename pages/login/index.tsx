import { FC, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

interface LoginProps {
  
}

interface FormFields {
  email: string;
  password: string;
}
 
const Login: FC<LoginProps> = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const { register, handleSubmit, formState: { errors }} = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = ({ email, password}) => {
    if (login) {
      signIn(email, password)
    } else {
      signUp(email, password)
    }
  };

  return (
    <div className="relative h-screen w-screen flex flex-col md:items-center md:justify-center bg-gradient-to-b md:bg-transparent">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute top-4 left-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={170}
        height={100}
      />
      <form className="relative md:w-full mt-24 mx-4 space-y-8 rounded-lg bg-black/50 py-10 px-6 md:mt-0 md:max-w-screen-md md:px-14" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in</h1>
        <fieldset className="flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-8">
          <label>
            <input type="email" placeholder="Email" className="input" {...register("email", { required: true })} />
            {errors.email && <span className="text-yellow-600">Please enter a valid e-mail</span>}
          </label>
          <label>
            <input type="password" placeholder="Password" className="input" {...register("password", { required: true, minLength: 4, maxLength: 20 })} />
            {errors.password && <span className="text-yellow-600">Password should contain from 4 to 20 characters</span>}
          </label>
          <button className="form-btn" type="submit" onClick={() => setLogin(true)}>Sign in</button>
        </fieldset>
        <fieldset>
          <h6 className="py-2 text-center">New to Netflix?</h6>
          <button type="submit" className="form-btn-outlined" onClick={() => setLogin(false)}>Sign up now</button>
        </fieldset>
      </form>
    </div>
  );
}
 
export default Login;