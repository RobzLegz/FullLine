import React, { useEffect, useRef, useState } from "react";
import NotificationContainer from "./NotificationContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationInfo,
  clearNotification,
  selectNotification,
} from "../../redux/slices/notificationSlice";
import Image from "next/image";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { createProduct, updateProduct } from "../../requests/productRequests";
import { Product } from "../../interfaces/backendSafe";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategories,
} from "../../requests/categoryRequests";
import Button from "../ui/Button";

const NewSpotProduct = () => {
  const dispatch = useDispatch();

  const notificationInfo: NotificationInfo = useSelector(selectNotification);
  const appInfo: AppInfo = useSelector(selectApp);

  const [title, setTitle] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState<File | null | string>(null);
  const [images, setImages] = useState<(File | string)[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<"Produkts" | "Kategorijas">("Produkts");

  const productCategoriesFetchedRef = useRef(false);

  useEffect(() => {
    const prod: Product = notificationInfo.params;

    if (prod) {
      setTitle(prod.title);
      setDescription(prod.description);
      setPrice(String(prod.price));

      if (prod.cover) {
        setCover(prod.cover.src);
        setImages([...prod.images.map((im) => im.src), prod.cover.src]);
      } else {
        setImages(prod.images.map((im) => im.src));
      }

      if (prod.categoryId) {
        setCategory(prod.categoryId);
      }
    }
  }, [notificationInfo.params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (page === "Kategorijas") {
      await createProductCategory({ dispatch, name: categoryName });

      setCategoryName("");

      setLoading(false);
      return;
    }

    if (!cover) {
      setLoading(false);
      alert("Norādiet produkta galveno bildi");
      return;
    }

    if (!notificationInfo.params) {
      await createProduct({
        dispatch,
        title,
        description,
        price,
        category,
        cover,
        images,
      });
    } else {
      await updateProduct({
        id: notificationInfo.params.id,
        dispatch,
        title,
        description,
        category,
        price,
        cover,
        images,
      });
    }

    setLoading(true);
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

    setImages([...images, ...accFiles]);

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

  return (
    <NotificationContainer className="max-w-[600px] w-full max-h-[96vh]">
      <form className="p-2 w-full" onSubmit={handleSubmit}>
        <strong className="flex-auto font-semibold text-gray-500 text-2xl">
          {page}
        </strong>

        <div className="w-full flex my-2">
          <button
            className={`flex-1 h-8 items-center justify-center border-b-[3px] ${
              page === "Produkts"
                ? "border-accent text-accent"
                : "border-transparent"
            }`}
            onClick={() => setPage("Produkts")}
            type="button"
          >
            Produkts
          </button>
          <button
            className={`flex-1 h-8 items-center justify-center border-b-[3px] ${
              page === "Kategorijas"
                ? "border-accent text-accent"
                : "border-transparent"
            }`}
            onClick={() => setPage("Kategorijas")}
            type="button"
          >
            Kategorijas
          </button>
        </div>

        {page === "Produkts" ? (
          <div className="w-full gap-2 flex flex-col mt-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="form_label">
                Nosaukums <span className="text-accent">*</span>
              </label>

              <input
                type="text"
                name="title"
                id="title"
                placeholder="Nosaukums"
                className="form_input h-8"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="form_label">
                Apraksts
              </label>

              <textarea
                name="description"
                id="description"
                placeholder="Apraksts"
                className="form_input h-20 p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="form_label">
                Cena <span className="text-accent">*</span>
              </label>

              <input
                type="number"
                name="price"
                id="price"
                placeholder="Cena"
                className="form_input h-8"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex">
                <label htmlFor="category" className="form_label">
                  Kategorija
                </label>

                <button
                  className="bg-accent rounded-full w-5 h-5 flex items-center justify-center ml-1"
                  type="button"
                  onClick={() => setPage("Kategorijas")}
                >
                  <PlusIcon className="text-white h-4" />
                </button>
              </div>

              {appInfo.productCategories && (
                <select
                  name="category"
                  id="category"
                  className="form_input h-8"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value=""></option>
                  {appInfo.productCategories?.map((cat, i) => (
                    <option value={cat.id} key={i}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="form_label" htmlFor="images">
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
                  name="images"
                  id="images"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                />

                <div className="absolute w-full h-full flex items-center justify-center bg-transparent p-1">
                  <div
                    className={`flex w-full h-full flex-col items-center justify-center bg-primary-100`}
                  >
                    <p className="text-primary-900">
                      Augšupielādējiet produkta bildes
                    </p>

                    <small className="text-primary-800">
                      vai klikšķiniet, lai izvēlētos
                    </small>
                  </div>
                </div>

                <label
                  htmlFor="images"
                  className="w-full h-full rounded-md cursor-pointer bg-transparent z-10"
                ></label>
              </div>

              <div className="overflow-x-auto w-full whitespace-nowrap py-2">
                {images.map((file, j) => (
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
                          const newImages = images.filter((f) => f !== file);

                          setImages(newImages);

                          if (cover === file && newImages.length > 0) {
                            setCover(newImages[0]);
                          } else {
                            setCover(null);
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
          </div>
        ) : (
          <div className="w-full gap-2 flex flex-col mt-2 mb-2">
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="title" className="form_label">
                Jaunās kategorijas nosaukums{" "}
                <span className="text-accent">*</span>
              </label>

              <div className="flex">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Nosaukums"
                  className="form_input h-8"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  autoComplete="off"
                />

                <Button
                  className="bg-accent w-12 h-8"
                  type="submit"
                  loading={loading}
                  disabled={loading}
                >
                  <PlusIcon className="text-white h-6" />
                </Button>
              </div>
            </div>

            {appInfo.productCategories &&
              appInfo.productCategories.length > 0 && (
                <p>Izveidotās kategorijas:</p>
              )}

            {appInfo.productCategories?.map((cat, i) => (
              <div
                className="w-full flex justify-between items-center border p-1 h-8"
                key={i}
              >
                <strong>{cat.name}</strong>

                <button
                  className="rounded-md bg-accent p-1"
                  type="button"
                  onClick={() =>
                    deleteProductCategory({ dispatch, id: cat.id })
                  }
                >
                  <TrashIcon className="text-white h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {page === "Produkts" && (
          <div className="flex items-center justify-end w-full px-4 border-t pt-2 gap-2">
            <button
              className="form_button w-20 h-8 rounded-md m-0 bg-transparent border-2 border-accent text-accent"
              type="button"
              disabled={loading}
              onClick={() => dispatch(clearNotification())}
            >
              Aizvērt
            </button>

            <Button
              className="form_button w-24 h-8 rounded-md m-0"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              {notificationInfo.params ? "Atjaunot" : "Pievienot"}
            </Button>
          </div>
        )}
      </form>
    </NotificationContainer>
  );
};

export default NewSpotProduct;
