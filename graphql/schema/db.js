import PostsList from "./data/posts";
import AuthorsMap from "./data/authors";
import {CommentList, ReplyList} from "./data/comments";

export const getAuthor = ({id}) => AuthorsMap[id];

export const getAllReplies = () => ReplyList;

export const getTimestamp = (post) => ((post && post.date)
    ? new Date(post.date['$date']).getTime()
    : null);

export const getComments = (limit) => (limit > 0
    ? CommentList.slice(0, limit)
    : CommentList);

export const getPosts = ({category, count, id}) => {

    if (id) {
        return PostsList.filter(p => p.id === id)[0];
    }

    let list = PostsList.sort((a, b) => getTimestamp(b) - getTimestamp(a));

    if (category) {
        list = list.filter(post => post.category === category);
    }
    if (count) {
        list = list.slice(0, count)
    }

    return list;

};

export const getAuthors = () => Object.keys(AuthorsMap).map(id => AuthorsMap[id]);

export const savePost = ({...post}) => {

    if (getPosts({id: post._id})) {
        throw new Error('Post already exists: ' + post._id);
    }

    if (!AuthorsMap[post.author]) {
        throw new Error('No such author: ' + post.author);
    }

    if (!post.summary) {
        post.summary = post.content.substring(0, 100);
    }

    post.comments = [];
    post.date = {$date: new Date().toString()};

    PostsList.push(post);

    return post;

};

export const saveAuthor = ({...author}) => {

    if (AuthorsMap[author._id]) {
        throw new Error('Author already exists: ' + author._id);
    }

    AuthorsMap[author._id] = author;

    return author;

};