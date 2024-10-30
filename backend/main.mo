import Func "mo:base/Func";
import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";

actor {
  // Define the structure for a blog post
  public type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Store posts in a list
  stable var posts : List.List<Post> = List.nil();

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(newPost, posts);
  };

  // Function to get all posts
  public query func getPosts() : async [Post] {
    List.toArray(posts)
  };
}
