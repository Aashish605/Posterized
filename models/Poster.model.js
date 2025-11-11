import mongoose from "mongoose";

const SizeSechema = mongoose.Schema({
    size: { type: String, required: true },
    price: { type: String, required: true },
}, { _id: false })

const PosterSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    subtype: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: [SizeSechema], default: [] }
});

export default mongoose.models.Poster || mongoose.model("Poster", PosterSchema);