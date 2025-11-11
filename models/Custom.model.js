import mongoose from "mongoose";

const CustomSchema = mongoose.Schema({
    type: { type: String, required: true },
    size: { type: String },
    Quantity: { type: String, required: true },
    url: { type: String, required: true },
});
export default mongoose.models.Custom || mongoose.model("Custom", CustomSchema);