import Swal from "sweetalert2";
import network_err from "/image/network-error.png";
import { customFetch } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const First = () => {
  const user = useSelector((state) => state.userState.user);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Delay 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchProducts(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchProducts = async (searchTerm) => {
    try {
      const response = await customFetch("/users/search", {
        params: {
          identity: searchTerm,
        },
        headers: {
          "X-API-TOKEN": user.token,
        },
      });
      const data = response.data.data;
      console.log(data);
      setPeople(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="border p-2 rounded"
          />
          {people &&
            people.map((person) => {
              return <h1 key={person.id}>{person.name}</h1>;
            })}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default First;
