import mongoose from 'mongoose'
interface CategorySType {
    name: string
    slug: string
}
const CategorySchema = new mongoose.Schema(
    {
        name: String,
        slug: String,
    },
    { timestamps: true }
)

export default mongoose.models.Category || mongoose.model<CategorySType>('Category', CategorySchema)
