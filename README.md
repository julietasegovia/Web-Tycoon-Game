# Tycoon Web Game
This is a farming game made with React + Vite. 

We made it using these sprites => https://sondanielson.itch.io/simple-farm-pack

We were also inspired by this already existing web game => https://www.mortgagecalculator.org/money-games/idle-farming-business/

Both of us have an itermmidiate web development knowledge and wanted to achieve a more complex kind of project. By the time we finish this game, we'll be more familiar with:

- Game Development
- Database Management
- Frontend and Backend Structure
- Usage of Git
- And More

This is also our first collaborative development, so we'll gain experience working as a team as well. We expect to finish this project in under 200hrs of code.

## Login / Singup Logic
First things first. To play the game the user should make an account by signing up or log in to an existing account. 

This project uses a SQLite database managed with Prisma ORM. 

Inside our frontend components folders, we made an auth folder that consits of the general layout, the form structure, both the login and signup forms and an error banner that explains what went wrong during login.

We used TailwindCSS to style every part of this project.

![Login Page](/doc_imgs/login.png)

### Auto-saving
The user will be given an Id that will match their saved data's Id to ensure that each time they log in they get server their own personal progress. Everytime the player changes something about their farm (a planted crop, a harvested mature crop, the purchase of a booster, etc) we've set a timeout of 5 seconds to save the player's progress.

## The Farm Layout

For the first time ever, we're working with a spritesheet. We've learned how to crop the sprites and how to place them around the screen using HTML elements (<At><F/></At>). 

The space is simple, for now, consisting of a grid of drit where the user is able to plant crops to sell them later when harvested. There's 3 available crops for now, each one has their own price and time to harvest. 

We plan to give the user the option of purchasing multipliers for the selling price, the feature of acumulating crops without having to harvest them manually, and others to make the game more dynamic.

![Farm Display](/doc_imgs/farm.png)

As you can see at the bottom, we added a HUD that displays the current amount of money and lets you select what seeds you want to plant, there's also a button to access the shop, which we'll add later on.