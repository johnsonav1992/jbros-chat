import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./views/Main/Main";
import ChatView from "./views/ChatView/ChatView";
import ChatWelcome from "./views/ChatWelcome/ChatWelcome";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/chat/:chatId",
				element: <ChatView />,
			},
			{
				index: true,
				element: <ChatWelcome />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
