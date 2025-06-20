# Graphketing

This project is a full-stack application with a React frontend and a Node.js/Express backend.

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/Shubham126/Graphketing.git
cd Graphketing
```

### 2. Install dependencies
#### For the client (React app):
```
cd client
npm install
```
#### For the server (API):
```
cd ../server
npm install
```

### 3. Running the app locally
#### Start the backend server:
```
cd server
node server.js
```
By default, the backend runs on [http://localhost:5000](http://localhost:5000)

#### Start the frontend (React app):
Open a new terminal window/tab:
```
cd client
npm start
```
By default, the frontend runs on [http://localhost:3000](http://localhost:3000)

### 4. Building for production
To create a production build of the React app:
```
cd client
npm run build
```
The build output will be in the `client/build` directory.

## Notes
- Make sure your backend server is running before using the frontend for full functionality.
- You may need to configure environment variables (e.g., for database connection) in the `server` directory.

## License
This project is for educational/demo purposes.

---
Feel free to open issues or pull requests for improvements! 