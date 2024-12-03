# # Etap budowania
# FROM node:18-alpine AS build

# WORKDIR /app

# # Kopiowanie tylko plików zależności i instalowanie ich
# COPY package*.json ./
# RUN npm install --production  

# # Kopiowanie reszty plików źródłowych
# COPY . .

# # Budowanie aplikacji
# RUN npm run build

# # Etap uruchamiania
# FROM node:18-alpine

# WORKDIR /app

# # Kopiowanie zbudowanego kodu z poprzedniego etapu
# COPY --from=build /app ./

# # Usuwanie zależności deweloperskich
# RUN npm prune --production 

# EXPOSE 3000

# CMD ["npm", "run", "start"]

# Etap budowania
FROM node:18-alpine AS build

WORKDIR /app

# Przekazywanie zmiennych środowiskowych w czasie budowania
ARG NEXTAUTH_SECRET
ARG NEXT_PUBLIC_LINK

ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_LINK=$NEXT_PUBLIC_LINK

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

# Etap uruchamiania
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "start"]
