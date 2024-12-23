import { useEffect, useRef, useState } from "react";
import { app_url } from "../../main";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { bytesToSize } from "../files/files";
import { toast } from "react-toastify";

export default function () {
  const [storages, setStorages] = useState<Storage[]>([]);
  useEffect(() => {
    fetch(`${app_url}/admin/storages`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setStorages(data);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Storages</h1>
      <div className="flex justify-center mt-4">
        <button onClick={ScanAllStorages} className="btn btn-primary">
          Scan All Storages
        </button>
      </div>
      <div className="overflow-x-auto mt-10 p-4 flex-wrap flex gap-6 justify-center">
        {storages.map((item, index) => (
          <StorageEditor storage={item} />
        ))}
      </div>
    </div>
  );
}
export interface StorageSftp {
  id: number;
  name: string;
  type: "sftp";
  paths: Paths[];
  options: {};
}
export interface Paths {
  id: number;
  path: string;
  size: number;
}
export type Storage = StorageSftp | StorageLocal;
export interface StorageLocal {
  id: number;
  name: string;
  type: "local";
  paths: Paths[];
  options: {};
}
function StorageEditor(props: { storage: Storage }) {
  const [open, setOpen] = useState(false);
  const [paths, setPaths] = useState<Paths[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [pathSelection, setPathSelection] = useState<string[]>([]);

  useEffect(() => {
    setPaths(props.storage.paths);
  }, [props.storage]);
  const handleAddPath = () => {
    setPathSelection([]);
    fetch(
      `${app_url}/admin/storage/browse?target_storage_id=${
        props.storage.id
      }&path=${ref.current!.value}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return toast.error(data.error);
        setPathSelection(data);
      });
  };
  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer hover:underline rounded-lg bg-slate-800 text-center flex justify-center items-center w-48 h-48"
    >
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div className="modal modal-open fixed inset-0 flex items-center justify-center z-50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="modal-box relative"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <div>
                    <div className="text-4xl text-center">
                      {props.storage.name}
                    </div>
                    <div className="mt-6 ">
                      <div className="underline underline-offset-4">
                        Paths :
                      </div>
                      <div className="mt-4">
                        {paths.map((path) => (
                          <div className="flex justify-between mt-1">
                            <div>{path.path}</div>
                            <div>{bytesToSize(path.size)}</div>
                            <div>
                              <button className="btn btn-sm btn-circle btn-error">
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2 flex-col flex gap-y-2">
                          <div className="flex gap-x-2">
                            <input
                              defaultValue={"/"}
                              ref={ref}
                              type="text"
                              className="input input-sm input-bordered w-full"
                              placeholder="Path"
                            />
                            <button
                              onClick={handleAddPath}
                              className="btn btn-sm btn-primary"
                            >
                              Browse
                            </button>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              {pathSelection.map((item) => (
                                <button
                                  onClick={() => {
                                    // ref.current!.value = item;
                                    const currentPath = ref.current!.value;
                                    if (currentPath.endsWith("/")) {
                                      ref.current!.value = currentPath + item;
                                    } else {
                                      ref.current!.value =
                                        currentPath + "/" + item;
                                    }
                                    handleAddPath();
                                  }}
                                  className="btn btn-sm btn-outline"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="number"
                            className="input input-sm input-bordered w-full"
                            placeholder="Size in bytes"
                          />
                          <button className="btn btn-sm btn-primary w-full">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      <div>
        <div>
          <div className="text-4xl">{props.storage.name}</div>
        </div>
        <div className="text-sm mt-2 opacity-50">({props.storage.type})</div>
      </div>
    </div>
  );
}
export function ScanAllStorages() {
  const t = toast.info("Scanning all storages...", { autoClose: false });
  fetch(`${app_url}/admin/scan`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      toast.dismiss(t);
      toast.success(data.message);
    });
}
