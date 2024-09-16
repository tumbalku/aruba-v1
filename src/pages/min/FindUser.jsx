import { useEffect, useState } from "react";
import { getImage } from "../../utils";
import profile from "/image/single.png";

const FindUser = ({ people, getUser }) => {
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
    const fetchUserImages = async () => {
      const images = {};

      for (const person of people) {
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
  }, []);

  return (
    <div className="bg-base-100 border rounded-lg my-4 max-h-[280px] overflow-y-scroll">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <tbody>
            {people.map((person) => {
              const { id, name, workUnit } = person;
              return (
                <tr key={id} className="flex justify-between items-center">
                  <td>
                    <div className="flex space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={userImages[id] || profile} alt={name} />
                          {/* <img src={profile} alt={name} /> */}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold capitalize">{name}</div>
                        <div className="text-sm opacity-50 line-clamp-1">
                          {workUnit ? workUnit : "-"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => getUser(person)}
                      className="btn btn-primary btn-sm"
                    >
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FindUser;
