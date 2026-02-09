import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: Home } = await import("./pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "courses",
        lazy: async () => {
          const { default: Courses } = await import("./pages/Courses");
          return { Component: Courses };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { default: About } = await import("./pages/About");
          return { Component: About };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { default: Contact } = await import("./pages/Contact");
          return { Component: Contact };
        },
      },
      {
        path: "enroll",
        lazy: async () => {
          const { default: Enroll } = await import("./pages/Enroll");
          return { Component: Enroll };
        },
      },
    ],
  },
]);

export default router;  