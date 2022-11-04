import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiX } from "react-icons/bi";
import { editProfileModal ,profileDataChainging } from "../Redux/features/GlobalSlice";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const styles = {
  div: " border m-2 rounded-md p-1  ",
  caption: " text-gray-500 text-[0.7rem]    ",
  input: " outline-none w-full pr-4  px-1 text-twitter  ",
};

function EditProfileModal() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState([]);
  const userId = JSON.parse(window.sessionStorage.getItem("userId")).userId;
  // console.log(" user : " + userId)
  // console.log(" ProfileData : " + profileData.name);
  const name = profileData.name;

  useEffect(() => {
    // -------------------------------------------- fetching Profile Data --------------------
    async function fetchProfileData() {
      const profileData = await fetch("http://localhost:5000/profiledata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      }).then((res) => res.json());
      setProfileData(profileData);
    }
    fetchProfileData();
  }, []);

  const [data, setData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
    userId: userId,
    newUserId: userId,
    userImage: session?.user?.image,
    backgroundImage: "",
  });
  useEffect(() => {
    profileData &&
      setData({
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        userId: userId,
        newUserId: userId,
        userImage: session?.user?.image,
        backgroundImage: profileData.backgroundImage,
      });
  }, [profileData,session]);
  const editProfileModalState = useSelector(
    (state) => state.global.editProfileModalState
  );

  // console.log(data);

  async function handleSave() {
    const res = await fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch(editProfileModal());
    dispatch(profileDataChainging())
  }

  return (
    <div
      className={` absolute inset-0 flex items-center justify-center bg-black/40   ${
        editProfileModalState ? " inline " : " hidden "
      }   `}
    >
      <div className="bg-white min-w-[35rem] min-h-[30rem] rounded-xl   ">
        <div className="flex gap-4 items-center p-2 ">
          <BiX
            onClick={() => dispatch(editProfileModal())}
            title="Close"
            className="w-[2rem] h-[2rem] hover:bg-gray-300 rounded-full   "
          />
          <p className="font-bold text-[1.3rem]   ">Edit Profile</p>
          <button
            onClick={handleSave}
            className="bg-black text-white p-2 px-6 rounded-full ml-auto opacity-80 hover:opacity-100   "
          >
            Save
          </button>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>Name</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            value={data.name}
          ></input>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>Bio</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, bio: e.target.value }))
            }
            value={data.bio}
          ></input>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>Location</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, location: e.target.value }))
            }
            value={data.location}
          ></input>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>Website</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, website: e.target.value }))
            }
            value={data.website}
          ></input>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>new User Id</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, newUserId: e.target.value }))
            }
            value={data.newUserId}
          ></input>
        </div>
        <div className={styles.div}>
          <p className={styles.caption}>backgroundImage Url</p>
          <input
            className={styles.input}
            onChange={(e) =>
              setData((prev) => ({ ...prev, backgroundImage: e.target.value }))
            }
            value={data.backgroundImage}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
