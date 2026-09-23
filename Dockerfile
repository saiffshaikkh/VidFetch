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

# 4. Copy source code
COPY . .

# 5. Declare build arguments from Railway service variables
ARG IMAGEKIT_PUBLIC_KEY
ARG IMAGEKIT_PRIVATE_KEY
ARG IMAGEKIT_URL_ENDPOINT

# Forward them into environment variables so Next.js build can see them
ENV IMAGEKIT_PUBLIC_KEY=$IMAGEKIT_PUBLIC_KEY
ENV IMAGEKIT_PRIVATE_KEY=$IMAGEKIT_PRIVATE_KEY
ENV IMAGEKIT_URL_ENDPOINT=$IMAGEKIT_URL_ENDPOINT

# 6. Build Next.js
RUN npm run build

# 7. Set runtime environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
