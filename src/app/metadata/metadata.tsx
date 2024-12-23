import { useEffect, useState } from "react";
import Select from "react-select";
import { app_url } from "../../main";
import { toast } from "react-toastify";

export const ISO3166 = [
  "AF",
  "AX",
  "AL",
  "DZ",
  "AS",
  "AD",
  "AO",
  "AI",
  "AQ",
  "AG",
  "AR",
  "AM",
  "AW",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BM",
  "BT",
  "BO",
  "BQ",
  "BA",
  "BW",
  "BV",
  "BR",
  "IO",
  "BN",
  "BG",
  "BF",
  "BI",
  "CV",
  "KH",
  "CM",
  "CA",
  "KY",
  "CF",
  "TD",
  "CL",
  "CN",
  "CX",
  "CC",
  "CO",
  "KM",
  "CG",
  "CD",
  "CK",
  "CR",
  "CI",
  "HR",
  "CU",
  "CW",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "SZ",
  "ET",
  "FK",
  "FO",
  "FJ",
  "FI",
  "FR",
  "GF",
  "PF",
  "TF",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GI",
  "GR",
  "GL",
  "GD",
  "GP",
  "GU",
  "GT",
  "GG",
  "GN",
  "GW",
  "GY",
  "HT",
  "HM",
  "VA",
  "HN",
  "HK",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IM",
  "IL",
  "IT",
  "JM",
  "JP",
  "JE",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KP",
  "KR",
  "KW",
  "KG",
  "LA",
];
// language-country

export const TMDB_LANG = [
  "en",
  "de",
  "es",
  "it",
  "zh",
  "ja",
  "ko",
  "pt",
  "ru",
  "fr",

  "ar",
  "bg",
  "ca",
  "cs",
  "da",
  "el",
  "et",
];
declare interface MetadataBase {
  tmdb: string;
  tmdb_iso3166: string;
  omdb: string;
  tmdb_lang: string;
  tmdb_lang_imgs: string[];
}
const opt = TMDB_LANG.map((e) => ({
  value: e,
  label: e,
}));

export default function Metadata() {
  const [metadata, setMetadata] = useState<MetadataBase>({} as MetadataBase);
  useEffect(() => {
    fetch(`${app_url}/admin/metadata/get`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
      });
  }, []);
  if (Object.keys(metadata).length == 0) return <div>Loading...</div>;
  return (
    <div className="ml-4">
      <h1 className="text-3xl ml-4 underline">Metadata</h1>
      <div className="ml-4">
        <div className="mt-2">
          <div className="">TMDB API key:</div>
          <input
            type="text"
            value={metadata.tmdb}
            onChange={(e) => {
              setMetadata({ ...metadata, tmdb: e.target.value });
            }}
            placeholder="0"
            className="mt-2 input input-bordered w-96 h-10"
          />
        </div>
        <div className="mt-2">
          <div className="">TMDB ISO 3166:</div>
          <select
            value={metadata.tmdb_iso3166}
            onChange={(e) => {
              setMetadata({ ...metadata, tmdb_iso3166: e.target.value });
            }}
            className="mt-2 select select-bordered w-96"
          >
            {ISO3166.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <div className="">TMDB Language:</div>
          <select
            value={metadata.tmdb_lang}
            onChange={(e) => {
              setMetadata({ ...metadata, tmdb_lang: e.target.value });
            }}
            className="mt-2 select select-bordered w-96"
          >
            {TMDB_LANG.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <div
            onClick={() => {
              window.open("https://www.omdbapi.com/apikey.aspx", "_blank");
            }}
            className="underline underline-offset-4 cursor-pointer"
          >
            OMDB API key:
          </div>
          <input
            value={metadata.omdb}
            onChange={(e) => {
              setMetadata({ ...metadata, omdb: e.target.value });
            }}
            type="text"
            placeholder="(optional)"
            className="mt-2 input input-bordered w-96 h-10"
          />
        </div>
        <div className="mt-2">
          <div className="">TMDB Imgs Language (ordered by preference):</div>
          <Select
            styles={{
              control: (base) => ({
                ...base,
                height: 40,
                minHeight: 40,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }),
            }}
            defaultValue={metadata.tmdb_lang_imgs.map((e) => ({
              value: e,
              label: e,
            }))}
            className="mt-2 w-96 bg-transparent"
            onChange={(e) => {
              setMetadata({
                ...metadata,
                tmdb_lang_imgs: e.map((e) => e.value),
              });
            }}
            isMulti
            options={opt}
            placeholder="Select language"
          />
        </div>
        <button
          onClick={() => {
            fetch(`${app_url}/admin/metadata/set`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(metadata),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  return toast.error(data.error);
                }
                toast.success("Updated Successfully");
              });
          }}
          className="mt-10 btn btn-success w-96"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export function MovieEdit() {}
