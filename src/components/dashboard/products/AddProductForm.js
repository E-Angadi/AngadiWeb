import React from 'react'
import Form from '../../common/Form'
import {Grid} from '@material-ui/core'
import Controls from '../../common/controls/Controls';
import useForm from '../../common/useForm';
import UploadImageButton from '../../common/UploadImageButton';


const taxSelect = [
    {id: 0, title: 'Percentage'},
    {id: 1, title: 'Amount'}
]

// TODO: change to categories in redux store

const categorySelect = [
    {id: 0, title: 'None'},
    {id: 1, title: 'Floor'},
    {id: 2, title: 'Pickle'}
]

const unitSelect = [
    {id: 0, title: 'Kilograms'},
    {id: 1, title: 'Litres'}
]

const initialFValues = {
    title: '',
    shortDescription: '',
    longDescription: '',
    category: 0,
    unitSelect: 0,
    unitValue: 0,
    price: 0,
    taxSelect: 0,
    discount: 0,
    tax: 0,
    imageData: '',
    visibility: true,
}

function AddProductForm() {
    
    const validate = (fieldValues = values) => {
        let tmp = { ...errors }
        if('title' in fieldValues)
            tmp.title = fieldValues.title ? '' : 'This field is required.'
        if('shortDescription' in fieldValues)
            tmp.shortDescription = fieldValues.shortDescription ? '' : 'This field is required.'
        if('longDescription' in fieldValues)
            tmp.longDescription = fieldValues.longDescription ? '' : 'This field is required.'
        if('category' in fieldValues)
            tmp.category = fieldValues.category ? '' : 'Select a category or create new '
        if('unitValue' in fieldValues)
            tmp.unitValue = (fieldValues.unitValue > 0) ? '' : 'Value should be greater then 0'
        if('price' in fieldValues)
            tmp.price = (fieldValues.price > 0) ? '' : 'Price should be greater then 0'
        if('discount' in fieldValues)
            tmp.discount = (fieldValues.discount >= 0) ? '' : 'Discount percentage should be greater than or equal to zero'      
        if('tax' in fieldValues)
            tmp.tax = (fieldValues.tax >= 0) ? '' : 'Tax percentage should be greater than or equal to zero'
        if('imageData' in fieldValues)
            tmp.imageData = (values.imageData === '') ? 'Image is required' : ''
        setErrors({
            ...tmp
        })
        if (fieldValues === values)
            return Object.values(tmp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleSwitchChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            resetForm();
        }
    }

    const imageSave = (fileobjs) => {
        console.log('image saved called')
        if(fileobjs.length > 0){
            setValues({
                imageData: fileobjs[0].data
            });
        } else {
            setValues({
                imageData: ''
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={0} justify="center">
                <Grid xs={12} sm={6} item>
                    <Controls.Switch 
                        name="visibility"
                        label="Product Visibility"
                        value={values.visibility}
                        onChange={handleSwitchChange}
                        color='primary'
                    />
                    <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                    <Controls.InputArea
                        name="shortDescription"
                        label="Short Description"
                        value={values.shortDescription}
                        onChange={handleInputChange}
                        error={errors.shortDescription}
                        rowsMax={2}
                    />
                    <Controls.InputArea
                        name="longDescription"
                        label="Long Description"
                        value={values.longDescription}
                        onChange={handleInputChange}
                        error={errors.longDescription}
                        rowsMax={5}
                    />
                    <Controls.Select
                        name="category"
                        label="Category" 
                        value={values.category}
                        onChange={handleInputChange}
                        options={categorySelect}
                        error={errors.category}
                    />
                </Grid>
                <Grid xs={12} sm={6} item >
                    <Grid xs={12} item container>
                        <Grid xs={6} item>
                            <Controls.Select
                                name="unitSelect"
                                label="Select Unit" 
                                value={values.unitSelect ? values.unitSelect : 0}
                                onChange={handleInputChange}
                                options={unitSelect}
                                error={errors.uniSelect}
                            />
                        </Grid>
                        <Grid xs={6} item>
                            <Controls.Input
                                name="unitValue"
                                label="Value"
                                value={values.unitValue}
                                onChange={handleInputChange}
                                error={errors.unitValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} item container>
                        <Grid xs={6} item>
                            <Controls.Input
                                name="price"
                                label="Price"
                                value={values.price}
                                onChange={handleInputChange}
                                error={errors.price}
                            />
                        </Grid>
                        <Grid xs={6} item>
                            <Controls.Input
                                name="discount"
                                label="Discount Percentage"
                                value={values.discount}
                                onChange={handleInputChange}
                                error={errors.discount}
                            />
                        </Grid>
                        <Grid xs={12} item container>
                        <Grid xs={6} item>
                            <Controls.Select
                                name="taxSelect"
                                label="Tax Type" 
                                value={values.taxSelect ? values.taxSelect : 0}
                                onChange={handleInputChange}
                                options={taxSelect}
                                error={errors.taxSelect}
                            />
                        </Grid>
                        <Grid xs={6} item>
                            <Controls.Input
                                name="tax"
                                label="Tax Value"
                                value={values.tax}
                                onChange={handleInputChange}
                                error={errors.tax}
                            />
                        </Grid>
                        <Grid xs={12}  item >
                            <UploadImageButton callbackSave={imageSave}/>  
                        </Grid>
                        <Grid xs={12} item container justify='center'>
                            <Grid item>
                                <Controls.ImageView 
                                    alt='Product uploaded' 
                                    src={(values.imageData === '') ? '/imgs/default.jpg' : values.imageData} 
                                    width={130} 
                                    height={130} 
                                    error={errors.imageData}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    
                </Grid>
                <Grid xs={12} item container >
                    <Grid item xs={12} >
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    )
}

export default AddProductForm
