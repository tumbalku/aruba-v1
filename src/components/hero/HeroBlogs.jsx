import { Link } from "react-router-dom";
import SectionHeader from "../section/SectionHeader";
import SectionTitle from "../section/SectionTitle";
import bahteramas from "/image/hero1.jpg";
import { GoPerson } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { convertDateArrayToString, customFetch, getText } from "../../utils";
import { useEffect, useState } from "react";
const HeroBlogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const params = {
        size: 3,
      };

      try {
        const response = await customFetch.get("/posts", { params });
        console.log(response);
        setPosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchNews();
  }, []);

  if (posts.length === 0) {
    return <></>;
  }
  return (
    <div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <SectionHeader text="Berita Terkini" />
        </div>
        <div className="text-center">
          <SectionTitle text="Berita dan Artikel Terbaru" />
        </div>
      </div>
      {posts ? (
        <div className="my-10 grid grid-cols-6 gap-5">
          {posts.map((post) => {
            const { imageUrl, title, id, content, user, createdAt } = post;
            return (
              <Blogs
                key={id}
                id={id}
                date={createdAt}
                desc={content}
                image={imageUrl}
                name={user.name}
                title={title}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-xs text-center">Post belum dibuat</p>
        </div>
      )}

      <div className="flex justify-center">
        <Link to="news" className="btn-primary btn-sm btn">
          Baca lainnya
        </Link>
      </div>
    </div>
  );
};

export default HeroBlogs;

const Blogs = ({ image, name, date, title, desc, id }) => {
  return (
    <div className="col-span-6 sm:col-span-3 md:col-span-2  bg-base-200 shadow-xl">
      <Link to={`news/${id}`}>
        <img
          src={image || bahteramas}
          alt="bahteramas"
          className="w-full h-[225px] object-cover"
        />
      </Link>

      <div className="p-4">
        <div className="flex flex-row gap-5 border-b-2 border-base-300 pb-2">
          <div className="flex flex-row items-center gap-2">
            <GoPerson className="w-5 h-5 text-primary" />
            <p className="text-xs">{name}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <IoCalendarOutline className="w-5 h-5 text-primary" />
            <p className="text-xs">{convertDateArrayToString(date)}</p>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <Link
            to={`news/${id}`}
            className="text-lg hover:text-primary font-semibold line-clamp-2"
          >
            {title}
          </Link>
          <p className="text-xs line-clamp-3">{getText(desc)}</p>
          <Link
            to={`news/${id}`}
            className="flex flex-row items-center hover:text-primary gap-2"
          >
            <p className="text-sm font-medium">Baca lebih lanjut</p>
            <IoIosArrowRoundForward className="w-5 h-5 " />
          </Link>
        </div>
      </div>
    </div>
  );
};
