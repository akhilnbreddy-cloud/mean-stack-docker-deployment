#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
sudo apt-get install git -y

# Install Node.js (for health checks)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
cd /home/ubuntu
git clone https://github.com/akhil3797/mean-stack-docker-deployment.git
cd mean-stack-docker-deployment

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

echo "EC2 setup completed successfully!"
echo "Please configure your environment variables in .env file"
echo "Then run: docker-compose -f docker-compose.prod.yml up -d"