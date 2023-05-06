# Perfumer-Share
PerfumerShare
PerfumerShare is a social platform for perfume enthusiasts to share and discover new fragrances. It allows users to create profiles, post reviews of perfumes, and follow other users to stay up to date on their favorite fragrances.

Technologies Used
React: I chose React as the front-end library for this app because of its component-based architecture, which makes it easy to create reusable UI elements and manage state.
Redux: To manage the app's state, I used Redux, which provides a predictable state container for JavaScript apps.
Express: For the back-end, I used Express, a minimal and flexible Node.js web application framework, which allows for easy routing and middleware configuration.
MongoDB: To store the app's data, I chose MongoDB, a popular NoSQL database, which allows for flexible and scalable data storage.
JSON Web Tokens (JWT): To authenticate users and authorize access to protected routes, I used JWT, a stateless authentication mechanism that securely transmits information between parties as a JSON object.
How to Run the App
To run the app locally, follow these steps:

Clone the repository: git clone https://github.com/your_username/PerfumerShare.git
Install dependencies: cd PerfumerShare && npm install
Set environment variables: create a .env file in the root directory with the following variables:
makefile
Copy code
PORT=3030
MONGODB_URI=mongodb://localhost:27017/perfumershare
JWT_SECRET=your_secret_key
Start the server: nodemon server.js
Start the client: npm start
Open your browser and navigate to http://localhost:3000
That's it! You should now be able to use the app locally.
