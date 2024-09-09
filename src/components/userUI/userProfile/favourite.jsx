import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavorites } from "../../../Redux/booking/bookingSlice";

const FavoriteRooms = () => {
  const dispatch = useDispatch();
  const { favorites, status, error } = useSelector((state) => state.bookings);
  const userId = "currentUser'sId";

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
//   console.log(favorites);
  return (
    <div>
      {favorites.map((favorite) => (
        <div key={favorite.id}>{favorite.roomTitle}</div>
      ))}
    </div>
  );
};

export default FavoriteRooms;
