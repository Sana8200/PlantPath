import { Button } from "/src/components/button.jsx";
import "/src/style/search.css";

export function SearchFormView(props) {
  function handleQueryChangeACB(evt) {
    props.onQueryChange(evt.target.value);
  }

  function onSearchACB() {
    props.doSearch();
  }

  function handleSearchEnterACB(event) {
    if (event.key === "Enter") {
      event.preventDefault();  // Preventing standard form submit behavior
      onSearchACB();
    }
  }

  function handleFormSubmitACB(evt) {
    evt.preventDefault(); // Preventing page reload on form submit
    onSearchACB();
  }

  return (
    <form className="search-form" onSubmit={handleFormSubmitACB}>
      <div className="search-input-container">
        <input
          className={`search-input ${props.validationError ? "input-error" : ""}`}
          value={props.query || ""}
          onChange={handleQueryChangeACB}
          onKeyDown={handleSearchEnterACB}
          placeholder={"Search for plants..."}
        />
        {props.validationError && (
          <div className="search-validation-error">
            ⚠️ {props.validationError}
          </div>
        )}
      </div>

      <Button text="Search!" type="submit" size="medium" />
    </form>
  );
}
