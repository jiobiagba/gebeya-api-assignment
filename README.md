# gebeya-api-assignment

## DESCRIPTION
This repo provides the code for building a set of simple e-commerce endpoints as directed by the Gebeya Assessment Team.

## DOCKER USAGE
### Prerequisites
Before usage,
*  Please **ensure docker is installed on your computer.**
*  Ensure that **the environment variable named LIVECASE - which is the mongouri for your database exists.** Another environment variable **E_SECRET** is also needed but can be set manually for quick test as shown below.

### Usage
1. Open a terminal
2. Run `git clone https://github.com/jiobiagba/gebeya-api-assignment.git`
3. Run `cd gebeya-api-assignment`
4. Build an image from the docker file. E.g. `docker build -t gebeya .`
5. Run a container, specifying the 2 environment variables needed, and exposing port 5000 externally. E.g. `docker run -e LIVECASE=$LIVECASE -e E_SECRET=123 -p 5000:5000 gebeya`

## API Documentation
The docs for the endpoints can be accessed via https://app.swaggerhub.com/apis/jiobiagba/gebeya/1.0
