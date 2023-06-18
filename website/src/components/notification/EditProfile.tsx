import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { clearNotification } from "../../redux/slices/notificationSlice";
import { updatePartnerInfo } from "../../requests/partnerRequests";
import NotificationContainer from "./NotificationContainer";
import Button from "../ui/Button";

const EditProfile = () => {
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<string | null | File>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appInfo.info) {
      setName(appInfo.info.name);
      setEmail(appInfo.info.email);
      setDescription(appInfo.info.description ? appInfo.info.description : "");
      setLogo(appInfo.info.logo);
    }
  }, [appInfo.info]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.size > 3 * 1024 * 1024) {
        alert("Maksimālais logo lielums ir 3 mb");
        return;
      }
      setLogo(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (password) {
      if (password.length < 6) {
        alert("Minimālais paroles garums ir 6 rakstzīmes");
        return;
      }

      if (password !== passwordAgain) {
        alert("Paroles nesakrīt");
        return;
      }
    }

    await updatePartnerInfo({
      dispatch,
      name,
      email,
      description,
      logo,
      password,
    });

    setLoading(false);
  };

  if (!appInfo.info) {
    return null;
  }

  return (
    <NotificationContainer className="max-w-[600px]">
      <form onSubmit={handleSave} className="w-full flex flex-col">
        <div className="w-full">
          <strong className="font-semibold text-gray-500 text-2xl">
            Informācija
          </strong>
        </div>

        <div className="w-full my-2 gap-2 flex flex-col">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="form_label">
              Nosaukums
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form_input"
              placeholder="Nosaukums"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="form_label">
              E-pasts
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form_input"
              placeholder="E-pasts"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="form_label">
              Apraksts
            </label>
            <textarea
              name="description"
              id="description"
              className="form_input p-2 h-20"
              placeholder="Apraksts"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="form_label">
              Logo
            </label>

            <div className="flex items-end justify-start gap-2">
              <label htmlFor="file" className="group relative cursor-pointer">
                {logo ? (
                  <Image
                    src={
                      typeof logo === "string"
                        ? logo
                        : URL.createObjectURL(logo)
                    }
                    alt="Partner logo"
                    width={80}
                    height={80}
                    className="rounded-md w-16 h-16 object-cover"
                  />
                ) : (
                  <div className="bg-primary-300 p-2 rounded-md w-16 h-16 flex items-center justify-center border">
                    <UserIcon className="text-accent w-8" />
                  </div>
                )}

                <div className="absolute -top-2 -right-2 bg-accent border border-white rounded-full hidden group-hover:flex items-center justify-center p-1">
                  <PencilIcon className="text-white w-4" />
                </div>
              </label>

              <label
                htmlFor="file"
                className="form_button w-20 rounded-md cursor-pointer h-8"
              >
                Mainīt
              </label>

              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={handleFileSelect}
                hidden
              />
            </div>
          </div>

          <div className="w-full">
            <button
              className="text-accent w-auto hover:underline"
              onClick={() => setChangePassword(true)}
              type="button"
            >
              Mainīt paroli
            </button>
          </div>

          {changePassword && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="form_label">
                  Parole
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form_input"
                  placeholder="Parole"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password_again" className="form_label">
                  Parole atkārtoti
                </label>
                <input
                  type="password"
                  name="password_again"
                  id="password_again"
                  className="form_input"
                  placeholder="Parole atkārtoti"
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end w-full border-t pt-2 gap-2">
          <button
            className="form_button bg-accent-100 w-14 h-8 rounded-md m-0"
            onClick={() => dispatch(clearNotification())}
            disabled={loading}
            type="button"
          >
            Atcelt
          </button>
          <Button
            className="form_button w-14 h-8 rounded-md m-0"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Ok
          </Button>
        </div>
      </form>
    </NotificationContainer>
  );
};

export default EditProfile;
