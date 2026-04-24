# Happy Vet Clinic

A full-stack veterinary clinic management system built as a capstone project.

## 🐾 About

Happy Vet Clinic is a web application that allows pet owners to manage their pets, book appointments with veterinarians, and view available services. Administrators can manage all users, pets, vets, appointments, and services.

## 🚀 Technologies Used

### Backend
- Java Spring Boot
- Spring Security with JWT Authentication
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS v4
- Axios
- React Router DOM
- Lucide React Icons

## ✨ Features

### User Side
- Landing page with clinic information
- User registration and login
- View all pets and vets
- Book and cancel appointments
- View personal appointments only

### Admin Side
- Admin dashboard with clinic stats
- Manage all users, pets, vets, appointments, and services
- Create appointments on behalf of users
- Delete any record

## 🛠️ How to Run

### Backend
1. Make sure MySQL is running
2. Create a database called `happyvetclinic`
3. Update `application.properties` with your database credentials
4. Run `VetClinicApplication.java` in IntelliJ

### Frontend
1. Navigate to the frontend folder
2. Install dependencies:
```bash
npm install
```
3. Start the dev server:
```bash
npm run dev
```
4. Open `http://localhost:5173`

## 🔐 Default Users

| Role | Username | Password |
|------|----------|----------|
| Admin | tina | smart123 |
| User | daletta | password |

## 📁 Project Structure
HappyVetClinic/
├── backend/          # Spring Boot API
│   ├── controller/   # REST endpoints
│   ├── entity/       # Database models
│   ├── repository/   # Data access
│   ├── service/      # Business logic
│   └── security/     # JWT auth
└── frontend/         # React app
├── src/
│   ├── pages/    # Page components
│   ├── components/ # Reusable components
│   ├── services/ # API calls
│   └── context/  # Auth context

## 👩‍💻 Developer

Daletta Houston — Capstone Project 2026