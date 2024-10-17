import Category from "../category/category.components";
import "../category/category.styles.scss";

const Directory = ({categories}) =>(
    <div className="directory-container">
        {categories.map((category)=>(
            <Category key={category.id} category={category}/>
        ))}
    </div>
);
export default Directory;
