export const MasonryLayout = ({ posts }) => {
  
    const firstColumn = props.posts.filter((_, index) => index % 3 === 0);
    const secondColumn = props.posts.filter((_, index) => index % 3 === 1);
    const thirdColumn = props.posts.filter((_, index) => index % 3 === 2);
  
    return <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20">
            <div className="grid gap-4">
              {firstColumn.map((post) => (
                <Article key={post.id} post={post} />
              ))}
            </div>
            <div className="grid gap-4">
              {secondColumn.map((post) => (
                <Article key={post.id} post={post} />
              ))}
            </div>
            <div className="grid gap-4">
              {thirdColumn.map((post) => (
                <Article key={post.id} post={post} />
              ))}
            </div>
          </div>;
  };

  export default MasonryLayout