# Tycoon Web Game
This is a simple but addictive farming game for a school project.
> Game is in Spanish for obvious reasons, hope you understand, I'll add translations anyways so no worries.

## Architecture & sprites
### project's architecture
* React + Vite for the frontend.
* Node.js + Express for the backend.
* SQLite as our database, managed with Prisma ORM. 
* TailwindCSS for style.

### sprites!
For the first time ever, we're working with a spritesheet. We've learned how to crop the sprites and how to place them around the screen using HTML elements (<At><F/></At>). 

The main problem was that it literally looked as if we just threw the sprites there, it looked messy, not at all responsive and every time we changed 1 thing it kind of broke everything else.
<br>
For that reason, we decided to take out most of the sprites and kept it simple, with just the slots, houses and farmer. We may or may not add cows in the future (just because they are quite cute).

* Barn, farmer, chicken coop and crops' srpites came from: https://sondanielson.itch.io/simple-farm-pack
* Background & tress were made by Ana using Krita :)

> We were also inspired by this already existing web game => https://www.mortgagecalculator.org/money-games/idle-farming-business/

## Goals & predicted achievements
Both of us have an intermediate web development knowledge and wanted to achieve a more complex kind of project. By the time we finish this game, we'll be more familiar with:

- Game Development
- Database Management
- Frontend and Backend Structure
- Usage of Git
- Use of sprites and drawing
- Coworking and collabs

## Login / Singup Logic
First things first. To play the game the user should make an account by signing up or logging in with an existing account. 

Auth folder: the general layout, the form structure, both the login and signup forms and an error banner that explains what went wrong during authentication.

![Login Page](/doc_imgs/login.png)

## Farm Layout!
The space is simple, consisting of a grid where the user is able to plant crops, harvest and sell them after ther growing time (or with a booster). There's 3 available crops for now, each one has their own price and time to harvest. 

![farm layour](/doc_imgs/farm.png)

The use and meaning of each part is pretty straightforward. Nevertheless, we'll add some clarifications here if there's any doubt.

### HUD
The HUD displays basically everything you need to play (except for the slots, obvi).

It contains the current amount of money you have and lets you select what crops you want to plant, there's also a button to access the shop that i'll explain later on.

### Crops
You'll see three options of crops to plant on the slots, each with their own sprites, buy price, time of growth and sell price

| Crop | Buy price | Growth time | Sell price |
| --- | --- | --- | --- |
| Wheat | $10 | 60s | $20 |
| Carrot | $15 | 120s | $35 |
| Tomato | $20 | 180s | $50 |

> The buy price and growth time is displayed on the HUD, the sell price can be found as a footer in the Shop!

### Shop
Here you'll be able to se your total money, a list of boosters to buy, the sell prices of each crop and a buy button.

Be careful when you buy boosters, remember that if you run out of money you won't be able to plant crops so, you'll not be able to actually use the boosters and you won't be able to do anything anymore except from starting over.

**Soon, a restart button will be added!**
#### Boosters
Yay! the fun part ;) 

Boosters are in spanish so I'll make the table twice, once in Spanish and once in English for those who understand English but not Spanish

So... boosters, as I said, are in the shop
<br>
There are 4 boosters, that can be either instant of appliable to the next harvest
| Booster | Precio de compra | Tiempo de accion | Descripcion |
| --- | --- | --- | --- |
| X5 | $100 | al cosechar (x1) | La proxima vez que coseches un cultivo te dara 5 veces su valor |
| Cosechar Todo | $500 | instantaneo | Acelera todos los tiempos de crecimiento y te permite cosechar todo instantaneamente |
| X2 | $15 | al cosechar (x12) | Al cosechar todos los cultivos de la parcela, tendras el doble de las monedas para las 12 parcelas |
| X10 | $5000 | al cosechar (x12) | Al cosechar todos los cultivos de la parcela, tendras diez veces las monedas para las 12 parcelas |

| Booster | Buy price | Time of Action | Description |
| --- | --- | --- | --- |
| X5 | $100 | when harvesting (x1) | Next time you harvest a crop, you'll have 5 times its value (only that 1 time) |
| Harvest All | $500 | instant | It speeds up the growing time, allowing you to harvest everything instantly |
| X2 | $1000 | when harvesting (x12) | When harvesting all crops, you'll get twice as much money for each slot (12 total) |
| X10 | $5000 | when harvesting (x12) | When harvesting all crops, you'll get ten times the money for each slot (12 total)  |

### Money
Money is displayed both in the HUD and in the Shop

Base money is $60, which will allow you to buy 6 seeds of wheat, 4 seeds of carrot and 3 of tomato. (we used to have 50 as our base but 60 is literally the perfect number to start since it is dividable by the prices of all three crops) 


## Other important info
### Auto-saving
The user will be given an Id that will match their saved data's Id to ensure that each time they log in they get server their own personal progress. Everytime the player changes something about their farm (a planted crop, a harvested mature crop, the purchase of a booster, etc) we've set a timeout of 5 seconds to save the player's progress.So... don't worry if you close the site or if your PC shuts down, you'll still have everything exactly as you left it ;)

### AI Use