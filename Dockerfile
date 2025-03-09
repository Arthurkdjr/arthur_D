# Utilise une image Node.js pour builder Angular
FROM node:18 as angular-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Utilise une image Nginx pour servir l'application Angular
FROM nginx:alpine
COPY --from=angular-build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


