import React from 'react';
import {DropzoneDialogBase} from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Control from './controls/Controls'

const useStyles = makeStyles({
    uploadbtnStyles: {
      marginTop: '20px',
      marginBottom: '20px'
    },
});


export default function UploadImageButton(props) {
    const [open, setOpen] = React.useState(false);
    const [fileObjects, setFileObjects] = React.useState([]);
    const classes = useStyles(props);
    const {text, callbackSave, filesLimit} = props;

    return (
        <div>
            <Control.Button variant="contained" color="primary" className={ classes.uploadbtnStyles} text={text ? text : 'Add Image'} onClick={() => setOpen(true)} />
            <DropzoneDialogBase
                acceptedFiles={['image/*']}
                fileObjects={fileObjects}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={5000000}
                filesLimit={filesLimit ? filesLimit : 1}
                open={open}
                onAdd={newFileObjs => {
                    console.log('onAdd', newFileObjs);
                    setFileObjects([].concat(fileObjects, newFileObjs));
                }}
                onDelete={deleteFileObj => {
                    console.log('onDelete', deleteFileObj);
                    var newFileObjs = fileObjects;
                    var index = newFileObjs.indexOf(deleteFileObj)
                    if(index !== -1){
                        newFileObjs.splice(index,1)
                        setFileObjects(newFileObjs)
                    }
                }}
                onClose={() => {
                    setOpen(false)
                    callbackSave(fileObjects)
                }}
                onSave={() => {
                    console.log('onSave', fileObjects);
                    setOpen(false);
                    callbackSave(fileObjects)
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </div>
    )
}
