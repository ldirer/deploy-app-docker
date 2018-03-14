# A programming quiz with WATs

A programming quiz with regular questions mixed with (much harder) questions on suprising behaviors of some languages.

This is a demo application to support [this blog post](https://ldirer.github.io/deploy-docker-app/).  

[Take the quiz!](http://quiz.wat.ldirer.com)

I wanted to build a real-world application to show how docker-compose works with a backend, frontend and database.  

This app lets people answer a programming quiz:

* The frontend is written with Vuejs. 
* The backend is in Flask (Python) and uses a PostgreSQL database.
* We use the database to store the questions and the answers that were submitted if the user decides to record his score.  
For an application this simple you could probably have used a cloud database like firebase (or no database at all!). 

Inspiration from:

* The famous [wat talk](https://www.destroyallsoftware.com/talks/wat)
* https://javascript-game.firebaseapp.com/ and the [source code](https://github.com/samiheikki/javascript-guessing-game)


## About the code

The point was to show a working application developed with a docker setup.  
The code is probably not something you want to take as a reference.


## The WATs

I believe that understanding some weird behaviors of your favorite language can make you improve as a programmer.   
Which does not mean that good programmers know them nor that you have to know them to be a good programmer.

Some resources:

* [This](https://www.youtube.com/watch?v=sH4XF6pKKmk) is a nice talk that explains some Python WATs that I included in the quiz, and more Python behaviors.
* [This stackoverflow answer](https://stackoverflow.com/a/9033306/3914041) gives great explanations on the Javascript WATs in this quiz.

## Deploying

Requirements:

* An aws/google cloud/digital ocean account with programmatic access configured on your machine.

An easy option to deploy is `docker-machine`.

You'll need to install it first. I recommend installing the bash completion and prompt as well. 
https://docs.docker.com/machine/install-machine/

Then 

    docker-machine create --driver amazonec2 --amazonec2-open-port 80 aws-sandbox  
    
You can swap the driver for your favorite cloud provider.  
Here docker-machine will provision an ubuntu ec2 instance for us and install docker on it.  

Then we run:

    eval $(docker-machine env aws-sandbox)
    
and from now on (in our current shell), all docker commands we run will **point to the ec2 instance**.  

    # build still works as if you ran it locally, but the images are created on the remote instance.
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml build    
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    
    # Optional: Deactivate the docker-machine environment
    eval $(docker-machine env -u)
    
    
Useful commands:

    docker-machine ip aws-sandbox
    
    docker-machine ssh aws-sandbox
