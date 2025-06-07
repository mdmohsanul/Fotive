
type ButtonProps = {
    style:string;
     label:string;
    clickHandler: () => void;
}
const Button = ({style,label,clickHandler} : ButtonProps) => {
  return (
    <button className={`${style} px-3 py-2 `} onClick={() => clickHandler}>{label}</button>
  )
}

export default Button