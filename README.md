# 🌦️ WeatherNova

WeatherNova is a Full Stack Weather Forecast Application that provides real-time weather information for any city using a modern, responsive user interface. The application integrates a React.js frontend with a Java Spring Boot backend and fetches live weather data through a REST API.

---

## 📌 Features

- 🌍 Search weather by city name
- 🌡️ Display current temperature
- 💧 Humidity information
- 🌬️ Wind speed
- ☁️ Weather condition and description
- 📱 Responsive design for desktop and mobile
- ⚡ Fast API response
- ❌ Error handling for invalid city names
- 🔄 REST API integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Java
- Spring Boot
- Maven

### API
- OpenWeatherMap API

### Tools
- Git
- GitHub
- VS Code
- IntelliJ IDEA
- Postman

---

## 📂 Project Structure

```
WeatherNova/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/WeatherNova.git
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at

```
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at

```
http://localhost:8080
```

---

## 🔑 Configure API Key

Create an account on OpenWeatherMap and generate an API Key.

Add your API key in

```
application.properties
```

or

```
.env
```

Example

```
OPENWEATHER_API_KEY=YOUR_API_KEY
```

---

## 📡 REST API Flow

```
User
   ↓
React Frontend
   ↓
Spring Boot Backend
   ↓
OpenWeatherMap API
   ↓
Weather Data
   ↓
React UI
```

---

## 🚀 Future Enhancements

- 7-Day Weather Forecast
- Air Quality Index
- Weather Maps
- Voice Search
- GPS Location Detection
- Weather Alerts
- Dark Mode
- User Login
- Favourite Cities
- Weather History

---

## 📷 Screenshots

Add screenshots here.

Example

```
images/homepage.png

images/search-result.png
```

---

## 💻 Skills Demonstrated

- React.js
- Java Spring Boot
- REST API Integration
- Responsive Web Design
- HTML
- CSS
- JavaScript
- Git & GitHub
- Maven
- Object-Oriented Programming
- MVC Architecture
- Error Handling

---

## 📖 Learning Outcomes

- Developed a complete Full Stack application.
- Integrated external REST APIs.
- Implemented responsive UI.
- Built backend services using Spring Boot.
- Practiced clean code architecture.
- Improved Git version control workflow.

---

## 👩‍💻 Author

**Geetanjali Khurana**

B.Tech CSE (DevOps & Data Science)

Lovely Professional University

GitHub: https://github.com/geetanjalikhurana

## 📄 License

This project is created for educational and portfolio purposes.
