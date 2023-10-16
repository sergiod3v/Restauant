#### Env Variables

The following variables are needed to run the project, these are located in the following microservices folders

---

./app/.env
BASE_URL = localhost/api/v1

---

./users/.env

MONGO_URI = "mongodb+srv://sergioadev:<password>@cluster0.5gxcazi.mongodb.net/Users?retryWrites=true&w=majority"
PORT = 3001
BASE_URL="/api/v1"
JWT_SECRET = <secret>
JWT_LIFETIME = "30d"

---

./orders/.env

MONGO_URI = "mongodb+srv://sergioadev:<password>@cluster0.5gxcazi.mongodb.net/Orders?retryWrites=true&w=majority"
PORT = 3002
BASE_URL="/api/v1"
JWT_SECRET = <encrypted-secret>
JWT_LIFETIME = "30d"

---

docker-compose build & docker-compose up
