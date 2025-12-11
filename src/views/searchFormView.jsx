import { Button } from "/src/style/button.jsx";
import "/src/style/searchForm.css";

export function SearchFormView(props) {
  return (
    <div className="search-form">
      <input 
        className="search-input" 
        placeholder="Search for plants..." 
      />
      <Button 
        text="Search!" 
        onClick={props.onSearchClick} 
        size="medium"
      />
    </div>
  );
}