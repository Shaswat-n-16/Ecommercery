##Schema for Ecommercery

1. User
   -firstName : String
   -lastName : String
   -email : String
   -password : String (hash)
   -profilePicture : String
   -phone : String
   -role: 0
   -cartProduct : [Product]
   -review: [Review]

2. Product
   -id :String
   -title : String
   -description : String
   -price: Number
   -category : String
   -image : String
   -reviews: [Review]
   -likes : [User]

3. Review
   -id : String
   -reviewText : String
   -user : User
   -likes : [User]

# API's

-Auth (Public)
-Login (Public)
-Signup (Public)
-Privilege (Admin)
-Logout (Public)
-Reset Password (Public)

-User
-Get all Products (Public)
-Post a Review (Public)
-Like a review (Public)
-Update own review (Public)
-Delete own review (Public)
-Delete any review (Moderator/Admin)

-Admin
-Create Moderator (Admin)
-Delete Moderator (Admin)
-Change Moderator (Admin)
-Disable a user (Admin)
-Get all User (Admin)
-Get all Comments (Admin)
