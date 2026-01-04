# ResidentialHub - Apartment Rental Portal

A full-stack residential apartment rental management system with a modern web interface for residents and powerful admin controls. This project demonstrates a complete solution covering UI, API, database, and containerized deployment.

## 🎯 Overview

**ResidentialHub** is a comprehensive apartment rental platform that enables:

### 👥 Resident Portal
- Browse available apartments with detailed listings
- View amenities and property features
- Request apartment bookings
- Track booking status in real-time
- View approval/denial decisions

### 🏢 Admin Portal
- Manage apartment towers and units
- Approve or decline booking requests
- Manage amenities and property features
- View occupancy rates and analytics
- Generate reports on rental performance
- Monitor mock payment data

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Python Flask** - REST API framework
- **Flask-CORS** - Cross-origin resource sharing
- **PostgreSQL** - Relational database (ready for production)
- **JWT-based Sessions** - Secure authentication

### DevOps
- **Docker** - Container deployment
- **Docker Compose** - Multi-container orchestration

## 📋 Project Structure

```
residentialhub/
├── client/
│   ├── pages/
│   │   ├── Index.tsx                 # Homepage
│   │   ├── ResidentLogin.tsx         # Resident login
│   │   ├── ResidentBrowse.tsx        # Browse apartments
│   │   ├── ResidentBookings.tsx      # View bookings
│   │   ├── AdminLogin.tsx            # Admin login
│   │   ├── AdminDashboard.tsx        # Admin dashboard
│   │   ├── AdminBookings.tsx         # Manage bookings
│   │   └── NotFound.tsx              # 404 page
│   ├── components/
│   │   └── ui/                       # shadcn/ui components
│   ├── App.tsx                       # Main app component
│   ├── global.css                    # Global styles
│   └── ...
├── backend/
│   ├── app.py                        # Flask application
│   ├── requirements.txt              # Python dependencies
│   └── Dockerfile                    # Backend container config
├── docker-compose.yml                # Multi-container orchestration
├── Dockerfile                        # Frontend container config
├── tailwind.config.ts               # Tailwind configuration
├── package.json                     # Node dependencies
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** (for containerized setup)
- **Node.js 18+** & **npm/pnpm** (for local development)
- **Python 3.11+** (for backend development)
- **Git** (version control)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd residentialhub

# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Database: localhost:5432
```

### Option 2: Local Development

#### Frontend Setup
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# The app will be available at http://localhost:5173
```

#### Backend Setup
```bash
# Install Python dependencies
cd backend
pip install -r requirements.txt

# Start Flask app
python app.py

# API will be available at http://localhost:5000
```

## 🔐 Demo Credentials

### Resident Account
- **Email**: `resident@example.com`
- **Password**: `password123`
- **Role**: Resident
- **Access**: Browse apartments, request bookings, view booking status

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: Administrator
- **Access**: Dashboard, manage bookings, view occupancy, analytics

## 📚 API Documentation

### Authentication Endpoints

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "resident@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "...",
  "user": {
    "id": 1,
    "email": "resident@example.com",
    "name": "John Resident",
    "role": "resident"
  }
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "newpassword123",
  "name": "New User"
}

Response: 201 Created
```

### Apartment Endpoints

#### Get All Apartments
```
GET /api/apartments?tower=Tower%20A&bedrooms=3

Response: 200 OK
[
  {
    "id": 1,
    "tower": "Tower A",
    "unit": "A-501",
    "floor": 5,
    "bedrooms": 3,
    "bathrooms": 2,
    "price": 2500,
    "status": "available"
  },
  ...
]
```

#### Get Apartment Details
```
GET /api/apartments/1

Response: 200 OK
{
  "id": 1,
  "tower": "Tower A",
  "unit": "A-501",
  "floor": 5,
  "bedrooms": 3,
  "bathrooms": 2,
  "price": 2500,
  "status": "available"
}
```

### Booking Endpoints

#### Get Bookings
```
GET /api/bookings
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 1,
    "user_id": 1,
    "apartment_id": 1,
    "status": "approved",
    "request_date": "2024-01-10"
  },
  ...
]
```

#### Create Booking
```
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "apartment_id": 1
}

Response: 201 Created
```

#### Approve Booking (Admin)
```
PUT /api/bookings/1/approve
Authorization: Bearer <admin-token>

Response: 200 OK
```

#### Decline Booking (Admin)
```
PUT /api/bookings/1/decline
Authorization: Bearer <admin-token>

Response: 200 OK
```

### Admin Endpoints

#### Get Dashboard Stats (Admin)
```
GET /api/admin/stats
Authorization: Bearer <admin-token>

Response: 200 OK
{
  "total_units": 156,
  "occupied_units": 128,
  "occupancy_rate": 82.05,
  "pending_bookings": 23,
  "total_revenue": 48500,
  "total_bookings": 150
}
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with a contemporary color scheme
- **Responsive Layout**: Fully responsive across desktop, tablet, and mobile devices
- **Intuitive Navigation**: Clear navigation paths for residents and admins
- **Interactive Components**: Real-time updates and smooth interactions
- **Accessible Design**: Semantic HTML and WCAG-compliant components

### Color Palette
- **Primary**: Blue (#1E40AF) - Trust and security
- **Secondary**: Green (#15803D) - Growth and vitality
- **Accent**: Amber (#EAB308) - Call-to-action
- **Neutral**: Gray scale - Clean backgrounds and text

## 📊 Features

### Resident Features
✅ User registration and login
✅ Browse apartments with filters (tower, bedrooms)
✅ View detailed apartment information
✅ Request apartment bookings
✅ Track booking status
✅ View approval/decline decisions
✅ Responsive mobile interface

### Admin Features
✅ Admin dashboard with KPIs
✅ View all apartments and units
✅ Manage booking requests (approve/decline)
✅ View tenant information
✅ Monitor occupancy rates per tower
✅ Track monthly revenue
✅ Filter and search bookings

## 🔄 Workflow

### Resident Workflow
1. Visit homepage
2. Login with resident credentials
3. Browse available apartments
4. Filter by tower, bedrooms, price
5. Request apartment booking
6. Check booking status
7. Receive approval/decline notification

### Admin Workflow
1. Access admin portal
2. View dashboard with KPIs
3. Review pending bookings
4. Approve or decline bookings
5. Manage apartment inventory
6. Monitor occupancy rates
7. Generate revenue reports

## 🧪 Testing

### Manual Testing
1. **Resident Path**: Login → Browse → Request → Check Status
2. **Admin Path**: Login → View Dashboard → Manage Bookings
3. **Public**: View homepage → Explore features

### Test Data
The application comes pre-populated with mock data including:
- 6 sample apartments across 3 towers
- 3 sample bookings with different statuses
- 2 demo user accounts (resident and admin)

## 🐳 Docker Deployment

### Building Images
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build frontend
docker-compose build backend
```

### Running Services
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Variables
Create a `.env` file in the project root:
```
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DB_NAME=residentialhub
DB_USER=postgres
DB_PASSWORD=your-password
VITE_API_URL=http://localhost:5000
```

## 📈 Future Enhancements

- **Database Integration**: Connect to PostgreSQL with ORM (SQLAlchemy)
- **Authentication**: Implement JWT tokens with refresh mechanisms
- **Payment Integration**: Stripe for secure rent payments
- **Email Notifications**: Send booking status updates
- **Image Gallery**: Upload and display apartment photos
- **Advanced Analytics**: Charts and reports for admin
- **Tenant Management**: Lease agreements and renewals
- **Maintenance Requests**: Report and track maintenance issues
- **Community Forum**: Resident communication platform
- **Mobile App**: Native iOS/Android applications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Email: support@residentialhub.com
- Phone: +1 (555) 123-4567

## 👥 Team

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Flask, Python
- **DevOps**: Docker, Docker Compose
- **Database**: PostgreSQL (production ready)

---

**Last Updated**: January 2024
**Version**: 1.0.0
