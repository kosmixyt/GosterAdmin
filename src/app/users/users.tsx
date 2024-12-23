import { useEffect, useState } from "react";
import profile from "../../assets/img/profile.png";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdGeneratingTokens, MdOutlinePassword } from "react-icons/md";
import { CgRename } from "react-icons/cg";
import { app_url } from "../../main";
import { toast } from "react-toastify";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const fetchUsers = () => {
    fetch(`${app_url}/admin/users`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-center mt-32 text-4xl">Users :</div>
      <div className="flex justify-center  mt-5">
        <UserEdition oncreated={fetchUsers} user={DefaultUserData()}>
          <button className="btn btn-success">Create User</button>
        </UserEdition>
      </div>
      <div className="w-full flex justify-center mt-5">
        <input
          type="text"
          placeholder="Search for a user"
          className="input input-bordered w-1/2 max-w-md"
          onInput={(e) => {
            setSearch(e.currentTarget.value);
            setFilteredUsers(
              users.filter((user: UserData) =>
                user.name.toLowerCase().includes(e.currentTarget.value)
              )
            );
          }}
        />
      </div>
      <div className="overflow-x-auto mt-10 p-4 flex-wrap flex gap-6 justify-center">
        {filteredUsers.map((user) => (
          <User key={user} user={user} />
        ))}
      </div>
    </motion.div>
  );
}
export function User(props: { user: UserData }) {
  return (
    <UserEdition user={props.user}>
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
          <div className="font-bold text-xl">{props.user.name}</div>
          <div className="text-gray-500"></div>
        </div>
      </motion.div>
    </UserEdition>
  );
}
interface UserData {
  id: number;
  name: string;
  email: string;
  token: string;
  admin: boolean;
  can_download: boolean;
  can_convert: boolean;
  can_add_files: boolean;
  can_upload: boolean;
  can_delete: boolean;
  can_edit: boolean;
  can_transcode: boolean;
  max_transcoding: number;
  allowed_upload_number: number;
  allowed_upload_size: number;
}
function DefaultUserData(): UserData {
  return {
    id: 0,
    name: "",
    email: "",
    token: "",
    admin: false,
    can_download: false,
    can_convert: false,
    can_add_files: false,
    can_upload: false,
    can_delete: false,
    can_edit: false,
    allowed_upload_number: 0,
    allowed_upload_size: 0,
    can_transcode: true,
    max_transcoding: 100,
  };
}
export function UserEdition(
  props: {
    children: React.ReactNode;
    user: UserData;
    oncreated?: (user: UserData) => void;
  } = {
    children: null,
    user: DefaultUserData(),
  }
) {
  // const [canUpload, setCanUpload] = useState(false);
  // const [transcode, setTranscode] = useState(false);
  const [user, setUser] = useState(props.user);
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
                          onInput={(e) =>
                            setUser({ ...user, name: e.currentTarget.value })
                          }
                          value={user.name}
                          type="text"
                          className="grow"
                          placeholder="UserName"
                        />
                      </label>
                      <label className="input input-bordered flex items-center gap-2">
                        <IoMdMail />
                        <input
                          onInput={(e) =>
                            setUser({ ...user, email: e.currentTarget.value })
                          }
                          value={user.email}
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
                          value={user.token}
                          onInput={(e) =>
                            setUser({ ...user, token: e.currentTarget.value })
                          }
                          placeholder="Token"
                        />
                      </label>
                      <div className="grid grid-cols-1 gap-1">
                        <label className="label cursor-pointer">
                          <span className="label-text text-error">Admin</span>
                          <input
                            checked={user.admin}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                admin: e.currentTarget.checked,
                              })
                            }
                            type="checkbox"
                            className="toggle toggle-error"
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
                              checked={user.can_delete}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_delete: e.currentTarget.checked,
                                })
                              }
                              type="checkbox"
                              className="toggle toggle-error"
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
                              checked={user.can_upload}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_upload: e.currentTarget.checked,
                                })
                              }
                            />
                          </label>
                        </div>
                        <AnimatePresence>
                          {user.can_upload && (
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
                                    checked={user.can_add_files}
                                    onChange={(e) =>
                                      setUser({
                                        ...user,
                                        can_add_files: e.currentTarget.checked,
                                      })
                                    }
                                    type="checkbox"
                                    className="toggle "
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
                                    value={user.allowed_upload_number}
                                    onInput={(e) =>
                                      setUser({
                                        ...user,
                                        allowed_upload_number:
                                          +e.currentTarget.value,
                                      })
                                    }
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
                                    value={user.allowed_upload_size}
                                    onInput={(e) =>
                                      setUser({
                                        ...user,
                                        allowed_upload_size:
                                          +e.currentTarget.value,
                                      })
                                    }
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
                              checked={user.can_convert}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_convert: e.currentTarget.checked,
                                })
                              }
                              type="checkbox"
                              className="toggle "
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
                              checked={user.can_download}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_download: e.currentTarget.checked,
                                })
                              }
                              type="checkbox"
                              className="toggle "
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
                              value={user.can_transcode}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_transcode: e.currentTarget.checked,
                                })
                              }
                            />
                          </label>
                        </div>
                        <AnimatePresence>
                          {user.can_transcode && (
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
                                    value={user.max_transcoding}
                                    onInput={(e) =>
                                      setUser({
                                        ...user,
                                        max_transcoding: +e.currentTarget.value,
                                      })
                                    }
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
                              checked={user.can_edit}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  can_edit: e.currentTarget.checked,
                                })
                              }
                              type="checkbox"
                              className="toggle "
                            />
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          DeleteUser(user.id).then((res) => {
                            if (res.message) {
                              if (props.oncreated) {
                                props.oncreated(user);
                              }
                              toast.success(res.message);
                              setOpen(false);
                            } else {
                              toast.error(res.error);
                            }
                          });
                        }}
                        className="btn btn-error w-full"
                      >
                        Delete User
                      </button>
                      <div className="w-full flex justify-center gap-4">
                        <button
                          onClick={() => {
                            UpdateUser(user).then((res) => {
                              if (res.message) {
                                if (props.oncreated) {
                                  props.oncreated(user);
                                }

                                toast.success(res.message);
                                setOpen(false);
                              } else {
                                toast.error("User Update Failed");
                              }
                            });
                          }}
                          className="btn btn-success w-1/2"
                        >
                          Save
                        </button>
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

export async function UpdateUser(userData: UserData) {
  const res = await fetch(`${app_url}/admin/user/update`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function DeleteUser(id: number) {
  const form = new FormData();
  form.append("id", id.toString());
  const res = await fetch(`${app_url}/admin/user/delete`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  return res.json();
}
