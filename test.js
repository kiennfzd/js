  <script>
    function getPostsByLabel(label) {
      var url = "/feeds/posts/summary/-/Facebook?alt=json-in-script";

      var script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
    }

    function handlePosts(response) {
      var posts = response.feed.entry;
      var postList = document.getElementById("posts");

      for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var title = post.title.$t;
        var link = post.link[4].href; // Link to the full post
        var content = post.content.$t;

        var postDiv = document.createElement("div");
        postDiv.innerHTML = "<h2><a href='" + link + "'>" + title + "</a></h2>" + content;

        postList.appendChild(postDiv);
      }
    }
  </script>

  <script>
    // Replace 'your-label-name' with the actual label you want to retrieve posts from
    getPostsByLabel("Facebook");
    
    // This function will be called when the JSONP request returns data
    function callbackFunction(json) {
      handlePosts(json);
    }
  </script>
