import React from "react";
import { DropzoneDialogBase } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Control from "./controls/Controls";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import Image from "@material-ui/icons/Image";

const useStyles = makeStyles({
  uploadbtnStyles: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadImageButton(props) {
  const [open, setOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);
  const classes = useStyles(props);
  const { text, callbackSave, filesLimit, className, rounded } = props;
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {!rounded && (
        <Control.Button
          variant="contained"
          color="primary"
          className={className ? className : classes.uploadbtnStyles}
          text={text ? text : "Add Image"}
          onClick={() => setOpen(true)}
        />
      )}
      {rounded && (
        <IconButton
          aria-label={"Change Image"}
          color="primary"
          onClick={() => setOpen(true)}
        >
          <Image />
        </IconButton>
      )}
      <DropzoneDialogBase
        dialogTitle={"Upload category image"}
        acceptedFiles={["image/*"]}
        fileObjects={fileObjects}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          if (fileObjects.length >= filesLimit && filesLimit === 1) {
            console.log("inside condition");
            setAlertOpen(true);
          } else {
            setFileObjects([].concat(fileObjects, newFileObjs));
          }
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          var newFileObjs = fileObjects;
          var index = newFileObjs.indexOf(deleteFileObj);
          if (index !== -1) {
            newFileObjs.splice(index, 1);
            setFileObjects(newFileObjs);
          }
        }}
        onClose={() => {
          setOpen(false);
          callbackSave(fileObjects, false);
          setFileObjects([]);
        }}
        onSave={() => {
          console.log("onSave", fileObjects);
          setOpen(false);
          callbackSave(fileObjects, true);
          setFileObjects([]);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity="error">
          Maximum limit is {filesLimit}, delete old one and add new
        </Alert>
      </Snackbar>
    </div>
  );
}
