# Hirely

**Hirely** is a full-stack job portal application built with React, Spring Boot, and PostgreSQL. It enables users to browse, search, and create job posts with a modern, responsive interface. The project is modular, scalable, and designed as a foundation for building a professional job platform akin to LinkedIn Jobs or Indeed.

## Features

### Core Features

- **Job Listing**: View all job posts with details like job title, description, required experience, and technologies.
- **Search Functionality**: Search for jobs by keywords (profile, description, or tech stack) with case-insensitive filtering.
- **Pagination**: Navigate through job listings page by page, with filters remaining active during navigation.
- **Create Job Post**: Add new jobs via a user-friendly form (profile, description, experience, tech stack).
- **Responsive UI**: Built with ReactJS and TailwindCSS for seamless experience across mobile, tablet, and desktop.
- **REST API**: Backend powered by Spring Boot, providing endpoints for job operations and storing data in PostgreSQL.
- **Swagger UI**: Interactive API documentation available for testing backend endpoints.

### Intermediate Features

- **Authentication & Authorization**: JWT-based authentication, with role-based access for employers and job seekers.
- **Job Details Page**: Detailed view for each job, including company info and application options.
- **Apply for a Job**: Users can submit applications with name, resume, and a message.
- **Update & Delete Jobs**: Employers can edit or remove job posts.
- **Advanced Search & Filters**: Filter by experience, tech stack, location, and company name.
- **404 & Error Handling**: Custom error pages and alerts for invalid routes or failed API requests.

### Advanced & Developer Features

- **User Profiles**: Separate dashboards for job seekers and employers.
- **Notifications & Email**: Email alerts for applications, employer notifications.
- **Admin Dashboard**: Manage users, approve/reject job posts, and moderate listings.
- **Cloud Deployment**: Deployable on platforms like Render, Railway, Vercel, or Netlify.
- **PWA Support**: Progressive Web App features for mobile usability.
- **Performance Enhancements**: Caching, lazy loading, and efficient state management.
- **Testing**: JUnit, Mockito for backend; React Testing Library for frontend.
- **Logging & Monitoring**: Health checks and structured logging with Spring Boot Actuator and Logback.
- **API Documentation**: OpenAPI/Swagger for live API testing.

## Tech Stack

- **Frontend**: ReactJS, TailwindCSS
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Docs**: Swagger/OpenAPI

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Utsavvvvvvv/Hirely.git
   ```

2. **Backend Setup**
   - Install Java and PostgreSQL.
   - Configure database connection in `application.properties`.
   - Run the backend:
     ```bash
     cd backend
     ./mvnw spring-boot:run
     ```
   - Access API docs at: `http://localhost:8080/swagger-ui.html`

3. **Frontend Setup**
   - Install Node.js and npm.
   - Run the frontend:
     ```bash
     cd frontend
     npm install
     npm start
     ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests to help improve the project.

## License

This project is currently unlicensed. Please check with the repository owner for usage permissions.

## Acknowledgements

Inspired by modern job portals and built for learning and rapid prototyping.

---

[GitHub Repository](https://github.com/Utsavvvvvvv/Hirely)
