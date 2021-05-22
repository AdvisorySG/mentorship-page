import React, { useState } from "react";

import lunr from "lunr";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import "./search-bar.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const SearchBar = ({ value, mentors, setSearchValue, setSearchResults }) => {
  const [field, setField] = useState("name");
  const classes = useStyles();
  const documents = Object.values(mentors);
  var searchIndex = lunr(function () {
    this.ref("name");
    this.field("name");
    this.field("school");
    this.field("organisation");
    this.field("courseOfStudy");
    this.field("role");

    documents.forEach((doc) => this.add(doc), this);
  });

  return (
    <form noValidate autoComplete="off" className="search-bar">
      <TextField
        id="standard-search"
        label={"Search mentors by..."}
        value={value}
        onChange={(newValue) => {
          setSearchValue(newValue.target.value);

          if (newValue.target.value.trim().length > 0) {
            var results = searchIndex
              .search(field + ":" + newValue.target.value)
              .map((item) => item.ref.replace(/\W/g, ""));
            setSearchResults(results);
          }
        }}
      />
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          onChange={(event) => setField(event.target.value)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="school">School</MenuItem>
          <MenuItem value="organisation">Organisation</MenuItem>
          <MenuItem value="courseOfStudy">Course</MenuItem>
          <MenuItem value="role">Role</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default SearchBar;
