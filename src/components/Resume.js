import React, { createRef, useContext } from "react";
import AppContext from "../AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


//styling
const useStyles = makeStyles((theme) => ({
  buttonBuildNew: {
    cursor: "pointer",
    minWidth: "7rem",
    textAlign: "center",
    border: "none",
    padding: "1rem",
    boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%), 0 1px 2px 0 rgb(0 0 0 / 19%)",
    "&:hover": {
      background: "#d6d6d6",
    },
  },
  buttonDownload: {
    cursor: "pointer",
    minWidth: "7rem",
    textAlign: "center",
    border: "none",
    padding: "1rem",
    boxShadow: "0 1px 1px 0 rgb(0 0 0 / 20%), 0 1px 2px 0 rgb(0 0 0 / 19%)",
    background: "#77bb77",
    "&:hover": {
      background: "#548854",
    },
  },
  resume: {
    padding: "3rem",
    boxShadow: "0 0.5rem 1rem 0 rgb(0 0 0 / 10%)",
    marginBottom: "1rem",
    margin: "1rem",
    marginTop: "3rem",
  },
}));

//reload the app when build new button is clicked
let refreshPage = () => {
  window.location.reload();
};

function Resume() {
  const ref = createRef();
  const value = useContext(AppContext);
  const classes = useStyles();

  let { answers } = value.state;
  //ref.current.focus();

  //function to print/download resume as pdf
    const printResume = () => {
        const resume = document.getElementsByClassName(classes.resume);
        html2canvas(resume)
        .then((canvas) => {
            //const imgWidth = 208;
            //const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF(); //'p', 'mm', 'a4'
            pdf.addImage(imgData, 'JPEG', 0, 0);// imgWidth, imgHeight);
            pdf.save('download.pdf');
        })
    }

  return (
    <div>
      <div ref={ref} className={classes.resume}>
        {answers.map((answer) => {
          return (
            <div className="resume">
              {answer.resumeFieldId === "name" ||
              answer.resumeFieldId === "email" ||
              answer.resumeFieldId === "address" ||
              answer.resumeFieldId === "phoneNumber" ? (
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <label>{answer.resumeFieldId}:{answer.answer}</label>
                </div>
              ) : (
                <div>
                  <h4>{answer.resumeField}</h4>
                  <p>{answer.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
            <button onClick={printResume} className={classes.buttonBuildNew}>
                Download Resume
            </button>
            {/* <IconButton>
                <ShareOutlinedIcon />
            </IconButton> */}
            <button className={classes.buttonBuildNew} onClick={refreshPage}>
            Build New
            </button>
      </div>
    </div>
  );
}

export default Resume;
