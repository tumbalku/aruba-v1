import { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import FindUser from "../min/FindUser";
import { chooseUser } from "../../features/user/tempSlice";

const Second = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => setIsOpen(true);

  const getUser = (name) => {
    dispatch(chooseUser(name));
    console.log(name);
    closeModal();
  };
  const closeModal = () => {
    setIsOpen(false);
    setQuery("");
    setIsFetched(false);
    setPeople([]);
  };
  const user = useSelector((state) => state.userState.user);
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!query) return;

    const handler = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const response = await customFetch("/users/search", {
            params: {
              identity: query,
            },
            headers: {
              "X-API-TOKEN": user.token,
            },
          });
          const data = response.data.data;
          setPeople(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsFetched(true);
        }
      };

      fetchProducts();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={openModal}
      >
        Pilih Pengguna
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              Masukan Nama atau NIP
            </h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="border p-2 rounded w-full"
            />
            {isFetched ? (
              people.length > 0 ? (
                <FindUser people={people} getUser={getUser} />
              ) : (
                <p>User tidak ditemukan</p>
              )
            ) : null}
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={closeModal}
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Second;
