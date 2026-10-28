// ===== Функции сайта автосалона =====

const list = document.querySelector('[data-list]');
const items = list ? Array.from(list.querySelectorAll('[data-item]')) : [];

const searchInput = document.getElementById('search');
const brandSelect = document.getElementById('brand');
const sortSelect = document.getElementById('sort');


// Запоминаем исходный порядок, чтобы можно было его вернуть
items.forEach(function (item, index) {
    item.dataset.index = index;
});


// 1. Цены с разделителями разрядов: 250000000 -> 250 000 000 (в английской версии 250,000,000)
function formatPrices() {
    const separator = document.documentElement.lang === 'en' ? ',' : ' ';

    document.querySelectorAll('.price').forEach(function (el) {
        el.textContent = el.textContent.trim().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    });
}


// 2. Поиск по марке и модели + фильтр по марке
function filterItems() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const brand = brandSelect ? brandSelect.value : '';
    let visible = 0;

    items.forEach(function (item) {
        const text = (item.dataset.brand + ' ' + item.dataset.model).toLowerCase();
        const show = text.includes(query) && (brand === '' || item.dataset.brand === brand);

        item.hidden = !show;
        if (show) {
            visible++;
        }
    });

    document.getElementById('count').textContent = visible;
    document.getElementById('empty').hidden = visible > 0;
}


// 3. Сортировка: key — brand, model или price; direction — 1 (по возрастанию) или -1 (по убыванию)
function sortItems(key, direction) {
    const sorted = items.slice().sort(function (a, b) {
        if (!key) {
            return a.dataset.index - b.dataset.index;
        }
        if (key === 'price') {
            return (a.dataset.price - b.dataset.price) * direction;
        }
        return a.dataset[key].localeCompare(b.dataset[key]) * direction;
    });

    sorted.forEach(function (item) {
        list.appendChild(item);
    });
}


// 4. Кнопка «Подробнее» / «Скрыть» у описания
document.querySelectorAll('.car__more').forEach(function (button) {
    button.addEventListener('click', function () {
        const card = button.closest('.car');
        const open = card.classList.toggle('car--open');
        button.textContent = open ? button.dataset.less : button.dataset.more;
    });
});


// 5. Сортировка таблицы по клику на заголовок столбца
document.querySelectorAll('.sort').forEach(function (button) {
    button.addEventListener('click', function () {
        const direction = button.classList.contains('asc') ? -1 : 1;

        document.querySelectorAll('.sort').forEach(function (other) {
            other.classList.remove('asc', 'desc');
        });
        button.classList.add(direction === 1 ? 'asc' : 'desc');

        sortItems(button.dataset.sort, direction);
    });
});


if (searchInput) {
    searchInput.addEventListener('input', filterItems);
}

if (brandSelect) {
    brandSelect.addEventListener('change', filterItems);
}

if (sortSelect) {
    sortSelect.addEventListener('change', function () {
        const value = sortSelect.value;
        sortItems(value ? 'price' : '', value === 'desc' ? -1 : 1);
    });
}

formatPrices();
