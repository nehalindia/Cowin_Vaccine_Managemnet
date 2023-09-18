<h1>Cowin Vaccine App</h1>
<p> Vaccine drive management App where I have created various Api to perform User registration, Login
<br> slot registration, check availability, update slot also created admin panel where admin can login,
<br> see all registerd user, filter user, see all booked slot from particular date.
</p>

<h2>Model</h2>
<p> I have created 3 Model in this App,
<br> 1. AdminModel is created for maintaining admin data in the collection.
<br> 2. SlotModel is used for Registering and tracking the Slot.
<br> 3. UserModel is used for rEgistering user and track the user login and vaccine registeration.</p>

<h2> Controller </h2>
<h3> Admin Controller </h3>
<p>Admin Controller is admin panel from where admin login and see all Registerd User and their Registerd    Slot.</p>

<h3> Slot Controller </h3>
<p> In Slot Controller I have implemnted logic where user can check availabilty of slot the Registerd the slot and update the slot according the requiremnt.</p>

<h3> User Controller </h3>
<p>In user Controller I have implemnted where new user can registerd and login also generated JsonWebToken for user. </p>

<h2> MiddleWare</h2>
<h3> Auth </h3>
<p> In Auth we verify user token to check authenticity of user, it prevent unauthorize access.</p>


<h2>.env</h2>
<h3> Adding .env file credential here!</h3>
<p> PORT = 3000 </p>
<p> MONGO_URI = mongodb+srv://nehaluddindpe:RCGtWC3HqBQUfNeR@cluster0.wzbtyg0.mongodb.net/CowinVaccine?retryWrites=true&w=majority </p>
<p> JWT_SECRET_KEY = secret-key-for-login </p>