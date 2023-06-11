const express = require('express');
const session = require('express-session');
const multer = require('multer');
const sql = require('mssql');



const app = express();
const upload = multer();

app.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('A:/DryCleaning2'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/stylesAboutUs.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'stylesAboutUs.css'));
});

app.get('/stylesForTable.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'stylesForTable.css'));
});

app.get('/main', (req, res) => {
  // Отправляем контент со списком заявок пользователя
  const content = `
  <div class="contacts">
  <link rel="stylesheet" href="stylesAboutUs.css">
    <h2>Чисто и точка!</h2>
    <p>Мы - профессиональная химчистка с опытом работы более 10 лет. Мы предлагаем качественную и недорогую услугу по чистке одежды, обуви, ковров и других изделий из ткани. Мы используем современное оборудование и безопасные моющие средства. Мы гарантируем вам своевременную доставку и удовлетворение от результата.</p>
    <div class="cards">
        <div class="card">
            <img src="https://rolcochristeyns.gr/wp-content/uploads/2019/02/laundry.png" alt="Качество">
            <h3>Качество</h3>
            <p>Мы учитываем индивидуальные особенности каждого изделия и подбираем оптимальный способ чистки.</p>
        </div>
        <div class="card">
            <img src="https://цены-и-отзывы.рф/wp-content/uploads/2019/12/Airo-1536x862.jpeg" alt="Советы">
            <h3>Советы</h3>
            <p>Мы даем вам советы по уходу за вашей одеждой и обувью.</p>
        </div>
        <div class="card">
            <img src="https://lisa.ru/images/cache/2019/12/20/widen_960_crop_1000_667_0_0_q90_810922_cb3797d8856efd061ba60a162.jpeg" alt="Скидки">
            <h3>Скидки</h3>
            <p>Мы предлагаем вам выгодные скидки и акции.</p>
        </div>
    </div>

    <h2>Как нас найти</h2>
    <p>Мы находимся по адресу: Владимир, улица Мира, 7в. Вы можете посмотреть на карту ниже.</p>

    <div class="map">
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af85e90d1945a7e9b6381359ffd8f0371f17c2d6d435384193129786606d7527a&amp;source=constructor" width="700" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
</div>


</div>

  `;
  res.send(content);
});


app.get('/contacts', (req, res) => {
  const content = `
  <div class="contacts">
  <link rel="stylesheet" href="stylesAboutUs.css">
    <h2>Контакты</h2>
    <p>Если у вас есть вопросы или пожелания, вы можете связаться с нами по телефону, электронной почте или через социальные сети. Мы будем рады вам помочь!</p>
    <ul>
        <li><img src="https://i.pinimg.com/originals/ab/8e/8d/ab8e8d3f8aab71818795ce2db4891c64.png" alt="Телефон"> +7 (920) 777-77-77</li>
        <li><img src="https://ico.cppng.com/download/2120/email_PNG100745.png" alt="E-mail"> chisto@gmail.com</li>
        <li><img src="https://www.digiseller.ru/preview/829303/p1_3158328_98a764df.png" alt="Telegram"> https://www.telegram.com/chisto</li>
        <li><img src="https://www.pinclipart.com/picdir/big/544-5446048_vk-logo-design-logo-media-sosial-png-clipart.png" alt="Instagram"> https://www.vk.com/chisto</li>
    </ul>
</div>
  `;
  res.send(content);
});

app.get('/gallery', (req, res) => {
  const content = `
 
  <div class="container">
  <link rel="stylesheet" href="stylesAboutUs.css">
  <h1>Наши работы</h1>
  <p>Мы гордимся качеством нашей химчистки и удовлетворенностью наших клиентов. Вот некоторые из наших лучших работ, которые демонстрируют наш профессионализм и внимание к деталям.</p>
  <div class="gallery">
    <div class="item">
      <img src="coat.png" alt="Работа 1">
      <div class="caption">
        <h3>Работа 1</h3>
        <p>Это пальто из шерсти было очень загрязнено и имело неприятный запах. Мы провели глубокую химчистку с использованием специальных средств и восстановили его первоначальный вид и свежесть.</p>
      </div>
    </div>
    <div class="item">
      <img src="wedding-dress.png" alt="Работа 2">
      <div class="caption">
        <h3>Работа 2</h3>
        <p>Это свадебное платье из шелка было испорчено вином. Мы аккуратно удалили все пятна и восстановили его блеск и цвет. Клиентка была очень довольна результатом.</p>
      </div>
    </div>
    <div class="item">
      <img src="suit.png" alt="Работа 3">
      <div class="caption">
        <h3>Работа 3</h3>
        <p>Это костюм из льна был сильно помят и потерял форму. Мы провели химчистку и глажку с использованием специального оборудования и вернули ему идеальный вид.</p>
      </div>
    </div>
  </div>
</div>


  `;
  res.send(content);
});


const config = {
  user: 'admin2',
  password: '1233214andreiK',
  server: 'localhost',
  database: 'DryCleaning',
  options: {
    encrypt: false
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
  // Выполняем запрос к базе данных
  return pool.request()
    .query('SELECT * FROM Users');
})
.then(result => {
  // Обрабатываем результат запроса
  console.log(result.recordset);
})
.catch(error => {
  // Обрабатываем ошибки
  console.error(error);
});

app.get('/account', (req, res) => {
  if (req.session.username) {

    if(req.session.role==='user') {
    // Если пользователь авторизован, отправляем контент с навигационной панелью
    const content = `
      <h1>Личный кабинет</h1>
      <nav>
        <ul>
          <li><a href="/my-orders">Посмотреть мои заявки</a></li>
          <li><a href="/create-request">Создать заявку</a></li>
          <li><a href="/my-profile">Мой профиль</a></li>
          <li><a href="/exit">Выйти из аккаунта</a></li>
        </ul>
      </nav>
    `;
    res.send(content);
    }
    else if (req.session.role ==='administrator') {
      const content = `
      <h1>Личный кабинет Администратора</h1>
      <nav>
        <ul>
          <li><a href="/my-orders">Посмотреть мои заявки</a></li>
          <li><a href="/create-request">Создать заявку</a></li>
          <li><a href="/my-profile">Мой профиль</a></li>
          <li><a href="/employees-admin-panel">Работники</a></li>
          <li><a href="/exit">Выйти из аккаунта</a></li>
        </ul>
      </nav>
    `;
    res.send(content);
    }
    else {
      const content = `
      <h1>Личный кабинет Работника</h1>
      <nav>
        <ul>
          <li><a href="/my-orders">Посмотреть мои заявки</a></li>
          <li><a href="/create-request">Создать заявку</a></li>
          <li><a href="/my-profile">Мой профиль</a></li>
          <li><a href="/accept-request">Принять заявку</a></li>
          <li><a href="/exit">Выйти из аккаунта</a></li>
        </ul>
      </nav>
    `;
    res.send(content);
    }


  }  else {
    // Иначе отправляем контент с формами входа и регистрации
    const content = `
    <div class="form-container-login">
  <form id="login-form">
    <h2>Вход</h2>
    <label for="login-username">Логин:</label>
    <input type="text" id="login-username" name="username" required>

    <label for="login-password">Пароль:</label>
    <input type="password" id="login-password" name="password" required>
  
    <div>
    <input type="submit" value="Войти">
    </div>

    <p>Нет аккаунта? <a href="/register" id="register-link">Зарегистрироваться</a></p>
  </form>

  <form id="register-form" style="display: none;">
     
     <h2>Регистрация</h2>
    <label for="register-name">Имя:</label>
    <input type="text" id="register-name" name="name" required>

    <label for="register-phone">Телефон:</label>
    <input type="phone" id="register-phone" name="phone" required>

    <label for="register-username">Логин:</label>
    <input type="text" id="register-username" name="username" required>

    <label for="register-password">Пароль:</label>
    <input type="password" id="register-password" name="password" required>

    <label for="register-email">Email:</label>
    <input type="email" id="register-email" name="email" required>
    <div> 
    
    <input type="submit" value="Зарегистрироваться"> </div>
    <div>
    <br>
    <br>
    <button id="back-button">&larr; Назад</button>
    </div>
    
  </form>
    </div>
    `;
    res.send(content);
  }
});

app.get('/accept-request', upload.none(), async (req, res) => {
  // Получаем список необработанных заявок из базы данных
  const result = await pool.request()
    .query('SELECT * FROM Orders WHERE status = 0');
  const orders = result.recordset;

  // Формируем таблицу с необработанными заявками
  let tableContent = '';
  for (const order of orders) {
    tableContent += `
      <tr>
        <td>${order.username}</td>
        <td>${order.items}</td>
        <td>${order.total}</td>
        <td>${order.delivery}</td>
        <td><button class="complete-order" data-id="${order.id}">Выполнить заказ</button></td>
      </tr>
    `;
  }

  // Отправляем контент с формой создания заявки
  const content = `
   
      <h1>Список не обработанных заявок</h1>
      <table id="orders-table">
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>Товары</th>
            <th>Итого</th>
            <th>Доставка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${tableContent}</tbody>
      </table>
    
  `;
  res.send(content);
});




app.get('/employees-admin-panel', async (req, res) => {
  try {
    
    // Подключаемся к базе данных
    await poolConnect;

    // Получаем информацию о работниках из таблицы "Employees"
    let result = await pool.request()
      .query('SELECT * FROM Employees');

    // Генерируем HTML-код для таблицы работников
let table = '<h2>Работники</h2><table><tr><th>ID</th><th>Имя</th><th>Логин</th><th>Зарплата</th><th></th></tr>';
result.recordset.forEach(employee => {
  table += `<tr>
    <td>${employee.EmployeeID}</td>
    <td>${employee.Name}</td>
    <td>${employee.Login}</td>
    <td>${employee.Salary} руб.</td>
    <td>
      <button class="fire-employee-button" data-id="${employee.EmployeeID}">Уволить</button>
      <button class="set-salary-button" data-id="${employee.EmployeeID}">Установить зарплату</button>
    </td>
  </tr>`;
});
table += '</table>';


    // Получаем информацию о пользователях из таблицы "Users"
    result = await pool.request()
      .query('SELECT * FROM Users');

    // Генерируем HTML-код для таблицы пользователей
    table += '<h2>Пользователи</h2><table><tr><th>ID</th><th>Имя</th><th>Логин</th><th></th></tr>';
    result.recordset.forEach(user => {
      table += `<tr>
        <td>${user.Id}</td>
        <td>${user.Name}</td>
        <td>${user.Username}</td>
        <td>
          <button class="delete-user-button" data-id="${user.Id}">Удалить пользователя</button>
          <button class="hire-user-button" data-id="${user.Id}">Принять на работу</button>
        </td>
      </tr>`;
    });
    table += '</table>';

    // Отправляем HTML-код таблиц клиенту
    res.send(table);
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при получении информации о работниках и пользователях');
  }
});




app.post('/login', upload.none(), async (req, res) => {
  try {
    // Получаем данные из формы входа
    const username = req.body.username;
    const password = req.body.password;

    // Подключаемся к базе данных
    await poolConnect;


    // Выполняем запрос к базе данных для проверки совпадения логина и пароля в таблице Administrators
    let result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query('SELECT * FROM Administrators WHERE Login = @username AND Password = @password');


if (result.recordset.length === 0) {
      // Если совпадение не найдено в таблице Administrators, выполняем запрос к таблице Employees
      result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Employees WHERE Login = @username AND Password = @password');
    }

    
if (result.recordset.length === 0) {
      // Если совпадение не найдено в таблице Админов, выполняем запрос к таблице Users
      result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
         .query('SELECT * FROM Users WHERE username = @username AND password = @password');
    }
    

    

    

    
    if (result.recordset.length > 0) {
      // Если совпадение найдено в одной из таблиц, сохраняем имя пользователя и роль в сессии
      req.session.username = username;
      if (result.recordset[0].hasOwnProperty('AdministratorID')) {
        req.session.role = 'administrator';
      } else if (result.recordset[0].hasOwnProperty('EmployeeID')) {
        req.session.role = 'employee';
      } else {
        req.session.role = 'user';
      }
      // Отправляем уведомление об успешном входе
      res.send('Вход выполнен успешно');
    } else {
      // Иначе отправляем уведомление о неудачном входе
      res.send('Неверный логин или пароль');
    }
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при входе');
  }
});



app.get('/my-orders', async (req, res) => {
  try {
    // Получаем имя пользователя из сессии
    const username = req.session.username;

    // Подключаемся к базе данных
    await poolConnect;

    // Получаем информацию о заказах из таблицы "Orders"
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Orders WHERE username = @username');

    // Генерируем HTML-код для таблицы заказов
    let table = '<table><tr><th>Номер заказа</th><th>Предметы</th><th>Итоговая стоимость</th><th>Способ доставки</th><th>Статус</th><th>Дата приема заказа</th><th></th></tr>';
    result.recordset.forEach(order => {
      const completedSymbol = order.status ? '✔️' : '❌';
      const orderDate = new Date(order.OrderDate).toLocaleDateString();
      table += `<tr><td>${order.id}</td><td>${order.items}</td><td>${order.total} руб.</td><td>${order.delivery}</td><td>${completedSymbol}</td><td>${orderDate}</td><td><button onclick="window.open('/order-receipt/${order.id}')">Распечатать заявку</button></td></tr>`;
    });
    table += '</table>';

    // Отправляем HTML-код таблицы заказов клиенту
    res.send(table);
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при получении информации о заказах');
  }
});

app.get('/order-receipt/:orderId', async (req, res) => {
  try {
    // Получаем ID заказа из параметров запроса
    const orderId = req.params.orderId;

    // Подключаемся к базе данных
    await poolConnect;

    // Получаем информацию о заказе из таблицы "Orders"
    const result = await pool.request()
      .input('orderId', sql.Int, orderId)
      .query('SELECT * FROM Orders WHERE id = @orderId');

    // Проверяем, найден ли заказ
    if (result.recordset.length === 0) {
      res.status(404).send('Заказ не найден');
      return;
    }

    // Получаем информацию о заказе
    const order = result.recordset[0];

    // Генерируем HTML-код для квитанции о заказе
    let receipt = `<h1>Квитанция о заказе №${order.id}</h1><link rel="stylesheet" href="stylesForTable.css">`;
    receipt += `<p>Предметы: ${order.items}</p>`;
    receipt += `<p>Итоговая стоимость: ${order.total} руб.</p>`;
    receipt += `<p>Способ доставки: ${order.delivery}</p>`;
    receipt += `<p>Статус: ${order.status ? 'Выполнено' : 'Не выполнено'}</p>`;
    receipt += `<p>Дата приема заказа: ${new Date(order.OrderDate).toLocaleDateString()}</p>`;

    // Отправляем HTML-код квитанции о заказе клиенту
    res.send(receipt);
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при получении информации о заказе');
  }
});





app.get('/create-request',upload.none(), (req, res) => {
  // Отправляем контент с формой создания заявки
  const content = `
 
  <form id="create-request-form">
  <div class="stepform-container">
    <div class="stepform-header">
      <h1>Оформление заказа</h1>
      <p>Выберите товары и услуги, которые вы хотите заказать</p>
    </div>
    <div class="stepform-body">
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\dress.jfif" alt="Платье" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Платье</h3>
          <p>500 руб.</p>
          <input type="number" name="dress" min="0" placeholder="Количество">
        </div>
      </div>
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\shirt.jfif" alt="Рубашка" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Рубашка</h3>
          <p>300 руб.</p>
          <input type="number" name="shirt" min="0" placeholder="Количество">
        </div>
      </div>
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\shorts.jfif" alt="Шорты" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Шорты</h3>
          <p>100 руб.</p>
          <input type="number" name="shorts" min="0" placeholder="Количество">
        </div>
      </div>
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\jeans.jfif" alt="Джинсы" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Джинсы</h3>
          <p>250 руб.</p>
          <input type="number" name="jeans" min="0" placeholder="Количество">
        </div>
      </div>
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\socks.jfif" alt="Носки" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Носки</h3>
          <p>250 руб.</p>
          <input type="number" name="socks" min="0" placeholder="Количество">
        </div>
      </div>
      <div class="stepform-item">
        <div class="stepform-image">
          <img src="\hat.jfif" alt="Шляпа" width="170" height = "170">
        </div>
        <div class="stepform-info">
          <h3>Шляпа</h3>
          <p>400 руб.</p>
          <input type="number" name="hat" min="0" placeholder="Количество">
        </div>
      </div>

    </div>

    <br>

    <h2>Итоговая стоимость:</h2> 
    <!-- Выделить жирным шрифтом -->
    <span id='total' class = "total">0</span> руб.
    <br>
    <h2>Способ доставки:</h2>
<br>

<!-- Выделить жирным шрифтом -->
Привезу сам<input type='radio' id='pickup' name='delivery' value='pickup'>
Заберите вещи<input type='radio' id='delivery' name='delivery' value='delivery'>

<div id="address-fields" style="display: none;">
  <h3>Адрес доставки:</h3>
  <label for="postcode">Почтовый индекс:</label>
  <input type="text" id="postcode" name="postcode">
  <br>
  <label for="region">Регион:</label>
  <input type="text" id="region" name="region">
  <br>
  <label for="city">Город:</label>
  <input type="text" id="city" name="city">
  <br>
  <label for="street">Улица:</label>
  <input type="text" id="street" name="street">
  <br>
  <label for="building">Дом:</label>
  <input type="text" id="building" name="building">
  <br>
  <label for="apartment">Квартира:</label>
  <input type="text" id="apartment" name="apartment">
</div>

<br>
<br>
<br>

<!-- Выделить жирным шрифтом -->

<input type='submit' value='Оформить заказ'>

    
  </div>

</form>
    
  `;
  res.send(content);
});


  app.get('/my-profile', async (req, res) => {
    try {
      // Получаем имя пользователя из сессии
      const username = req.session.username;

      // Подключаемся к базе данных
      await poolConnect;

      // Получаем информацию о пользователе из таблицы "Users"
      const userResult = await pool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');

      // Получаем информацию о заказах пользователя из таблицы "Orders"
      const ordersResult = await pool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM Orders WHERE username = @username');

      // Проверяем, есть ли информация о пользователе в базе данных
      if (userResult.recordset.length > 0) {
        // Получаем информацию о пользователе
        const user = userResult.recordset[0];

        // Генерируем HTML-код для страницы профиля
        let profile = `<h1>Мой профиль</h1><p>Привет, ${user.Name}!</p>
        <p>У тебя ${ordersResult.recordset.length} заказов.</p>
        <button id="update-profile-button">Изменить данные аккаунта</button>
        <div id="update-profile-form" style="display: none;">
        <form method="POST" action="/update-profile">
        <label for="name">Имя:</label><input type="text" id="name" name="name" value="${user.Name}">
        <br>
        <label for="phone">Телефон:</label><input type="text" id="phone" name="phone" value="${user.Phone}">
        <br>
        <label for="password">Пароль:</label><input type="password" id="password" name="password">
        <br>
        <input type="submit" value="Сохранить"></form></div>`;

        // Отправляем HTML-код страницы профиля клиенту
        res.send(profile);
      } else {
        // Отправляем сообщение об ошибке клиенту
        res.status(404).send('Пользователь не найден');
      }
    } catch (err) {
      // Обрабатываем ошибки
      console.error(err);
      res.status(500).send('Ошибка при получении информации о пользователе');
    }
  });

  app.post('/update-profile', upload.none(), async (req, res) => {
    try {
      // Получаем имя пользователя из сессии
      const username = req.session.username;
  
      // Получаем данные из формы
      const name = req.body.name;
      const phone = req.body.phone;
      const password = req.body.password;
  
      // Подключаемся к базе данных
      await poolConnect;
  
      // Обновляем информацию о пользователе в таблице "Users"
      await pool.request()
        .input('username', sql.NVarChar, username)
        .input('name', sql.NVarChar, name)
        .input('phone', sql.NVarChar, phone)
        .input('password', sql.NVarChar, password)
        .query('UPDATE Users SET Name = @name, Phone = @phone, Password = @password WHERE username = @username');
  
      // Отправляем сообщение об успешном обновлении данных клиенту
      res.send('Данные в профиле успешно обновлены!');
    } catch (err) {
      // Обрабатываем ошибки
      console.error(err);
      res.status(500).send('Ошибка при обновлении информации о пользователе');
    }
  });
  





app.post('/register', upload.none(), async (req, res) => {
  try {
    // Получаем данные из формы регистрации
    console.log(req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // Подключаемся к базе данных
    await poolConnect;

    // Проверяем наличие пользователя с указанным логином в базе данных
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');
    if (result.recordset.length > 0) {
      // Если пользователь с указанным логином уже существует, отправляем сообщение об ошибке
      res.send('Пользователь с таким логином уже существует');
      return;
    }

    // Сохраняем данные в таблицу
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('phone', sql.NVarChar, phone)
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Users (name, username, password, email, phone) VALUES (@name, @username, @password, @email, @phone)');

    // Отправляем ответ клиенту
    res.send('Регистрация прошла успешно');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при регистрации');
  }
});


app.post('/create-order', upload.none(), async (req, res) => {
  try {
    // Получаем данные из тела запроса
    const username = req.session.username;
    // Создаем массив для хранения выбранных предметов и их количества
    const items = [];
    if (req.body.dress) items.push(`Платье (${req.body.dress})`);
    if (req.body.shirt) items.push(`Рубашка (${req.body.shirt})`);
    if (req.body.shorts) items.push(`Шорты (${req.body.shorts})`);
    if (req.body.jeans) items.push(`Джинсы (${req.body.jeans})`);
    if (req.body.socks) items.push(`Носки (${req.body.socks})`);
    if (req.body.socks) items.push(`Шляпа (${req.body.hat})`);

    // Преобразуем массив в строку
    const itemsString = items.join(', ');
    const total = req.body.total;
    const delivery = req.body.delivery;
    const status = 0; // Новый заказ всегда имеет статус "не выполнено"
    const orderDate = new Date(); // Получаем текущую дату и время

    // Подключаемся к базе данных
    await poolConnect;

    // Сохраняем информацию о заказе в таблице "Orders"
    await pool.request()
      .input('username', sql.NVarChar, username)
      .input('items', sql.NVarChar, itemsString)
      .input('total', sql.Int, total)
      .input('delivery', sql.NVarChar, delivery)
      .input('status', sql.Bit, status)
      .input('orderDate', sql.DateTime2, orderDate)
      .query('INSERT INTO Orders (username, items, total, delivery, status, orderDate) VALUES (@username, @items, @total, @delivery, @status, @orderDate)');

    // Отправляем ответ клиенту
    res.send('Заказ успешно оформлен');
    
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при оформлении заказа');
  }
});





app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.delete('/delete-user/:id', async (req, res) => {
  try {
    // Получаем идентификатор пользователя из параметров маршрута
    const userId = req.params.id;

    // Подключаемся к базе данных
    await poolConnect;

    // Удаляем пользователя из таблицы "Users"
    await pool.request()
      .input('id', sql.Int, userId)
      .query('DELETE FROM Users WHERE Id = @id');

    // Отправляем уведомление об успешном удалении пользователя
    res.send('Пользователь удален');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при удалении пользователя');
  }
});

app.post('/hire-user/:id', async (req, res) => {
  try {
    // Получаем идентификатор пользователя из параметров маршрута
    const userId = req.params.id;

    // Подключаемся к базе данных
    await poolConnect;

    // Получаем информацию о пользователе из таблицы "Users"
    const result = await pool.request()
      .input('id', sql.Int, userId)
      .query('SELECT * FROM Users WHERE Id = @id');

    if (result.recordset.length === 0) {
      res.status(404).send('Пользователь не найден');
      return;
    }

    const user = result.recordset[0];

    // Добавляем пользователя в таблицу "Employees"
    await pool.request()
      .input('name', sql.NVarChar, user.Name)
      .input('login', sql.NVarChar, user.Username)
      .input('password', sql.NVarChar, user.Password)
      .query('INSERT INTO Employees (Name, Login, Password) VALUES (@name, @login, @password)');

    

    // Отправляем уведомление об успешном принятии пользователя на работу
    res.send('Пользователь принят на работу');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при принятии пользователя на работу');
  }
});

app.post('/fire-employee/:id', async (req, res) => {
  try {
    // Получаем идентификатор работника из параметров маршрута
    const employeeId = req.params.id;

    // Подключаемся к базе данных
    await poolConnect;

    // Получаем данные работника из таблицы "Employees"
    const employeeData = await pool.request()
      .input('employeeId', sql.Int, employeeId)
      .query('SELECT * FROM Employees WHERE EmployeeID = @employeeId');

    // Проверяем, есть ли данные работника
    if (employeeData.recordset.length > 0) {
      // Получаем данные работника
      const employee = employeeData.recordset[0];

      
    }

    // Удаляем работника из таблицы "Employees"
    await pool.request()
      .input('employeeId', sql.Int, employeeId)
      .query('DELETE FROM Employees WHERE EmployeeID = @employeeId');

    // Отправляем ответ клиенту
    res.send('Работник уволен');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при увольнении работника');
  }
});


// Добавляем обработчик для маршрута "/set-salary/:id"
app.post('/set-salary/:id', async (req, res) => {
  try {
    // Получаем идентификатор работника и новую зарплату из параметров маршрута и тела запроса
    const employeeId = req.params.id;
    const salary = req.body.salary;

    // Подключаемся к базе данных
    await poolConnect;

    // Обновляем зарплату работника в таблице "Employees"
    await pool.request()
      .input('employeeId', sql.Int, employeeId)
      .input('salary', sql.Int, salary)
      .query('UPDATE Employees SET Salary = @salary WHERE EmployeeID = @employeeId');

    // Отправляем ответ клиенту
    res.send('Зарплата обновлена');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при обновлении зарплаты работника');
  }
});

// Добавляем обработчик для маршрута "/exit"
app.get('/exit', (req, res) => {
  // Удаляем информацию о пользователе из сессии
  req.session.destroy();
  // Отправляем контент для страницы входа
  res.redirect('/account');
});

app.post('/complete-order', upload.none(), async (req, res) => {
  try {
    const orderId = req.body.orderId;
    await pool.request()
      .input('orderId', sql.Int, orderId)
      .query('UPDATE Orders SET status = 1 WHERE id = @orderId');
    res.send('Заказ успешно выполнен');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при выполнении заказа');
  }
});



