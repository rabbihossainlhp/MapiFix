# COMPLETE TROUBLESHOOTING GUIDE

## 🚨 CURRENT ISSUES IDENTIFIED

### User Console (Working):
- ✅ Authentication working perfectly
- ✅ JWT token valid and IDs match
- ✅ User logged in successfully

### Admin Console (Failing):
- ❌ CORS errors on all API calls
- ❌ Backend server unreachable
- ❌ All admin features broken

## 🔧 BACKEND FIXES REQUIRED (Priority Order)

### 1. CRITICAL: Start Backend Server
Your backend server is not running. Start it with:
```bash
cd /home/rabbi/_Dev_Folder/MapiFix/Server
npm start
# OR
node app.js
```

### 2. CRITICAL: Fix CORS Configuration
Add to your `Server/app.js` (before routes):
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. CRITICAL: Fix Auth Middleware (Still Broken)
In `Server/Middlewares/authMiddleware.js`, lines 25-26 need to be moved:

**Current (Broken):**
```javascript
}else{
    const user = await User.findById(decodedToken.userId);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    req.user = user;  // ❌ OUTSIDE else block
    next();           // ❌ OUTSIDE else block
}
```

**Fixed:**
```javascript
}else{
    const user = await User.findById(decodedToken.userId);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    req.user = user;  // ✅ INSIDE else block
    return next();    // ✅ INSIDE else block
}
```

### 4. Add Status Update Route
In `Server/Controllers/reportController.js`, add:
```javascript
exports.updateReportStatusController = async (req, res, next) => {
    const { reportId } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['open', 'in-progress', 'resolved'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved"
        });
    }
    
    try {
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }
        
        report.status = status;
        await report.save();
        
        return res.status(200).json({
            message: "Report status updated successfully",
            report: report
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
```

In `Server/Routes/reportRoutes.js`, add:
```javascript
const {createReportController, getUserReportsController, getAllReportsController, updateReportStatusController} = require('../Controllers/reportController');

// Add this route
router.patch('/:reportId/status', authMiddleware, updateReportStatusController);
```

## 🚀 IMMEDIATE ACTION PLAN

1. **Start Backend Server** (Most Important)
   - Navigate to Server folder
   - Run `npm start` or `node app.js`
   - Verify it shows "Server running on port 5000"

2. **Check Backend Dependencies**
   ```bash
   cd Server
   npm install cors express mongoose jwt bcrypt multer
   ```

3. **Apply Auth Middleware Fix**
   - Edit the scope issue in authMiddleware.js

4. **Test API Endpoints**
   - Try `curl http://localhost:5000/api/user/login` to verify server responds

## 🎯 EXPECTED RESULTS AFTER FIXES

- ✅ Admin dashboard loads users and reports
- ✅ User can create reports successfully  
- ✅ Action menus work for updating report status
- ✅ No more CORS errors
- ✅ All authentication working properly

## 📋 VERIFICATION CHECKLIST

- [ ] Backend server running on port 5000
- [ ] CORS configured for frontend URL
- [ ] Auth middleware scope fixed
- [ ] Update status route added
- [ ] No console errors in browser
- [ ] Admin can view users/reports
- [ ] User can create reports

The main issue is your **backend server is not running**. Once you start it and apply the auth middleware fix, everything should work perfectly!