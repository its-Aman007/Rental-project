"""
ResidentialHub Backend API
Main Flask application with REST APIs for authentication, apartments, bookings, and admin operations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
from datetime import datetime, timedelta
import os
import secrets

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Mock database (in production, use PostgreSQL)
users_db = {
    'resident@example.com': {'password': 'password123', 'role': 'resident', 'id': 1, 'name': 'John Resident'},
    'admin@example.com': {'password': 'admin123', 'role': 'admin', 'id': 2, 'name': 'Jane Admin'}
}

apartments_db = [
    {'id': 1, 'tower': 'Tower A', 'unit': 'A-501', 'floor': 5, 'bedrooms': 3, 'bathrooms': 2, 'price': 2500, 'status': 'available'},
    {'id': 2, 'tower': 'Tower B', 'unit': 'B-302', 'floor': 3, 'bedrooms': 2, 'bathrooms': 1, 'price': 1800, 'status': 'available'},
    {'id': 3, 'tower': 'Tower A', 'unit': 'A-801', 'floor': 8, 'bedrooms': 3, 'bathrooms': 2, 'price': 3200, 'status': 'available'},
    {'id': 4, 'tower': 'Tower C', 'unit': 'C-601', 'floor': 6, 'bedrooms': 4, 'bathrooms': 3, 'price': 4000, 'status': 'available'},
    {'id': 5, 'tower': 'Tower B', 'unit': 'B-201', 'floor': 2, 'bedrooms': 2, 'bathrooms': 1, 'price': 1600, 'status': 'available'},
    {'id': 6, 'tower': 'Tower C', 'unit': 'C-702', 'floor': 7, 'bedrooms': 3, 'bathrooms': 2, 'price': 2900, 'status': 'available'},
]

bookings_db = [
    {'id': 1, 'user_id': 1, 'apartment_id': 1, 'status': 'approved', 'request_date': '2024-01-10'},
    {'id': 2, 'user_id': 1, 'apartment_id': 2, 'status': 'pending', 'request_date': '2024-01-08'},
    {'id': 3, 'user_id': 1, 'apartment_id': 4, 'status': 'declined', 'request_date': '2024-01-05'},
]

sessions_db = {}

# ============== AUTHENTICATION ==============

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login endpoint for residents and admins"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = users_db.get(email)
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Create session token
    token = secrets.token_urlsafe(32)
    sessions_db[token] = {
        'user_id': user['id'],
        'email': email,
        'role': user['role'],
        'created_at': datetime.now()
    }
    
    return jsonify({
        'token': token,
        'user': {
            'id': user['id'],
            'email': email,
            'name': user['name'],
            'role': user['role']
        }
    }), 200

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """Logout endpoint"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if token in sessions_db:
        del sessions_db[token]
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register endpoint for new residents"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if email in users_db:
        return jsonify({'error': 'Email already registered'}), 400
    
    # Add new user
    new_user_id = max([u['id'] for u in users_db.values()]) + 1
    users_db[email] = {
        'password': password,
        'role': 'resident',
        'id': new_user_id,
        'name': name
    }
    
    return jsonify({'message': 'Registered successfully', 'user_id': new_user_id}), 201

def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if token not in sessions_db:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

def require_role(role):
    """Decorator to require specific role"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization', '').replace('Bearer ', '')
            if token not in sessions_db:
                return jsonify({'error': 'Unauthorized'}), 401
            session = sessions_db[token]
            if session['role'] != role:
                return jsonify({'error': 'Forbidden'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ============== APARTMENT ENDPOINTS ==============

@app.route('/api/apartments', methods=['GET'])
def get_apartments():
    """Get all available apartments"""
    tower = request.args.get('tower')
    bedrooms = request.args.get('bedrooms')
    
    results = apartments_db
    if tower:
        results = [a for a in results if a['tower'] == tower]
    if bedrooms:
        try:
            beds = int(bedrooms)
            results = [a for a in results if a['bedrooms'] == beds]
        except ValueError:
            pass
    
    return jsonify(results), 200

@app.route('/api/apartments/<int:apartment_id>', methods=['GET'])
def get_apartment(apartment_id):
    """Get specific apartment details"""
    apartment = next((a for a in apartments_db if a['id'] == apartment_id), None)
    if not apartment:
        return jsonify({'error': 'Apartment not found'}), 404
    return jsonify(apartment), 200

@app.route('/api/apartments', methods=['POST'])
@require_role('admin')
def create_apartment():
    """Create new apartment (admin only)"""
    data = request.json
    new_apartment = {
        'id': max([a['id'] for a in apartments_db]) + 1,
        'tower': data.get('tower'),
        'unit': data.get('unit'),
        'floor': data.get('floor'),
        'bedrooms': data.get('bedrooms'),
        'bathrooms': data.get('bathrooms'),
        'price': data.get('price'),
        'status': 'available'
    }
    apartments_db.append(new_apartment)
    return jsonify(new_apartment), 201

# ============== BOOKING ENDPOINTS ==============

@app.route('/api/bookings', methods=['GET'])
@require_auth
def get_bookings():
    """Get bookings for current user or all bookings (admin)"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    session = sessions_db[token]
    
    if session['role'] == 'admin':
        # Return all bookings for admin
        results = bookings_db
        status = request.args.get('status')
        if status:
            results = [b for b in results if b['status'] == status]
        return jsonify(results), 200
    else:
        # Return only user's bookings
        user_bookings = [b for b in bookings_db if b['user_id'] == session['user_id']]
        return jsonify(user_bookings), 200

@app.route('/api/bookings', methods=['POST'])
@require_auth
def create_booking():
    """Create new booking request"""
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    session = sessions_db[token]
    
    data = request.json
    apartment_id = data.get('apartment_id')
    
    # Check if apartment exists
    apartment = next((a for a in apartments_db if a['id'] == apartment_id), None)
    if not apartment:
        return jsonify({'error': 'Apartment not found'}), 404
    
    # Create booking
    new_booking = {
        'id': max([b['id'] for b in bookings_db]) + 1,
        'user_id': session['user_id'],
        'apartment_id': apartment_id,
        'status': 'pending',
        'request_date': datetime.now().isoformat()
    }
    bookings_db.append(new_booking)
    return jsonify(new_booking), 201

@app.route('/api/bookings/<int:booking_id>/approve', methods=['PUT'])
@require_role('admin')
def approve_booking(booking_id):
    """Approve booking (admin only)"""
    booking = next((b for b in bookings_db if b['id'] == booking_id), None)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    booking['status'] = 'approved'
    return jsonify(booking), 200

@app.route('/api/bookings/<int:booking_id>/decline', methods=['PUT'])
@require_role('admin')
def decline_booking(booking_id):
    """Decline booking (admin only)"""
    booking = next((b for b in bookings_db if b['id'] == booking_id), None)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    booking['status'] = 'declined'
    return jsonify(booking), 200

# ============== ADMIN DASHBOARD ENDPOINTS ==============

@app.route('/api/admin/stats', methods=['GET'])
@require_role('admin')
def get_stats():
    """Get dashboard statistics (admin only)"""
    total_units = len(apartments_db)
    occupied_units = len([b for b in bookings_db if b['status'] == 'approved'])
    pending_bookings = len([b for b in bookings_db if b['status'] == 'pending'])
    
    total_revenue = sum([
        next((a['price'] for a in apartments_db if a['id'] == b['apartment_id']), 0)
        for b in bookings_db if b['status'] == 'approved'
    ])
    
    return jsonify({
        'total_units': total_units,
        'occupied_units': occupied_units,
        'occupancy_rate': (occupied_units / total_units * 100) if total_units > 0 else 0,
        'pending_bookings': pending_bookings,
        'total_revenue': total_revenue,
        'total_bookings': len(bookings_db)
    }), 200

# ============== HEALTH CHECK ==============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'ResidentialHub API is running'}), 200

# ============== ERROR HANDLERS ==============

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
