{
    //method to submit form data for new post using AJAX
    let createComment= function(){
        let newCommentForm=$('#new-comment-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newcomment= newCommentDom(data.data.comment);
                    $(`.post-comments-list>ul`).prepend(newcomment);
                    deletePost($('.delete-post-button', newcomment));
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });

    }

    //method to create a post in DOM
    let newPostDom=function(post){
        return $(`<li id="Post-${post._id}">
            <p>
                    <small>
                        <a class="delete-posts-button" href="/posts/destroy/${ post.id }"> X </a>
                    </small>
                        ${post.content}
                            <br>
        
                            <small>
                            ${post.user.name}
                            </small>
        
            </p>
            <div class="posts-comments">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type your comment here.." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                
                    <div class="post-comments-list">
                        <ul id="post-comments- ${post._id}">
                        </ul>
                    </div>
            </div>
        </li>`)
    }



    // method to delete a post from dom

    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                // get value of href in a tag
                url: $(deleteLink.prop('href')),
                success: function(data){
                    $(`#post-$(data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}