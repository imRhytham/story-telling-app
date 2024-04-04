"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [formData, setFormData] = useState({
		name: "",
		genre: "",
		magicalElement: "",
	});

	const router = useRouter();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const encodedFormData = {
			name: encodeURIComponent(formData.name),
			genre: encodeURIComponent(formData.genre),
			magicalElement: encodeURIComponent(formData.magicalElement),
		};
		const queryString = Object.keys(encodedFormData)
			.map((key) => `${key}=${encodedFormData[key]}`)
			.join("&");
		router.push("/story?" + queryString);
	};

	return (
		<main className="w-full h-screen flex bg-dark text-light  items-center justify-center">
			<div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg">
				<h1 className="text-4xl font-semibold text-center mb-4">
					Generate A Story based on your Suggestions
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="name" className="block font-medium mb-2">
							What do you want the main character&apos;s name to be?
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:border-indigo-500"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="fantasy" className="block font-medium mb-2">
							Select in which genre you want your story
						</label>
						<select
							id="genre"
							name="genre"
							value={formData.genre}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:border-indigo-500"
							required
						>
							<option disabled value="">
								Select genre
							</option>
							<option value="medieval">Medieval</option>
							<option value="mythology">Mythological</option>
							<option value="futuristic">Futuristic</option>
						</select>
					</div>
					<div className="mb-4">
						<label htmlFor="magicalElement" className="block font-medium mb-2">
							Add a Magical Element to your Story
						</label>
						<select
							id="magicalElement"
							name="magicalElement"
							value={formData.magicalElement}
							onChange={handleChange}
							className="w-full px-4 py-2 border text-dark border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
							required
						>
							<option disabled value="">
								Select Magical Element
							</option>
							<option value="dragons">Dragons</option>
							<option value="spells">Spells</option>
							<option value="enchantedObjects">Enchanted Objects</option>
						</select>
					</div>

					<button
						type="submit"
						disabled={
							!formData.genre || !formData.name || !formData.magicalElement
						}
						className="w-full bg-forestGreen disabled:bg-opacity-50 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
					>
						Generate Story
					</button>
				</form>
			</div>
		</main>
	);
}
