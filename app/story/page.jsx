"use client";
import React, { Suspense } from "react";

import Story from "./Story";

const Page = () => {
	return (
		<Suspense
			fallback={
				<p className="lg:text-5xl text-2xl font-extrabold text-center">
					Loading
				</p>
			}
		>
			<Story />
		</Suspense>
	);
};

export default Page;
