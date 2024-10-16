import authRouter from "./auth.js";
import cartRouter from "./cart.js";
import orderRouter from "./order.js";
import productRouter from "./product.js";
import userRouter from "./user.js"

const router = (app) => {
   app.use("/v1/auth", authRouter);
   app.use("/v1/product", productRouter);
   app.use("/v1/user", userRouter);
   app.use("/v1/order", orderRouter);
   app.use("/v1", cartRouter);
}

export default router;