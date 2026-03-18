# Expense Tracker
A web application that allows users to manage and track their expenses in one place. Users can add, edit, delete, categorize, and filter expenses.
### [Live Demo Link](https://keen-chimera-661bf9.netlify.app/)

## Tech Stack
**Frontend**: HTML, CSS, JavaScript  
**Backend**: Node.js, Express  
**Database**: MongoDB, Mongoose  
**Additional libraries:**
- Tailwind CSS
- Notyf
- date-fns
- jsonwebtoken
- bcrypt
- cookie-parser

## [Features](https://github.com/Bhavani-Bolloju/Expense-Tracker/blob/master/client/README.md)
- User authentication (register, login, logout, refresh tokens)
- Add, edit, and delete expenses
- Bulk delete expenses
- Categorize, sort and filter expenses
- Responsive UI using Tailwind CSS


## Prerequisites
- Node.js v24.12.0
- MongoDB running locally

## Environment Variables

Create `.env` files for both frontend and backend.

### Frontend (.env)
`VITE_API_BASE_URL`=http://localhost:3000

### Backend (.env)
- `ACCESS_TOKEN_SECRET` = your access secret
- `REFRESH_TOKEN_SECRET` = your refresh secret
- `DATABASE_URI` = MongoDB connection string
- `NODE_ENV` =development
- `FRONTEND_URL` = link to the frontend application running locally

## API Routes

### Auth
POST `/register`  
POST `/signin`
POST `/logout`  
POST `/refresh`  

### Expenses
GET `/expenses` – get all expenses for the logged-in user  
POST `/expenses` – add a new expense  
PUT `/expenses/:id` – update an expense  
DELETE `/expenses/:id` – delete a single expense  
DELETE `/expenses/bulk-delete` – delete multiple expenses  

## Usage

### Start backend
```
npm install  
npm run dev  
```

### Start frontend
```
npm install  
npm run dev 
```
Then register or sign in to start managing expenses.

## Folder structure

**Backend**
- `config/` - DB/config setup && CORS setup
- `controllers/` - request handling logic
- `middleware/` - auth verify
- `model/` - Mongoose schemas
- `routes/` - API routes

**Frontend**
- `api/` → handles all API calls
- `core/` → manages application state, data, and events
- `features/` → contains handlers and callback functions (business logic)
- `services/` → handles pagination, filtering, and data processing
- `UI/` → DOM templates and rendering logic
- `utils/` → helper/utility functions





