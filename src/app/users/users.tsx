import { useEffect, useState } from "react";
import profile from "../../assets/img/profile.png";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdGeneratingTokens, MdOutlinePassword } from "react-icons/md";
import { CgRename } from "react-icons/cg";

export default function Users() {
  const [search, setSearch] = useState("");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-center mt-32 text-4xl">Users :</div>
      <div className="w-full flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search for a user"
          className="input input-bordered w-1/2 max-w-md"
        />
      </div>
      <div className="overflow-x-auto mt-10 p-4 flex-wrap flex gap-6 justify-center">
        {[1, 2, 3, 4, 5].map((user) => (
          <User key={user} user={user} />
        ))}
      </div>
    </motion.div>
  );
}
export function User(props: { user: number }) {
  return (
    <UserEdition>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="shadow-xl p-4 cursor-pointer"
      >
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={profile} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="font-bold text-xl">KOSMIX {props.user}</div>
          <div className="text-gray-500"></div>
        </div>
      </motion.div>
    </UserEdition>
  );
}
export function UserEdition(props: { children: React.ReactNode }) {
  const [canUpload, setCanUpload] = useState(false);
  const [transcode, setTranscode] = useState(false);
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {props.children}
      </div>
    );
  }
  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {props.children}
      </div>
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
                  <h3 className="text-lg font-bold flex justify-center">
                    Edition
                  </h3>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-4 p-4 w-4/5">
                      <label className="input input-bordered flex items-center gap-2">
                        <CgRename />
                        <input
                          type="text"
                          className="grow"
                          placeholder="UserName"
                        />
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <IoMdMail />
                        <input
                          type="text"
                          className="grow"
                          placeholder="Email"
                        />
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <MdGeneratingTokens />
                        <input
                          type="password"
                          className="grow"
                          placeholder="Token"
                        />
                      </label>
                      <div className="grid grid-cols-1 gap-1">
                        <label className="label cursor-pointer">
                          <span className="label-text text-error">Admin</span>
                          <input
                            type="checkbox"
                            className="toggle toggle-error"
                            defaultChecked
                          />
                        </label>
                        <div
                          className="tooltip"
                          data-tip="does the user can edit the metadata of medias ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text text-error">
                              Can Delete Files
                            </span>
                            <input
                              type="checkbox"
                              className="toggle toggle-error"
                              defaultChecked
                            />
                          </label>
                        </div>
                        <div
                          className="tooltip"
                          data-tip="does the user can download media from the server ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">Can Download</span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked
                            />
                          </label>
                        </div>
                        <div
                          className="tooltip"
                          data-tip="does the user can download media from torrents to the server ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">Can Upload</span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked={canUpload}
                              onChange={() => setCanUpload(!canUpload)}
                            />
                          </label>
                        </div>
                        <AnimatePresence>
                          {canUpload && (
                            <motion.div
                              initial={{
                                height: 0,
                              }}
                              animate={{
                                height: "auto",
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                            >
                              <div className="text-sm ml-2 underline underline-offset-2">
                                Upload Params :
                              </div>
                              <div
                                className="tooltip ml-4 w-full"
                                data-tip="does the user can upload files from his cumputer to the server ?"
                              >
                                <label className="label cursor-pointer">
                                  <span className="label-text">
                                    Can Add File
                                  </span>
                                  <input
                                    type="checkbox"
                                    className="toggle "
                                    defaultChecked
                                  />
                                </label>
                              </div>
                              <div
                                className="tooltip ml-4 w-full"
                                data-tip="how much download (tv season = 1, movie = 1) the user can upload ?"
                              >
                                <label className="label cursor-pointer">
                                  <span className="label-text">
                                    Allowed Upload Numer
                                  </span>
                                  <input
                                    type="number"
                                    defaultValue={1}
                                    className="input input-bordered w-28 h-7 max-w-xs text-right"
                                  />
                                </label>
                              </div>
                              <div
                                className="tooltip ml-4 w-full"
                                data-tip="max amount of data the user can upload ?"
                              >
                                <label className="label cursor-pointer">
                                  <span className="label-text">
                                    Allowed Upload Size
                                  </span>
                                  <input
                                    type="number"
                                    defaultValue={1}
                                    className="input input-bordered w-28 h-7 max-w-xs text-right"
                                  />
                                </label>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div
                          className="tooltip"
                          data-tip="does the user can convert media files witch are on the server ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">Can Convert</span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked
                            />
                          </label>
                        </div>
                        <div
                          className="tooltip"
                          data-tip="does the user can download media from the server ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">Can Download</span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked
                            />
                          </label>
                        </div>
                        <div
                          className="tooltip"
                          data-tip="does the user can transcode media files witch are on the server ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">Can Transcode</span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked={transcode}
                              onChange={() => setTranscode(!transcode)}
                            />
                          </label>
                        </div>
                        <AnimatePresence>
                          {transcode && (
                            <motion.div
                              initial={{
                                height: 0,
                              }}
                              animate={{
                                height: "auto",
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                            >
                              <div className="text-sm ml-2 underline underline-offset-2">
                                Transcode Params :
                              </div>
                              <div
                                className="tooltip ml-4 w-full"
                                data-tip="how much video the user can transcode at the same time ?"
                              >
                                <label className="label cursor-pointer">
                                  <span className="label-text">
                                    Max Concurrent Transcode
                                  </span>
                                  <input
                                    type="number"
                                    defaultValue={1}
                                    className="input input-bordered w-28 h-7 max-w-xs text-right"
                                  />
                                </label>
                              </div>
                              <div
                                className="tooltip ml-4 w-full"
                                data-tip="how much video the user can transcode in total ?"
                              >
                                <label className="label cursor-pointer">
                                  <span className="label-text">
                                    Total Max Transcode
                                  </span>
                                  <input
                                    type="number"
                                    defaultValue={1}
                                    className="input input-bordered w-28 h-7 max-w-xs text-right"
                                  />
                                </label>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div
                          className="tooltip"
                          data-tip="does the user can edit the metadata of medias ?"
                        >
                          <label className="label cursor-pointer">
                            <span className="label-text">
                              Can Edit Metadata
                            </span>
                            <input
                              type="checkbox"
                              className="toggle "
                              defaultChecked
                            />
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-error w-full">
                        Delete User
                      </button>
                      <div className="w-full flex justify-center gap-4">
                        <button className="btn btn-success w-1/2">Save</button>
                        <button
                          onClick={() => setOpen(false)}
                          className="btn btn-neutral w-1/2"
                        >
                          Cancel
                        </button>
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
    </>
  );
}
