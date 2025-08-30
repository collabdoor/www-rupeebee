# RupeeBee Reviews & Feedback System

A comprehensive review and feedback management system built for the RupeeBee financial literacy app website. This system allows users to leave reviews and feedback while providing administrators with powerful tools to manage and moderate content.

## 🌟 Features

### Public Features
- **Star Rating Reviews**: Users can leave 1-5 star ratings with detailed text reviews
- **Feedback Submission**: Categorized feedback system for bugs, suggestions, complaints, and praise
- **Review Display**: Public display of approved reviews with filtering and sorting options
- **Rating Statistics**: Visual rating distribution and average rating display
- **Responsive Design**: Mobile-first design with RupeeBee brand styling
- **reCAPTCHA Protection**: Spam protection on all submissions

### Admin Features
- **Secure Admin Dashboard**: JWT-based authentication with session management
- **Combined Management**: Single interface to manage both reviews and feedback
- **Content Moderation**: Approve, reject, or modify review status
- **Advanced Filtering**: Filter by type, status, date, category, and rating
- **Search Functionality**: Full-text search across content and user information
- **Analytics Dashboard**: Real-time statistics and trends
- **Bulk Actions**: Manage multiple items simultaneously
- **Audit Trail**: Track all admin actions and changes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Next.js 15+ project
- Supabase account and project
- Google reCAPTCHA account (optional but recommended)

### Installation

1. **Install Dependencies**
   ```bash
   pnpm add jsonwebtoken bcryptjs crypto-js react-google-recaptcha @types/jsonwebtoken @types/crypto-js @types/react-google-recaptcha
   ```

2. **Environment Setup**
   Copy the required environment variables to your `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Admin Authentication
   ADMIN_ID=rupeebee_admin_2025
   ADMIN_PSK=your_secure_passkey
   JWT_SECRET=your_jwt_secret
   
   # reCAPTCHA (optional)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
   RECAPTCHA_SECRET_KEY=your_secret_key
   ```

3. **Database Setup**
   Follow the [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md) to create the necessary tables and policies.

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── reviews/                 # Public reviews page
│   │   └── page.tsx
│   ├── admin/
│   │   ├── login/              # Admin authentication
│   │   │   └── page.tsx
│   │   └── dashboard/          # Admin management interface
│   │       └── page.tsx
│   └── api/
│       ├── reviews/            # Review API endpoints
│       ├── feedback/           # Feedback API endpoints
│       └── admin/              # Admin API endpoints
├── components/
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── auth.ts                 # Authentication utilities
│   ├── reviews-db.ts           # Database operations
│   └── supabase.ts             # Supabase client
├── types/
│   └── reviews.ts              # TypeScript type definitions
└── middleware.ts               # Security middleware
```

## 🎨 Design System

The system follows RupeeBee's brand identity:

### Color Palette
- **Primary Green**: `#0F5E1B` (dark), `#2E7D32` (medium)
- **Secondary Purple**: `#5B2D9D`
- **Accent Lime**: `#8BC700`
- **Surfaces**: `#FFFFFF` (white), `#F2F6E9` (light beige)
- **Text**: `#303030` (dark), `#565656` (medium), `#74796D` (outline)

### Design Principles
- Material Design 3 inspired components
- 12px border radius for consistency
- Card-based layouts with subtle shadows
- Professional banking aesthetic
- Mobile-first responsive design

## 🔐 Security Features

### Authentication
- JWT-based admin authentication
- Session timeout (8 hours)
- Secure credential validation
- IP-based rate limiting ready

### Data Protection
- User identifier hashing for privacy
- SQL injection prevention
- XSS protection on user content
- CSRF protection via reCAPTCHA

### Content Moderation
- All reviews pending by default
- Profanity and spam filtering
- Admin-only feedback visibility
- Audit trail for all actions

## 🛠 API Reference

### Public Endpoints

#### Get Reviews
```
GET /api/reviews?page=1&limit=10&rating=5&sort=newest
```

#### Submit Review
```
POST /api/reviews/submit
{
  "rating": 5,
  "review_text": "Great app!",
  "email_phone": "user@example.com",
  "is_app_user": true,
  "recaptcha_token": "token"
}
```

#### Submit Feedback
```
POST /api/feedback/submit
{
  "category": "Feature Suggestion",
  "message": "Please add dark mode",
  "contact_info": "user@example.com",
  "recaptcha_token": "token"
}
```

### Admin Endpoints (Requires Authentication)

#### Admin Login
```
POST /api/admin/auth
{
  "adminId": "admin_id",
  "psk": "pre_shared_key"
}
```

#### Get Admin Data
```
GET /api/admin/data?page=1&type=review&status=pending&search=query
```

#### Update Review Status
```
PUT /api/admin/reviews
{
  "id": "review_id",
  "status": "approved"
}
```

## 📊 Database Schema

### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_identifier TEXT,        -- Hashed for privacy
  user_display_name TEXT,
  rating INTEGER (1-5),
  review_text TEXT,
  is_verified BOOLEAN,
  status TEXT,                 -- pending, approved, rejected
  helpful_count INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Feedback Table
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  category TEXT,               -- Bug Report, Feature Suggestion, etc.
  message TEXT,
  contact_info TEXT,
  status TEXT,                 -- new, reviewed, in_progress, resolved, archived
  admin_notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `ADMIN_ID` | Admin login identifier | ✅ |
| `ADMIN_PSK` | Admin pre-shared key | ✅ |
| `JWT_SECRET` | JWT signing secret | ✅ |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key | ⚠️ |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key | ⚠️ |

⚠️ = Optional but recommended for production

### Rate Limiting
- Review submissions: 1 per email/phone per 24 hours
- Feedback submissions: Protected by reCAPTCHA
- Admin sessions: 8-hour timeout

## 🚦 Usage Examples

### Basic Review Display Component
```tsx
import { useState, useEffect } from 'react';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data.reviews));
  }, []);
  
  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.user_display_name}</h3>
          <div>Rating: {review.rating}/5</div>
          <p>{review.review_text}</p>
        </div>
      ))}
    </div>
  );
}
```

### Admin Authentication Hook
```tsx
function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const expires = localStorage.getItem('admin_expires');
    
    if (token && expires && Date.now() < parseInt(expires)) {
      setIsAuthenticated(true);
    }
  }, []);
  
  return isAuthenticated;
}
```

## 🧪 Testing

### Manual Testing Checklist

#### Public Features
- [ ] Submit a review with all rating levels (1-5 stars)
- [ ] Submit feedback in all categories
- [ ] Test form validation (minimum characters, required fields)
- [ ] Test reCAPTCHA verification
- [ ] Test responsive design on mobile devices
- [ ] Test review filtering and sorting

#### Admin Features
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should fail)
- [ ] View pending reviews and feedback
- [ ] Approve/reject reviews
- [ ] Update feedback status
- [ ] Test search and filtering
- [ ] Test session timeout

### API Testing
```bash
# Test review submission
curl -X POST http://localhost:3000/api/reviews/submit \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"review_text":"Test review","recaptcha_token":"test"}'

# Test admin authentication
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"adminId":"rupeebee_admin_2025","psk":"your_psk"}'
```

## 🔍 Monitoring & Analytics

### Key Metrics to Track
- **Review Metrics**: Total reviews, average rating, approval rate
- **Feedback Metrics**: Total feedback, resolution rate, category distribution
- **Performance**: API response times, error rates
- **Security**: Failed login attempts, rate limit hits

### Supabase Monitoring
Monitor these tables for growth and performance:
- `reviews` table size and query performance
- `feedback` table size
- Failed authentication attempts

## 🚀 Deployment

### Production Checklist
- [ ] Update environment variables with production values
- [ ] Change default admin credentials
- [ ] Generate secure JWT secret
- [ ] Configure reCAPTCHA for production domains
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Test all functionality in production environment

### Scaling Considerations
- **Database**: Consider read replicas for high traffic
- **Caching**: Implement Redis for frequently accessed data
- **CDN**: Use CDN for static assets
- **Rate Limiting**: Implement Cloudflare or similar for DDoS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use Prettier for code formatting
- Add JSDoc comments for public functions

## 📞 Support

For support and questions:
- Check the [Supabase Setup Guide](./SUPABASE_SETUP_GUIDE.md)
- Review the troubleshooting section
- Check browser console for errors
- Verify environment variables

## 📄 License

This project is part of the RupeeBee application. All rights reserved.

---

**Built with ❤️ for RupeeBee** - Empowering financial literacy and fraud protection in India.
