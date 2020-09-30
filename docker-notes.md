docker build -t [tag name] .

docker run [tag name]

docker run -v ${PWD}:/app  -p 4201:4200 --rm valhalla:dev 

docker stop name