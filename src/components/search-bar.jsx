import React, { useMemo, useState } from "react";

import lunr from "lunr";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Autocomplete } from "@material-ui/lab";

import "./search-bar.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 150,
    marginLeft: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchBar = ({
  mentors,
  waveMentorIds,
  setHasSearch,
  setSearchResults,
}) => {
  const [field, setField] = useState("name");

  const classes = useStyles();
  const documents = useMemo(
    () =>
      [...waveMentorIds].map((mentorId) => ({
        mentorId,
        industry: mentors[mentorId].industries.join(" "),
        ...mentors[mentorId],
      })),
    [mentors, waveMentorIds]
  );
  const searchIndex = useMemo(
    () =>
      lunr(function () {
        this.ref("mentorId");
        this.field("name");
        this.field("role");
        this.field("industry");
        this.field("organisation");
        this.field("school");
        this.field("courseOfStudy");

        this.b(0);
        this.k1(0);

        documents.forEach((doc) => this.add(doc), this);
      }),
    [documents]
  );

  const [searchValue, setSearchValue] = useState("");
  useMemo(() => {
    if (searchValue.trim().length === 0) {
      setHasSearch(false);
      return;
    }

    const words = searchValue.trim().split(/\s+/);
    const query = words.map((word) => field + ":" + word).join(" ");
    const results = searchIndex.search(query).map((item) => item.ref);
    setHasSearch(true);
    setSearchResults(results);
  }, [field, searchIndex, searchValue, setHasSearch, setSearchResults]);

  const suggestions = useMemo(
    () =>
      [
        ...new Set(
          Object.values(mentors).flatMap(({ industries }) => industries)
        ),
      ].sort(),
    [mentors]
  );

  return (
    <form noValidate autoComplete="off" className="search-bar">
      {field === "industry" ? (
        <Autocomplete
          options={suggestions}
          getOptionLabel={(option) => option}
          onChange={(newValue) => setSearchValue(newValue.target.textContent)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search mentors by..."
              style={{ width: 170 }}
            />
          )}
        />
      ) : (
        <TextField
          label="Search mentors by..."
          style={{ width: 170 }}
          onChange={(newValue) => setSearchValue(newValue.target.value)}
        />
      )}
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          onChange={(event) => setField(event.target.value)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          <MenuItem value="industry">Industry</MenuItem>
          <MenuItem value="organisation">Organisation</MenuItem>
          <MenuItem value="school">School</MenuItem>
          <MenuItem value="courseOfStudy">Course</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default SearchBar;
