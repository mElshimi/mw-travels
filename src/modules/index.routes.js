import authRouter from "./auth/auth.router.js";
import cancelledTrip from "./cancelledTrips/cancelledTrips.router.js";
import cartRouter from "./cart/cart.router.js";
import categoryRouter from "./category/category.router.js";
import reviewRouter from "./reviews/reviews.router.js";
import tripRouter from "./trips/trips.router.js";
import userRouter from "./user/user.router.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/trips", tripRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/carts", cartRouter);
  app.use("/api/v1/cancelledTrips", cancelledTrip);
};
