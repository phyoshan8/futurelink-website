import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";

// Zod Schema
const enrollmentSchema = z.object({
  name: z.string().trim().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().regex(/^(09|\+?959)\d{7,9}$/, "Invalid Myanmar phone number").optional().or(z.literal("")),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
}).refine((data) => data.email || data.phone, {
  message: "Either Email or Phone is required",
  path: ["email"], // Attach error to email field
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const Enroll = () => {
    const courses = [
        "Full Stack Web Development",
        "UI/UX Class",
        "Programming Basic Class",
        "English Essential Class",
        "Chinese Class",
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnrollmentFormData>({
        resolver: zodResolver(enrollmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            course: "",
            message: "",
        },
    });

    const onSubmit = async (data: EnrollmentFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form Data:", data); // Log data for debugging
        setSubmitStatus('success');
        setIsSubmitting(false);
    };

    return (
        <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 font-montserrat overflow-hidden">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-slate-800 max-h-full overflow-y-auto">
                <Link to="/" className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-500 mb-4 font-medium transition-colors">
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    Back to Home
                </Link>
                
                <div className="text-center mb-4">
                    <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-0.5">Enroll Now</h2>
                    <p className="text-xs text-gray-600 dark:text-slate-400">Join Future Link and start your journey.</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="text-center py-8">
                        <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-lg font-bold text-green-600 mb-2">Success!</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Your enrollment has been received.</p>
                        <p className="text-xs text-gray-500 mt-2">We will contact you shortly.</p>
                        <Link to="/" className="inline-block mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">Return Home</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-[10px] font-bold text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'} text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-[10px] mt-0.5">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-[10px] font-bold text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                                Email Address {errors.email && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'} text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none`}
                                placeholder="john@example.com"
                            />
                            {errors.email?.message !== "Required" && errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-[10px] font-bold text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                                Phone Number (Myanmar)
                            </label>
                            <input
                                {...register("phone")}
                                type="tel"
                                id="phone"
                                className={`w-full px-3 py-2 rounded-md border ${errors.phone ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'} text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none`}
                                placeholder="09xxxxxxxxx"
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone.message}</p>}
                            {errors.email?.message === "Either Email or Phone is required" && !errors.phone && <p className="text-red-500 text-[10px] mt-0.5">Either Email or Phone is required</p>}
                        </div>

                        {/* Course Selection */}
                        <div>
                            <label htmlFor="course" className="block text-[10px] font-bold text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                                Select Course <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("course")}
                                    id="course"
                                    className={`w-full px-3 py-2 rounded-md border ${errors.course ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'} text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none appearance-none`}
                                >
                                    <option value="" disabled>Select a course...</option>
                                    {courses.map((course) => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                </div>
                            </div>
                            {errors.course && <p className="text-red-500 text-[10px] mt-0.5">{errors.course.message}</p>}
                        </div>
                        
                         {/* Message (Optional) */}
                         <div>
                            <label htmlFor="message" className="block text-[10px] font-bold text-gray-700 dark:text-slate-300 mb-1 uppercase tracking-wide">
                                Additional Message (Optional)
                            </label>
                            <textarea
                                {...register("message")}
                                id="message"
                                rows={2}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                                placeholder="Any specific questions?"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-2 text-sm flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing...
                                </>
                            ) : 'Submit Enrollment'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Enroll;
