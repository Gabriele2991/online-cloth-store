import Directory from "../../components/directory/directory-component"
import DirectoryJson from "../../components/json-directory/json-directory.component";
import "../../components/directory/directory.styles.scss"

const Home = ()=>{

  const categories = DirectoryJson;

  return (
    <div>
        <Directory categories={categories}/>
    </div>
  );
}

export default Home;