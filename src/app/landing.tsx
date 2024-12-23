import { BsLink45Deg } from "react-icons/bs";
import profile from "../assets/img/profile.png";
import { useEffect, useState } from "react";
import { app_url } from "../main";
import { bytesToSize } from "./files/files";

declare interface AdminInfoData {
  goroutines: number;
  totalmemory: number;
  currentTranscode: number;
  movies: number;
  series: number;
  episodes: number;
  files: number;
  users: number;
  port: string;
  cpu: string;
  goversion: string;
  gpu: string;
  uptime: string;
  ram: number;
  tasks: AdminTaskData[];
}

declare interface AdminTaskData {
  id: number;
  username: string;
  started: string;
  name: string;
  status: string;
  finished: string;
}

export function Landing() {
  const [adminData, setAdminData] = useState<AdminInfoData | null>(null);
  useEffect(() => {
    fetch(`${app_url}/admin/info`, { credentials: "include" })
      .then((response) => response.json())
      .then(setAdminData);
  }, []);
  if (!adminData) return <div>Loading...</div>;
  return (
    <div>
      <div className="md:flex grid justify-around ml-6 mt-10">
        <div className="card mt-4  text-neutral-content w-1/2">
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
                  <div className="ml-2 text-lg">
                    http://82.65.99.194:{adminData.port}
                  </div>
                </div>
                <div className="flex mt-3 items-center">
                  <a
                    href=""
                    target="_blank"
                    className="btn btn-primary btn-circle"
                  >
                    <BsLink45Deg size={30} />
                  </a>
                  <div className="ml-2 text-lg">
                    http://192.168.100:{adminData.port}
                  </div>
                </div>
              </div>

              <div className="font-semibold block text-left">
                <div>Web Port : {adminData.port}</div>
                <div>CPU : {adminData.cpu}</div>
                <div>GPU : Nvidia {adminData.gpu}</div>
                <div>RAM : {bytesToSize(adminData.ram)}</div>
                <div>Go Version : {adminData.goversion}</div>
                <div>Uptime : {adminData.uptime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4 text-neutral-content w-1/2 bg-transparent">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Server Stats</h2>
            <div className="stats">
              <div className="stat place-items-center">
                <div className="stat-title">Movies</div>
                <div className="stat-value text-5xl">{adminData.movies}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Tv</div>
                <div className="stat-value text-5xl">{adminData.series}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Files</div>
                <div className="stat-value text-5xl">{adminData.files}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value text-5xl">{adminData.users}</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Current Transcode</div>
                <div className="stat-value text-5xl">
                  {adminData.currentTranscode}
                </div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-title">Episodes</div>
                <div className="stat-value text-5xl">{adminData.episodes}</div>
              </div>
            </div>
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
            {/* <tr>
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
            </tr> */}
            {adminData.tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>
                  <div className="tooltip" data-tip={task.username}>
                    <img
                      src={profile}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  </div>
                </td>
                <td>{task.name}</td>
                <td>{task.started}</td>
                <th className="flex gap-4">
                  <div
                    className={`badge ${
                      task.status === "Success"
                        ? "badge-success"
                        : task.status === "Error"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {task.status}
                  </div>
                </th>
                <td>
                  {task.finished ? (
                    task.finished
                  ) : (
                    <div className="badge badge-neutral">Not finished</div>
                  )}
                </td>
              </tr>
            ))}
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
