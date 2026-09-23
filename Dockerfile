# 1. Use official Node 20
FROM node:20-slim

# 2. Install Python 3, python alias (python-is-python3), and FFmpeg
RUN apt-get update && \
    apt-get install -y python3 python-is-python3 ffmpeg ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 3. Install npm dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code and build Next.js
COPY . .
RUN npm run build

# 5. Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
