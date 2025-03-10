'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swiper from 'swiper'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './animations.css'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { Fragment } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { IncomeCalculator } from '@/components/IncomeCalculator'

type Campus = 'santa-ana' | 'south-gate';
type Program = 'microblading' | 'microshading' | 'combo';
type Review = {
  author: string;
  rating: number;
  text: string;
  date: string;
};

const GOOGLE_REVIEWS: Review[] = [
  {
    author: "Nathalie Islas",
    rating: 5,
    text: "Wonderful school and the staff is very nice. Professor Alina is very professional and detailed she makes sure to explain the techniques thoroughly and as to why the procedure is done the way it is. My intro makeup class was fun and I learned a lot!",
    date: "10 months ago"
  },
  {
    author: "Yvonne Quintana",
    rating: 5,
    text: "The facility looked very clean and inviting. All employees were very helpful and nice. Definitely recommend",
    date: "5 days ago"
  },
  {
    author: "Destiny Allen",
    rating: 5,
    text: "Omgee Demi is The Best! From Day one of interests to First day of class.. she has been very helpful throughout the entire enrollment process. She made everything easier than I thought it would be Ask For Demi if interested!! She will get you right ❤️",
    date: "3 months ago"
  },
  {
    author: "Patricia Padilla",
    rating: 5,
    text: "Allure is now in Santa Ana!!! It's a cosmetology school dedicated to her students. The CEO is involved in all of your experiences, making you feel the VIP",
    date: "2 months ago"
  },
  {
    author: "Veronica Lievana",
    rating: 5,
    text: "Great teacher. She's bilingual, she can answer all your questions. Great environment, they have everything you need to start your business. The inscription is very easy. I really recommend this place 100%",
    date: "a year ago"
  },
  {
    author: "Monica Luevano",
    rating: 5,
    text: "I definitely recommend her 100 percent. The team of professionals are very friendly and attentive to your questions. Also a very good advantage is that they speak English and Spanish. The owner of the place is a very welcoming and special person. All the classes they offer are state-of-the-art.",
    date: "9 months ago"
  }
];

type LeadMagnetType = 'beginners-guide' | 'microblading-essentials' | 'perfect-brows' | 'business-success' | 'advanced-techniques';

const LeadMagnetCTA = ({ type, className = '' }: { type: LeadMagnetType, className?: string }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [showLeadSuccessDialog, setShowLeadSuccessDialog] = useState(false);
  
  const bookInfo = {
    'beginners-guide': {
      title: "The Complete Beginner's Guide to Permanent Makeup",
      description: "Discover everything you need to know about starting your career in permanent makeup.",
      details: "24 pages • PDF Format • Instant Download",
      icon: "🎓"
    },
    'microblading-essentials': {
      title: "Microblading Essentials",
      description: "Master the fundamentals of microblading with our comprehensive guide.",
      details: "22 pages • PDF Format • Instant Download",
      icon: "📚"
    },
    'perfect-brows': {
      title: "Perfect Brows: A Client's Guide",
      description: "Everything clients need to know about microblading procedures.",
      details: "18 pages • PDF Format • Instant Download",
      icon: "✨"
    },
    'business-success': {
      title: "Business Success in Permanent Makeup",
      description: "Launch and grow your permanent makeup business with proven strategies.",
      details: "25 pages • PDF Format • Instant Download",
      icon: "💼"
    },
    'advanced-techniques': {
      title: "Advanced Techniques Preview",
      description: "Explore cutting-edge techniques in permanent makeup artistry.",
      details: "20 pages • PDF Format • Instant Download",
      icon: "🎯"
    }
  };

  const info = bookInfo[type];

  return (
    <>
      <div className={`card-base p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-100 dark:border-purple-900/50 ${className}`}>
        <div className="text-5xl mb-6">{info.icon}</div>
        <h3 className="text-2xl font-bold heading-primary mb-3">{info.title}</h3>
        <p className="text-body mb-4">{info.description}</p>
        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium mb-6">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{info.details}</span>
        </div>
        <button
          onClick={() => setShowDialog(true)}
          className="button-primary w-full flex items-center justify-center gap-2 py-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Free Guide
        </button>
      </div>

      {/* Email Collection Dialog */}
      <Transition appear show={showDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                    Get Your Free {info.title}
                  </Dialog.Title>
                  
                  <p className="text-body mb-6">
                    Enter your email to receive your free guide instantly. Plus, get exclusive tips and industry insights!
                  </p>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowDialog(false);
                      setShowLeadSuccessDialog(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-base"
                        placeholder="you@example.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="button-primary w-full"
                    >
                      Send Me the Guide
                    </button>

                    <p className="text-xs text-body text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
      </div>
      </div>
        </Dialog>
      </Transition>

      {/* Success Dialog */}
      <Transition appear show={showLeadSuccessDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowLeadSuccessDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-center align-middle shadow-xl transition-all">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
    </div>
                  <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                    Check Your Email!
                  </Dialog.Title>
                  <p className="text-body mb-6">
                    Your free guide has been sent to your inbox. If you don&apos;t see it, please check your spam folder.
                  </p>
                  <button
                    className="button-primary w-full"
                    onClick={() => setShowLeadSuccessDialog(false)}
                  >
                    Close
                  </button>
                </Dialog.Panel>
              </Transition.Child>
  </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const LeadCaptureButton = ({ program = 'microshading' as Program }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/[^\d]/g, '').length <= 10) {
      setPhone(formatted);
    }
  };

  const handleSubmit = () => {
    if (phone.replace(/[^\d]/g, '').length === 10) {
      setShowDialog(true);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="relative">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="button-primary w-full"
          >
            Get Started
          </button>
        ) : (
          <form 
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="tel"
              placeholder="123-456-7890"
              value={phone}
              onChange={handlePhoneChange}
              className="input-base flex-1"
              required
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            <button
              type="submit"
              className="button-primary px-6"
            >
              →
            </button>
          </form>
        )}
      </div>

      <Transition appear show={showDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="heading-primary text-2xl mb-4"
                  >
                    Complete Your Registration
                  </Dialog.Title>
                  
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Program
                      </label>
                      <select
                        defaultValue={program}
                        className="input-base"
                      >
                        <option value="microshading">Microshading</option>
                        <option value="microblading">Microblading</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        className="input-base"
                      />
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="button-primary"
                      >
                        Submit Registration
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const FloatingContactButton = () => {
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatFormData, setChatFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowChatDialog(false);
      setChatFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <>
  <button 
    className="fixed bottom-8 right-8 z-50 button-primary"
        onClick={() => setShowChatDialog(true)}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  </button>

      <Transition appear show={showChatDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowChatDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowChatDialog(false)}
                      className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                      Send us a Message
                    </Dialog.Title>
                    
                    <p className="text-body mb-6">
                      Have a question? We&apos;ll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={chatFormData.name}
                          onChange={(e) => setChatFormData({ ...chatFormData, name: e.target.value })}
                          className="input-base"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={chatFormData.email}
                          onChange={(e) => setChatFormData({ ...chatFormData, email: e.target.value })}
                          className="input-base"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          value={chatFormData.phone}
                          onChange={(e) => setChatFormData({ ...chatFormData, phone: formatPhoneNumber(e.target.value) })}
                          className="input-base"
                          placeholder="123-456-7890"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Message
                        </label>
                        <textarea
                          required
                          value={chatFormData.message}
                          onChange={(e) => setChatFormData({ ...chatFormData, message: e.target.value })}
                          className="input-base"
                          rows={4}
                          placeholder="Type your message here..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="button-primary w-full flex items-center justify-center gap-2"
                        disabled={showSuccessMessage}
                      >
                        {showSuccessMessage ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </button>
                    </form>

                    {showSuccessMessage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-semibold heading-primary mb-2">Message Sent!</h4>
                          <p className="text-body">We&apos;ll get back to you soon.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// Update FormData type
type FormData = {
  campus: Campus;
  program: Program;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredTime?: string;
  notes?: string;
  startDate?: string;
  schedule?: string;
  isHybrid?: boolean;
  paymentPlan: 'full' | 'installment';
  referralSource: string;
  goals: string;
};

type CourseOffering = {
  program: Program;
  startDate: string;
  location: Campus;
  schedule: string;
  isHybrid: boolean;
  timeSlot: string;
};

// Add these types for the quiz
type QuizQuestion = {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    score: {
      microblading: number;
      microshading: number;
      combo: number;
    };
  }[];
};

type QuizScore = {
  microblading: number;
  microshading: number;
  combo: number;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of eyebrow results are your clients most likely to request?",
    options: [
      {
        id: "natural",
        text: "Ultra-natural, hair-like strokes",
        score: { microblading: 3, microshading: 0, combo: 2 }
      },
      {
        id: "defined",
        text: "Soft, filled-in powder look",
        score: { microblading: 0, microshading: 3, combo: 2 }
      },
      {
        id: "combination",
        text: "Mix of strokes and shading",
        score: { microblading: 1, microshading: 1, combo: 3 }
      },
      {
        id: "unsure",
        text: "Not sure, want to learn all techniques",
        score: { microblading: 1, microshading: 1, combo: 3 }
      }
    ]
  },
  {
    id: 2,
    question: "What is your artistic background and comfort level?",
    options: [
      {
        id: "drawing",
        text: "Strong in detailed drawing/line work",
        score: { microblading: 3, microshading: 1, combo: 2 }
      },
      {
        id: "shading",
        text: "Experienced with shading/blending",
        score: { microblading: 1, microshading: 3, combo: 2 }
      },
      {
        id: "makeup",
        text: "Skilled in both precision and blending",
        score: { microblading: 2, microshading: 2, combo: 3 }
      },
      {
        id: "beginner",
        text: "New to artistic work",
        score: { microblading: 1, microshading: 2, combo: 2 }
      }
    ]
  },
  {
    id: 3,
    question: "What types of clients do you expect to work with most?",
    options: [
      {
        id: "normal",
        text: "Clients with normal/dry skin",
        score: { microblading: 3, microshading: 1, combo: 2 }
      },
      {
        id: "oily",
        text: "Clients with oily skin",
        score: { microblading: 0, microshading: 3, combo: 2 }
      },
      {
        id: "mixed",
        text: "Mix of different skin types",
        score: { microblading: 1, microshading: 1, combo: 3 }
      },
      {
        id: "mature",
        text: "Mature skin/special conditions",
        score: { microblading: 1, microshading: 2, combo: 3 }
      }
    ]
  },
  {
    id: 4,
    question: "What is your preferred learning approach?",
    options: [
      {
        id: "focused",
        text: "Master one technique thoroughly",
        score: { microblading: 2, microshading: 2, combo: 0 }
      },
      {
        id: "comprehensive",
        text: "Learn multiple techniques together",
        score: { microblading: 1, microshading: 1, combo: 3 }
      },
      {
        id: "gradual",
        text: "Start basic, then advance later",
        score: { microblading: 2, microshading: 2, combo: 1 }
      },
      {
        id: "intensive",
        text: "Intensive, all-inclusive training",
        score: { microblading: 1, microshading: 1, combo: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "What are your business goals?",
    options: [
      {
        id: "specialist",
        text: "Specialize in one technique",
        score: { microblading: 2, microshading: 2, combo: 0 }
      },
      {
        id: "versatile",
        text: "Offer a wide range of services",
        score: { microblading: 1, microshading: 1, combo: 3 }
      },
      {
        id: "premium",
        text: "Premium, customized services",
        score: { microblading: 1, microshading: 1, combo: 3 }
      },
      {
        id: "specific",
        text: "Target specific client needs",
        score: { microblading: 2, microshading: 2, combo: 2 }
      }
    ]
  }
];

// Add this type definition after the QuizScore type
type SelectedAnswers = {
  [key: number]: string;
};

export default function Home() {
  const [showTourDialog, setShowTourDialog] = useState(false);
  const [showCoursesDialog, setShowCoursesDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    campus: 'santa-ana',
    program: 'microblading',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredTime: '',
    notes: '',
    startDate: '',
    schedule: '',
    isHybrid: false,
    paymentPlan: 'full',
    referralSource: '',
    goals: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScores, setQuizScores] = useState<QuizScore>({ microblading: 0, microshading: 0, combo: 0 });
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});

  // Course offerings data
  const courseOfferings: CourseOffering[] = [
    // January - February
    {
      program: 'microblading',
      startDate: '2024-01-17',
      location: 'santa-ana',
      schedule: 'Jan 17-19, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'microshading',
      startDate: '2024-02-21',
      location: 'south-gate',
      schedule: 'Feb 21-23, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'microblading',
      startDate: '2024-02-14',
      location: 'santa-ana',
      schedule: 'Feb 14-16, 2024',
      isHybrid: false,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    // March - April
    {
      program: 'microshading',
      startDate: '2024-03-13',
      location: 'south-gate',
      schedule: 'Mar 13-15, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'combo',
      startDate: '2024-03-20',
      location: 'santa-ana',
      schedule: 'Mar 20-22 & 27-29, 2024',
      isHybrid: false,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'combo',
      startDate: '2024-04-17',
      location: 'south-gate',
      schedule: 'Apr 17-19 & 24-26, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    // Additional Future Dates
    {
      program: 'microblading',
      startDate: '2024-05-15',
      location: 'santa-ana',
      schedule: 'May 15-17, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'microshading',
      startDate: '2024-06-12',
      location: 'south-gate',
      schedule: 'Jun 12-14, 2024',
      isHybrid: false,
      timeSlot: '10:00 AM - 7:00 PM'
    },
    {
      program: 'combo',
      startDate: '2024-07-10',
      location: 'santa-ana',
      schedule: 'Jul 10-12 & 17-19, 2024',
      isHybrid: true,
      timeSlot: '10:00 AM - 7:00 PM'
    }
  ];

  useEffect(() => {
    let swiperInstance: Swiper | null = null;
    
    const timer = setTimeout(() => {
      swiperInstance = new Swiper('.gallery-slider', {
        modules: [EffectCoverflow, Navigation, Pagination],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        initialSlide: 2,
        loop: true,
        speed: 800,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} !bg-purple-600 !w-2.5 !h-2.5"></span>`;
          },
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          }
        },
      })
    }, 100)

      return () => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true)
      }
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/90 dark:bg-dark-background/90 backdrop-blur-md border-b border-gray-200/80 dark:border-dark-border/80">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-gradient">
            AIMA
          </div>
            <div className="hidden md:flex items-center space-x-6">
              {[
                { href: '#about', label: 'About' },
                { href: '#programs', label: 'Programs' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#testimonials', label: 'Testimonials' },
                { href: '#faq', label: 'FAQ' },
                { href: '#contact', label: 'Contact' }
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-white transition-colors py-1"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>
          </div>
          <button 
    onClick={() => {
      setFormData({
        ...formData,
        campus: 'santa-ana',
        program: 'microblading',
        startDate: courseOfferings[0].startDate,
        schedule: courseOfferings[0].schedule,
        isHybrid: courseOfferings[0].isHybrid
      });
      setShowEnrollDialog(true);
    }}
    className="button-primary"
  >
    Enroll Now
  </button>
        </nav>
      </header>

      <main className="section-light min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[90vh] pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left pt-8 md:pt-0">
              {/* Location Badge */}
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-50 dark:bg-dark-card mb-4 md:mb-6 text-sm text-purple-700 dark:text-purple-300">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Santa Ana & South Gate, CA
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold heading-primary mb-4 md:mb-6 leading-tight">
                Launch Your Career in
                <span className="text-gradient block mt-1 md:mt-2">
                  Permanent Makeup
                </span>
            </h1>

              {/* Subheadline */}
              <p className="text-body text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                Join California&apos;s leading beauty academy with over 3,000 successful graduates. Master the art of microblading & microshading at the state&apos;s most trusted PMU training center.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
                <button 
                  onClick={() => setShowTourDialog(true)}
                  className="button-primary w-full sm:w-auto px-6 py-3 text-base"
                >
                  Schedule Campus Tour
                </button>
                <button 
                  onClick={() => setShowCoursesDialog(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-purple-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:border-purple-300 dark:hover:border-purple-500/30 transition-all duration-300 text-base"
                >
                  View Available Courses
                </button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center p-3 md:p-4 card-base">
                  <div className="text-xl md:text-2xl font-bold text-gradient">3,000+</div>
                  <div className="text-xs md:text-sm text-body">Graduates</div>
                </div>
                <div className="text-center p-3 md:p-4 card-base">
                  <div className="text-xl md:text-2xl font-bold text-gradient">98%</div>
                  <div className="text-xs md:text-sm text-body">Success Rate</div>
                </div>
                <div className="text-center p-3 md:p-4 card-base">
                  <div className="text-xl md:text-2xl font-bold text-gradient">∞</div>
                  <div className="text-xs md:text-sm text-body">Lifetime Support</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative mt-8 lg:mt-0">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full pt-[56.25%]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  >
                    <source src="/video01.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Lead Capture Form */}
              <div className="mt-4 md:mt-6 card-base p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold heading-primary mb-3 md:mb-4">Get Program Info & Pricing</h3>
                <LeadCaptureButton />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Programs Section */}
      <section id="programs" className="py-24 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gradient text-4xl md:text-5xl font-bold mb-4">
              Our Programs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
            <p className="section-description">
              Transform your career with our comprehensive permanent makeup training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Microblading Program */}
            <div className="card-base p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="heading-primary text-3xl mb-4">Microblading</h3>
              <div className="bg-purple-50 dark:bg-dark-input/50 text-purple-700 dark:text-purple-300 text-sm font-medium px-4 py-2 rounded-full inline-block mb-6">
                24 Hours (3 Days or 6 Half-Days)
              </div>
              <p className="text-body mb-8">
                Master the art of creating natural-looking eyebrows through precise hair-stroke techniques. Perfect for artists seeking to specialize in the most in-demand permanent makeup service.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Hands-on training with live models</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Professional microblading kit included</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">12 months of business support</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowCoursesDialog(true)}
                className="button-primary w-full"
              >
                View Available Dates
              </button>
            </div>

            {/* Microshading Program */}
            <div className="card-base p-8">
              <h3 className="heading-primary text-3xl mb-4">Microshading</h3>
              <div className="bg-purple-50 dark:bg-dark-input/50 text-purple-700 dark:text-purple-300 text-sm font-medium px-4 py-2 rounded-full inline-block mb-6">
                24 Hours (3 Days or 6 Half-Days)
              </div>
              <p className="text-body mb-8">
                Learn the powder-effect technique that creates soft, filled brows. Perfect for clients with oily skin and those preferring a more defined, makeup-like appearance.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Expert shading techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Professional kit included</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Ongoing mentorship</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowCoursesDialog(true)}
                className="button-primary w-full"
              >
                View Available Dates
              </button>
            </div>

            {/* Combo Program */}
            <div className="card-base p-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="heading-primary text-3xl mb-4">Combo Course</h3>
              <div className="bg-purple-50 dark:bg-dark-input/50 text-purple-700 dark:text-purple-300 text-sm font-medium px-4 py-2 rounded-full inline-block mb-6">
                48 Hours (6 Days or 12 Half-Days)
              </div>
              <p className="text-body mb-8">
                Master both microblading and microshading techniques in our comprehensive combo course. Become a versatile artist capable of customizing treatments for any client.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Complete PMU mastery</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Full professional kit</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-body">Priority business support</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowCoursesDialog(true)}
                className="button-primary w-full"
              >
                View Available Dates
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <LeadMagnetCTA 
              type="beginners-guide" 
              className="max-w-xl mx-auto transform hover:scale-[1.02] transition-all duration-300" 
            />
          </div>
        </div>
      </section>

      {/* Add after the hero section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-dark-background dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold heading-primary mb-4">
              Free Resources to Get Started
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Download our expert guides to learn more about permanent makeup artistry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <LeadMagnetCTA type="beginners-guide" />
            <LeadMagnetCTA type="microblading-essentials" />
            <LeadMagnetCTA type="perfect-brows" />
          </div>
        </div>
      </section>

      {/* Why Choose AIMA Section */}
      <section id="about" className="py-24 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gradient text-4xl md:text-5xl font-bold mb-4">
              Why Choose AIMA?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
            <p className="section-description">
              Join California&apos;s premier permanent makeup academy with a proven track record of over 3,000 successful graduates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🎓",
                title: "Industry-Leading Academy",
                description: "With over 3,000 successful graduates, AIMA stands as the most established and trusted permanent makeup training institution in California."
              },
              {
                icon: "👩‍🏫",
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of experience in permanent makeup artistry and education."
              },
              {
                icon: "🛠️",
                title: "Hands-On Training",
                description: "Get extensive practical experience with real-world techniques and professional-grade equipment."
              },
              {
                icon: "📚",
                title: "Comprehensive Curriculum",
                description: "Master both fundamental and advanced techniques through our structured, thorough training program."
              },
              {
                icon: "💼",
                title: "Business Support",
                description: "Receive guidance on business setup, marketing, and client acquisition to jumpstart your career."
              },
              {
                icon: "🤝",
                title: "Lifetime Support",
                description: "Access our exclusive app and ongoing mentorship for life - we&apos;re here to support your success at every stage."
              }
            ].map((feature, index) => (
              <div key={index} className="card-base p-8 hover:translate-y-[-2px]">
                <div className="feature-icon-wrapper mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="heading-primary text-xl mb-3">{feature.title}</h3>
                <p className="text-body">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-base p-6">
              <h3 className="heading-primary text-lg mb-4">Financial Options</h3>
              <ul className="space-y-3">
                {[
                  "Flexible payment plans available",
                  "0% interest financing options",
                  "Special early enrollment discounts",
                  "Scholarship opportunities for qualified candidates"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-base p-6">
              <h3 className="heading-primary text-lg mb-4">Career Support</h3>
              <ul className="space-y-3">
                {[
                  "Job placement assistance",
                  "Business startup guidance",
                  "Marketing strategy support",
                  "Ongoing technical support"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Eyebrows Section */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-6">
                Master the Art of
                <span className="text-gradient block mt-2">
                  Permanent Makeup
                </span>
              </h2>
              <p className="text-body mb-8">
                Our comprehensive training programs cover both fundamental and advanced techniques, ensuring you're prepared for a successful career in permanent makeup artistry.
              </p>
              <div className="space-y-6">
                <LeadMagnetCTA type="advanced-techniques" className="transform hover:scale-[1.02] transition-all duration-300" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="text-xl font-semibold heading-primary mb-4">Core Techniques You'll Master</h3>
                <ul className="space-y-3">
                  {[
                    "Hair-stroke technique for natural results",
                    "Powder-filled looks for longer-lasting effects",
                    "Color theory and pigment selection",
                    "Facial mapping and symmetry",
                    "Advanced combination techniques",
                    "Safety and sterilization protocols"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add after Programs Section */}
      <section className="py-24 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-4">
              Launch Your PMU Business
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Get the knowledge and support you need to build a successful permanent makeup business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="text-xl font-semibold heading-primary mb-4">Business Essentials</h3>
                <ul className="space-y-3">
                  {[
                    "Business registration and licensing",
                    "Insurance and legal requirements",
                    "Studio setup and equipment",
                    "Pricing strategies",
                    "Marketing and client acquisition",
                    "Brand development"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <LeadMagnetCTA type="business-success" className="transform hover:scale-[1.02] transition-all duration-300" />
            </div>
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="text-xl font-semibold heading-primary mb-4">Growth & Support</h3>
                <ul className="space-y-3">
                  {[
                    "Lifetime access to exclusive AIMA app",
                    "Advanced technique workshops",
                    "Business development resources",
                    "Marketing strategy support",
                    "Client management tools",
                    "Industry networking opportunities"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-24 section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="card-base p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 border-purple-100 dark:border-purple-900/50">
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl md:text-4xl font-bold heading-primary mb-4">
                Discover Your PMU Path
              </h2>
              <p className="text-body mb-8 max-w-2xl mx-auto">
                Take our quick quiz to assess your understanding of permanent makeup and discover which program best suits your goals
              </p>
              <button
                onClick={() => setShowQuizDialog(true)}
                className="button-primary px-8 py-4 text-lg flex items-center justify-center gap-2 mx-auto"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Dialog */}
      <Transition appear show={showQuizDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowQuizDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowQuizDialog(false)}
                      className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Quiz Content */}
                    <div className="text-center mb-8">
                      <Dialog.Title as="h3" className="heading-primary text-3xl mb-4">
                        PMU Career Assessment
                      </Dialog.Title>
                      <p className="text-body text-lg">
                        Let's find your perfect path in permanent makeup artistry
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-8">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold heading-primary mb-6">
                        {quizQuestions[currentQuestion].question}
                      </h4>
                      <div className="grid gap-4">
                        {quizQuestions[currentQuestion].options.map((option) => {
                          const isSelected = selectedAnswers[currentQuestion] === option.id;
                          const isDisabled = Boolean(selectedAnswers[currentQuestion]) || showResults;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => {
                                // Prevent any clicks if showing results or already answered
                                if (isDisabled) return;
                                
                                // Record the answer
                                setSelectedAnswers({
                                  ...selectedAnswers,
                                  [currentQuestion]: option.id
                                });

                                // Update scores (only once per question)
                                const newScores = { ...quizScores };
                                Object.entries(option.score).forEach(([key, value]) => {
                                  newScores[key as keyof QuizScore] = newScores[key as keyof QuizScore] + value;
                                });
                                setQuizScores(newScores);

                                // Move to next question or show results after a short delay
                                setTimeout(() => {
                                  if (currentQuestion < quizQuestions.length - 1) {
                                    setCurrentQuestion(currentQuestion + 1);
                                  } else {
                                    setShowResults(true);
                                  }
                                }, 300);
                              }}
                              disabled={Boolean(isDisabled)}
                              className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] group
                                ${isSelected 
                                  ? 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                                  : isDisabled
                                    ? 'border-purple-100 dark:border-purple-900/30 bg-white/50 dark:bg-dark-card/50 opacity-50 cursor-not-allowed'
                                    : 'border-purple-100 dark:border-purple-900/30 bg-white dark:bg-dark-card hover:border-purple-300 dark:hover:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-900/10'
                                }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                  ${isSelected 
                                    ? 'border-purple-500 dark:border-purple-400 bg-purple-500 dark:bg-purple-400' 
                                    : 'border-purple-200 dark:border-purple-800 group-hover:border-purple-400 dark:group-hover:border-purple-600'
                                  }`}
                                >
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <span className="text-lg text-gray-800 dark:text-gray-200">
                                  {option.text}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Results */}
                    {showResults && (
                      <div className="space-y-6">
                        <h4 className="text-2xl font-bold heading-primary mb-4">
                          Your Personalized PMU Analysis
                        </h4>
                        
                        <div className="card-base p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                          <h5 className="text-xl font-semibold mb-4">
                            {(() => {
                              const scores = Object.entries(quizScores);
                              const maxScore = Math.max(...scores.map(([_, score]) => score));
                              const topPrograms = scores.filter(([_, score]) => score === maxScore);
                              
                              if (topPrograms.length > 1 && topPrograms.some(([program]) => program === 'combo')) {
                                return "Recommended: Combo Course (Microblading + Microshading)";
                              }
                              
                              const [topProgram] = topPrograms[0];
                              switch(topProgram) {
                                case 'microblading':
                                  return "Recommended: Microblading Program";
                                case 'microshading':
                                  return "Recommended: Microshading Program";
                                case 'combo':
                                  return "Recommended: Combo Course (Microblading + Microshading)";
                                default:
                                  return "Customized PMU Path";
                              }
                            })()}
                          </h5>

                          <div className="space-y-6 mb-8">
                            <div className="bg-white/50 dark:bg-dark-card/50 rounded-xl p-4">
                              <h6 className="font-semibold mb-3">Your Profile Analysis</h6>
                              <p className="text-body mb-3">
                                {(() => {
                                  const clientPreference = quizQuestions[0].options.find(
                                    opt => opt.id === selectedAnswers[0]
                                  );
                                  const artisticBackground = quizQuestions[1].options.find(
                                    opt => opt.id === selectedAnswers[1]
                                  );
                                  const skinTypes = quizQuestions[2].options.find(
                                    opt => opt.id === selectedAnswers[2]
                                  );
                                  
                                  let analysis = "";
                                  
                                  // Analyze client preference and skin types
                                  if (clientPreference?.id === 'natural') {
                                    analysis = "Your focus on natural-looking results with hair-like strokes strongly aligns with microblading. ";
                                    if (skinTypes?.id === 'oily') {
                                      analysis += "However, your work with oily skin types suggests microshading would be valuable to include. ";
                                    }
                                  } else if (clientPreference?.id === 'defined') {
                                    analysis = "Your preference for soft, filled-in looks indicates microshading would be your primary strength. ";
                                    if (skinTypes?.id === 'normal') {
                                      analysis += "Though you work with ideal skin types for microblading, your artistic preference suggests starting with microshading. ";
                                    }
                                  } else {
                                    analysis = "You value versatility in techniques, which suggests the combo course would serve you best. ";
                                  }
                                  
                                  // Add artistic background analysis
                                  switch(artisticBackground?.id) {
                                    case 'drawing':
                                      analysis += "Your strong drawing skills provide an excellent foundation for creating precise, natural strokes in microblading.";
                                      break;
                                    case 'shading':
                                      analysis += "Your experience with shading techniques will translate well to creating beautiful powder effects in microshading.";
                                      break;
                                    case 'makeup':
                                      analysis += "Your combined precision and blending skills make you well-suited for mastering both techniques.";
                                      break;
                                    default:
                                      analysis += "As someone new to artistic work, you'll benefit from our structured approach to building fundamental skills.";
                                  }
                                  
                                  return analysis;
                                })()}
                              </p>
                            </div>

                            <div className="bg-white/50 dark:bg-dark-card/50 rounded-xl p-4">
                              <h6 className="font-semibold mb-3">Learning Path & Business Goals</h6>
                              <p className="text-body mb-3">
                                {(() => {
                                  const learningStyle = quizQuestions[3].options.find(
                                    opt => opt.id === selectedAnswers[3]
                                  );
                                  const businessGoal = quizQuestions[4].options.find(
                                    opt => opt.id === selectedAnswers[4]
                                  );
                                  
                                  let analysis = "";
                                  
                                  // Analyze learning style
                                  if (learningStyle?.id === 'focused') {
                                    analysis = "Your methodical approach to learning suggests starting with a single specialized program. ";
                                  } else if (learningStyle?.id === 'comprehensive') {
                                    analysis = "Your preference for learning multiple techniques simultaneously makes you an ideal candidate for our combo course. ";
                                  } else if (learningStyle?.id === 'gradual') {
                                    analysis = "Your step-by-step learning style suggests mastering one technique before advancing to the next. ";
                                  } else {
                                    analysis = "Your commitment to intensive training aligns well with our comprehensive program structure. ";
                                  }
                                  
                                  // Add business goal analysis
                                  if (businessGoal?.id === 'specialist') {
                                    analysis += "Your goal to specialize supports focusing deeply on one technique initially.";
                                  } else if (businessGoal?.id === 'versatile' || businessGoal?.id === 'premium') {
                                    analysis += "Your business vision aligns perfectly with mastering multiple techniques to offer comprehensive services.";
                                  } else {
                                    analysis += "Your targeted approach will benefit from understanding multiple techniques to best serve specific client needs.";
                                  }
                                  
                                  return analysis;
                                })()}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {Object.entries(quizScores).map(([program, score]) => {
                                const maxPossible = quizQuestions.length * 3;
                                const percentage = Math.round((score / maxPossible) * 100);
                                
                                return (
                                  <div key={program} className="relative">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {program.charAt(0).toUpperCase() + program.slice(1)} Compatibility
                                      </span>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {percentage}%
                                      </span>
                                    </div>
                                    <div className="w-full h-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                                      <div 
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="bg-white dark:bg-dark-card rounded-xl p-4 mb-6">
                            <h6 className="font-semibold mb-2">Recommended Next Steps</h6>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Schedule a campus tour to discuss your results with our instructors</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>View upcoming course dates that match your recommended program</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Download our free program guide for more information</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                setShowQuizDialog(false);
                                setShowTourDialog(true);
                              }}
                              className="flex-1 button-primary py-3"
                            >
                              Schedule a Campus Tour
                            </button>
                            <button
                              onClick={() => {
                                setShowQuizDialog(false);
                                setShowCoursesDialog(true);
                              }}
                              className="flex-1 px-6 py-3 rounded-full border-2 border-purple-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:border-purple-300 dark:hover:border-purple-500/30 transition-all duration-300"
                            >
                              View Course Dates
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-4">
              Student Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
            <p className="text-body max-w-2xl mx-auto">
              See the amazing results our students achieve during their training
            </p>
          </div>

          <div className="max-w-[1200px] mx-auto relative">
            <div className="gallery-slider w-full relative">
              <div className="swiper-wrapper">
                {[
                  '/zC_placeholder_aimaPMU1.webp',
                  '/zC_placeholder_aimaPMU2.png',
                  '/zC_placeholder_aimaPMU3.png',
                  '/zC_placeholder_aimaPMU4.png',
                  '/zC_placeholder_aimaPMU5.png',
                  '/zC_placeholder_aimaPMU6.png',
                  '/zC_placeholder_aimaPMU7.png',
                  '/zC_placeholder_aimaPMU8.png',
                  '/zC_placeholder_aimaPMU9.png'
                ].map((imagePath, index) => (
                  <div key={index} className="swiper-slide p-4">
                    <div className="group relative card-base overflow-hidden transition-all duration-300">
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-xl font-semibold mb-2">Student Work {index + 1}</h3>
                          <p className="text-sm text-gray-200">
                            Professional Permanent Makeup
                          </p>
                        </div>
                      </div>

                      {/* Main Image */}
                      <div className="aspect-[3/4]">
                        <Image
                          src={imagePath}
                          alt={`Student Work ${index + 1}`}
                          width={600}
                          height={800}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <button className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-dark-card p-4 rounded-full shadow-xl hover:bg-white dark:hover:bg-dark-card-hover transition-all duration-300 swiper-button-prev after:hidden group">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-dark-card p-4 rounded-full shadow-xl hover:bg-white dark:hover:bg-dark-card-hover transition-all duration-300 swiper-button-next after:hidden group">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Pagination */}
              <div className="swiper-pagination !bottom-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section id="testimonials" className="py-24 section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-4">
              Student Reviews
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
            <p className="text-body max-w-2xl mx-auto">
              Join over 3,000 successful graduates who have transformed their careers through our programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {GOOGLE_REVIEWS.map((review, index) => (
              <div key={index} className="card-base p-6 hover:translate-y-[-2px]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg heading-primary mb-1">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-body ml-2">{review.date}</span>
                    </div>
                  </div>
                  <svg className="w-8 h-8 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" fill="#4285F4"/>
                    <path d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4c4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8z" fill="#34A853"/>
                  </svg>
                </div>
                <p className="text-body line-clamp-4">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://www.google.com/maps/place/Allure+Institute+of+Makeup+Artistry/@33.7744373,-117.8841993,17z/data=!3m1!4b1!4m6!3m5!1s0x80dce96da7a6d6d5:0xa33171aaa154b018!8m2!3d33.7744373!4d-117.8841993!16s%2Fg%2F11ghpmqwlg?hl=en-US&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-purple-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:border-purple-300 dark:hover:border-purple-500/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" fill="#4285F4"/>
                <path d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4c4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8z" fill="#34A853"/>
              </svg>
              <span className="text-gradient font-medium">View All Reviews on Google</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                question: "What exactly is permanent makeup?",
                answer: "Permanent makeup is a cosmetic technique that implants pigment into the dermis layer of your skin to enhance features like eyebrows, eyeliner, and lips. At AIMA, we specialize in microblading and microshading - advanced techniques that create natural-looking eyebrows by implanting pigments that simulate individual hair strokes.",
                icon: "💄"
              },
              {
                question: "How long does a permanent makeup procedure last?",
                answer: "Results typically last 1-2 years, depending on your skin type, lifestyle, and aftercare routine. Factors like sun exposure, skincare products, and your natural cell turnover rate can affect longevity. We recommend a touch-up appointment every 12-18 months to maintain optimal results.",
                icon: "⏱️"
              },
              {
                question: "What training and certification do you provide?",
                answer: "Our comprehensive certification program includes hands-on training in microblading, microshading, or both techniques. You'll learn proper pigmentation techniques, color theory, facial morphology, safety protocols, and business development. All training is conducted by state-licensed instructors with extensive industry experience.",
                icon: "🎓"
              },
              {
                question: "How long is the training program?",
                answer: "Our intensive program consists of 3 days of in-person training, followed by extensive practice sessions and ongoing support. The curriculum is designed to ensure you master both theoretical knowledge and practical skills. After completion, you'll receive continued mentorship for 12 months to support your professional development.",
                icon: "📅"
              },
              {
                question: "What makes AIMA different from other training academies?",
                answer: "AIMA stands out through our state licensing, comprehensive curriculum, and commitment to lifelong success. We use premium vegan pigments, provide extensive hands-on practice, and offer lifetime support through our exclusive app and alumni network. Our hybrid learning approach combines in-person training with digital resources for optimal learning outcomes.",
                icon: "⭐"
              },
              {
                question: "Do you offer financial assistance?",
                answer: "Yes, we provide flexible payment plans and financing options to make your education accessible. We offer 0% interest payment plans, early enrollment discounts, and can work with you to create a customized payment schedule. Contact our admissions team to discuss the options available to you.",
                icon: "💰"
              },
              {
                question: "What career support do you provide after graduation?",
                answer: "Our career support includes lifetime access to our exclusive app, business startup guidance, marketing strategy development, client acquisition techniques, and ongoing technical support. We help you establish your practice, build your portfolio, and connect with industry opportunities. Our alumni network provides valuable networking and continuing education resources.",
                icon: "🚀"
              },
              {
                question: "What should I expect during the training program?",
                answer: "The program begins with fundamental theory and safety protocols, progressing to hands-on practice with synthetic skin. You'll then advance to supervised live model work, learning client consultation, customization techniques, and aftercare procedures. The training includes business development modules and marketing strategies to help launch your career.",
                icon: "📚"
              }
            ].map((faq, index) => (
              <Disclosure 
                key={index}
                as="div"
                className="transition-all duration-200"
              >
                {({ open }) => {
                  const isOpen = open && openFaq === index;

                  return (
                    <div className={`card-base overflow-hidden transition-all duration-200 ${isOpen ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''}`}>
                      <Disclosure.Button 
                        className={`w-full px-6 py-4 text-left flex items-center gap-3 transition-colors duration-200
                          ${isOpen 
                            ? 'bg-purple-50 dark:bg-purple-900/10 text-purple-900 dark:text-purple-100' 
                            : 'hover:bg-gray-50 dark:hover:bg-dark-card-hover'
                          }`}
                        onClick={() => {
                          setOpenFaq(open ? null : index);
                        }}
                      >
                        <span className="text-2xl">{faq.icon}</span>
                        <span className="flex-1 text-lg font-semibold heading-primary">{faq.question}</span>
                        <svg 
                          className={`w-5 h-5 text-purple-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Disclosure.Button>

                      <Transition
                        show={isOpen}
                        enter="transition duration-200 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel 
                          static
                          className={`px-6 py-4 text-body border-t border-gray-100 dark:border-dark-border
                            ${isOpen ? 'bg-purple-50/50 dark:bg-purple-900/5' : 'bg-gray-50/50 dark:bg-dark-card-hover/50'}`}
                        >
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </div>
                  );
                }}
              </Disclosure>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-body mb-6">
              Still have questions? We're here to help!
            </p>
            <button
              onClick={() => setShowTourDialog(true)}
              className="button-primary"
            >
              Contact an Admissions Counselor
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 section-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="section-description">
              Ready to start your journey? Get in touch with us today.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="card-base bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm shadow-xl p-8 rounded-2xl transform transition-all duration-300 hover:scale-[1.01]">
              <form onSubmit={(e) => {
                e.preventDefault();
                // Add form submission logic here
                alert('Thank you for your message! We will get back to you soon.');
              }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1 transition-colors group-focus-within:text-purple-600">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-input focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1 transition-colors group-focus-within:text-purple-600">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-input focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1 transition-colors group-focus-within:text-purple-600">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      id="contactPhone"
                      type="tel"
                      required
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={contactPhoneNumber}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value);
                        if (formatted.replace(/[^\d]/g, '').length <= 10) {
                          setContactPhoneNumber(formatted);
                        }
                      }}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-input focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none"
                      placeholder="123-456-7890"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Format: XXX-XXX-XXXX</p>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1 transition-colors group-focus-within:text-purple-600">Email Address (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-input focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1 transition-colors group-focus-within:text-purple-600">Message (Optional)</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-input focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us about your goals and any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg"
                >
                  Send Message
                </button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  By submitting this form, you agree to be contacted regarding your request.
                  <br />We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Dialog */}
      <Transition appear show={showTourDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowTourDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="heading-primary text-2xl mb-4"
                  >
                    Schedule a Campus Tour
                  </Dialog.Title>
                  
                  <div className="mb-6">
                    <p className="text-body mb-4">
                      Experience our state-of-the-art facilities and meet our expert instructors. Complete the form below and an admissions counselor will contact you to schedule your tour.
                    </p>
                  </div>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    {/* Campus Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Preferred Campus <span className="text-pink-500">*</span>
                      </label>
                      <select 
                        required
                        className="input-base"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a campus</option>
                        <option value="santa-ana">Santa Ana (Main Campus)</option>
                        <option value="south-gate">South Gate</option>
                      </select>
                    </div>

                    {/* Program Interest */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Program of Interest <span className="text-pink-500">*</span>
                      </label>
                      <select 
                        required
                        className="input-base"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a program</option>
                        <option value="microblading">Microblading</option>
                        <option value="microshading">Microshading</option>
                        <option value="combo">Combination (Microblading + Microshading)</option>
                      </select>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          First Name <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="input-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Last Name <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="input-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Phone Number <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            let formattedNumber = value;
                            if (value.length > 3) {
                              formattedNumber = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                            }
                            if (value.length > 6) {
                              formattedNumber = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
                            }
                            setPhoneNumber(formattedNumber);
                          }
                        }}
                        placeholder="(123) 456-7890"
                        className="input-base"
                        pattern="\(\d{3}\) \d{3}-\d{4}"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="input-base"
                      />
                    </div>

                    {/* Preferred Contact Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Best Time to Contact You <span className="text-pink-500">*</span>
                      </label>
                      <div className="space-y-4">
                        <select 
                          required
                          className="input-base w-full"
                          defaultValue=""
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        >
                          <option value="" disabled>Select time</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 4PM)</option>
                          <option value="evening">Evening (4PM - 7PM)</option>
                        </select>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Available Days <span className="text-pink-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selectedDays.includes('all')}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedDays(['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
                                  } else {
                                    setSelectedDays([]);
                                  }
                                }}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-dark-text">Select All Days</span>
                            </label>
                            {[
                              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                            ].map((day) => (
                              <label key={day} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={selectedDays.includes(day.toLowerCase())}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedDays([...selectedDays, day.toLowerCase()]);
                                    } else {
                                      setSelectedDays(selectedDays.filter(d => d !== day.toLowerCase()));
                                    }
                                  }}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-dark-text">{day}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                        Additional Notes or Questions
                      </label>
                      <textarea
                        className="input-base"
                        rows={3}
                        placeholder="Any specific questions or concerns?"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="button-primary w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          // Validate form
                          const form = e.currentTarget.closest('form');
                          if (form && form.checkValidity() && selectedDays.length > 0) {
                            // All required fields are filled and at least one day is selected
                            setShowSuccessDialog(true);
                            setShowTourDialog(false);
                          } else {
                            // Show validation messages
                            form?.reportValidity();
                            if (selectedDays.length === 0) {
                              alert('Please select at least one available day');
                            }
                          }
                        }}
                      >
                        Request Tour
                      </button>
                    </div>

                    {/* Form Footer */}
                    <p className="text-sm text-body text-center mt-4">
                      By submitting this form, you'll be contacted by one of our admissions counselors to schedule your campus tour.
                    </p>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add a Success Dialog */}
      <Transition appear show={showSuccessDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowSuccessDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-center align-middle shadow-xl transition-all">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                    Thank You!
                  </Dialog.Title>
                  <p className="text-body mb-6">
                    Your enrollment request has been received. An admissions counselor will contact you within 24 hours to complete your registration and discuss payment options.
                  </p>
                  <button
                    className="button-primary w-full"
                    onClick={() => setShowSuccessDialog(false)}
                  >
                    Close
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Courses Dialog */}
      <Transition appear show={showCoursesDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowCoursesDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowCoursesDialog(false)}
                      className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                      Available Course Dates
                    </Dialog.Title>
                    
                    <p className="text-body mb-6">
                      Select a course date that works best for you. Contact admissions for pricing information.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {courseOfferings.map((course, index) => (
                        <div 
                          key={index} 
                          className="card-base p-6 bg-gradient-to-br from-white to-purple-50/30 dark:from-dark-card dark:to-purple-900/10 border border-purple-100/50 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
                        >
                          {/* Program Title */}
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="heading-primary text-lg">
                              {course.program === 'microblading' ? 'Microblading' : 
                               course.program === 'microshading' ? 'Microshading' : 'Combo Course'}
                            </h4>
                            {course.isHybrid && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-300">
                                Hybrid
                              </span>
                            )}
                          </div>
                          
                          {/* Course Details */}
                          <div className="text-body space-y-3 mb-6">
                            {/* Location */}
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span>
                                {course.location === 'santa-ana' ? 'Santa Ana' : 'South Gate'}
                                {course.isHybrid && ' (Final Day On-Campus)'}
                              </span>
                            </div>

                            {/* Schedule */}
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{course.schedule}</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{course.timeSlot}</span>
                            </div>

                            {/* Duration Note */}
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm">
                                {course.program === 'combo' 
                                  ? '48 hours (6 days, 8 hours/day)' 
                                  : '24 hours (3 days, 8 hours/day)'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Enroll Button */}
                          <button 
                            onClick={() => {
                              setFormData({
                                ...formData,
                                campus: course.location,
                                program: course.program,
                                startDate: course.startDate,
                                schedule: course.schedule,
                                isHybrid: course.isHybrid
                              });
                              setShowCoursesDialog(false);
                              setShowEnrollDialog(true);
                            }}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            Enroll Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Enrollment Dialog */}
      <Transition appear show={showEnrollDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowEnrollDialog(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-dark-card p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowEnrollDialog(false)}
                      className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <Dialog.Title as="h3" className="heading-primary text-2xl mb-4">
                      Enroll in a Course
                    </Dialog.Title>

                    <p className="text-body mb-6">
                      Please fill out the form below to begin your enrollment process. Our admissions team will contact you to finalize your registration.
                    </p>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setShowEnrollDialog(false);
                        setShowSuccessDialog(true);
                      }}
                      className="space-y-6"
                    >
                      {/* Course Selection */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Program
                          </label>
                          <select
                            value={formData.program}
                            onChange={(e) => setFormData({
                              ...formData,
                              program: e.target.value as Program,
                              startDate: '', // Reset date when program changes
                              schedule: ''
                            })}
                            className="input-base"
                            required
                          >
                            <option value="microblading">Microblading</option>
                            <option value="microshading">Microshading</option>
                            <option value="combo">Combo Course</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Start Date
                          </label>
                          <select
                            value={formData.startDate}
                            onChange={(e) => {
                              const course = courseOfferings.find(c => c.startDate === e.target.value);
                              if (course) {
                                setFormData({
                                  ...formData,
                                  startDate: course.startDate,
                                  schedule: course.schedule,
                                  campus: course.location,
                                  isHybrid: course.isHybrid
                                });
                              }
                            }}
                            className="input-base"
                            required
                          >
                            <option value="">Select a date</option>
                            {courseOfferings
                              .filter(course => course.program === formData.program)
                              .map((course, index) => (
                                <option key={index} value={course.startDate}>
                                  {course.schedule} - {course.location === 'santa-ana' ? 'Santa Ana' : 'South Gate'}
                                  {course.isHybrid ? ' (Hybrid)' : ''}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="input-base"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="input-base"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-base"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                            className="input-base"
                            placeholder="123-456-7890"
                          />
                        </div>
                      </div>

                      {/* Payment Preference */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          Payment Preference
                        </label>
                        <select
                          value={formData.paymentPlan}
                          onChange={(e) => setFormData({ ...formData, paymentPlan: e.target.value as 'full' | 'installment' })}
                          className="input-base"
                          required
                        >
                          <option value="full">Full Payment</option>
                          <option value="installment">Installment Plan</option>
                        </select>
                      </div>

                      {/* Additional Information */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          How did you hear about us?
                        </label>
                        <select
                          value={formData.referralSource}
                          onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                          className="input-base"
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="google">Google Search</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="friend">Friend/Family Referral</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1">
                          What are your goals for this course?
                        </label>
                        <textarea
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          className="input-base"
                          rows={3}
                          placeholder="Tell us about your career goals and what you hope to achieve..."
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="button-primary w-full py-3"
                      >
                        Submit Enrollment Request
                      </button>

                      <p className="text-xs text-body text-center">
                        By submitting this form, you agree to be contacted by our admissions team regarding your enrollment.
                      </p>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </main>

      <ThemeToggle />
      <FloatingContactButton />
    </>
  )
}
