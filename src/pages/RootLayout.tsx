import Header from "@/components/layout/Header";
import CourseCard from "../components/CourseCard";

interface Course {
  title: string;
  description: string;
  category: string;
}

const RootLayout = () => {
  const courses: Course[] = [
    {
      title: "Full Stack Web Development",
      description:
        "Master modern web development with React, Node.js, and database technologies. Build complete applications from frontend to backend.",
      category: "Programming",
    },
    {
      title: "UI/UX Class",
      description:
        "Learn the principles of user interface and user experience design. Create beautiful, functional designs that users love.",
      category: "Design",
    },
    {
      title: "Programming Basic Class",
      description:
        "Start your programming journey with fundamental concepts. Perfect for beginners who want to learn coding from scratch.",
      category: "Programming",
    },
    {
      title: "English Essential Class",
      description:
        "Improve your English language skills with comprehensive lessons covering grammar, vocabulary, and communication.",
      category: "Language",
    },
    {
      title: "Chinese Class",
      description:
        "Learn Mandarin Chinese with experienced instructors. Master speaking, reading, and writing in this increasingly important language.",
      category: "Language",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-slate-950">
      <header>
        <Header />
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                Welcome to FutureLink
              </h1>
              <p className="mb-8 text-xl text-indigo-100 md:text-2xl">
                Your Bridge to the Future of Education
              </p>
              <p className="mx-auto max-w-3xl text-lg text-indigo-50">
                Discover world-class courses designed to prepare you for
                tomorrow's challenges. Join thousands of learners who are
                already shaping their future with FutureLink.
              </p>
              <div className="mt-10">
                <a
                  href="#courses"
                  className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition-colors duration-200 hover:bg-gray-100"
                >
                  Explore Courses
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 transition-colors duration-300 md:text-4xl dark:text-white">
                Our Featured Courses
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 transition-colors duration-300 dark:text-slate-300">
                Choose from our carefully curated selection of courses designed
                to help you achieve your goals.
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <CourseCard
                  key={index}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 FutureLink. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Empowering learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
