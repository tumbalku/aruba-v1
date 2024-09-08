import { useLoaderData } from "react-router-dom";
import { convertDateArrayToString, customFetch } from "../../utils";
import profile from "/image/single.png";
import DOMPurify from "dompurify";

export const loader = async ({ params }) => {
  try {
    const response = await customFetch(`posts/${params.id}`);

    return { news: response.data.data };
  } catch (error) {
    console.log(error);
    return null;
  }
};
const NewsDetail = () => {
  const { news } = useLoaderData();
  const { title, createdAt, updatedAt, imageUrl, author, content, id } = news;
  console.log(news);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">{title}</h1>
      <div className="flex flex-col md:flex-row gap-2">
        <p>
          <span className="badge badge-primary badge-sm font-semibold">
            Publish: {convertDateArrayToString(createdAt)}
          </span>
        </p>
        {createdAt[2] !== updatedAt[2] && (
          <p>
            <span className="badge badge-secondary badge-sm font-semibold">
              Update: {convertDateArrayToString(updatedAt)}
            </span>
          </p>
        )}
      </div>
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
      )}
      <div className="flex flex-row gap-2 items-center">
        <img
          src={profile}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-semibold mb-1">{author}</p>
      </div>
      <div
        className="prose w-full max-w-none leading-relaxed content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allowfullscreen", "frameborder", "src", "className"],
          }),
        }}
      ></div>
    </div>
  );
};

export default NewsDetail;
