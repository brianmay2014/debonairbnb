Types of Estates

Castles
Chateaus
Countryhouse
Historic
Islands
Manors
Mansions
Palaces
Villa
Vineyards


React Resources:
https://rsuitejs.com/components/date-picker/
https://rsuitejs.com/components/date-range-picker/


additional npm installs:
https://www.npmjs.com/package/react-date-range
npm install --save react-date-range
npm install --save react date-fns



Redux State

{
   users: {
      1: {
         id: 1,
         firstName: ""
         lastName: ""
         username: "Demo",
         email: "demo@aa.io"
      },
   },
   estates: {
      1: {
         id: 1,
         ownerId: int
         title: "",
         description: "",
         type: int
         full_address: ""
         nightlyRate: int
         estate_images: [1, 2, 3, 4]
      },
      2: {

      },
   },
   charters: {
      1: {
        id: 1,
        userId: int,
        estateId: int,
        estateOwner: int
        guestNum: int,
        startDate: date,
        endDate: date
      },
      2: {

      },
   },
   critiques: {
      1: {
         id: 1,
         userId: int
         estateId: int
         rating: int
         comment: ""
      },
      2: {

      },
   },
   session: {
      user: {
         id: 1,
         name: 'Demo'
      }
   },
   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Title cannot exceed 20 characters in length"
      ]
}