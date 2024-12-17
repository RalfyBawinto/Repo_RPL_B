import User from "../models/UserModel.js"; // Import User model
import Reservation from "../models/modelReservation.js"; // Import Reservation model

// Menambahkan asosiasi one-to-many
User.hasMany(Reservation, {
  foreignKey: "userId",
  as: "reservations",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
