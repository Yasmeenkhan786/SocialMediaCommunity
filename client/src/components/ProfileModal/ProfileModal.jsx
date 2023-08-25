import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [firstname, setFirstname] = useState(other.firstname);
  const [lastname, setLastname] = useState(other.lastname);
  const [username, setUsername] = useState(other.username);
  const dispatch = useDispatch();
  const param = useParams();

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(param.id, { firstname, lastname, username }));
    setModalOpened(false);
    window.location.reload();
  };

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="auto"
      title=" Your Info"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="Form" onSubmit={handleSubmit}>
        {/* <h3>Your Info</h3> */}
        <div>
          <div>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              placeholder="First Name"
              name="firstname"
              className="infoInput "
            />
          </div>
          <div>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="infoInput"
            />
          </div>

          <div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Works at"
              name="worksAt"
              className="infoInput"
            />
          </div>

          <button className="button infoButton btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
