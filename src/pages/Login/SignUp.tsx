import { Container } from "../../components/Container";
import logoApp from "../../assets/SpacedRep.png";
import { Button } from "../../components/Button";
import { useState } from "react";
import { fetchApi } from "../../functions/fetchApi";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth";
import { errorToast, successToast } from "../../components/Toast";

interface IFields {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const { auth, updateAuth } = useAuth();

  const [fields, setFields] = useState<IFields>({
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
  });

  const handleSubmit = async () => {
    const { email, password, username } = fields;

    const response = await fetchApi(
      "/sign-up",
      { email, password, username },
      auth!,
      updateAuth,
      "POST",
      "application/json"
    );

    console.log("response", response);

    if (response.data) {
      successToast("User created!");
    } else {
      errorToast("asdsa");
      console.log(response);
    }

    navigate("/");
  };

  return (
    <Container classname="flex justify-center h-screen items-center ">
      <div className="bg-neutral-800 p-8 rounded-md">
        <div className="flex justify-center">
          <img src={logoApp} width={250} />
        </div>
        <h1 className="text-3xl text-center mb-6">Sign Up</h1>
        <input
          type="text"
          placeholder="E-mail"
          value={fields?.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          className="w-full mb-3 py-2 px-5 rounded-md text-lg outline-none"
        />
        <input
          type="text"
          placeholder="User"
          className="w-full mb-3 py-2 px-5 rounded-md text-lg outline-none"
          value={fields?.username}
          onChange={(e) => setFields({ ...fields, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full  mb-3 py-2 px-5 rounded-md text-lg outline-none"
          value={fields?.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Repeat password"
          className="w-full  mb-3 py-2 px-5 rounded-md text-lg outline-none"
          value={fields?.repeatPassword}
          onChange={(e) =>
            setFields({ ...fields, repeatPassword: e.target.value })
          }
        />
        <div className="flex justify-end gap-3 mt-3 ">
          <Button className="py-2 px-7" onClick={() => handleSubmit()}>
            Create Account
          </Button>
        </div>
      </div>
    </Container>
  );
};
