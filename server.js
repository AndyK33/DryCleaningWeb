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
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af85e90d1945a7e9b6381359ffd8f0371f17c2d6d435384193129786606d7527a&amp;source=constructor" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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


  } else {
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
    <button id="back-button">&larr; Назад</button>
    <input type="submit" value="Зарегистрироваться"> </div>
    
    
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

    // Выполняем запрос к базе данных для проверки совпадения логина и пароля в таблице Users
    let result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query('SELECT * FROM Users WHERE username = @username AND password = @password');

    if (result.recordset.length === 0) {
      // Если совпадение не найдено в таблице Users, выполняем запрос к таблице Administrators
      result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Administrators WHERE Login = @username AND Password = @password');
    }

    if (result.recordset.length === 0) {
      // Если совпадение не найдено в таблице Administrators, выполняем запрос к таблице Employees
      result = await pool.request()
        .input('username', sql.NVarChar, username)
        .input('password', sql.NVarChar, password)
        .query('SELECT * FROM Employees WHERE Login = @username AND Password = @password');
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
  
    <table>
      <tr>
        <th>Предмет</th>
        <th>Фото</th>
        <th>Цена</th>
        <th>Количество</th>
      </tr>
      <tr>
        <td>Платье</td>
        <td><img src="\dress.jfif" alt="Платье" width="100" height = "100"></td>
        <td>500 руб.</td>
        <td><input type="number" name="dress" min="0"></td>
      </tr>
      <tr>
        <td>Рубашка</td>
        <td><img src="\shirt.jfif" alt="Рубашка" width="100" height = "100"></td>
        <td>300 руб.</td>
        <td><input type="number" name="shirt" min="0"></td>
      </tr>
      <tr>
        <td>Шорты</td>
        <td><img src="\shorts.jfif" alt="Шорты" width="100" height = "100"></td>
        <td>100 руб.</td>
        <td><input type="number" name="shorts" min="0"></td>
      </tr>
      <tr>
        <td>Джинсы</td>
        <td><img src="\jeans.jfif" alt="Джинсы" width="100" height = "100"></td>
        <td>250 руб.</td>
        <td><input type="number" name="jeans" min="0"></td>
      </tr>
      <tr>
        <td>Носки</td>
        <td><img src="\socks.jfif" alt="Носки" width="100" height = "100"></td>
        <td>250 руб.</td>
        <td><input type="number" name="socks" min="0"></td>
      </tr>

    </table>
    <br>
    <br>

    Итоговая стоимость: 
    <div id='total-container'>
      <span id='total'>0</span> руб.
    </div>
    <br>
    <br>

    Способ доставки:
    <br>

    <div id='delivery-container'>
      <input type='radio' id='pickup' name='delivery' value='pickup'>
      <label for='pickup'>Самовывоз</label>

      <input type='radio' id='delivery' name='delivery' value='delivery'>
      <label for='delivery'>Доставка на дом</label><br>

    </div>

    Оформить заказ: <div id='submit-container'>
      <input type='submit' value='Оформить заказ'>
    </div>
    
    </form>
    
 





  `;
  res.send(content);
});


app.get('/my-profile', (req, res) => {
  // Отправляем контент с информацией о профиле пользователя
  const content = `
    <h1>Мой профиль</h1>
    <div>
  <h1>Добро пожаловать в нашу химчистку!</h1>
  <p>Чисто и точка! ценит ваше мнение и мы хотели бы узнать, как мы можем улучшить наши услуги.</p>
  <form action="/submit-survey" method="POST">
    <h2>Оцените качество нашей химчистки:</h2>
    <label for="question-1">1. Насколько вы довольны качеством чистки?</label><br>
    <input type="radio" id="q1-a1" name="question-1" value="1">
    <label for="q1-a1">Очень доволен</label><br>
    <input type="radio" id="q1-a2" name="question-1" value="2">
    <label for="q1-a2">Доволен</label><br>
    <input type="radio" id="q1-a3" name="question-1" value="3">
    <label for="q1-a3">Нейтрален</label><br>
    <input type="radio" id="q1-a4" name="question-1" value="4">
    <label for="q1-a4">Не доволен</label><br>
    <input type="radio" id="q1-a5" name="question-1" value="5">
    <label for="q1-a5">Очень не доволен</label><br>

    <label for="question-2">2. Насколько вы довольны скоростью обслуживания?</label><br>
    <input type="radio" id="q2-a1" name="question-2" value="1">
    <label for="q2-a1">Очень доволен</label><br>
    <input type="radio" id="q2-a2" name="question-2" value="2">
    <label for="q2-a2">Доволен</label><br>
    <input type="radio" id="q2-a3" name="question-2" value="3">
    <label for="q2-a3">Нейтрален</label><br>
    <input type="radio" id="q2-a4" name="question-2" value="4">
    <label for="q2-a4">Не доволен</label><br>
    <input type="radio" id="q2-a5" name="question-2" value="5">
    <label for="q2-a5">Очень не доволен</label><br>


    <label for="question-3">3. Насколько вы довольны ценами на услуги?</label><br>
    <input type="radio" id="q3-a1" name="question-3" value="1">
    <label for="q3-a1">Очень доволен</label><br>
    <input type="radio" id="q3-a2" name="question-3" value="2">
    <label for="q3-a2">Доволен</label><br>
    <input type="radio" id="q3-a3" name="question-3" value="3">
    <label for="q3-a3">Нейтрален</label><br>
    <input type="radio" id="q3-a4" name="question-3" value="4">
    <label for="q3-a4">Не доволен</label><br>
    <input type="radio" id="q3-a5" name="question-3" value="5">
    <label for="q3-a5">Очень не доволен</label><br>
    <label for="question-4">4. Насколько вы довольны общением с персоналом?</label><br>


<input type="radio" id="q4-a1" name="question-4" value="1">
<label for="q4-a1">Очень доволен</label><br>
<input type="radio" id="q4-a2" name="question-4" value="2">
<label for="q4-a2">Доволен</label><br>
<input type="radio" id="q4-a3" name="question-4" value="3">
<label for="q4-a3">Нейтрален</label><br>
<input type="radio" id="q4-a4" name="question-4" value="4">
<label for="q4-a4">Не доволен</label><br>
<input type="radio" id="q4-a5" name="question-4" value="5">
<label for="q4-a5">Очень не доволен</label><br>

<label for="question-5">5. Насколько вероятно, что вы порекомендуете нашу химчистку своим друзьям и знакомым?</label><br>
<input type="radio" id="q5-a1" name="question-5" value="1">
<label for="q5-a1">Очень вероятно</label><br>
<input type="radio" id="q5-a2" name="question-5" value="2">
<label for="q5-a2">Вероятно</label><br>
<input type="radio" id="q5-a3" name="question-5" value="3">
<label for="q5-a3">Нейтрален</label><br>
<input type="radio" id="q5-a4" name="question-5" value="4">
<label for="q5-a4">Маловероятно</label><br>
<input type="radio" id="q5-a5" name="question-5" value="5">
<label for="q5-a5">Очень маловероятно</label><br>


    <input type="submit" value="Отправить">
  </form>
</div>

  `;
  res.send(content);
});



app.post('/submit-survey', async (req, res) => {
  try {
    // Получаем ответы из тела запроса
    const answers = [req.body['question-1'], req.body['question-2'], req.body['question-3'], req.body['question-4'], req.body['question-5']];

    // Подключаемся к базе данных
    await poolConnect;

    // Заносим ответы в таблицу "Surveys"
    await pool.request()
      .input('answer1', sql.Int, answers[0])
      .input('answer2', sql.Int, answers[1])
      .input('answer3', sql.Int, answers[2])
      .input('answer4', sql.Int, answers[3])
      .input('answer5', sql.Int, answers[4])
      .query('INSERT INTO Surveys (Answer1, Answer2, Answer3, Answer4, Answer5) VALUES (@answer1, @answer2, @answer3, @answer4, @answer5)');

    // Отправляем сообщение об успешном сохранении ответов
    res.send('Спасибо за ваш отзыв!');
  } catch (err) {
    // Обрабатываем ошибки
    console.error(err);
    res.status(500).send('Ошибка при сохранении ответов анкеты');
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



