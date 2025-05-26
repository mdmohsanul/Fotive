
interface ArticleProps {
    imageUrl : string
}
const Article:React.FC<ArticleProps> = ({imageUrl}) => {
  return (
    <div className="w-72 h-72">
        <img src={imageUrl} alt="" />
    </div>
  )
}

export default Article