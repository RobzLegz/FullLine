import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { isSameDay } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppInfo,
  selectApp,
  selectCategory,
  setStartDate,
} from "../../../redux/slices/appSlice";
import {
  clearNotification,
  NotificationInfo,
  selectNotification,
  setNotification,
} from "../../../redux/slices/notificationSlice";
import { createEvent, updateEvent } from "../../../requests/eventRequests";
import { formatDate } from "../../../utils/formatDate";
import { SwitchWrapper } from "../../ui/SwitchWrapper";
import { SelectCity, SelectCountry, SelectSpot } from "../../ui/FormElements";
import Button from "../../ui/Button";
import QuestionMark from "../../ui/QuestionMark";

const NewEventContainer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const notificationInfo: NotificationInfo = useSelector(selectNotification);
  const appInfo: AppInfo = useSelector(selectApp);

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [ticketUrl, setTicketUrl] = useState("");
  const [websiteUrls, setWebsiteUrls] = useState("");

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("64450f18e843597154f1d832");
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [showOnMap, setShowOnMap] = useState<boolean>(false);

  const [cover, setCover] = useState<File | null | string>(null);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currevent = appInfo.currentEvent;

    if (currevent && appInfo.categories && appInfo.cities) {
      if (currevent.location.lng || currevent.location.lat) {
        setShowOnMap(true);
      }

      setTitle(currevent.title);
      setInfo(currevent.info.join("\n\n"));
      if (currevent.start_date) {
        dispatch(setStartDate(String(currevent.start_date)));
      }
      if (
        currevent.end_date &&
        currevent.start_date &&
        !isSameDay(new Date(currevent.start_date), new Date(currevent.end_date))
      ) {
        dispatch(setStartDate(String(currevent.end_date)));
      }

      setStartTime(currevent.start_time ? currevent.start_time : "");
      setEndTime(currevent.end_time ? currevent.end_time : "");
      setTicketUrl(currevent.ticket_url ? currevent.ticket_url : "");
      setWebsiteUrls(
        currevent.website_urls.length > 0 ? currevent.website_urls[0] : ""
      );
      let imgArr = currevent.images.map((image) => image.src);
      setCover(currevent.cover ? currevent.cover.src : null);

      setFiles(imgArr);

      for (const cat of currevent.category_ids) {
        dispatch(selectCategory(cat));
      }

      if (currevent.cityId) {
        setCity(currevent.cityId);

        const evCity = appInfo.cities.find(
          (cit) => cit.id === currevent.cityId
        );
        if (evCity) {
          setCountry(evCity.countryId ? evCity.countryId : "");
        }
      }

      setAddress(currevent.location?.address ? currevent.location.address : "");
      setLocation(currevent.spotId ? currevent.spotId : "");
    }
  }, [appInfo.currentEvent, appInfo.categories, appInfo.cities]);

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

    if (appInfo.currentEvent) {
      await updateEvent({
        id: appInfo.currentEvent.id,
        dispatch,
        title,
        info,
        startDate: appInfo.startDate,
        endDate: appInfo.endDate,
        startTime,
        endTime,
        ticketUrl,
        websiteUrls,
        images: files,
        cover,
        categories: appInfo.selectedCategories.map((cat) => cat.id),
        city,
        country,
        address,
        location,
        router,
      });
    } else {
      await createEvent({
        dispatch,
        title,
        info,
        startDate: appInfo.startDate,
        endDate: appInfo.endDate,
        startTime,
        endTime,
        ticketUrl,
        websiteUrls,
        images: files,
        cover,
        categories: appInfo.selectedCategories.map((cat) => cat.id),
        city,
        country,
        address,
        location,
        router,
      });
    }

    setLoading(false);
  };

  return (
    <form
      className="w-full max-w-[600px] flex flex-col gap-2 mb-16"
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
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex flex-col gap-1 col-span-2">
          <label htmlFor="date" className="form_label">
            Datums <span className="text-accent">*</span>
          </label>

          <input
            type="text"
            name="date"
            id="date"
            placeholder="Datums"
            className="form_input"
            required
            autoComplete="off"
            onFocus={() =>
              dispatch(setNotification({ type: "datepicker_popup" }))
            }
            onClick={() =>
              dispatch(setNotification({ type: "datepicker_popup" }))
            }
            value={
              appInfo.startDate
                ? appInfo.endDate
                  ? `${formatDate(appInfo.startDate, true)} - ${formatDate(
                      appInfo.endDate,
                      true
                    )}`
                  : formatDate(appInfo.startDate, true)
                : ""
            }
            onChange={() => null}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="startTime" className="form_label">
            Sākuma laiks <span className="text-accent">*</span>
          </label>

          <input
            type="text"
            name="startTime"
            id="startTime"
            placeholder="19:00"
            className="form_input"
            required
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="endTime" className="form_label">
            Beigu laiks
          </label>

          <input
            type="text"
            name="endTime"
            id="endTime"
            placeholder="22:30"
            className="form_input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
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
              <p className="text-primary-900">
                Augšupielādējiet pasākuma bildes
              </p>

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
                  onClick={(e) => {
                    e.preventDefault();

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
            Adrese {showOnMap && <span className="text-accent">*</span>}
          </label>

          <input
            type="text"
            name="address"
            id="address"
            placeholder="Adrese"
            className="form_input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required={showOnMap}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="location"
            className="form_label flex items-center justify-start gap-1"
          >
            Vieta{" "}
            <QuestionMark txt="Izvēlieties kādu no jūsu pievienotajām lokācijām" />
          </label>

          <SelectSpot
            cityId={city}
            name="location"
            id="location"
            placeholder="Vieta"
            className="form_input"
            value={location}
            onChange={(e) => {
              const spot = appInfo.spots?.find((sp) => sp.id == e.target.value);

              if (spot) {
                setLocation(spot.id);
                setAddress(spot.location.address ? spot.location.address : "");
              }
            }}
          />
        </div>

        <SwitchWrapper
          checked={showOnMap}
          setChecked={setShowOnMap}
          action="Rādīt kartē"
          actionDescription="Sasniedziet lielāku apmeklētāju skaitu parādot pasākumu kartē"
          className="col-span-2"
        />
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
          onClick={() => dispatch(setNotification({ type: "category_popup" }))}
        >
          Izvēlēties{" "}
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

      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="websiteUrls" className="form_label">
          Saite uz mājaslapu
        </label>

        <input
          type="url"
          name="websiteUrls"
          id="websiteUrls"
          placeholder="Saite uz mājaslapu"
          className="form_input"
          value={websiteUrls}
          onChange={(e) => setWebsiteUrls(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ticketUrl" className="form_label">
          Saite uz biļetēm
        </label>

        <input
          type="url"
          name="ticketUrl"
          id="ticketUrl"
          placeholder="Saite uz biļetēm"
          className="form_input"
          value={ticketUrl}
          onChange={(e) => setTicketUrl(e.target.value)}
        />
      </div>

      <Button
        className="form_button"
        type="submit"
        loading={loading}
        disabled={loading}
      >
        {!appInfo.currentEvent ? "Izveidot" : "Atjaunot"}
      </Button>
    </form>
  );
};

export default NewEventContainer;
