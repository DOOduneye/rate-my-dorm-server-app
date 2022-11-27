import mongoose from 'mongoose';
[
    {
        "name": "Northeastern University",
        "location": { 
            "city": "Boston",
            "state": "MA",
            "street": "360 Huntington Ave",
            "zip": "02115"
        },
        "description": "Northeastern University is a private research university in Boston, Massachusetts, established in 1898. Northeastern is classified among \"R1: Doctoral Universities - Very high research activity\".",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Northeastern_University_seal.svg/1200px-Northeastern_University_seal.svg.png",
        "stats": { 
            "size": 20000,
            "ownership": "Private",
            "cost": 50000
        },
        "dorms": []
    }
]

const School = mongoose.Schema({
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
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stats: {
        size: {
            type: Number,
            required: true
        },
        ownership: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    },
    dorms: {
        type: [mongoose.Schema.Types.ObjectId], // Array of dorm ids
        default: []
    }
}, { collection: 'Schools' });

const SchoolModel = mongoose.model('School', School);

export default SchoolModel;