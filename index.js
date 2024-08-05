const { Schema, mongoose } = require("mongoose");


mongoose.connect("mongodb+srv://admin_1_user:KYZFJCe7;YNGPuJJd;@cluster0.ljxdflt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true");


const BookSchema = new Schema({
	name: { type: String, unique: true }
});
Book = mongoose.model("Book", BookSchema);


async function createBook() {
	// await Book.create({name: "jane"});
	await Book.create({name: "john"});
	const _book = await Book.findOne({name: "john"});
	console.log("------", _book);

}

createBook().catch((err) => console.log(err));
