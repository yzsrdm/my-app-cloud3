# Menggunakan image Nginx sebagai dasar
FROM nginx:alpine

# Menyalin file ke direktori Nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY worker.js /usr/share/nginx/html/

# Expose port Nginx
EXPOSE 80
