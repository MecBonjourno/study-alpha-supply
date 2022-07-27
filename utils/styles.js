import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#fff",
    color: "#000",
    "& a": {
      color: "#000",
      marginLeft: 10,
    },
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    marginTop: 10,

    textAlign: "center",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: "0 auto",
  },
  transparentBackgroud: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
});

export default useStyles;
