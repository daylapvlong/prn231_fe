import React from "react";
import { BookOpen, Users, Award, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">QuizMaster</div>
          <div className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
          </div>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center ">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Master Any Subject with QuizMaster
            </h1>
            <p className="text-xl mb-8">
              Create, share, and take quizzes on any topic. Perfect for
              students, teachers, and lifelong learners.
            </p>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300">
              Get Started Free
            </button>
          </div>
          <div className="md:w-1/2">
            <image
              src="/placeholder.svg?height=400&width=600"
              alt="Quiz App Screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose QuizMaster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-12 h-12 text-blue-600" />}
              title="Vast Question Bank"
              description="Access thousands of pre-made questions or create your own custom quizzes."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-600" />}
              title="Collaborative Learning"
              description="Share quizzes with friends or join public quizzes to learn together."
            />
            <FeatureCard
              icon={<Award className="w-12 h-12 text-blue-600" />}
              title="Track Progress"
              description="Monitor your improvement with detailed performance analytics."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="QuizMaster has revolutionized how I prepare for exams. It's fun and effective!"
              author="Sarah K., Student"
            />
            <TestimonialCard
              quote="As a teacher, QuizMaster helps me create engaging quizzes for my students in minutes."
              author="John D., Teacher"
            />
            <TestimonialCard
              quote="I use QuizMaster to keep my mind sharp. It's perfect for lifelong learning."
              author="Emma R., Retiree"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              features={[
                "Access to public quizzes",
                "Create up to 5 quizzes",
                "Basic analytics",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$9.99/month"
              features={[
                "Unlimited quiz creation",
                "Advanced analytics",
                "Ad-free experience",
                "Priority support",
              ]}
              highlighted={true}
            />
            <PricingCard
              title="Team"
              price="$29.99/month"
              features={[
                "All Pro features",
                "Collaborative quiz creation",
                "Team performance tracking",
                "Dedicated account manager",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Quizzing?</h2>
          <p className="text-xl mb-8">
            Join thousands of learners and educators on QuizMaster today.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300 inline-flex items-center">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">QuizMaster</h3>
              <p>Empowering learning through interactive quizzes.</p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-blue-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-blue-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400">
                  Facebook
                </a>
                <a href="#" className="hover:text-blue-400">
                  Twitter
                </a>
                <a href="#" className="hover:text-blue-400">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 mb-4">"{quote}"</p>
      <p className="font-semibold">- {author}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md ${
        highlighted ? "border-2 border-blue-600" : ""
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}</p>
      <ul className="mb-8">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 px-4 rounded ${
          highlighted ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        } hover:bg-blue-700 transition duration-300`}
      >
        Choose Plan
      </button>
    </div>
  );
}