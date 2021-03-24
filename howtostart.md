1. npm init -y
2. npm i express ejs pg sequelize express-session bcryptjs
3. sequelize db:create
4. sequelize db:migrate
5. sequelize db:seed:all

routes:
   /home -> doctor(list patients[nama, diagnosa, kirim receipt])
            admin(list patients & doctor[username, nama, actions(Add, Update, Delete)])
            patients(list doctor[nama, specialist])
   /consultation -> patients(form[disease:txbox, choosedoctor:select])
   /profile -> patients(data patients)
   /login
   /register