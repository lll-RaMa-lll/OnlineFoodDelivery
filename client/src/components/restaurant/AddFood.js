import React ,{ useState } from 'react'
import { Checkbox, TextField  , Button} from '@material-ui/core'
import { createFood } from './helper/foodapicalls'
import {isAutheticated } from '../auth/helper'
import SaveIcon from '@material-ui/icons/Save'
import {withRouter,Redirect} from 'react-router-dom'



const styles = {
    textCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}

function AddFood({ history }){

    const { user, token } = isAutheticated('restaurant');
    const [success, setSuccess] = useState(false)
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        isAvailable: false,
        image: "",
        restaurant: "",
        error: "",
        formData: new FormData()
      });

      const {
        name,
        description,
        price,
        isAvailable,
        image,
        restaurant,
        error,
        formData
      }= values

    const handleChange = name => event => {
        if(name==="isAvailable"){
            formData.set(name,event.target.checked)
            setValues({...values,[name]:event.target.checked})
            return
        }
        const value = name === "image" ? event.target.files[0] : event.target.value;

        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const submitHandler = (event)=>{
        event.preventDefault()
        setValues({...values,restaurant: user._id})
        createFood(user._id,token,formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                console.log(data);
                setSuccess(true)

            }
        })



    }

    return (
        !success?
        (<div>
            <span style={styles.textCenter}>
                <p style={{ color: 'red' }}>{error}</p>
            </span>
            <br />
            <span style={styles.textCenter} >Upload image</span>
            <br/>
            <span style={styles.textCenter}>
                <input
                    onChange={handleChange("image")}
                    type="file"
                    name="image"
                    accept="image"
                    placeholder="choose a file"
                />
            </span>
            <br />
            <span style={styles.textCenter}>
                <TextField
                    type='text'
                    variant='filled'
                    label='Name'
                    name='name'
                    onChange={handleChange("name")}

                />
            </span>
            <br/>
            <span style={styles.textCenter}>
                <TextField
                    type='text'
                    variant='filled'
                    label='Description'
                    name='description'
                    onChange={handleChange("description")}

                />
            </span>
            <br/>
            <span style={styles.textCenter}>
                <TextField
                    type='text'
                    variant='filled'
                    label='Price'
                    name='price'
                    onChange={handleChange("price")}

                />
            </span>
            <br/>
            <span style={styles.textCenter}>
                <Checkbox
                    checked={isAvailable}
                    onChange={handleChange("isAvailable")}

                />
                Is Food Available
            </span>
            <br/>
            <span style={styles.textCenter}>
                <Button
                    color='primary'
                    startIcon={<SaveIcon />}
                    variant='contained'
                    onClick={ submitHandler }
                >
                    Create Food
                </Button>
            </span>

        </div>):(<div>
            <span style={styles.textCenter}>
                <h1 style={{ color: 'green' }}>Successfully created!</h1>
            </span>
        </div>)
    )
}


export default withRouter(AddFood)