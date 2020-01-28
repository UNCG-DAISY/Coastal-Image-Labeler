import { Schema, model, Model, Document, HookNextFunction} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/geocoder'
import { Entry } from 'node-geocoder'

export interface ImageDocument extends Document {
   name:string,
   tags: [developedTag,washoverTag]
   tagged:boolean,
   geolocation: {
        // GeoJSON Point
        type: 'Point',
        coordinates: number[],
        formattedAddress: string,
        street: string,
        city: string,
        state: string,
        zipcode: string,
        country: string
    }
}

export interface developedTag {
    value: 'developed' | 'undeveloped'
}

export interface washoverTag {
    value: 'washover' | 'noWashover'
}

export interface imageTag {
    tag: developedTag | washoverTag
}

const ImageSchema: Schema  = new Schema(
    {
        name : {
            type: String,
            required: [true,'Please add a name'],
            unique: true,
            trim:true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        tags: {
            type:[Object]
        },
        tagged: Boolean,

        geolocation: {
            // GeoJSON Point
            type: {
                type: String,
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            city: String,
            state: String,
            zipcode: String,
            country: String
        },
       
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// // Geocode & create location field
// BootcampSchema.pre<ImageDocument>('save', async function(next:HookNextFunction) {
//     const loc:Entry[] = (await (geocoder.geocode(this.address as string) as Promise<Entry[]>));

//     //If the location in index exists
//     if(loc[0]) {
//         this.geolocation = {
//             type: 'Point',
//             coordinates: [loc[0]?.longitude ?? 0, loc[0]?.latitude ?? 0],
//             formattedAddress: loc[0]?.formattedAddress ?? 'N/A',
//             street: loc[0]?.streetName ?? 'N/A',
//             city: loc[0]?.city ?? 'N/A',
//             state: loc[0]?.stateCode ?? 'N/A',
//             zipcode: loc[0]?.zipcode ?? 'N/A',
//             country: loc[0]?.countryCode ?? 'N/A'
//         };
//     }

//     // Do not save address in DB, not needed
//     this.address = undefined;
//     next();
// });

export const Image: Model<ImageDocument> =  model('Image', ImageSchema);