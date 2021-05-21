import React, { useState, useEffect } from "react";

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
  const [field, setField] = useState("Name");
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
          Filter by Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          onChange={(event) => setField(event.target.value)}
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="School">School</MenuItem>
          <MenuItem value="Organization">Organization</MenuItem>
          <MenuItem value="Course of Study">Course of Study</MenuItem>
          <MenuItem value="Role">Role</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search mentors"
        variant="outlined"
        value={value}
        onChange={async (newValue) => {
          await setSearchValue(newValue.target.value);
          const results = searchIndex
            .search(value)
            .map((item) => item.ref.replace(/\W/g, ""));
          console.log("results");
          console.log(value);
          console.log(results);
          console.log("end");
          setSearchResults(results);
        }}
      />
    </form>
  );
};

export default SearchBar;
