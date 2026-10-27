import { connection } from "./DB/config/database.js";
import { userRouter } from "./modules/user/user.controller.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";

export const bootstrap = async (app, express) => {
    app.use(express.json());


    connection();
    app.use(userRouter);
    // app.use(global error handling)
    app.use(globalErrorHandler)

}