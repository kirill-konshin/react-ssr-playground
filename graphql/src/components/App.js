import React from "react";
import {gql, graphql} from "react-apollo";

const Post = ({_id, title, content, summary, author}) => (
    <div>
        <h1>{title}</h1>
        <p><small>{author.name}</small></p>
        <p>{summary}</p>
        <hr/>
    </div>
);

export const App = ({data: {recentPosts}}) => (
    <div className="container">
        {(recentPosts || []).map((p) => (<Post {...p} key={p._id}/>))}
    </div>
);

const Posts = gql`query BlogSchema {
    recentPosts(count: 3) {
        _id
        title
        summary
        content
        author {
            _id
            name
        }
    }
}`;

export default graphql(Posts)(App);
