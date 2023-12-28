# liftz Workout Tracker App

[liftz](https://liftz-workout-tracker.vercel.app/) is a web application is designed to help users efficiently track and manage their workouts.

With a comprehensive workout library, users can easily log and monitor individual workout sessions, view their progress over time, and set personal records for specific exercises.

Additionally, the weight calculator feature makes it simple for users to determine the optimal amount of weight needed for their barbell, while the integrated calendar provides a convenient way to review past workouts and plan for upcoming ones.

## Technologies

- React (Next.js, Chakra UI, Formik, Yup)
- Express (Passport.js, Express Validator)
- Node.js
- MongoDB (Mongoose)
- Figma ([Design File](https://www.figma.com/file/muHoDdve5LBDWUNHo9OVaN/liftz?type=design&node-id=457%3A8&t=9cIH58PUL3zzY9un-1))

## Features

- Secure API endpoints and hidden environmental variables
- Robust user authentication and session tracking to remember user information across different site pages
- Exhaustive user input validation and cleansing on both the front-end and back-end
- Server Side Rendering to decrease load times on database queries
- Optimized web pages for SEO using Next.js meta tags
- Date conversion to client's timezone

## Changelog

May 2023

- first release of MVP
- remove workout timer
- change workout notes from Editable to Textarea component
- remove workout stats
- add modal warning pop-up of session termination if users navigate out of the session
- fix session calendar dates (works only for PST)
- add ability to change workout notes from within a session
- added transition to abrupt padding resizing for plate calculator

June 2023

- made a sticky navbar, fixed plate calculator UI resizing flickering
- FINALLY fixed dates to be dynamic (based off of user's timezone)
- fixed editing session exercise names (errored out previously)

September 2023

- add ability to reorder session exercises and workout exercises

November 2023

- fix increment/decrement exercise sets, reps, and weight bugs
- add session context to allow users to view different app pages without losing their session data
- prevents multiple sessions from being created

December 2023

- add modal to prompt user to optionally update workout exercise data to match session exercise data
- add deleting session in the view session pages
- implement filter and sort PRs by workout
- implement search for PRs by exercise name
