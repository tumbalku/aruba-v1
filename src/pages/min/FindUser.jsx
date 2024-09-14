const FindUser = ({ people, getUser }) => {
  return (
    <div className="bg-base-100 border rounded-lg my-4 max-h-[280px] overflow-y-scroll">
      <div className="overflow-x-auto">
        <table className="table table-xs text-center">
          <tbody>
            {people.map((person) => {
              return (
                <tr key={person.id}>
                  <td>{person.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => getUser(person)}
                      className="btn btn-primary btn-xs"
                    >
                      Pilih
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
