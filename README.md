# SecureAuth - Login & Registration Website

A complete web application with secure login and registration functionality.

## Features

✨ **2 Main Features:**
1. **Login Page** - Secure user authentication with form validation
2. **Registration Page** - Create new user accounts with password encryption

Additional Features:
- User-friendly interface
- Form validation (client-side and server-side)
- Password encryption using bcryptjs
- SQLite database for user storage
- Responsive design for mobile and desktop
- Dashboard after successful login

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js with Express.js
- **Database:** SQLite3
- **Security:** bcryptjs for password hashing

## Installation

1. **Clone/Download the project**
   ```
   cd sainitha project
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the server**
   ```
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
sainitha project/
├── public/
│   ├── index.html          # Home page
│   ├── login.html          # Login page
│   ├── register.html       # Registration page
│   ├── dashboard.html      # User dashboard (after login)
│   ├── style.css           # All styles
│   ├── login.js            # Login form logic
│   └── register.js         # Registration form logic
├── server.js               # Express server & API routes
├── db.js                   # Database setup
├── package.json            # Dependencies
└── users.db               # SQLite database (created after first run)
```

## How It Works

### Registration Flow
1. User fills out registration form with username, email, password
2. Client-side validation checks all fields
3. Password is validated (min 6 characters, must match confirm password)
4. Data sent to server
5. Server validates again, encrypts password, saves to database
6. User redirected to login page

### Login Flow
1. User enters username and password
2. Client-side validation checks inputs
3. Credentials sent to server
4. Server checks database for user
5. Password compared with stored hash
6. If valid, user data stored and redirected to dashboard
7. Dashboard displays user information

## API Endpoints

### POST `/api/register`
Register a new user
- **Body:** `{ username, email, password, confirmPassword }`
- **Response:** `{ success, message, redirect }`

### POST `/api/login`
Authenticate a user
- **Body:** `{ username, password }`
- **Response:** `{ success, message, redirect, user: { id, username, email } }`

## Security Features

✅ Password encryption with bcryptjs
✅ Unique username and email constraints
✅ Form validation (both client and server)
✅ SQL injection prevention (parameterized queries)
✅ Password strength requirements

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## License

MIT License

## Author

Created for educational purposes

---

**Enjoy using SecureAuth!** 🔐
