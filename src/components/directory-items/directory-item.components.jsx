import { Link } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({category}) =>{
    const {title, imageUrl} = category;
    return(
    <div className="directory-item-container">
        <div 
            className="background-image" 
            style={{ backgroundImage :`url(${imageUrl})`,}}
        />
        <Link className="body" to={"shop/" + title.toLowerCase()}>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Link>
    </div>
)}
export default DirectoryItem;
