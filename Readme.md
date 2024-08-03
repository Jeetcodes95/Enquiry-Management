# Enquiry Management System

This project is an Enquiry Management System built with Next.js for the frontend and Node.js (with Express) for the backend. The project uses MongoDB for the database, Passport.js for authentication, Tailwind CSS for styling, and Redux for state management.


## App Flow

1. **User Signup/Login:**
   - Users can sign up with their username, email, and password.
   - Users can log in with their email and password.

2. **User Enquiry:**
   - Logged-in users can create and submit enquiries for approval.

3. **Admin Panel:**
   - Admins can view all user enquiries.
   - Admins can accept or decline enquiries.
   - When an enquiry is accepted, the user receives a notification.

4. **Theme Toggle:**
   - Users can toggle between light and dark modes using the theme toggle button.

## Running the Project

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Backend Setup

1. Navigate to the main directory.
2. Install dependencies: 
    npm install
3. Create a .env file in the config directory with the following content:
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    SECRET=your_session_secret
    JWT_SECRET = "your JWT secret"
    JWT_EXPIRE = 'Your Duration'
    COOKIE_EXPIRE = Your Duration.
4. Start the backend server: "npm start"

### Frontend Setup

1. Navigate to the frontend directory:
    cd client
2. Install dependencies:
    npm install
3. Create a next.config.mjs file in the frontend directory with the following content to configure the proxy:
    {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*'
      }
4. Start the frontend server:
    npm run dev

### Accessing the App

Frontend: Open http://localhost:3000 in your browser.
Backend: The backend API will be running on http://localhost:8000.


### Notes

1. Ensure that the backend server is running before starting the frontend server to avoid API request issues.
2. The frontend is configured to proxy API requests to the backend server running on port 8000.

### License
This project is licensed under the ISC License - see the LICENSE file for details.