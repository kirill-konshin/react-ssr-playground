import {
    GraphQLEnumType,
    GraphQLFloat,
    GraphQLInt,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import * as db from "./db";

const Category = new GraphQLEnumType({
    name: 'Category',
    description: 'A Category of the blog',
    values: {
        METEOR: {value: 'meteor'},
        PRODUCT: {value: 'product'},
        USER_STORY: {value: 'user-story'},
        OTHER: {value: 'other'}
    }
});

const Author = new GraphQLObjectType({
    name: 'Author',
    description: 'Represent the type of an author of a blog post or a comment',
    fields: () => ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        twitterHandle: {type: GraphQLString}
    })
});

const HasAuthor = new GraphQLInterfaceType({
    name: 'HasAuthor',
    description: 'This type has an author',
    fields: () => ({
        author: {type: Author}
    }),
    resolveType: (obj) => {
        if (obj.title) {
            return Post;
        } else if (obj.replies) {
            return Comment;
        } else {
            return null;
        }
    }
});

const Comment = new GraphQLObjectType({
    name: 'Comment',
    interfaces: [HasAuthor],
    description: 'Represent the type of a comment',
    fields: () => ({
        _id: {type: GraphQLString},
        content: {type: GraphQLString},
        author: {
            type: Author,
            resolve: ({author}) => db.getAuthor({id: author})
        },
        timestamp: {type: GraphQLFloat},
        replies: {
            type: new GraphQLList(Comment),
            description: 'Replies for the comment',
            resolve: () => db.getAllReplies()
        }
    })
});

const Post = new GraphQLObjectType({
    name: 'Post',
    interfaces: [HasAuthor],
    description: 'Represent the type of a blog post',
    fields: () => ({
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        category: {type: Category},
        summary: {type: GraphQLString},
        content: {type: GraphQLString},
        timestamp: {
            type: GraphQLFloat,
            resolve: (post) => db.getTimestamp(post)
        },
        comments: {
            type: new GraphQLList(Comment),
            args: {
                limit: {type: GraphQLInt, description: 'Limit the comments returing'}
            },
            resolve: (post, {limit}) => db.getComments(limit)
        },
        author: {
            type: Author,
            resolve: ({author}) => db.getAuthor({id: author})
        }
    })
});

const Query = new GraphQLObjectType({
    name: 'BlogSchema',
    description: 'Root of the Blog Schema',
    fields: () => ({
        posts: {
            type: new GraphQLList(Post),
            description: 'List of posts in the blog',
            args: {
                category: {type: Category}
            },
            resolve: (source, {category}) => db.getPosts({category})
        },

        latestPost: {
            type: Post,
            description: 'Latest post in the blog',
            resolve: (source, {...params}) => db.getPosts({count: 1})
        },

        recentPosts: {
            type: new GraphQLList(Post),
            description: 'Recent posts in the blog',
            args: {
                count: {type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent items'}
            },
            resolve: (source, {count}) => db.getPosts({count})
        },

        post: {
            type: Post,
            description: 'Post by _id',
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (source, {_id}) => db.getPosts({id: _id})
        },

        authors: {
            type: new GraphQLList(Author),
            description: 'Available authors in the blog',
            resolve: () => db.getAuthors()
        },

        author: {
            type: Author,
            description: 'Author by _id',
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (source, {_id}) => db.getAuthor({id: _id})
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'BlogMutations',
    fields: {
        createPost: {
            type: Post,
            description: 'Create a new blog post',
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                summary: {type: GraphQLString},
                category: {type: Category},
                author: {type: new GraphQLNonNull(GraphQLString), description: 'Id of the author'}
            },
            resolve: (source, {...args}) => db.savePost(args)
        },

        createAuthor: {
            type: Author,
            description: 'Create a new author',
            args: {
                _id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                twitterHandle: {type: GraphQLString}
            },
            resolve: (source, {...args}) => db.saveAuthor(args)
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;