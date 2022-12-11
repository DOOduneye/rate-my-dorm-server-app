import mongoose from "mongoose";
[
    {
        "name": "White Hall",
        "description": "White Hall Dorms at Northeastern University",
        "location": {
                "city": "Boston",
                "state": "MA",
                "street": "21 Forsyth St",
                "zip": "02115"
            },
        "rating": {
            "overall": 1.5,
            "numRatings": 2
        },
        "image": "res/white_hall.jpg",
        "comments": [],
        "university": "6381ad9e53dfecaae5f64271"
    }
]

const Dorm = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    },
    rating: {
        overall: {
            type: Number,
            required: true
        },
        numRatings: {
            type: Number,
            required: true
        }
    },

    image: {
        type: String,
        required: true
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    university: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, { collection: 'Dorms' });

const DormModel = mongoose.model('Dorm', Dorm);

export default DormModel;
