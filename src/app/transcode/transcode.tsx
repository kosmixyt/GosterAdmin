import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { app_url } from "../../main";
import { toast } from "react-toastify";

export default function Transcode() {
  const [transcodes, setTranscodes] = useState<TranscoderInfo[]>([]);
  const refresh = () => {
    fetch(`${app_url}/admin/transcoders`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setTranscodes(data));
  };
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div>
        <div className="overflow-x-auto mt-10 p-4 flex-wrap flex gap-6 justify-center">
          {transcodes.map((transcode, i) => (
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={transcode.skinny.BACKDROP} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title underline underline-offset-2">
                  {transcode.skinny.NAME}
                </h2>
                <div>
                  <div>Ip : {transcode.ip}</div>
                  <div>Browser : {transcode.browser}</div>
                  <div>Quality : {transcode.quality}</div>
                </div>
                <div className="flex justify-center gap-4">
                  <div className="card-actions justify-end">
                    <button className="btn btn-neutral">Send Message</button>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-error">Kill</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-3xl font-semibold pl-7">Transcode Settings</div>
        <div className="ml-6 mt-6 text-lg">
          <div>
            Quality Editor :
            <QualityEditor />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">hls_time:</div>
            <input
              type="number"
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">Ffmpeg Path:</div>
            <input
              type="text"
              placeholder="ffmpeg"
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">
              Max Thread Per Transcoder (-t ffmpeg) (0 for auto):
            </div>
            <input
              type="text"
              placeholder="0"
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">
              Max Thread Per Converter (-t ffmpeg) (0 for auto):
            </div>
            <input
              type="text"
              placeholder="0"
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">Ffprobe Path:</div>
            <input
              type="text"
              placeholder="ffprobe"
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
          <div className="mt-6 ">
            <div className="underline underline-offset-4">
              Hls Cache Path (should be ssd):
            </div>
            <input
              type="text"
              placeholder=""
              min={0}
              className="mt-2 input input-bordered w-96 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Quality {
  Name: string;
  Resolution: number;
  Width: number;
  VideoBitrate: number;
  AudioBitrate: number;
  BitrateMultiplier: number;
}
function QualityEditor() {
  const [open, setOpen] = useState(false);
  const [qualitys, setQualitys] = useState<Quality[]>([]);
  const [addingQuality, setAddingQuality]: [Quality, any] = useState({
    Name: "",
    Resolution: 0,
    BitrateMultiplier: 1,
    Width: 0,
    VideoBitrate: 0,
    AudioBitrate: 0,
  });
  useEffect(() => {
    fetch(`${app_url}/admin/qualitys`, { credentials: "include" })
      .then((res) => res.json())
      .then(setQualitys);
  }, []);
  if (!open) {
    return (
      <button
        className="btn btn-primary ml-2"
        onClick={() => {
          console.log("open");
          setOpen(true);
        }}
      >
        Edit Quality
      </button>
    );
  }
  return (
    <>
      <button
        className="btn btn-primary ml-2"
        onClick={() => {
          setOpen(false);
        }}
      >
        Edit Quality
      </button>
      {open && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center z-50 "
        >
          <motion.div className="modal modal-open fixed inset-0 flex items-center justify-center z-50">
            <div className="overflow-x-auto bg-slate-800 rounded-lg p-8">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-2xl font-semibold text-center underline underline-offset-2">
                    Quality Editor
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log("close");
                    setOpen(false);
                  }}
                  className="btn btn-sm btn-circle"
                >
                  ✕
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr className="text-lg">
                    <th>Name</th>
                    <th>Resolution</th>
                    <th>Width</th>
                    <th>Video Bitrate</th>
                    <th>Bitrate multiplier</th>
                    <th>Audio Bitrate</th>
                  </tr>
                </thead>
                <tbody>
                  {qualitys.map((quality) => (
                    <tr>
                      <td>{quality.Name}</td>
                      <td>{quality.Resolution}</td>
                      <td>{quality.Width}</td>
                      <td>{quality.VideoBitrate}</td>
                      <td>{quality.BitrateMultiplier}</td>
                      <td>{quality.AudioBitrate}</td>
                      <td>
                        <button
                          onClick={() => {
                            DeleteQuality(quality.Resolution.toString()).then(
                              () => {
                                setQualitys(
                                  qualitys.filter(
                                    (q) => q.Resolution !== quality.Resolution
                                  )
                                );
                              }
                            );
                          }}
                          className="btn btn-sm btn-circle btn-error"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <input
                        type="text"
                        value={addingQuality.Name}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            Name: e.target.value,
                          })
                        }
                        placeholder="Name"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        value={addingQuality.Resolution}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            Resolution: parseInt(e.target.value),
                          })
                        }
                        placeholder="Height"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th>
                      <input
                        value={addingQuality.Width}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            Width: parseInt(e.target.value),
                          })
                        }
                        type="text"
                        placeholder="Width"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th>
                      <input
                        value={addingQuality.VideoBitrate}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            VideoBitrate: parseInt(e.target.value),
                          })
                        }
                        type="number"
                        placeholder="VideoBitrate"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th>
                      <input
                        value={addingQuality.BitrateMultiplier}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            BitrateMultiplier: parseInt(e.target.value),
                          })
                        }
                        type="number"
                        placeholder="Bitrate Multiplier"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th className="flex gap-2">
                      <input
                        value={addingQuality.AudioBitrate}
                        onChange={(e) =>
                          setAddingQuality({
                            ...addingQuality,
                            AudioBitrate: parseInt(e.target.value),
                          })
                        }
                        type="number"
                        placeholder="Audio Bitrate"
                        className={`${inputEditorClass}`}
                      />
                    </th>
                    <th>
                      <button
                        onClick={() => PostQuality(addingQuality)}
                        className="btn btn-primary "
                      >
                        +
                      </button>
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
const inputEditorClass = "input input-bordered w-full w-32";
async function PostQuality(quality: Quality) {
  const res = await fetch(`${app_url}/admin/quality/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quality),
  });
  const body = await res.json();
  if (body.error) {
    return toast.error(body.error);
  }
  toast.success("Added Successfully");
}
async function DeleteQuality(Resolution: string) {
  const form = new FormData();
  form.append("resolution", Resolution);
  const res = await fetch(`${app_url}/admin/quality/delete`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  const body = await res.json();
  if (body.error) {
    return toast.error(body.error);
  }
  toast.success("Deleted Successfully");
}

declare interface TranscoderInfo {
  id: number;
  quality: string;
  skinny: SKINNY_RENDER;
  ip: string;
  browser: string;
}
export interface SKINNY_RENDER {
  ID: string;
  TYPE: string;
  NAME: string;
  POSTER: string;
  BACKDROP: string;
  DESCRIPTION: string;
  YEAR: string;
  RUNTIME: number;
  GENRE: GENRE[];
  TRAILER: string;
  WATCH: WATCH_DATA;
  WATCHLISTED: boolean;
  LOGO: string;
  TRANSCODE_URL: string;
  PROVIDERS: PROVIDERItem[];
  DisplayData: string;
}
declare interface PROVIDERItem {
  PROVIDER_ID: number;
  URL: string;
  PROVIDER_NAME: string;
  DISPLAY_PRIORITY: number;
}
export interface WATCH_DATA {
  CURRENT: number;
  TOTAL: number;
}
export interface GENRE {
  ID: number;
  NAME: string;
}
