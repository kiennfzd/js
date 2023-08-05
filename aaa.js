<script>
  const populateLabelPosts = (data, container) => {
    data.forEach((post) => {
      // Tạo các phần tử bài viết tương tự như trước đó
    });
  };

  const displayLabelPosts = (label, posts) => {
    const containerElements = document.querySelectorAll(`[data-label='${label}']`);

    if (containerElements.length > 0) {
      containerElements.forEach((containerElement) => {
        const loadingImage = document.createElement('img');
        loadingImage.src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-mda1blKQ2CPj4uOfLALZVNtOHohk0c9HAj7e7tc13WG5A5Nmc4pEeYD2NCXNX4gAHjvlJQOuU-Evi8ROb56A0iCb2alK0sXkMwzWhOGEQdr0iGNXp-_x4zb5Jc2_XodnEUeqvJ6QfEeIXU6JRE17YBH7vPGZyIlkBwYWtXseeInHz7yH2avHvosBjFDP/s200/loading-gif.gif';
        loadingImage.classList.add('loading-image');

        containerElement.appendChild(loadingImage);

        populateLabelPosts(posts.feed.entry, containerElement);
        containerElement.removeChild(loadingImage);
      });
    }
  };
</script>

<script>
  const fetchPosts = (label) => {
    const apiUrl = `https://your-blog-url.blogspot.com/feeds/posts/summary/-/${label}?max-results=3&alt=json`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => displayLabelPosts(label, data))
      .catch((error) => console.error(error));
  };

  const containerElements = document.querySelectorAll('.label-posts-container');
  containerElements.forEach((containerElement) => {
    const label = containerElement.getAttribute('data-label');
    fetchPosts(label);
  });
</script>
