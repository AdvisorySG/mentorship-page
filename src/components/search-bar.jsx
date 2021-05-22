import React, { useState } from "react";

import lunr from "lunr";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import "./search-bar.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchBar = ({ value, mentors, setSearchValue, setSearchResults }) => {
  const [field, setField] = useState("name");
  const classes = useStyles();

  let documents = Object.values(mentors);

  var searchIndex = lunr(function () {
    this.ref("name");
    this.field("name");
    this.field("school");
    this.field("organization");
    this.field("courseOfStudy");
    this.field("role");

    documents.forEach((doc) => {
      this.add(doc);
    }, this);
  });

  return (
    <form noValidate autoComplete="off" className="search-bar">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Search by Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          onChange={(event) => setField(event.target.value)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="school">School</MenuItem>
          <MenuItem value="organization">Organization</MenuItem>
          <MenuItem value="courseOfStudy">Course of Study</MenuItem>
          <MenuItem value="role">Role</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search mentors"
        variant="outlined"
        value={value}
        onChange={async (newValue) => {
          await setSearchValue(newValue.target.value);

          if (newValue.target.value.trim().length > 0) {
            var results = searchIndex
              .search(field + ":" + newValue.target.value)
              .map((item) => item.ref.replace(/\W/g, ""));
            await setSearchResults(results);
          }
        }}
      />
    </form>
  );
};

export default SearchBar;
