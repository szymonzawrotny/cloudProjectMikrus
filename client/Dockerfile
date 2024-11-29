# Etap budowania
FROM node:18-alpine AS build

WORKDIR /app

# Kopiowanie tylko plików zależności i instalowanie ich
COPY package*.json ./
RUN npm install --production  # Zainstaluj tylko zależności produkcyjne

# Kopiowanie reszty plików źródłowych
COPY . .

# Budowanie aplikacji
RUN npm run build

# Etap uruchamiania
FROM node:18-alpine

WORKDIR /app

# Kopiowanie zbudowanego kodu z poprzedniego etapu
COPY --from=build /app ./

# Usuwanie zależności deweloperskich
RUN npm prune --production  # Usuwanie zależności deweloperskich

EXPOSE 3000

CMD ["npm", "run", "start"]