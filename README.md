<p align="center">
  <a href="https://github.com/Yasinqurni/Toko-kita" target="blank"><img src="https://res.cloudinary.com/deb05crrf/image/upload/v1683719945/express_vre91p.webp" width="200" alt="Node.js" /></a>
</p>

<h1 align="center">TOKO KITA</h1>

## Deskripsi Fitur

-   Source code dibangun dengan menggunakan Dependency Injection

-   Menggunakan cron job

-   Dapat berjalan di lokal atau menggunakan docker-compose

-   Stack yang digunakan adalah:
    -   framework     : express.js
    -   database      : postgresql (https://supabase.com/)
    -   ORM           : sequelize 
    -   Upload Image  : https://cloudinary.com/

## Entity Relationship Diagram

<p align="center">
  <a href="https://github.com/Yasinqurni" target="blank"><img src="https://res.cloudinary.com/deb05crrf/image/upload/v1685283998/bingleshop_paw3f3.jpg" width="800" /></a>
</p>




<h2 align="center">Menjalankan Project</h2>

## Menjalanakan tanpa docker

1.   Clone source repository dari github

2.   Ganti port yang ada di file swagger.yaml menjadi 5151

3.   Jalankan perintah `npm install`

4.   Jalankan perintah `npm start:prod`

5.   Akses dokumentasi api di `http://localhost:5151/api-docs`

## Setup Docker Compose

1. Clone repository.

2. Pastikan docker yang digunakan adalah versi terbaru.

3. jalankan container dengan menggunakan `docker-compose up`.

   **Tips**:

   - gunakan `--build` di `docker-compose` untuk memaksa memperbarui image yang telah dibuat, e.g:
```bash
   `docker-compose up --build`
```

4.  Akses dokumentasi api di `http://localhost:9182/api-docs`

5. Jika telah selesai, jalankan `docker-compose down` untuk menghapus container yang telah terbuat.


## Integration test

jalankan test dengan perintah `npm run test`

## Develop By

| Programmer | github address |
| ---------- | -------------- |
| Muhammad yasin Alqurni | https://github.com/Yasinqurni |

Copyright (c) 2023 Muhammad Yasin Alqurni
All rights reserved.