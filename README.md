# Steve Fighter
* [Steve Fighter - Bit Balloon](http://eager-blackwell-7636a3.bitballoon.com)
* [Steve Fighter - Git Hub Pages](https://git.generalassemb.ly/pages/stevencharleshuang/project-1-game/)
* [Presentation Slides (Speaker Notes Included)](https://docs.google.com/presentation/d/1P3_Wn4-xk00mPowt-cnCu-mRpIEM-Cow6rBtHqy_Gh4/edit?usp=sharing) 

# Project Overview
Day | Deliverable
------------ | -------------
Day 1 Tuesday | Wireframes and Priority Matrix
Day 2 Wednesday | Project Approval / Pseudo Code
Day 3 Thursday | Basic Clickable Model
Day 4 Friday  | Working Prototype
Day 5 Saturday | Final Working Project
Day 6 Sunday | Bugs / Styling / Post MVP
Day 7 Monday | Bugs / Styling / Post MVP
Day 8 Tuesday | Project Presentations

## Project Description

"Steve Fighter" is a personal rendition of a classic multiplayer arena style 
fighter. Two players face off against one another and use attacks to reduce the 
opponent's Hit Points to zero. The first player to defeat the other wins!

## Wireframes
* [Wireframe Image 01 - Whiteboard - General Overview](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522247701/GA%20Project%201/wireframe001.jpg)
* [Wireframe Image 02 - Sketch Pad - Landing and End Page](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522247701/GA%20Project%201/wireframe002.jpg)
* [Wireframe Image 03 - Sketch Pad - Game Page](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522247701/GA%20Project%201/wireframe003.jpg)
* [Wireframe Image 04 - Sketch Pad - MVP Game Screen](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522251584/wireframe006.jpg)
* [Wireframe Image 05 - Sketch Pad - Post MVP Game Screen](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522247700/GA%20Project%201/wireframe005.jpg)

## Priority Matrix
* [Priority Matrix](https://res.cloudinary.com/dk1cgfxkn/image/upload/v1522250867/priority-matrix.jpg)

## Game Components

### Landing Page
When the site is fully loaded, the players will see a the title, "Steve Fighter," 
as a logo. There will be a "Player 1" and "Player 2" name input form with a 
button for submission. Once they have successfully input their names, a "Start" 
button will appear to initialize the game.

### Game Initialization
When the game is initialized, the players will see a "Hit Point" counter which
will dictate how much health their character has remaining. Two character avatars
will be face to face with some distance between them. Their input names from the
landing screen will display in their respective lower corners.

### Playing The Game
Using one hand, the players will be able to control their respective avatars by
using the keyboard. The players will then attempt to reduce their opponent's 
"Hit Points" to zero.

### Winning The Game
When a player successfully reduces his or her opponent's "Hit Points" to zero, he
or she wins the game. They will land on a "Win" screen that displays their name
announcing that they are victorious.  

### Game Reset
On the "Win" screen, they will have the option to restart the fight or go back to
the landing page for new player name inputs.

### MVP
* Landing page will have logo and player input for names 
* Start button will appear after successful name input and begin the game
* Two character avatars at game initialization
* Respective Player Hit Points at upper corners of screen
* Player names in respective lower corners of screen
* Players will reduce each other's Hit Points via attacks
    * Punching only
* When one player reduces the opponent's Hit Points to zero, respective player wins
* End screen displays Player's name as victorious
* Option to replay or return to landing page for new player name input

### POST MVP
* Timer for timeout "Draw" clause
* Health Bar replaces "Hit Point" system
* Expanded attacks
* Enhanced attack animations
* Enhanced character animations
* Enhanced character avatar design
* Enhanced level / background design
* Sound FX for attacks
* Background Music
* Expand number of available Characters
* Character Selection appended to Landing Page
* End screen option to change characters
* Multiple fights per match, best 2 out of 3


## Functional Components
| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Hit Detection Logic | H | 4hrs | 8hrs | 12hrs |
| Hit Point System Logic | H | 4hrs | 5hrs | 4hrs |
| Character Development - Hit Detection | H | 5hrs | 3hrs | 1hr |
| Character Development - Hit Point System | H | 3hrs | 3hrs | 3hrs |
| Landing Page Development - Player Name Input Form | H | 2hrs | 2hrs | 2hrs |
| End Page User Interface - Reset Button | H | 1hr | 1hr | 1hr |
| Character Development - Controls | M | 3hrs | 4hrs | 5hrs |
| Win Case Logic | M | 2hrs | 1hr | 1hr |
| Character and Level Design - Base Visual | L | 1hr | 1hr | 1hr |
| Character and Level Design - Animation | L | 1hr | 2hrs | 2hrs |
| Landing Page Design | L | 2hrs | 2hrs | 2hrs |
| End Page Design | L | 1hr | 1hr | 1hr |
| Sum Hours | | 29hrs | 33hrs | 35hrs |

## Helper Functions

| Function | Description | 
| --- | :---: |  
| HitDetect() | Uses MDN's Colllision algorithm and getClientBoundingRect() to determine if two DOM elements have collided |
| HPBar() |  Reduces the width of a DOM element proportionate to its initial value |

## Additional Libraries
jQuery: Used for DOM element targeting, DOM element creation and event listeners 

## Code Snippet
    function p1HPBar() {
      // 350px is the initial width of the HPBar div
      return 350 - (350 - ((p1HPVal * 350) / 101));
    }
This is the code that dynamically updates the size of the health bar based on damage taken by the player. I am proud of this piece of code because I conceived the logic and mathed my way through it myself.

## jQuery Discoveries
on() - for event listeners
css() - for dynamically changing elements
replaceWith() - for massive HTML codeblock recreation
animate() - for div motion

## Change Log
 Did not implement Character animations due to time constraints.

## Issues and Resolutions
**ERROR**: Divs were able to intersect and then go through one another.                          
**RESOLUTION**: Used getBoundingClientRect() to retrieve left and right coordinate information,
then set a buffer between the two Divs so that one's left attribute could not exceed the other's
right attribute and vice versa. 

**ERROR**: Divs were able to exceed the boundaries of the fight screen.                       
**RESOLUTION**: Used getboundingClientRect() to retrieve the Div's left and right coordinate information and set logic so that the a given div's left or right property could not exceed the fight screen's left and right boundary.

**ERROR**: Holding down an attack button caused an almost instantaneous depletion of opponent hit points.                           
**RESOLUTION**: Used setTimeout to slow the rate of attacks being detected while a key was pressed down.

## Sources
Smooth Div Movement Controls Bound to Keypresses:
* [Stack Overflow](https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple)

2-D Collision Detection Links:
* [MDN - 2-D Collision Detection Algorithm](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
* [MDN - getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

Image Sources:
* [Ken PNG](https://davidwalsh.name/street-fighter?bcsi-ac-5b340027a7203c96=211D2BD000000108uqkkjutwcl80QiW6KkPOT7583goEAAAACAEAACvj0wAAjScAAgAAAPV5BQA=)
* [Ken Win](https://vignette.wikia.nocookie.net/streetfighter/images/3/37/Ken-ssf2tv-portrait.gif/revision/latest?cb=20100717033005)
* [Ryu Win](https://vignette.wikia.nocookie.net/streetfighter/images/f/ff/Ryu-portrait-turbo-revival.gif/revision/latest?cb=20100717032454)
* [Ken Lose](https://vignette.wikia.nocookie.net/streetfighter/images/f/fd/Ken-hurt.gif/revision/latest?cb=20140419140821)
* [Ryu Lose](https://vignette.wikia.nocookie.net/streetfighter/images/1/11/RYUlose.gif/revision/latest?cb=20140419140227)
