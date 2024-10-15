import { Link } from "react-router-dom";
import SectionHeader from "../section/SectionHeader";
import SectionTitle from "../section/SectionTitle";
import profile from "/image/single.png";
import { useEffect, useRef, useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { customFetch, getImage } from "../../utils";

const HeroDirection = () => {
  const carouselRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [userImages, setUserImages] = useState({});

  async function getAvatar(avatar) {
    try {
      const response = await getImage(avatar);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUsersPin() {
      const params = {
        role: "OFFICEHOLDER",
      };
      try {
        const res = await customFetch("/users/pin", { params });
        setUsers(res.data.data);
        console.log(res);
      } catch (error) {
        console.log("error while fetch users pin:", error);
      }
    }
    fetchUsersPin();
  }, []);

  useEffect(() => {
    const fetchUserImages = async () => {
      const images = {};

      for (const person of users) {
        const { avatar, id } = person;
        if (avatar) {
          try {
            const imageUrl = await getAvatar(avatar);
            images[id] = imageUrl;
          } catch (error) {
            console.log(`Error fetching avatar for ${id}: ${error.message}`);
          }
        }
      }
      setUserImages(images);
    };

    fetchUserImages();
  }, [users]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Adjust the value based on the width of your items
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Adjust the value based on the width of your items
        behavior: "smooth",
      });
    }
  };
  if (users.length === 0) {
    return <></>;
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-4 justify-center">
          <SectionHeader text="Direksi" />
          <SectionTitle text="Dewan Direksi RSUD Bahteramas" />
        </div>
        {users.length > 2 && (
          <div className="flex flex-row gap-2">
            <button
              className="btn btn-primary btn-sm btn-circle"
              onClick={scrollLeft}
            >
              <MdKeyboardDoubleArrowLeft className="text-xl" />
            </button>
            <button
              className="btn btn-primary btn-sm btn-circle"
              onClick={scrollRight}
            >
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div
          className="carousel carousel-center bg-neutral rounded-box max-w-full space-x-5 p-4 my-10"
          ref={carouselRef}
        >
          {users &&
            users.map((user) => {
              const { id, name, position } = user;
              return (
                <Link
                  key={id}
                  to={`view/public/user/${id}`}
                  className="group group-hover:shadow-md transition-all duration-500"
                >
                  <div className="h-[200px] w-[195px] relative overflow-hidden">
                    <img
                      src={userImages[id] || profile}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                    <div className="text-center text-white p-2 space-y-1 bg-secondary/85 absolute bottom-0 right-0 left-0 h-fit translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                      <h3 className="font-bold text-sm">{name}</h3>
                      <p className="textarea-xs">{position}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HeroDirection;
