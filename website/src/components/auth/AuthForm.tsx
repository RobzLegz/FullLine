import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { loginPartner, registerPartner } from "../../requests/partnerRequests";
import Button from "../ui/Button";

interface Props {
  register?: boolean;
}

const AuthForm: React.FC<Props> = ({ register = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const appInfo: AppInfo = useSelector(selectApp);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appInfo.info) {
      router.replace("/profils");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (register) {
      await registerPartner({ email, name, password, router, dispatch });
    } else {
      await loginPartner({ email, password, router, dispatch });
    }

    setLoading(false);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen p-2">
      <strong className="text-primary-800 text-2xl mb-4">
        {register ? "Pievienoties" : "Ieiet profilā"}
      </strong>

      <form
        className="flex flex-col items-start justify-start w-[96vw] max-w-[500px] gap-2"
        onSubmit={handleSubmit}
      >
        {register && (
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="mb-1 text-gray-900">
              Nosaukums
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nosaukums"
              className="form_input"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="mb-1 text-gray-900">
            E-pasts
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-pasts"
            className="form_input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="mb-1 text-gray-900">
            Parole
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Parole"
            className="form_input"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {register && (
          <div className="flex w-full items-center justify-start mt-2">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              className="w-3.5 h-3.5 mr-1"
              required
            />
            <label htmlFor="agreed" className="text-gray-900">
              Piekrītu{" "}
              <Link href="/privatuma-politika" className="text-accent">
                privātuma politikai
              </Link>{" "}
              un{" "}
              <Link href="/lietosanas-noteikumi" className="text-accent">
                lietošanas nosacījumiem
              </Link>
            </label>
          </div>
        )}

        <Button
          type="submit"
          className="form_button"
          loading={loading}
          disabled={loading}
        >
          {register ? "Reģistrēties" : "Ienākt"}
        </Button>

        <p className="text-gray-900">
          {register ? "Jau ir konts?" : "Nav konts?"}{" "}
          <Link
            href={register ? "/auth/login" : "/auth/register"}
            className="opacity-100 underline text-accent"
          >
            {register ? "Ienāc profilā" : "Kļūsti par organizatoru"}
          </Link>
        </p>

        {/* {!register && (
          <div className="w-full mt-4 flex items-center justify-center">
            <Link
              href="/organizatoriem/aizmirsi-paroli"
              className="opacity-100 text-gray-500 text-center"
            >
              Aizmirsi paroli?
            </Link>
          </div>
        )} */}
      </form>
    </section>
  );
};

export default AuthForm;
