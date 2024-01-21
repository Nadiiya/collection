document.addEventListener('DOMContentLoaded', function () {

    //check length of artist field
    document.getElementById('artist').addEventListener('input', function () {
        const maxLength = 15;
        const currentLength = this.value.length;
        const messageElement = document.getElementById('search-form__error');
        messageElement.textContent = 'Перевищено максимальну довжину!';
        if (currentLength > maxLength) {
            messageElement.textContent = 'Перевищено максимальну довжину!';
            console.log(messageElement);
        } else {
            messageElement.textContent = '';
        }
    });


    //adding album to favorit collection (saved in Local Storage)
    const addButtons = document.querySelectorAll('.album__add');

    addButtons.forEach(function (button) {
        button.addEventListener('click', function () {

            const parentId = this.closest('.album').id;
            const savedAlbums = JSON.parse(localStorage.getItem('saved_albums')) || [];

            if (!savedAlbums.includes(parentId)) {
                savedAlbums.push(parentId);
                localStorage.setItem('saved_albums', JSON.stringify(savedAlbums));
                console.log('ID збережено в localStorage:', parentId);
                console.log('Масив збережених альбомів:', savedAlbums);
            } else {
                console.log('ID вже існує в localStorage:', parentId);
            }

            // Some additional action going here

        });
    });
});

//Pagination
function paginate(items, itemsPerPage, currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
}

function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById("page-nav");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        const pageListItem = document.createElement("li");
        pageLink.classList.add("page-nav__item");
        pageLink.href = `?page=${i}`;
        pageLink.innerText = i;
        if (i === currentPage) {
            pageLink.classList.add("page-nav__item--active");
        }
        pageListItem.appendChild(pageLink);
        paginationContainer.appendChild(pageListItem);
    }
}

function showPage(pageNumber) {
    const itemList = document.getElementById("album-list").children;
    const itemsPerPage = 6;
    const totalPages = Math.ceil(itemList.length / itemsPerPage);

    const visibleItems = paginate(Array.from(itemList), itemsPerPage, pageNumber);

    for (let i = 0; i < itemList.length; i++) {
        itemList[i].style.display = "none";
    }

    for (let i = 0; i < visibleItems.length; i++) {
        visibleItems[i].style.display = "block";
    }

    renderPagination(totalPages, pageNumber);
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page")) || 1;
    showPage(currentPage);
});
