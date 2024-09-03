import React from "react";
import post from "/image/hero1.jpg";
import { Link } from "react-router-dom";
const Post = ({ title, id }) => {
  return (
    <div className="flex flex-col sm:odd:flex-row-reverse sm:flex-row gap-8 hover:shadow-xl p-4 transition duration-300 ease-in-out">
      <div className="flex-[4]">
        <img
          src={post}
          alt=""
          className="object-cover rounded-lg w-full h-[200px]"
        />
      </div>
      <div className="flex-[6] h-[200px] flex flex-col gap-4">
        <Link to={`${id}`} className="text-2xl font-bold line-clamp-2">
          {title}
        </Link>
        <p className="line-clamp-5 small-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus cum
          quae nisi odit quia iste iure totam ipsam quos a, atque unde laborum
          sed nihil fugit voluptates aperiam ex id inventore beatae maxime
          consequuntur? Eveniet culpa ab non alias, similique rem assumenda
          incidunt quasi. Tempora, vel! Accusantium quia ullam enim similique,
          porro aspernatur ab nemo quis tenetur, quos natus id maiores totam
          praesentium veritatis quam, maxime mollitia sit. Nobis illo unde
          debitis quisquam blanditiis sapiente vel similique qui iste aliquid
          quasi voluptatum sint non perspiciatis eos, est odio error tempore
          illum vero facilis dolores ex inventore quaerat? Doloribus quibusdam,
          sapiente nobis, velit labore laudantium unde totam placeat dolorum
          tempore alias voluptates inventore reiciendis nulla quod voluptatem,
          ea officiis voluptate sint nisi fugit similique doloremque! Facere
          deserunt debitis reprehenderit a soluta culpa vitae eligendi ducimus
          molestiae esse voluptatem aspernatur architecto quisquam reiciendis
          modi repellat quam nisi, nulla quasi quibusdam! Ut sequi, doloribus
          aliquam dolore dolor consequuntur cum maiores excepturi, eligendi
          provident, voluptate necessitatibus harum voluptatibus nemo ex
          temporibus nesciunt distinctio ipsam fugit ipsum ullam debitis numquam
          commodi! Consequatur, non ab natus dicta delectus, voluptatum quisquam
          obcaecati voluptatem qui rem vero. Saepe voluptatum ab deserunt eum,
          sint aliquam voluptatem ut quia voluptatibus.
        </p>
        <Link
          to={`${id}`}
          className="btn btn-outline btn-sm btn-secondary px-10 w-fit"
        >
          Baca
        </Link>
      </div>
    </div>
  );
};

export default Post;
