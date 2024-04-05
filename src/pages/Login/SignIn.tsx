import { Container } from "../../components/Container";
import logoApp from "../../assets/SpacedRep.png";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";

interface IFields {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { updateAuth } = useAuth();
  const [fields, setFields] = useState<IFields>({ email: "", password: "" });
  const signInUrl = new URL(`sign-in`, import.meta.env.APP_API_URL);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(signInUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: fields.email.trim(),
        password: fields.password,
      }),
    });

    const data = await response.json();

    if (data) {
      updateAuth(data);
    }
  };

  return (
    <Container classname="flex justify-center h-screen items-center ">
      <div className="bg-neutral-800 py-8 px-10 rounded-md">
        <div className="flex justify-center">
          <img src={logoApp} width={250} />
        </div>
        <h1 className="text-3xl text-center mb-6">Login</h1>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="E-mail"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
            className="w-[450px] mb-3 py-2 px-5 rounded-md text-lg outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={fields.password}
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
            className="w-[450px]  mb-3 py-2 px-5 rounded-md text-lg outline-none"
          />
        </div>
        <div className="flex flex-col items-center gap-3 mt-8">
          <Button className="py-2 px-7 w-full" onClick={() => handleLogin()}>
            Sign in
          </Button>
          <p
            className="border-b-2 border-neutral-400"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </p>
        </div>
      </div>
    </Container>
  );
};
