import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connections and listeneres
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`server Open ${PORT} & Connected To Database 🤟`));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map