aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 274984967265.dkr.ecr.us-east-2.amazonaws.com

docker build -t brother-bet-api .

docker tag brother-bet-api:latest 274984967265.dkr.ecr.us-east-2.amazonaws.com/brother-bet-api:latest

docker push 274984967265.dkr.ecr.us-east-2.amazonaws.com/brother-bet-api:latest
