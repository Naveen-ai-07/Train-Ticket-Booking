# Indian Railways Ticket Booking System

A full-stack web application for booking train tickets across all states and districts in India, built with React, Next.js, Node.js, Express, and MongoDB.

## Features

- 🚂 Search for trains between any states and districts in India
- 🎫 Book tickets for various train classes (Sleeper, 3AC, 2AC, 1AC, General)
- 📱 User-friendly and responsive design that works on all devices
- 🔐 User authentication and account management
- 📊 PNR status checking
- 📝 View and manage bookings
- 💳 Simulated payment flow (for demo purposes)

## Tech Stack

### Frontend
- **React** - UI library
- **Next.js** - React framework for server-side rendering
- **Tailwind CSS** - Utility-first CSS framework for styling
- **TypeScript** - Type safety and better developer experience

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/train-ticket-booking.git
cd train-ticket-booking
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/train_booking
JWT_SECRET=your_jwt_secret_key
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
# Start the backend server
npm run server

# In a separate terminal, start the frontend development server
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Demo User Credentials

For testing purposes, you can use the following credentials:

```
Email: demo@example.com
Password: password123
```

## Project Structure

```
train-ticket-booking/
├── backend/              # Backend code
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
├── public/               # Public assets
│   └── images/           # Images and icons
├── src/                  # Frontend code
│   ├── app/              # Next.js app directory
│   │   ├── components/   # React components
│   │   ├── context/      # React context providers
│   │   ├── styles/       # CSS styles
│   │   ├── utils/        # Utility functions
│   │   ├── (pages)/      # Application pages
│   │   └── layout.tsx    # Root layout
│   └── ...
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Future Enhancements

- Real-time train tracking
- Seat selection feature
- Email confirmation for bookings
- User reviews and ratings
- Multilingual support

## License

This project is licensed under the MIT License.

## Acknowledgements

- Indian Railways for inspiration
- All the open-source libraries and tools used in this project 