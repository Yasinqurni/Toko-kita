<p align="center">
  <a href="https://https://github.com/Debugging-demon/Bingle-Shop" target="blank"><img src="https://res.cloudinary.com/deb05crrf/image/upload/v1683719945/express_vre91p.webp" width="200" alt="Node.js" /></a>
</p>

<h1 align="center">TOKO KITA</h1>

## Deskripsi Fitur
-   source code dibangun dengan menggunakan Dependency Injection

-   stack yang digunakan adalah:
    -   framework   : express.js
    -   database    : postgresql
    -   ORM         : sequelize

-   berikut adalah alamat swagger:
```bash
    http://44.204.11.143:9182/api-docs/
```

- seed user:
    - user 1: 1212
    - user 2: 9532

## Entity Relationship Diagram

<p align="center">
  <a href="https://github.com/Yasinqurni" target="blank"><img src="https://res.cloudinary.com/deb05crrf/image/upload/v1685283998/bingleshop_paw3f3.jpg" width="300" /></a>
</p>


## Setup Docker Compose

1. Clone repository.

2. bangun semua container dengan menggunakan `docker-compose build --no-cache`.

4. jalankan container dengan menggunakan `docker-compose up`.

   **Tips**:

   - gunakan `--build` di `docker-compose` untuk memaksa memperbarui image yang telah dibuat, e.g:
```bash
   `docker-compose up --build`
```

5. biarkan docker bekerja dan anda bisa minum secangkir kopi.

### Cleaning up

1. When you're done, `Ctrl-C` in the main `docker-compose up` window to terminate the running processes.

1. Run `docker-compose down` to stop and remove containers.
## Develop By

| Programmer | github address |
| ---------- | -------------- |
| Muhammad yasin Alqurni | https://github.com/Yasinqurni |

Copyright (c) 2023 Muhammad Yasin Alqurni
All rights reserved.