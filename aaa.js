<script>
  const populateLabelPosts = (data, container) => {
    data.forEach((post) => {
      const labelPost = $('<div class="label-post"></div>');

      const thumbContainer = $('<a class="thumb-container"></a>');
      thumbContainer.attr('href', post.link[post.link.length - 1].href);

      const thumbnail = $('<img>');
      thumbnail.attr('src', post.media$thumbnail.url.replace('/s72', '/s300'));

      thumbContainer.append(thumbnail);
      labelPost.append(thumbContainer);

      const textContent = $('<div class="text-content"></div>');

      const postTitleContainer = $('<a class="post-title-container"></a>');
      postTitleContainer.attr('href', post.link[post.link.length - 1].href);

      const title = $('<h3 class="post-title"></h3>');
      title.html(post.title.$t);

      postTitleContainer.append(title);
      textContent.append(postTitleContainer);

      labelPost.append(textContent);

      container.append(labelPost);
    });
  };

  const displayLabelPosts = (label, posts) => {
    const containerElements = $(`[data-label='${label}']`);

    if (containerElements.length > 0) {
      containerElements.each((index, containerElement) => {
        const loadingImage = $('<img class="loading-image"alt="..." />');
        loadingImage.attr('src', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-mda1blKQ2CPj4uOfLALZVNtOHohk0c9HAj7e7tc13WG5A5Nmc4pEeYD2NCXNX4gAHjvlJQOuU-Evi8ROb56A0iCb2alK0sXkMwzWhOGEQdr0iGNXp-_x4zb5Jc2_XodnEUeqvJ6QfEeIXU6JRE17YBH7vPGZyIlkBwYWtXseeInHz7yH2avHvosBjFDP/s200/loading-gif.gif');
        $(containerElement).append(loadingImage);

        populateLabelPosts(posts.feed.entry, $(containerElement));
        loadingImage.remove();
      });
    }
  };
</script>
