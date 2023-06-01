function loadPage(pageNum) {
  var container = document.getElementById('post-container');
  var loading = document.getElementById('loading');
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      var parser = new DOMParser();
      var newDocument = parser.parseFromString(response, 'text/html');
      var newContainer = newDocument.getElementById('post-container');
      var newPagination = newDocument.getElementById('pagination');

      container.innerHTML = newContainer.innerHTML;
      document.getElementById('pagination').innerHTML = newPagination.innerHTML;
      window.scrollTo(0, 0);
    }
  };

  xhr.open('GET', urlActivePage + '?&max-results=' + postPerPage + '&start-index=' + ((pageNum - 1) * postPerPage) + '&orderby=published', true);
  xhr.send();

  loading.style.display = 'block';
  container.style.opacity = '0.5';
}

function createPagination() {
  var container = document.getElementById('pagination');

  if (!container) return;

  var totalPage = Math.ceil(parseInt(document.getElementById('jump_page_total').innerHTML) / postPerPage);
  var currentPage = parseInt(document.getElementById('jump_page_current').innerHTML);

  var pagination = document.createElement('div');
  pagination.className = 'pagination';

  if (currentPage > 1) {
    var prevLink = document.createElement('a');
    prevLink.href = 'javascript:void(0)';
    prevLink.innerHTML = prevPage;
    prevLink.addEventListener('click', function() {
      loadPage(currentPage - 1);
    });
    pagination.appendChild(prevLink);
  }

  var startIndex, endIndex;
  if (currentPage <= numShowPage) {
    startIndex = 1;
    endIndex = Math.min(numShowPage, totalPage);
  } else if (currentPage >= totalPage - Math.floor(numShowPage / 2)) {
    startIndex = totalPage - numShowPage + 1;
    endIndex = totalPage;
  } else {
    startIndex = currentPage - Math.floor(numShowPage / 2);
    endIndex = currentPage + Math.floor(numShowPage / 2);
  }

  if (startIndex > 1) {
    var firstLink = document.createElement('a');
    firstLink.href = 'javascript:void(0)';
    firstLink.innerHTML = '1';
    firstLink.addEventListener('click', function() {
      loadPage(1);
    });
    pagination.appendChild(firstLink);

    if (startIndex > 2) {
      var ellipsis = document.createElement('span');
      ellipsis.innerHTML = '...';
      pagination.appendChild(ellipsis);
    }
  }

  for (var i = startIndex; i <= endIndex; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = 'javascript:void(0)';
    pageLink.innerHTML = i;
    pageLink.addEventListener('click', (function(page) {
      return function() {
        loadPage(page);
      };
    })(i));
    if (i === currentPage) {
      pageLink.className = 'active';
    }
    pagination.appendChild(pageLink);
  }

  if (endIndex < totalPage) {
    if (endIndex < totalPage - 1) {
      var ellipsis = document.createElement('span');
      ellipsis.innerHTML = '...';
      pagination.appendChild(ellipsis);
    }

    var lastLink = document.createElement('a');
    lastLink.href = 'javascript:void(0)';
    lastLink.innerHTML = totalPage;
    lastLink.addEventListener('click', function() {
      loadPage(totalPage);
    });
    pagination.appendChild(lastLink);
  }

  if (currentPage < totalPage) {
    var nextLink = document.createElement('a');
    nextLink.href = 'javascript:void(0)';
    nextLink.innerHTML = nextPage;
    nextLink.addEventListener('click', function() {
      loadPage(currentPage + 1);
    });
    pagination.appendChild(nextLink);
  }

  container.innerHTML = '';
  container.appendChild(pagination);
}

document.addEventListener('DOMContentLoaded', function() {
  createPagination();
});