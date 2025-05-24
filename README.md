

# NextHire

NextHire is a full-stack application built with Next.js designed to connect users with the right job opportunities tailored to their unique skill sets—making your job search smarter, simpler, and spot on.

---

## Getting Started

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

---

## API Routes

### Authentication

* **POST** `/api/auth/signUp` — Register a new user
* **POST** `/api/auth/signIn` — Login an existing user
* **GET** `/api/auth/fetchUser` — Fetch logged-in user details (requires token)

### User Profile

* **PUT** `/api/userprofile/updateProfile` — Update user profile details

### Jobs

* **GET** `/api/jobs/getjobs` — Fetches the top 5 jobs for the authenticated user based on a relevance score.  
  The score is calculated by matching skills, location, job type, and years of experience.
  Requires a Bearer token for authentication.

---

## Data Models

* **User** — Stores user details including skills and experience
* **Jobs** — Stores job postings with title, company, location, skills required, and other info

---

## Key Components

* **Landpage.js** — Displays the constellation background and hero section
* **Herosection.js** — Main intro area for the landing page
* **Sidebar.js** — Navigation sidebar
* **JobList.js** — Displays job listings filtered by user skills
* **ViewProfile.js** — Shows user profile details
* **EditProfile.js** — Allows user to edit profile information

---

## Context Providers

* **AuthContext** — Manages signup, signin, signout, and fetchUser functions
* **UserProfileContext** — Handles user profile updates
* **JobContext** — Fetches jobs based on skills

---

## Questions?

Feel free to reach out at: **[shivipandey993@gmail.com](mailto:shivipandey993@gmail.com)**

---


