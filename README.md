# embipi - My Baby Path

#### v1.0.1

An app to keep track of your baby path.

Monitor percentile values, check milestones and achievements, guide for diet plus food introduction and an agenda to record and remember important dates.
Aims to be minimal and with useful tools.

https://www.embipi.com/

-   [Current Stack](#current-stack)
-   [Current State](#current-state)
-   [How to use / Install](#How-to-use-/-Install)
-   [Contributions](#Contributions)
-   [Licence](#licence)
-   [Contact](#contact)

## Current Stack

**Front-end:** Next.js, TypeScript, TailwindCSS, Chart.js, React Hook Forms

**Back-end:** Postgresql, Supabase, Prisma

**Testing:** Jest, Testing Library

**Deployment:** Vercel

**Others:** NextAuth, Axios, Mailjet

## Current State

#### v1.0.1

### MVP Version

## Embipi Minimum Viable Product (mvp)

This version is a total refactor of the previous code base. It's now using TypeScript and Postgresql in the backend.
These changes had a huge impact which led to a totally new version of embipi.

The code refactor also created changes on the way the project is now structured and how component composition is being applied. It's an ongoing refactor with some components that still need to be changed. Something to be done while the project evolves.

MVP features:

-   Authentication
-   Dashboard
-   Percentile
-   Milestones
-   Settings with user + children edition and delete account

## Next Steps

#### v1.0.2, v1.0.3, ...

Features:

-   Add badges/accomplishments
-   Food page
-   Agenda page
-   Notifications
-   Implement proper tests workflow

Development:

-   Design backend tables to scale and deal with incoming new features
-   Accessibility
-   Split components to be more smaller and reusable
-   Bug fixes

## How to use / Install

You need to clone and run the application. From your command line:

```bash
#clone this repo
git clone git@github.com:mvquinta/embipi-ts.git

#Enter into the repository
cd embipi-ts

#Install dependencies
npm install

#Run the app
npm run dev
```

To develop I recommend using a local database and a service like mailtrap for auth workflow.
Once you have it created, remember to add the url in your .env file (use the .env.example to start with).
Since prisma schema is already created you just need to run the following command:

```
npx prisma migrate dev
```

## Contributions

If you are interested in contributing to this project please let me know! I'm interested and we would all grow with it.
I think it's a good project for people looking to establish themselves as an intermediate developer or to more experienced ones to help embipi get to the next level.

This, of course, if you like the project.

## Licence

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Send me and email to mvqdev@gmail.com

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/mvqdev1)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miguel-vinga-da-quinta-73489620/)
