"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import { getStoryAndTitle } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FaWhatsapp, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Page = () => {
	const [story, setStory] = useState(null);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		toggleTheme,
		font,
		fontColor,
		backgroundImage,
		bgColor,
		headingFont,
	} = useContext(ThemeContext);
	const searchParams = new URLSearchParams(document.location.search);
	const router = useRouter();
	const name = decodeURIComponent(searchParams.get("name"));
	const genre = decodeURIComponent(searchParams.get("genre"));
	const magicalElement = decodeURIComponent(searchParams.get("magicalElement"));

	const fetchData = async () => {
		if (name && genre && magicalElement) {
			const body = { name, genre, magicalElement };
			try {
				const { data } = await axios.post("/api/gemini", body);
				setStory(getStoryAndTitle(data.story));
			} catch (error) {
				console.log(error);
				setError("Something Went wrong please try again later");
			}
		}
	};

	const generateImages = async () => {
		if (story?.content) {
			try {
				const { data } = await axios.post("/api/stability", {
					story: story?.content,
				});
				setImages(data.images);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	const url = `${window.location.host}/story?name=${name}&genre=${genre}&magicalElement=${magicalElement}`;
	const encodedUrl = encodeURIComponent(url);

	useEffect(() => {
		generateImages();
	}, [story]);

	useEffect(() => {
		toggleTheme(genre);
		fetchData();
	}, []);

	return (
		<main
			className="min-h-screen h-auto min-w-screen flex items-center justify-center flex-col lg:p-24 p-5 lg:gap-10 gap-5"
			style={{
				backgroundColor: bgColor,
				backgroundImage: `url(${backgroundImage})`,
				color: fontColor,
			}}
		>
			{loading ? (
				<h1 className="lg:text-5xl text-2xl font-extrabold text-center">
					{!story?.content
						? "Your Story is Being Generated"
						: "Just Few more seconds"}
				</h1>
			) : !error ? (
				<>
					<div className={headingFont.className}>
						<h1 className="lg:text-5xl text-2xl font-extrabold text-center">
							{story?.title}
						</h1>
					</div>
					<div className={font.className}>
						<p className="lg:text-lg text-justify">{story?.content}</p>
					</div>
					{images.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
							{images.map((img, index) => (
								<div key={index} className="bg-gray-200 rounded">
									<Image
										alt=""
										width={512}
										height={512}
										src={`data:image/jpeg;base64,${img}`}
									/>
								</div>
							))}
						</div>
					)}
					<button
						onClick={() => router.push("/")}
						className="w-full bg-forestGreen disabled:bg-opacity-50 text-[#fff] py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
					>
						Generate New Story
					</button>
					<p>Share this Story</p>
					<div className="inline-flex gap-5 text-lg">
						<a
							title="Share via Whatsapp"
							href={`whatsapp://send?text=Check out this amazing story generator ${encodedUrl}`}
						>
							<FaWhatsapp />
						</a>

						<a
							title="Share on X"
							target="_blank"
							href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=Check out this amazing story generator`}
						>
							<FaXTwitter />
						</a>

						<a
							title="Share on reddit"
							target="_blank"
							href={`https://www.reddit.com/submit?url=${encodedUrl}&title=Check out this amazing story generator`}
						>
							<FaReddit />
						</a>
					</div>
				</>
			) : (
				<h1 className="lg:text-5xl text-2xl font-extrabold text-center">
					{error}
				</h1>
			)}
		</main>
	);
};

export default Page;
