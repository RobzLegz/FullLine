import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  selectCategory,
} from "../../../redux/slices/appSlice";
import {
  clearNotification,
  NotificationInfo,
  selectNotification,
  setNotification,
} from "../../../redux/slices/notificationSlice";
import { createSpot, updateSpot } from "../../../requests/spotRequests";
import { SelectCity, SelectCountry } from "../../ui/FormElements";
import { PlusIcon } from "@heroicons/react/24/solid";
import SpotProduct from "./SpotProduct";
import Button from "../../ui/Button";

const NewSpotContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const notificationInfo: NotificationInfo = useSelector(selectNotification);
  const appInfo: AppInfo = useSelector(selectApp);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [websiteUrl, setWebsiteUrl] = useState("");

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("64450f18e843597154f1d832");
  const [address, setAddress] = useState<string>("");

  const [cover, setCover] = useState<File | null | string>(null);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appInfo.cities || !appInfo.categories) {
      return;
    }

    const spo = appInfo.currentSpot;
    if (spo) {
      setTitle(spo.name);
      setDescription(spo.description ? spo.description : "");
      setWebsiteUrl(spo.website_url ? spo.website_url : "");
      setAddress(spo.location.address ? spo.location.address : "");
      if (spo.cover?.src) {
        setCover(spo.cover.src);
        setFiles([spo.cover.src, ...spo.images.map((im) => im.src)]);
      } else {
        setFiles(spo.images.map((im) => im.src));
      }

      if (spo.cityId) {
        setCity(spo.cityId);

        const spotCity = appInfo.cities?.find((cit) => cit.id === spo.cityId);
        setCountry(
          spotCity?.countryId ? spotCity.countryId : "64450f18e843597154f1d832"
        );
      }

      if (spo.categories) {
        for (const cat of spo.categories) {
          dispatch(selectCategory(cat.id));
        }
      }
    }
  }, [appInfo.currentSpot, appInfo.cities, appInfo.categories]);

  const addNewProduct = () => {
    dispatch(setNotification({ type: "spot_product" }));
  };

  const selectFile = (incFiles: FileList) => {
    let accFiles: File[] = [];

    let al = false;

    for (const file of incFiles) {
      if (file.size <= 5 * 1024 * 1024) {
        accFiles = [...accFiles, file];
      } else {
        al = true;
      }
    }

    if (!cover) {
      setCover(accFiles[0]);
    }

    setFiles([...files, ...accFiles]);

    if (al) {
      alert("Faila izmērs nedrīkst pārsniegt 5 mb");
    }
  };

  const handleDrag = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectFile(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      selectFile(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (!cover) {
      alert("Norādiet galveno lokācijas bildi");
      setLoading(false);
      return;
    }

    if (appInfo.currentSpot) {
      await updateSpot({
        id: appInfo.currentSpot.id,
        router,
        dispatch,
        name: title,
        description,
        websiteUrl,
        cityId: city,
        address,
        productCategories: appInfo.productCategories
          ? appInfo.productCategories
          : [],
        countryId: country,
        categoryIds: appInfo.selectedCategories.map((cat) => cat.id),
        images: files,
        cover: cover,
        products: appInfo.spotProducts,
      });
    } else {
      await createSpot({
        router,
        dispatch,
        name: title,
        description,
        websiteUrl,
        cityId: city,
        address,
        countryId: country,
        productCategories: appInfo.productCategories
          ? appInfo.productCategories
          : [],
        categoryIds: appInfo.selectedCategories.map((cat) => cat.id),
        images: files,
        cover: cover,
        products: appInfo.spotProducts,
      });
    }

    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-[800px] flex flex-col gap-2 mb-16"
      onSubmit={handleSubmit}
    >
      {notificationInfo.type === "form_error" && notificationInfo.message && (
        <div className="w-full p-2 bg-primary-200 rounded-sm mb-2 flex items-start justify-between gap-2 text-primary-100">
          <p>{notificationInfo.message}</p>

          <button onClick={() => dispatch(clearNotification())} type="button">
            <XMarkIcon className="text-primary-100 h-6" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="form_label">
          Nosaukums <span className="text-accent">*</span>
        </label>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Nosaukums"
          className="form_input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="info" className="form_label">
          Apraksts <span className="text-accent">*</span>
        </label>

        <textarea
          name="info"
          id="info"
          placeholder="Apraksts"
          className="form_input h-48 p-1 px-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="websiteUrl" className="form_label">
          Mājaslapa
        </label>

        <input
          type="url"
          name="websiteUrl"
          id="websiteUrl"
          placeholder="Mājaslapa"
          className="form_input"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="form_label" htmlFor="files">
          Bildes <span className="text-accent">*</span>
        </label>

        <div
          className={`w-full flex flex-col border-2 border-dashed relative h-28 rounded-lg ${
            dragActive && "border-accent"
          }`}
          onDrag={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="files"
            id="files"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />

          <div className="absolute w-full h-full flex items-center justify-center bg-transparent p-1">
            <div
              className={`flex w-full h-full flex-col items-center justify-center bg-primary-100`}
            >
              <p className="text-primary-900">Augšupielādējiet vietas bildes</p>

              <small className="text-primary-800">
                vai klikšķiniet, lai izvēlētos
              </small>
            </div>
          </div>

          <label
            htmlFor="files"
            className="w-full h-full rounded-md cursor-pointer bg-transparent z-10"
          ></label>
        </div>

        <div className="overflow-x-auto w-full whitespace-nowrap py-2">
          {files.map((file, j) => (
            <div
              className={`inline-block mr-2 ${
                file === cover ? "w-24 h-24" : "w-20 h-20"
              }`}
              key={j}
            >
              <div className="relative flex flex-col items-end justify-start group">
                <button type="button" onClick={() => setCover(file)}>
                  <Image
                    src={
                      typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                    }
                    width={80}
                    height={80}
                    alt="File preview"
                    className={`rounded-md object-cover ${
                      file === cover
                        ? "w-24 h-24 border-2 border-accent"
                        : "w-20 h-20"
                    }`}
                  />
                </button>

                <button
                  className="opacity-0 group-hover:opacity-100 transition-none absolute -top-2 -right-2 bg-accent rounded-full p-1 z-10"
                  type="button"
                  onClick={() => {
                    const newFiles = files.filter((f) => f !== file);

                    setFiles(newFiles);

                    if (cover === file && newFiles.length > 0) {
                      setCover(newFiles[0]);
                    }
                  }}
                >
                  <TrashIcon className="w-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 my-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="form_label">
            Valsts <span className="text-accent">*</span>
          </label>

          <SelectCountry
            name="country"
            id="country"
            placeholder="Valsts"
            className="form_input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="form_label">
            Pilsēta <span className="text-accent">*</span>
          </label>

          <SelectCity
            name="city"
            id="city"
            placeholder="Pilsēta"
            className="form_input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            countryId={country}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="form_label">
            Adrese <span className="text-accent">*</span>
          </label>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="Adrese"
            className="form_input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="form_label cursor-default">
          Kategorijas{" "}
          <span className="text-gray-500 text-xs">
            Norādiet līdz 3 kategorijām, lai efektīvāk sasniegtu savu
            mērķauditoriju
          </span>
        </p>

        <button
          className="form_input justify-start"
          type="button"
          onClick={() =>
            dispatch(
              setNotification({
                type: "category_popup",
                params: { spot: true },
              })
            )
          }
        >
          Izvēlēties
        </button>
      </div>

      <div className="w-full flex flex-wrap gap-2">
        {appInfo.selectedCategories &&
          appInfo.selectedCategories.map((cat, i) => {
            return (
              <button
                className="px-4 rounded-full text-primary-800 border relative group"
                key={i}
                onClick={() => dispatch(selectCategory(cat.id))}
              >
                <p>{cat.name}</p>

                <div className="absolute -top-2 -right-2 bg-accent flex items-center justify-center p-1 rounded-full opacity-0 group-hover:opacity-100">
                  <TrashIcon className="w-3 text-white" />
                </div>
              </button>
            );
          })}
      </div>

      <div className="w-full flex flex-col gap-1 mt-4 mb-8">
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center justify-start">
            <strong className="text-lg">Produkti </strong>

            <button
              className="bg-accent rounded-full w-5 h-5 flex items-center justify-center ml-1"
              type="button"
              onClick={addNewProduct}
            >
              <PlusIcon className="h-4 text-white" />
            </button>
          </div>

          <span className="text-gray-500 text-xs">
            Pievienojiet produktus ko šajā vietā var iegādāties
          </span>

          {appInfo.spotProducts.length > 0 ? (
            <table className="mt-4 w-full">
              <thead className="w-full">
                <tr className="w-full">
                  <td>Nr.</td>
                  <td>Bilde</td>
                  <td>Nosaukums</td>
                  <td>Cena</td>
                  <td>Kategorija</td>
                  <td>Darbības</td>
                </tr>
              </thead>
              <tbody className="w-full">
                {appInfo.spotProducts.map((product, i) => (
                  <SpotProduct {...product} index={i} key={i} />
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>

      <Button
        className="form_button"
        type="submit"
        loading={loading}
        disabled={loading}
      >
        {!appInfo.currentSpot ? "Izveidot" : "Atjaunot"}
      </Button>
    </form>
  );
};

export default NewSpotContainer;
