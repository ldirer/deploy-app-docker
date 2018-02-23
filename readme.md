# A programming quiz with WATs

A programming quiz with regular questions mixed with (much harder) questions on suprising behaviors of some languages.

This is a demo application to support [this blog post](https://ldirer.github.io/deploy-docker-app/).  

I wanted to build a real-world application to show how docker-compose works with a backend, frontend and database.  

This app lets people answer a programming quiz:

* The frontend is written with Vuejs. 
* The backend is in Flask (Python) and uses a PostgreSQL database.
* We use the database to store the questions and the answers that were submitted if the user decides to record his score.  
For an application this simple you could probably have used a cloud database like firebase. 

Inspiration from:

* The famous [wat talk](https://www.destroyallsoftware.com/talks/wat)
* https://javascript-game.firebaseapp.com/ and the [source code](https://github.com/samiheikki/javascript-guessing-game)


## About the code

The point was to show a working application developed with a docker setup.  
The code is probably not something you want to take as a reference.


## The WATs

I believe that understanding some weird behaviors of your favorite language can make you improve as a programmer.   
Which does not mean that good programmers know them nor that you have to know them to be a good programmer.

[This](https://www.youtube.com/watch?v=sH4XF6pKKmk) is a nice talk that explains some Python WATs that I included in the quiz, and more.
