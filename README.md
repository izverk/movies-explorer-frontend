# `movies-explorer-frontend`

Это репозиторий фронтенд-части проекта `movies-explorer`.

## Что за проект и о чем он

Проект `movies-explorer` представляет собой интернет-сервис для поиска и
сохранения фильмов в личном кабинете.<br> Проект создан в рамках обучения на
курсах [Яндекс.Практикум](https://practicum.yandex.ru/) с целью приобретения и
закрепления практических навыков веб-разработки. Проект является выпускной
дипломной работой курса "Веб-разработчик".<br>В настоящем репозитории
расположена только фронтенд-часть проекта, репозиторий серверной части находится
[здесь](https://github.com/izverk/movies-explorer-api/).

## Структура сайта и маршрутизация

Сайт состоит из нескольких страниц:

1. Главная (содержит общую информацию о проекте).
2. Фильмы (содержит форму поиска фильмов и блок с результатами поиска).
3. Сохраненные фильмы (личный кабинет - содержит фильмы, сохраненные
   пользователем и блок результатов поиска среди этих фильмов).
4. Страница регистрации пользователя.
5. Страница авторизации пользователя.
6. Страница редактирования данных профиля пользователя.
7. Страница 404.

Страницы с фильмами и данными профиля пользователя доступны только после его
регистрации / авторизации (при этом сами страницы авторизации и регистрации
становятся недоступны во избежание повторных регистрационных действий).

После авторизации происходит автоматическое перенаправление пользователя на
страницу "Фильмы".

Авторизованный пользователь имеет возможность переходить на доступные страницы,
вводя соответствующий маршрут в адресную строку браузера.

## Подробнее о функционале фронтенд-части

### Поиск и сохранение фильмов:

Поиск фильмов осуществляется в стороннем сервисе, предоставленном
Яндекс.Практикумом.

Поиск реализован по совпадению вводимого текста с частью полного наименования
фильма на русском языке. При этом имеется возможность дополнительно
отфильтровать короткометражные фильмы (длительностю не более 40 минут),
задействуя соответствующий чекбокс.

На странице "Фильмы" после ввода в строку поиска ключевых слов и нажатия кнопки
поиска приложение выполняет следующие действия:

- отправляет запрос данных о фильмах к стороннему сервису, получает их и
  обрабатывает для дальнейшего использования;
- фильтрует полученные фильмы в соответствии с введенными ключевыми словами и
  состоянием переключателя короткометражек;
- отображает карточки отфильтрованных фильмов.

Если в поле поиска не введён текст, при нажатии на кнопку отправки выводится
ошибка «Нужно ввести ключевое слово».

Если в процессе получения и обработки данных происходит ошибка, в окне
результатов выводится соответствующее сообщение.

На странице "Фильмы" запрос данных у стороннего сервиса осуществляется только
один раз (запрашивается весь массив имеющихся данных). Каждый последующий поиск
инициирует фильтрацию ранее полученного массива.

Нажатие на кнопке лайка в карточке фильма приводит к её сохранению в базе данных
на сервере, после чего она отображается на странице сохраненных фильмов, откуда
её можно удалить, нажав на соответствующую кнопку в карточке.

Структура и функционал страниц "Фильмы" и "Сохраненные фильмы" практически
одинаков за исключением следующего:

- на странице "Фильмы" данные предыдущего поиска (значение поля ввода,
  переключателя короткометражек и результаты поиска) запоминаются и
  восстанавливаются при возвращении на эту страницу;
- на странице "Сохраненные фильмы":
  - вместо кнопки лайка в карточке фильма присутствует кнопка удаления фильма;
  - поиск фильмов осуществляется только по массиву сохраненных фильмов.

### Регистрация, авторизация, редактирование профиля:

Формы ввода данных о пользователе кастомно валидируются с использованием
управляемых React-компонентов.

Если одно из полей не заполнено или не прошло валидацию, кнопка отправки формы
неактивна (имеет другой цвет, и по ней невозможно кликнуть). Валидация
происходит моментально при вводе/удалении каждого нового символа. Ошибки
валидации выводятся под полями ввода. Когда форма заполнена корректно, кнопка
отправки становится активной, клик по ней отправляет запрос на сервер. Если в
ответе сервер возвращает ошибку, соответствующее сообщение выводится на
страницу. Если при регистрации ответ на запрос успешен, авторизуется
пользователя происходит автоматически и он перенаправляется на страницу с
"Фильмы".

## Сведения о примененных технологиях и инструментах

Сайт создан с использованием:

- HTML5, CSS3;
- Java Script;
- React, CRA.

## Ссылки

### Размещение проекта:

- фронтенд - https://movies-explorer.izverk.nomoredomains.work/;
- бэкенд - https://api.movies-explorer.izver.nomoredomains.work/<br>

### Макет в Figma:

https://www.figma.com/file/LiJD7XRXHn1Bl4Aod1vIcD/diplom-layout?node-id=891%3A3857
