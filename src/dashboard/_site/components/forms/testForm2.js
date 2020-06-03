import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function TestForm2() {
    const { register, handleSubmit, errors, watch, getValues, control  } = useForm({
        // defaultValues:{
        //     x:{
        //         myRadios:'r1'
        //     }
        // }
    });
    const onSubmit = data => {
        console.log(data)
    };

    
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <input name="myRadios" type="radio" value="r1" ref={register({ required: true })}/>
                    <label>R1</label>
                    <input name="myRadios" type="radio" value="r2" ref={register({ required: true })}/>
                    <label>R2</label>
                    <input name="myRadios" type="radio" value="r3" ref={register({ required: true })}/>
                    <label>R3</label>
                    <br/>
                    {errors.myRadios && "Error myRadios"}
                </div>
               

                <div>
                    <input 
                        type="checkbox" placeholder="myCheckbox" 
                        name="myCheckbox" value="C1" 
                        ref={
                            register({
                                required: true,
                                validate:value=>{
                                    //console.log( value,getValues().myCheckbox.length)
                                    const lengthVal = getValues().myCheckbox.length
                                    return (
                                       (lengthVal>=2 && lengthVal<=3) ? true:false
                                    )
                                }
                            })
                        } 
                    />
                    <label>C1</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C2" ref={register({required: true,min:2})} />
                    <label>C2</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C3" ref={register({required: true,min:2})} />
                    <label>C3</label>
                    <input type="checkbox" placeholder="myCheckbox" name="myCheckbox" value="C4" ref={register({required: true,min:2})} />
                    <label>C4</label>
                    <br/>
                    {errors.myCheckbox && "Error myCheckbox"}
                </div>

                <br/>
                <input type="submit" />
            </form>
            {JSON.stringify(watch())}
        </React.Fragment>
    );
}


