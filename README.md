# Fotive

A full-stack photo album application with Google OAuth and JWT authentication, enabling users to create, share, and manage albums with secure image uploads via Cloudinary. 

---

## Demo Link

[Live Demo](https://fotive.vercel.app)  

---

## Login

> **Guest**  
> Email: `sam@gmail.com`  
> Password: `Sam@123`

---

## Quick Start

```
git clone https://github.com/mdmohsanul/Fotive.git
cd Fotive
npm install
npm run dev 
```

## Technologies
- React JS
- TypeScript
- React Router
- Node.js
- Express
- MongoDB
- JWT
- TailwindCSS

## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://www.loom.com/share/20ef8af882fe4fc985885d3cc11ca8e9?sid=44cd7f6a-0dec-49e8-a9cc-f3c4a45936d1)

## Features

**Home**
- View all uploaded photos in a gallery layout.
- Click on any photo to open full view, post comments, mark as favorite, or delete (if you are the owner)

**Album**
- See all albums you've created or albums shared with you.
- “Create Album” button opens a modal form to add a new album.
- Create, update, delete, or share albums (owner-only permissions).

**Album Photos**
- Upload photos directly to a selected album using drag-and-drop or file picker.
- Mark favorite or delete images — with controls limited to the image owner.

**Authentication**
- JWT-based authentication with email/password and Google OAuth login.
- All album and photo actions are secured via protected routes.

## API Reference

### **GET /api/albums/**<br>	 
Get all albums (owned and shared) for the current user (protected)<br>	 
Sample Response:<br>
```[{ "_id": "abc123", "title": "Vacation", "owner": "user123", ... }]```

### **PATCH /api/albums/:albumId**<br>	 	
Update album details (protected, owner only)<br>		
Sample Response:<br>
```{ "_id": "abc123", "title": "Updated Album Title", ... }```

### **DELETE /api/albums/:albumId**<br> 	
Delete an album (protected, owner only)<br>	
Sample Response:<br>
```{ "message": "Album deleted successfully." }```

### **PATCH /api/albums/:albumId/share**<br>  	
Share an album with another user (protected, owner only)<br> 	 
Sample Response:<br> 
```{ "sharedUserEmail": "example@example.com" }```

### **POST /api/albums/:albumId/images**<br>  	
Upload an image to an album (protected, owner only)
Form Data:
image: File 
Sample Response:<br> 
```{ "_id": "img123", "url": "...", "albumId": "abc123", ... }```

### **POST /api/auth/signup**<br>  	
Register a new user<br> 	 
Sample Response:<br> 
```{ "userId": "user123", "token": "jwt-token" }```

### **POST /api/auth/login**<br>  	
Login user with email/password<br> 	 
Sample Response:<br> 
``` { "userId": "user123", "token": "jwt-token" }```

### **POST /api/auth/logout**<br>  	
Logout current user (protected)<br> 	 
Sample Response:<br> 
``` { "message": "Logged out successfully." }```



## Contact
For bugs or feature requests, please reach out to mdmohsan2407@gmail.com