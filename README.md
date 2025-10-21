# AI Quiz Generator

An AI-powered quiz application that generates quizzes, evaluates answers, and provides performance insights using OpenAI's GPT model. The application features a modern React frontend and a robust Node.js/Express backend with MongoDB integration.

---

## 🎯 Features

- **AI-Generated Quizzes**: Automatically generate quiz questions based on grade, subject, and difficulty level
- **User Authentication**: Secure user registration and login with JWT tokens
- **Quiz Submission & Evaluation**: Submit answers and receive AI-powered performance evaluation
- **Performance Insights**: Get detailed feedback and suggestions for improvement
- **Email Notifications**: Receive quiz results via email
- **Quiz History**: Track and review previous quiz attempts
- **Retry Functionality**: Retake quizzes to improve scores
- **AI Hints**: Get AI-generated hints for challenging questions
- **Modern UI**: Responsive React frontend with TypeScript support

---

## 📁 Project Structure

```
AI QUIZ GENERator/
├── Backend/                          # Node.js/Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   └── quizController.js        # Quiz operations
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT authentication middleware
│   ├── models/
│   │   ├── Quiz.js                  # Quiz schema
│   │   ├── Submission.js            # Submission schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   └── quizRoutes.js            # Quiz endpoints
│   ├── services/
│   │   └── aiService.js             # OpenAI integration
│   ├── utils/
│   │   ├── email.js                 # Email utility
│   │   └── jwt.js                   # JWT utility
│   ├── app.js                       # Express app entry point
│   ├── Dockerfile                   # Docker configuration
│   ├── package.json                 # Backend dependencies
│   └── README.md                    # Backend documentation
│
├── Frontend/                         # React/TypeScript frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── App.tsx                  # Main app component
│   │   └── main.tsx                 # Entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.ts               # Vite configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Frontend dependencies
│   └── README.md                    # Frontend documentation
│
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20 or later
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **OpenAI API Key** (get it from [OpenAI](https://platform.openai.com/api-keys))

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/ai-quiz-generator.git
cd ai-quiz-generator
```

#### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create .env file with required variables
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret_key
PORT=3000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EOF

# Start the backend server
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

The backend will run on `http://localhost:3000`

#### 3. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port shown in terminal)

---

## 🐳 Docker Setup

### Build and Run with Docker

```bash
cd Backend

# Build the Docker image
docker build -t quiz-ai-app .

# Create .env file
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp
JWT_SECRET=your_jwt_secret_key
PORT=3000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EOF

# Run the container
docker run -p 3000:3000 --env-file .env quiz-ai-app
```

---

## 🔧 Environment Variables

### Backend (.env)

```properties
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/quizapp
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=3000

# Email Configuration (for sending results)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Quiz Operations
- `POST /quiz/generate` - Generate a new quiz
- `POST /quiz/submit` - Submit quiz answers for evaluation
- `GET /quiz/history` - Get quiz history with optional filters
- `POST /quiz/retry` - Retry a previously taken quiz
- `POST /quiz/hint` - Get AI-generated hint for a question
- `POST /quiz/send-result` - Send quiz results via email

---

## 🛠️ Development

### Backend Development

```bash
cd Backend

# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

### Frontend Development

```bash
cd Frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

---

## 🧪 Testing

### Backend Testing

```bash
cd Backend
npm test
```

### Frontend Testing

```bash
cd Frontend
npm test
```

---

## 📝 Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **OpenAI API** - AI-powered quiz generation and evaluation
- **JWT** - Authentication
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Client-side routing
- **SWR** - Data fetching
- **Lucide React** - Icons
- **Canvas Confetti** - Celebration animations

---

## 🐛 Known Issues

1. **Environment Variables**: Ensure `.env` file is correctly configured and restart the application after changes
2. **OpenAI API Key**: Verify the API key is valid and has sufficient permissions
3. **MongoDB Connection**: Verify `MONGO_URI` points to a valid MongoDB instance
4. **Email Configuration**: Ensure email credentials are correct for sending notifications
5. **CORS Issues**: If frontend and backend are on different origins, ensure CORS is properly configured

---

## 🚀 Future Enhancements

- [ ] Add user profile and settings management
- [ ] Implement quiz categories and tags
- [ ] Add leaderboard functionality
- [ ] Support for multiple languages
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] Real-time collaboration features
- [ ] Integration with more AI models
- [ ] Offline mode support
- [ ] Advanced caching strategies

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For support, please open an issue on the GitHub repository or contact the development team.

---

## 🔐 Security Notes

- Never commit `.env` files to version control
- Keep your OpenAI API key secure
- Use strong JWT secrets in production
- Validate and sanitize all user inputs
- Use HTTPS in production
- Keep dependencies updated regularly

---

**Last Updated**: October 2024

