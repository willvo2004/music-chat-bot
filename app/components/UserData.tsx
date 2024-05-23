import { fetchUser } from "../lib/data";
import { useEffect, useState } from "react";

const UserData = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  useEffect(() => {
    function getUserData() {
      fetchUser()
        .then((result) => {
          setUser(result);
        })
        .catch((error) => {
          console.log("error fetching user", error);
        });
    }
    getUserData();
  }, []);
  return (
    <div>
      <section className="flex">
        <p>{user?.name}</p>
      </section>
    </div>
  );
};

export default UserData;
