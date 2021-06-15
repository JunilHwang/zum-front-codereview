import posts from "../common/mockData";

const fetchPosts = (index?: number): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!index) {
                resolve(posts);
            } else {
                const post = posts.filter(post => {
                    if (post.index === index) return post;
                });
                resolve(post[0]);
            }
        }, 500);
    });
}

export {fetchPosts};