import React, { useRef, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/UserAction";
import { useParams } from "react-router-dom";
import defaultProfile from "../../img/defaultProfile.png";

const ProfilePicture = ({ modal, setModal, data }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const param = useParams();
  const [profileImage, setProfileImage] = useState("")

  const onImageChange = (event) => {
    let file = event.target.files[0];
    // Transformfile(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(param.id, { profileImage: profileImage }));
    setModal(false);
  };
  
  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="auto"
      title="Change Photo"
      opened={modal}
      onClose={() => setModal(false)}
    >
      <form className="Form" onSubmit={handleSubmit}>
        {/* <h3>Your Info</h3> */}
        <div>
          <div className="ProfilePic">
            {profileImage?
              <img
                src={profileImage}
                alt="ProfileImage"
               
                className="profileImg"
              />:
              <img
                src={data.profileImage.url?data.profileImage.url:defaultProfile}
                alt="ProfileImage"
               
                className="profileImg"
              />
            }
          </div>
          <div>
           
            <input type="file" className="choosefile" name="profileImage" onChange={onImageChange} />
          </div>

          <div>
            <button className="button infoButton btn" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProfilePicture;
