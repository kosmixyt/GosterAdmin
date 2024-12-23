import { useState } from "react";

export default function () {
  const [solvingMode, setSolvingMode] = useState("puppeteer");
  return (
    <div className="ml-4">
      <div className="text-3xl ">Torrents Settings</div>
      <div className="mt-6 ">
        <div className="underline underline-offset-4">
          CloudFlare Challenge Solving Mode
        </div>
        <select
          onChange={(e) => {
            setSolvingMode(e.target.value);
          }}
          value={solvingMode}
          className="mt-2 select select-bordered w-96"
        >
          <option value="puppeteer">Puppeteer</option>
          <option value="flaresolverr">Flaresolverr</option>
          <option value="browserless" className="opacity-50" disabled>
            Capsolverr (Coming Soon)
          </option>
        </select>
      </div>
      {solvingMode === "flaresolverr" && (
        <div className="mt-6">
          <div className="text-xl">Flaresolverr Params</div>
          <div className="mt-4 ml-6">
            <div className="underline underline-offset-4">Flaresolverr Url</div>
            <input
              type="text"
              placeholder="0"
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-4 ml-6">
            <div className="underline underline-offset-4">
              Flaresolverr Max Timeout
            </div>
            <input
              type="text"
              placeholder="0"
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
        </div>
      )}
      <div className="mt-6 ">
        <div className="underline underline-offset-4">
          Torrent Temp Path (should be ssd):{" "}
        </div>
        <input
          type="text"
          placeholder="/..."
          className="mt-2 input input-bordered w-96 h-10"
        />
      </div>
      <div className="mt-6">
        <div className="text-2xl underline">Torrents Providers</div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th className="">Provider</th>
              <th className="">Enabled</th>
              <th className="">Working</th>
              <th className="">Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="">1337x</td>
              <td className="">
                <input type="checkbox" checked className="checkbox" />
              </td>
              <td className="text-3xl">✅</td>
            </tr>

            <tr>
              <td className="">RARBG</td>
              <td className="">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="text-3xl">{/* emoji working */}✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
