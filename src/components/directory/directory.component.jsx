import DirectoryItem from "../directory-items/directory-item.components";

import "../directory/directory.styles.scss";

const Directory = ({categories}) =>(
    <div className="directory-container">
        {categories.map((category)=>(
            <DirectoryItem key={category.id} category={category}/>
        ))}
    </div>
);
export default Directory;
