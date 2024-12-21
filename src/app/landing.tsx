import { BsLink45Deg } from "react-icons/bs";
import profile from "../assets/img/profile.png";

export function Landing() {
  return (
    <div>
      <div className="md:flex grid justify-around ml-6 mt-10">
        <div className="card mt-4 bg-neutral text-neutral-content w-1/2">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Server Informations</h2>
            <div className="font-semibold">Version : 1.0</div>
            <div className="w-full flex gap-4">
              <div className="underline underline-offset-2">
                <div className="flex items-center">
                  <a
                    href=""
                    target="_blank"
                    className="btn btn-primary btn-circle"
                  >
                    <BsLink45Deg size={30} />
                  </a>
                  <div className="ml-2 text-lg">http://82.65.99.194:8080</div>
                </div>
                <div className="flex mt-3 items-center">
                  <a
                    href=""
                    target="_blank"
                    className="btn btn-primary btn-circle"
                  >
                    <BsLink45Deg size={30} />
                  </a>
                  <div className="ml-2 text-lg">http://192.168.100</div>
                </div>
              </div>
              <div className="font-semibold block text-left">
                <div>Web Port : 80</div>
                <div>CPU : Intel Xeon E52080v2</div>
                <div>GPU : Nvidia GTX 1060 6go</div>
                <div>RAM : 64Go</div>
                <div>Total Storage Size : 10tb</div>
              </div>
              <div className="font-semibold block text-left">
                <div>-</div>
                <div>(10%)</div>
                <div>(1%)</div>
                <div>(64go)</div>
                <div>(10%)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="stats w-1/2">
          <div className="stat place-items-center">
            <div className="stat-title">Movies</div>
            <div className="stat-value text-5xl">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Tv</div>
            <div className="stat-value text-5xl">40</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Files</div>
            <div className="stat-value text-5xl">40</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-5xl">{1}</div>
            <div className="stat-desc">↗︎ 40 (2%)</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Current Transcode</div>
            <div className="stat-value text-5xl">{1}</div>
            <div className="stat-desc">↗︎ 40 (2%)</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Task Id</th>
              <th>User</th>
              <th>Name</th>
              <th>Started</th>
              <th>Status</th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div className="tooltip" data-tip="KOSMIX #1">
                  <img
                    src={profile}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                </div>
              </td>
              <td>
                Transcode of "The Lord of the Rings: The Fellowship of the Ring"
              </td>
              <td>
                {new Date().toLocaleTimeString()} -{" "}
                {new Date().toLocaleDateString()}
              </td>
              <th className="flex gap-4">
                <div className="badge badge-success">Success</div>
                <div className="badge badge-error">Error</div>
                <div className="badge badge-neutral">Pending</div>
              </th>
              <td>
                {new Date().toLocaleTimeString()} -{" "}
                {new Date().toLocaleDateString()}
                <div className="badge badge-neutral">Not finished</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Name</th>
              <th>Started</th>
              <th>Status</th>
              <th>Finished</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
