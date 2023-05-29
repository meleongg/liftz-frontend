# liftz Workout Tracker App

[liftz](https://liftz-workout-tracker.vercel.app/) is a web application is designed to help users efficiently track and manage their workouts.

With a comprehensive workout library, users can easily log and monitor individual workout sessions, view their progress over time, and set personal records for specific exercises.

Additionally, the weight calculator feature makes it simple for users to determine the optimal amount of weight needed for their barbell, while the integrated calendar provides a convenient way to review past workouts and plan for upcoming ones.

## Technologies

-   React (Next.js, Chakra UI, Formik, Yup)
-   Express (Passport.js, Express Validator)
-   Node.js
-   MongoDB (Mongoose)
-   Figma ([Design File](https://www.figma.com/file/muHoDdve5LBDWUNHo9OVaN/liftz?type=design&node-id=457%3A8&t=9cIH58PUL3zzY9un-1))

## Features

-   Secure API endpoints and hidden environmental variables
-   Robust user authentication and session tracking to remember user information across different site pages
-   Exhaustive user input validation and cleansing on both the front-end and back-end
-   Server Side Rendering to decrease load times on database queries
-   Optimized web pages for SEO using Next.js meta tags

## Changelog

May 11

-   first release of MVP

May 16

-   remove workout timer
-   change workout notes from Editable to Textarea component
-   remove workout stats
-   add modal warning pop-up of session termination if users navigate out of the session
-   fix session calendar dates (works only for PST)
