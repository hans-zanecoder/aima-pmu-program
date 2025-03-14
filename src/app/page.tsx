'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, Disclosure } from '@headlessui/react'
import { useTheme } from 'next-themes'
import Swiper from 'swiper';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add this import at the top with other imports
import { IncomeCalculator } from '@/components/IncomeCalculator';

// Types for translations
type Translation = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    enrollButton: string;
    tourButton: string;
    stats: {
      graduates: string;
      successRate: string;
      support: string;
    };
    ctaCard: {
      title: string;
      getStarted: string;
      phonePlaceholder: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      academy: {
        title: string;
        description: string;
      };
      instructors: {
        title: string;
        description: string;
      };
      training: {
        title: string;
        description: string;
      };
      business: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
        financial: {
          title: string;
          options: string[];
        };
        career: {
          title: string;
          options: string[];
        };
      };
      financing: {
        title: string;
        description: string;
      };
    };
    viewCoursesButton: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    studentWork: string;
    caption: string;
  };
  faq: {
    title: string;
    subtitle: string;
    contactButton: string;
    questions: any[]; // Add specific type if needed
  };
  reviews: {
    title: string;
    subtitle: string;
    viewAll: string;
    testimonials: Array<{
      name: string;
      date: string;
      text: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      submitButton: string;
    };
  };
  dialogs: {
    tour: {
      title: string;
      description: string;
      form: {
        campus: {
          label: string;
          options: {
            santaAna: string;
            southGate: string;
          };
        };
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        phonePlaceholder: string;
        date: string;
        time: string;
        timeOptions: {
          placeholder: string;
          morning: string;
          afternoon: string;
          evening: string;
        };
        goals: {
          label: string;
          placeholder: string;
        };
        submitButton: string;
        disclaimer: string;
      };
      success: {
        title: string;
        message: string;
        closeButton: string;
      };
    };
    courses: {
      title: string;
      courses: Array<{
        title: string;
        duration: string;
        price: string;
        features: string[];
      }>;
      enrollButton: string;
      closeButton: string;
    };
    enroll: {
      title: string;
      description: string;
      form: {
        program: {
          label: string;
          options: {
            microblading: string;
            microshading: string;
            combo: string;
          };
        };
        campus: {
          label: string;
          options: {
            santaAna: string;
            southGate: string;
          };
        };
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        phonePlaceholder: string;
        goals: {
          label: string;
          placeholder: string;
        };
        submitButton: string;
        disclaimer: string;
      };
      success: {
        title: string;
        message: string;
        closeButton: string;
      };
    };
  };
  programs: {
    title: string;
    subtitle: string;
    microblading: {
      title: string;
      duration: string;
      description: string;
      tag?: string;
      features: string[];
    };
    microshading: {
      title: string;
      duration: string;
      description: string;
      tag?: string;
      features: string[];
    };
    combo: {
      title: string;
      duration: string;
      description: string;
      tag?: string;
      features: string[];
    };
    viewDatesButton: string;
  };
};

type Translations = {
  en: Translation;
  es: Translation;
};

const translations: Translations = {
  en: {
    hero: {
      title: "Transform Your Career",
      subtitle: "in Permanent Makeup",
      description: "Join over 5,000 successful graduates who have transformed their careers through our industry-leading permanent makeup training programs.",
      enrollButton: "Enroll Now",
      tourButton: "Schedule Campus Tour",
      stats: {
        graduates: "Graduates",
        successRate: "Success Rate",
        support: "Lifetime Support"
      },
      ctaCard: {
        title: "Get Program Info & Pricing",
        getStarted: "Get Started",
        phonePlaceholder: "(123) 456-7890"
      }
    },
    features: {
      title: "Why Choose AIMA?",
      subtitle: "Industry-Leading Academy with a proven track record of over 3,000 successful graduates",
      items: {
        academy: {
          title: "Industry-Leading Academy",
          description: "California's most established and trusted permanent makeup training institution."
        },
        instructors: {
          title: "Expert Instructors",
          description: "Learn from industry veterans with decades of combined experience."
        },
        training: {
          title: "Hands-on Training",
          description: "Practice on live models with professional-grade equipment and materials."
        },
        business: {
          title: "Business Support",
          description: "Comprehensive guidance on starting and growing your PMU business."
        },
        support: {
          title: "Lifetime Support",
          description: "Access our exclusive app and ongoing mentorship for life - we're here to support your success at every stage.",
          financial: {
            title: "Financial Options",
            options: [
              "Flexible payment plans available",
              "0% interest financing options",
              "Special early enrollment discounts",
              "Scholarship opportunities for qualified candidates"
            ]
          },
          career: {
            title: "Career Support",
            options: [
              "Job placement assistance",
              "Business startup guidance",
              "Marketing strategy support",
              "Ongoing technical support"
            ]
          }
        },
        financing: {
          title: "Flexible Financing",
          description: "Multiple payment options and financing plans to fit your budget."
        }
      },
      viewCoursesButton: "View Available Courses"
    },
    gallery: {
      title: "Our Gallery",
      subtitle: "Explore our students' stunning work and success stories",
      studentWork: "Student Work #",
      caption: "Beautiful results by our talented students"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Still have questions? We're here to help!",
      contactButton: "Contact an Admissions Counselor",
      questions: [
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
          answer: "We provide comprehensive training in microblading, microshading, and combination techniques. Our certification is recognized industry-wide and includes both theoretical knowledge and extensive hands-on practice. All courses are taught by licensed professionals with years of experience.",
          icon: "🎓"
        },
        {
          question: "How long is the training program?",
          answer: "Our training programs vary in length depending on the course you choose. The Microblading Fundamentals course is 4 weeks, Advanced Shading Techniques is 2 weeks, and our Comprehensive Combo course is 6 weeks. All programs include both theory and practical training.",
          icon: "📅"
        },
        {
          question: "What makes AIMA different from other training academies?",
          answer: "AIMA stands out for our comprehensive curriculum, state-of-the-art facilities, and expert instructors. We offer lifetime support, business development guidance, and maintain small class sizes for personalized attention. Our 98% success rate and network of over 3,000 successful graduates speak to our program's effectiveness.",
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
          answer: "During the training program, you'll receive comprehensive theoretical education, hands-on practice with professional equipment, live model experience, and business development guidance. Our small class sizes ensure personalized attention, and you'll have access to all necessary materials and tools.",
          icon: "📚"
        }
      ]
    },
    contact: {
      title: "Contact Us",
      subtitle: "Ready to start your journey? Get in touch with us today.",
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        submitButton: "Send Message"
      }
    },
    dialogs: {
      tour: {
        title: "Schedule a Campus Tour",
        description: "Experience our state-of-the-art facilities and meet our expert instructors.",
        form: {
          campus: {
            label: "Preferred Campus",
            options: {
              santaAna: "Santa Ana (Main Campus)",
              southGate: "South Gate"
            }
          },
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          phone: "Phone",
          phonePlaceholder: "(123) 456-7890",
          date: "Preferred Date",
          time: "Preferred Time",
          timeOptions: {
            placeholder: "Select a time",
            morning: "Morning (9AM - 12PM)",
            afternoon: "Afternoon (1PM - 4PM)",
            evening: "Evening (5PM - 7PM)"
          },
          goals: {
            label: "Your Goals",
            placeholder: "Tell us about your professional goals..."
          },
          submitButton: "Schedule Tour",
          disclaimer: "By submitting this form, you'll be contacted by one of our admissions counselors."
        },
        success: {
          title: "Thank You!",
          message: "We've received your tour request. An admissions counselor will contact you within 24 hours to confirm your tour.",
          closeButton: "Close"
        }
      },
      courses: {
        title: "Available Courses",
        courses: [
          {
            title: "Microblading Fundamentals",
            duration: "4 weeks",
            price: "$3,999",
            features: [
              "Comprehensive theory and practice",
              "Hands-on training with models",
              "Professional kit included",
              "Business setup guidance"
            ]
          },
          {
            title: "Advanced Shading Techniques",
            duration: "2 weeks",
            price: "$2,499",
            features: [
              "Advanced powder brow techniques",
              "Color theory mastery",
              "Practice on diverse skin types",
              "Portfolio development"
            ]
          }
        ],
        enrollButton: "Enroll Now",
        closeButton: "Close"
      },
      enroll: {
        title: "Inscríbete Ahora",
        description: "Por favor, completa el formulario a continuación para comenzar tu proceso de inscripción. Nuestro equipo de admisiones te contactará para finalizar tu registro.",
        form: {
          program: {
            label: "Programa",
            options: {
              microblading: "Microblading",
              microshading: "Microshading",
              combo: "Curso Combo"
            }
          },
          campus: {
            label: "Campus",
            options: {
              santaAna: "Santa Ana (Campus Principal)",
              southGate: "South Gate"
            }
          },
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo Electrónico",
          phone: "Teléfono",
          phonePlaceholder: "123-456-7890",
          goals: {
            label: "¿Cuáles son tus objetivos para este curso?",
            placeholder: "Cuéntanos sobre tus objetivos profesionales y lo que esperas lograr..."
          },
          submitButton: "Enviar Solicitud de Inscripción",
          disclaimer: "Al enviar este formulario, aceptas ser contactado por nuestro equipo de admisiones con respecto a tu inscripción."
        },
        success: {
          title: "¡Gracias!",
          message: "Hemos recibido tu solicitud de inscripción. Un consejero de admisiones te contactará dentro de las próximas 24 horas para completar tu registro y discutir las opciones de pago.",
          closeButton: "Cerrar"
        }
      }
    },
    reviews: {
      title: "Student Reviews",
      subtitle: "Join over 3,000 successful graduates who have transformed their careers through our programs",
      viewAll: "View All Reviews on Google",
      testimonials: [
        {
          name: "Nathalie Islas",
          date: "10 months ago",
          text: "Wonderful school and the staff is very nice. Professor Alina is very professional and detailed she makes sure to explain the techniques thoroughly and as to w..."
        },
        {
          name: "Yvonne Quintana",
          date: "5 days ago",
          text: "The facility looked very clean and inviting. All employees were very helpful and nice. Definitely recommend"
        },
        {
          name: "Destiny Allen",
          date: "3 months ago",
          text: "Omgee Demi is The Best! From Day one of interests to First day of class.. she has been very helpful throughout the entire enrollment process. She made..."
        },
        {
          name: "Patricia Padilla",
          date: "2 months ago",
          text: "Allure is now in Santa Ana!!! It's a cosmetology school dedicated to her students. The CEO is involved in all of your experiences, making you feel the..."
        },
        {
          name: "Veronica Lievana",
          date: "a year ago",
          text: "Great teacher. She's bilingual, she can answer all your questions. Great environment, they have everything you need to start your business. The..."
        },
        {
          name: "Monica Luevano",
          date: "9 months ago",
          text: "I definitely recommend her 100 percent. The team of professionals are very friendly and attentive to your questions. Also a very good advantage is that the..."
        }
      ]
    },
    programs: {
      title: "Nuestros Programas",
      subtitle: "Transforma tu carrera con nuestros programas completos de entrenamiento en maquillaje permanente",
      microblading: {
        title: "Microblading",
        duration: "24 Horas (3 Días o 6 Medios Días)",
        description: "Domina el arte de crear cejas de aspecto natural a través de técnicas precisas de trazos de pelo. Perfecto para artistas que buscan especializarse en el servicio de maquillaje permanente más solicitado.",
        tag: "MÁS POPULAR",
        features: [
          "Entrenamiento práctico con modelos en vivo",
          "Kit profesional de microblading incluido",
          "12 meses de soporte empresarial"
        ]
      },
      microshading: {
        title: "Microshading",
        duration: "24 Horas (3 Días o 6 Medios Días)",
        description: "Aprende la técnica de efecto polvo que crea cejas suaves y rellenas. Perfecto para clientes con piel grasa y aquellos que prefieren una apariencia más definida, similar al maquillaje.",
        features: [
          "Técnicas expertas de sombreado",
          "Kit profesional incluido",
          "Mentoría continua"
        ]
      },
      combo: {
        title: "Curso Combo",
        duration: "48 Horas (6 Días o 12 Medios Días)",
        description: "Domina las técnicas de microblading y microshading en nuestro curso combo integral. Conviértete en un artista versátil capaz de personalizar tratamientos para cualquier cliente.",
        tag: "MEJOR VALOR",
        features: [
          "Dominio completo de PMU",
          "Kit profesional completo",
          "Soporte empresarial prioritario"
        ]
      },
      viewDatesButton: "Ver Fechas Disponibles"
    }
  },
  es: {
    hero: {
      title: "Transforma Tu Carrera",
      subtitle: "en Maquillaje Permanente",
      description: "Únete a más de 3,000 graduados exitosos que han transformado sus carreras a través de nuestros programas líderes en la industria del maquillaje permanente.",
      enrollButton: "Inscríbete Ahora",
      tourButton: "Programa una Visita",
      stats: {
        graduates: "Graduados",
        successRate: "Tasa de Éxito",
        support: "Soporte de por Vida"
      },
      ctaCard: {
        title: "Obtén Información y Precios",
        getStarted: "Comenzar",
        phonePlaceholder: "(123) 456-7890"
      }
    },
    features: {
      title: "¿Por Qué Elegir AIMA?",
      subtitle: "Academia Líder en la Industria con un historial probado de más de 3,000 graduados exitosos",
      items: {
        academy: {
          title: "Academia Líder en la Industria",
          description: "La institución de formación en maquillaje permanente más establecida y confiable de California."
        },
        instructors: {
          title: "Instructores Expertos",
          description: "Aprende de veteranos de la industria con décadas de experiencia combinada."
        },
        training: {
          title: "Entrenamiento Práctico",
          description: "Practica con modelos reales usando equipos y materiales profesionales."
        },
        business: {
          title: "Apoyo Empresarial",
          description: "Guía completa para iniciar y hacer crecer tu negocio de PMU."
        },
        support: {
          title: "Soporte de por Vida",
          description: "Accede a nuestra app exclusiva y mentoría continua de por vida - estamos aquí para apoyar tu éxito en cada etapa.",
          financial: {
            title: "Opciones Financieras",
            options: [
              "Planes de pago flexibles disponibles",
              "Opciones de financiamiento sin intereses",
              "Descuentos especiales por inscripción temprana",
              "Oportunidades de becas para candidatos calificados"
            ]
          },
          career: {
            title: "Apoyo Profesional",
            options: [
              "Asistencia en colocación laboral",
              "Guía para iniciar tu negocio",
              "Apoyo en estrategias de marketing",
              "Soporte técnico continuo"
            ]
          }
        },
        financing: {
          title: "Financiamiento Flexible",
          description: "Múltiples opciones de pago y planes de financiamiento que se ajustan a tu presupuesto."
        }
      },
      viewCoursesButton: "Ver Cursos Disponibles"
    },
    gallery: {
      title: "Nuestra Galería",
      subtitle: "Explora el impresionante trabajo y las historias de éxito de nuestros estudiantes",
      studentWork: "Trabajo de Estudiante #",
      caption: "Hermosos resultados de nuestros talentosos estudiantes"
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "¿Todavía tienes preguntas? ¡Estamos aquí para ayudarte!",
      contactButton: "Contacta a un Consejero de Admisiones",
      questions: [
        {
          question: "¿Qué es exactamente el maquillaje permanente?",
          answer: "El maquillaje permanente es una técnica cosmética que implanta pigmento en la capa de la dermis de tu piel para realzar características como cejas, delineador de ojos y labios. En AIMA, nos especializamos en microblading y microshading - técnicas avanzadas que crean cejas de aspecto natural mediante la implantación de pigmentos que simulan trazos individuales de pelo.",
          icon: "💄"
        },
        {
          question: "¿Cuánto dura un procedimiento de maquillaje permanente?",
          answer: "Los resultados típicamente duran de 1 a 2 años, dependiendo de tu tipo de piel, estilo de vida y rutina de cuidados posteriores. Factores como la exposición al sol, productos para el cuidado de la piel y tu tasa natural de renovación celular pueden afectar la longevidad. Recomendamos una cita de retoque cada 12-18 meses para mantener resultados óptimos.",
          icon: "⏱️"
        },
        {
          question: "¿Qué entrenamiento y certificación proporcionan?",
          answer: "Proporcionamos entrenamiento integral en microblading, microshading y técnicas combinadas. Nuestra certificación es reconocida en toda la industria e incluye tanto conocimiento teórico como práctica extensiva. Todos los cursos son impartidos por profesionales licenciados con años de experiencia.",
          icon: "🎓"
        },
        {
          question: "¿Cuánto dura el programa de entrenamiento?",
          answer: "Nuestros programas de entrenamiento varían en duración según el curso que elijas. El curso de Fundamentos de Microblading es de 4 semanas, Técnicas Avanzadas de Sombreado es de 2 semanas, y nuestro curso Combo Integral es de 6 semanas. Todos los programas incluyen entrenamiento teórico y práctico.",
          icon: "📅"
        },
        {
          question: "¿Qué hace a AIMA diferente de otras academias de entrenamiento?",
          answer: "AIMA se destaca por nuestro plan de estudios integral, instalaciones de última generación e instructores expertos. Ofrecemos apoyo de por vida, orientación en desarrollo de negocios y mantenemos clases pequeñas para atención personalizada. Nuestra tasa de éxito del 98% y red de más de 3,000 graduados exitosos demuestran la efectividad de nuestro programa.",
          icon: "⭐"
        },
        {
          question: "¿Ofrecen asistencia financiera?",
          answer: "Sí, proporcionamos planes de pago flexibles y opciones de financiamiento para hacer tu educación accesible. Ofrecemos planes de pago con 0% de interés, descuentos por inscripción temprana y podemos trabajar contigo para crear un programa de pagos personalizado. Contacta a nuestro equipo de admisiones para discutir las opciones disponibles.",
          icon: "💰"
        },
        {
          question: "¿Qué apoyo profesional brindan después de la graduación?",
          answer: "Nuestro apoyo profesional incluye acceso de por vida a nuestra app exclusiva, guía para iniciar tu negocio, desarrollo de estrategias de marketing, técnicas de adquisición de clientes y soporte técnico continuo. Te ayudamos a establecer tu práctica, construir tu portafolio y conectarte con oportunidades en la industria. Nuestra red de ex alumnos proporciona valiosos recursos de networking y educación continua.",
          icon: "🚀"
        },
        {
          question: "¿Qué debo esperar durante el programa de entrenamiento?",
          answer: "Durante el programa de entrenamiento, recibirás educación teórica integral, práctica práctica con equipo profesional, experiencia con modelos en vivo y orientación para el desarrollo de negocios. Nuestras clases pequeñas aseguran atención personalizada, y tendrás acceso a todos los materiales y herramientas necesarios.",
          icon: "📚"
        }
      ]
    },
    contact: {
      title: "Contáctanos",
      subtitle: "¿Listo para comenzar tu viaje? Ponte en contacto con nosotros hoy.",
      form: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        phone: "Teléfono",
        message: "Mensaje",
        submitButton: "Enviar Mensaje"
      }
    },
    dialogs: {
      tour: {
        title: "Programa una Visita al Campus",
        description: "Conoce nuestras instalaciones y a nuestros instructores expertos.",
        form: {
          campus: {
            label: "Campus Preferido",
            options: {
              santaAna: "Santa Ana (Campus Principal)",
              southGate: "South Gate"
            }
          },
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo Electrónico",
          phone: "Teléfono",
          phonePlaceholder: "(123) 456-7890",
          date: "Fecha Preferida",
          time: "Hora Preferida",
          timeOptions: {
            placeholder: "Selecciona una hora",
            morning: "Mañana (9AM - 12PM)",
            afternoon: "Tarde (1PM - 4PM)",
            evening: "Noche (5PM - 7PM)"
          },
          goals: {
            label: "Tus Objetivos",
            placeholder: "Cuéntanos sobre tus objetivos profesionales..."
          },
          submitButton: "Programar Visita",
          disclaimer: "Al enviar este formulario, serás contactado por uno de nuestros consejeros."
        },
        success: {
          title: "¡Gracias!",
          message: "Hemos recibido tu solicitud de visita. Un consejero te contactará dentro de 24 horas para confirmar tu visita.",
          closeButton: "Cerrar"
        }
      },
      courses: {
        title: "Cursos Disponibles",
        courses: [
          {
            title: "Fundamentos de Microblading",
            duration: "4 semanas",
            price: "$3,999",
            features: [
              "Teoría y práctica integral",
              "Entrenamiento práctico con modelos",
              "Kit profesional incluido",
              "Guía para establecer tu negocio"
            ]
          },
          {
            title: "Técnicas Avanzadas de Sombreado",
            duration: "2 semanas",
            price: "$2,499",
            features: [
              "Técnicas avanzadas de cejas en polvo",
              "Dominio de la teoría del color",
              "Práctica en diversos tipos de piel",
              "Desarrollo de portafolio"
            ]
          }
        ],
        enrollButton: "Inscribirse Ahora",
        closeButton: "Cerrar"
      },
      enroll: {
        title: "Inscríbete Ahora",
        description: "Por favor, completa el formulario a continuación para comenzar tu proceso de inscripción. Nuestro equipo de admisiones te contactará para finalizar tu registro.",
        form: {
          program: {
            label: "Programa",
            options: {
              microblading: "Microblading",
              microshading: "Microshading",
              combo: "Curso Combo"
            }
          },
          campus: {
            label: "Campus",
            options: {
              santaAna: "Santa Ana (Campus Principal)",
              southGate: "South Gate"
            }
          },
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Correo Electrónico",
          phone: "Teléfono",
          phonePlaceholder: "123-456-7890",
          goals: {
            label: "¿Cuáles son tus objetivos para este curso?",
            placeholder: "Cuéntanos sobre tus objetivos profesionales y lo que esperas lograr..."
          },
          submitButton: "Enviar Solicitud de Inscripción",
          disclaimer: "Al enviar este formulario, aceptas ser contactado por nuestro equipo de admisiones con respecto a tu inscripción."
        },
        success: {
          title: "¡Gracias!",
          message: "Hemos recibido tu solicitud de inscripción. Un consejero de admisiones te contactará dentro de las próximas 24 horas para completar tu registro y discutir las opciones de pago.",
          closeButton: "Cerrar"
        }
      }
    },
    reviews: {
      title: "Reseñas de Estudiantes",
      subtitle: "Únete a más de 3,000 graduados exitosos que han transformado sus carreras a través de nuestros programas",
      viewAll: "Ver Todas las Reseñas en Google",
      testimonials: [
        {
          name: "Nathalie Islas",
          date: "hace 10 meses",
          text: "Excelente escuela y el personal es muy amable. La profesora Alina es muy profesional y detallista, se asegura de explicar las técnicas a fondo y en cuanto a..."
        },
        {
          name: "Yvonne Quintana",
          date: "hace 5 días",
          text: "Las instalaciones se veían muy limpias y acogedoras. Todos los empleados fueron muy serviciales y amables. Definitivamente recomiendo"
        },
        {
          name: "Destiny Allen",
          date: "hace 3 meses",
          text: "¡Demi es la mejor! Desde el primer día de interés hasta el primer día de clase... ha sido muy útil durante todo el proceso de inscripción. Ella hizo..."
        },
        {
          name: "Patricia Padilla",
          date: "hace 2 meses",
          text: "¡Allure ahora está en Santa Ana! Es una escuela de cosmetología dedicada a sus estudiantes. La CEO está involucrada en todas tus experiencias, haciéndote sentir..."
        },
        {
          name: "Veronica Lievana",
          date: "hace un año",
          text: "Gran maestra. Es bilingüe, puede responder todas tus preguntas. Gran ambiente, tienen todo lo que necesitas para comenzar tu negocio. El..."
        },
        {
          name: "Monica Luevano",
          date: "hace 9 meses",
          text: "La recomiendo 100 por ciento. El equipo de profesionales es muy amable y atento a tus preguntas. También es una muy buena ventaja que el..."
        }
      ]
    },
    programs: {
      title: "Nuestros Programas",
      subtitle: "Transforma tu carrera con nuestros programas completos de entrenamiento en maquillaje permanente",
      microblading: {
        title: "Microblading",
        duration: "24 Horas (3 Días o 6 Medios Días)",
        description: "Domina el arte de crear cejas de aspecto natural a través de técnicas precisas de trazos de pelo. Perfecto para artistas que buscan especializarse en el servicio de maquillaje permanente más solicitado.",
        tag: "MÁS POPULAR",
        features: [
          "Entrenamiento práctico con modelos en vivo",
          "Kit profesional de microblading incluido",
          "12 meses de soporte empresarial"
        ]
      },
      microshading: {
        title: "Microshading",
        duration: "24 Horas (3 Días o 6 Medios Días)",
        description: "Aprende la técnica de efecto polvo que crea cejas suaves y rellenas. Perfecto para clientes con piel grasa y aquellos que prefieren una apariencia más definida, similar al maquillaje.",
        features: [
          "Técnicas expertas de sombreado",
          "Kit profesional incluido",
          "Mentoría continua"
        ]
      },
      combo: {
        title: "Curso Combo",
        duration: "48 Horas (6 Días o 12 Medios Días)",
        description: "Domina las técnicas de microblading y microshading en nuestro curso combo integral. Conviértete en un artista versátil capaz de personalizar tratamientos para cualquier cliente.",
        tag: "MEJOR VALOR",
        features: [
          "Dominio completo de PMU",
          "Kit profesional completo",
          "Soporte empresarial prioritario"
        ]
      },
      viewDatesButton: "Ver Fechas Disponibles"
    }
  }
};

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  location: string;
  date: string;
  time: string;
  program: string;
  course: string;
  startDate: string;
  campus?: string;
  goals?: string;
}

const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return '';
  const [, first, second, third] = match;
  if (!second) return first;
  if (!third) return `(${first}) ${second}`;
  return `(${first}) ${second}-${third}`;
};

const isValidPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

const COURSES = [
  {
    course: "Microshading",
    location: "South Gate",
    date: "Feb 21-23, 2025",
    time: "10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM",
    duration: "3 Days",
    tag: "MOST POPULAR",
    status: "available",
    slotsLeft: 2
  },
  {
    course: "Microshading",
    location: "Santa Ana",
    date: "Mar 7-9, 2025",
    time: "10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM",
    duration: "3 Days",
    tag: "MOST POPULAR",
    status: "available",
    slotsLeft: 1
  },
  {
    course: "Microblading",
    location: "South Gate",
    date: "Apr 25-27, 2025",
    time: "10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM",
    duration: "3 Days",
    status: "available",
    slotsLeft: 3
  },
  {
    course: "Combo Course",
    location: "Santa Ana",
    date: "Jan 25-27, 2025",
    time: "10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM",
    duration: "3 Days",
    tag: "BEST VALUE",
    status: "full"
  },
  {
    course: "Microblading",
    location: "Santa Ana",
    date: "Feb 1-3, 2025",
    time: "10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM",
    duration: "3 Days",
    status: "full"
  }
];

// Placeholder image URLs (using placehold.co for Next.js compatibility)
const PLACEHOLDER_IMAGES = {
  about: 'https://placehold.co/800x600/f3f4f6/666666/png?text=About+AIMA',
  gallery: Array(8).fill('').map((_, i) => `https://placehold.co/600x800/f3f4f6/666666/png?text=Student+Work+${i + 1}`),
  testimonials: Array(3).fill('').map((_, i) => `https://placehold.co/400x400/f3f4f6/666666/png?text=Testimonial+${i + 1}`)
};

// Update the image paths to match homepage
const GALLERY_IMAGES = [
  '/zC_placeholder_aimaPMU1.webp',
  '/zC_placeholder_aimaPMU2.png',
  '/zC_placeholder_aimaPMU3.png',
  '/zC_placeholder_aimaPMU4.png',
  '/zC_placeholder_aimaPMU5.png',
  '/zC_placeholder_aimaPMU6.png',
  '/zC_placeholder_aimaPMU7.png',
  '/zC_placeholder_aimaPMU8.png',
  '/zC_placeholder_aimaPMU9.png'
];

// Add these types for the quiz
type QuizQuestion = {
  question: {
    en: string;
    es: string;
  };
  options: {
    en: string;
    es: string;
    scores: {
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

// Quiz Questions Data
const quizQuestions: QuizQuestion[] = [
  {
    question: {
      en: "What do your clients typically request?",
      es: "¿Qué suelen solicitar tus clientes?"
    },
    options: [
      {
        en: "Natural, hair-like strokes",
        es: "Trazos naturales similares al pelo",
        scores: { microblading: 5, microshading: 1, combo: 3 }
      },
      {
        en: "Soft, powdered look",
        es: "Aspecto suave y difuminado",
        scores: { microblading: 1, microshading: 5, combo: 3 }
      },
      {
        en: "Bold, defined brows",
        es: "Cejas definidas y marcadas",
        scores: { microblading: 2, microshading: 4, combo: 5 }
      },
      {
        en: "Not sure yet",
        es: "Aún no estoy seguro/a",
        scores: { microblading: 3, microshading: 3, combo: 4 }
      }
    ]
  },
  {
    question: {
      en: "What's your artistic background?",
      es: "¿Cuál es tu experiencia artística?"
    },
    options: [
      {
        en: "Strong drawing/sketching skills",
        es: "Buenas habilidades de dibujo/boceto",
        scores: { microblading: 5, microshading: 3, combo: 4 }
      },
      {
        en: "Experience with shading/gradients",
        es: "Experiencia con sombreado/degradados",
        scores: { microblading: 2, microshading: 5, combo: 4 }
      },
      {
        en: "Makeup artistry background",
        es: "Experiencia en maquillaje",
        scores: { microblading: 3, microshading: 4, combo: 5 }
      },
      {
        en: "Limited artistic experience",
        es: "Experiencia artística limitada",
        scores: { microblading: 3, microshading: 4, combo: 3 }
      }
    ]
  },
  {
    question: {
      en: "What type of clients do you plan to work with?",
      es: "¿Con qué tipo de clientes planeas trabajar?"
    },
    options: [
      {
        en: "Those wanting subtle enhancements",
        es: "Los que buscan mejoras sutiles",
        scores: { microblading: 5, microshading: 2, combo: 3 }
      },
      {
        en: "Clients needing coverage for sparse brows",
        es: "Clientes que necesitan cobertura para cejas escasas",
        scores: { microblading: 2, microshading: 5, combo: 4 }
      },
      {
        en: "Mix of different client needs",
        es: "Mezcla de diferentes necesidades de clientes",
        scores: { microblading: 3, microshading: 3, combo: 5 }
      },
      {
        en: "Still exploring options",
        es: "Aún explorando opciones",
        scores: { microblading: 3, microshading: 3, combo: 4 }
      }
    ]
  },
  {
    question: {
      en: "How do you prefer to learn new techniques?",
      es: "¿Cómo prefieres aprender nuevas técnicas?"
    },
    options: [
      {
        en: "Focus on one technique at a time",
        es: "Concentrarse en una técnica a la vez",
        scores: { microblading: 4, microshading: 4, combo: 2 }
      },
      {
        en: "Learn multiple approaches simultaneously",
        es: "Aprender múltiples enfoques simultáneamente",
        scores: { microblading: 3, microshading: 3, combo: 5 }
      },
      {
        en: "Start simple and gradually advance",
        es: "Comenzar simple y avanzar gradualmente",
        scores: { microblading: 5, microshading: 3, combo: 3 }
      },
      {
        en: "Dive into complex techniques",
        es: "Sumergirse en técnicas complejas",
        scores: { microblading: 2, microshading: 4, combo: 5 }
      }
    ]
  },
  {
    question: {
      en: "What are your business goals?",
      es: "¿Cuáles son tus objetivos comerciales?"
    },
    options: [
      {
        en: "Specialize in one technique",
        es: "Especializarse en una técnica",
        scores: { microblading: 5, microshading: 5, combo: 1 }
      },
      {
        en: "Offer comprehensive brow services",
        es: "Ofrecer servicios completos de cejas",
        scores: { microblading: 2, microshading: 2, combo: 5 }
      },
      {
        en: "Start small and expand services",
        es: "Comenzar pequeño y expandir servicios",
        scores: { microblading: 4, microshading: 3, combo: 4 }
      },
      {
        en: "Become a full-service PMU artist",
        es: "Convertirse en un artista PMU de servicio completo",
        scores: { microblading: 3, microshading: 3, combo: 5 }
      }
    ]
  }
];

export default function V2Page() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showCoursesDialog, setShowCoursesDialog] = useState(false);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showTourDialog, setShowTourDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    location: 'santa-ana',
    date: '',
    time: '',
    program: 'microblading',
    course: '',
    startDate: '',
    campus: 'santa-ana',
    goals: ''
  });
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore>({
    microblading: 0,
    microshading: 0,
    combo: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Theme hook
  const { theme, setTheme } = useTheme();

  // Mount effect for client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Swiper initialization effect
  useEffect(() => {
    if (!mounted) return;

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
      });
    }, 100);

      return () => {
        if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
      clearTimeout(timer);
    };
  }, [mounted]); // Add mounted to dependency array

  // Event handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
      setIsValidPhone(cleaned.length === 10);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPhone) {
      setFormData(prev => ({
        ...prev,
        phone: phoneNumber
      }));
      setShowPhoneInput(false);
      setPhoneNumber('');
      setIsValidPhone(false);
      setTimeout(() => {
        setShowEnrollDialog(true);
      }, 0);
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ['info@allureima.com', 'harry@allureima.com'],
          subject: 'New Enrollment Request',
          formType: 'enrollment',
          formData
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      setShowSuccessDialog(true);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Get translations after mounted check
  const t = translations[language as keyof typeof translations];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ['info@allureima.com', 'harry@allureima.com'],
          subject: 'New Contact Form Submission',
          formType: 'contact',
          formData
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      setShowSuccessDialog(true);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ['info@allureima.com', 'harry@allureima.com'],
          subject: 'New Campus Tour Request',
          formType: 'tour',
          formData
        })
      });

      if (!response.ok) throw new Error('Failed to send email');

      setShowSuccessDialog(true);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
      location: 'santa-ana',
      date: '',
      time: '',
      program: 'microblading',
      course: '',
      startDate: '',
      campus: 'santa-ana',
      goals: ''
    });
    setShowTourDialog(false);
    setShowEnrollDialog(false);
  };

  // Quiz Handlers
  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
    
    // Add a small delay before moving to next question for better UX
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults();
      }
    }, 300);
  };

  const calculateResults = () => {
    const finalScores = selectedAnswers.reduce(
      (scores, answerIndex, questionIndex) => {
        const questionScores = quizQuestions[questionIndex].options[answerIndex].scores;
        return {
          microblading: scores.microblading + questionScores.microblading,
          microshading: scores.microshading + questionScores.microshading,
          combo: scores.combo + questionScores.combo
        };
      },
      { microblading: 0, microshading: 0, combo: 0 }
    );
    setQuizScores(finalScores);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setShowQuizDialog(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizScores({ microblading: 0, microshading: 0, combo: 0 });
    setShowResults(false);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-gradient">
              AIMA
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {[
                { href: '#about', label: language === 'es' ? 'Acerca' : 'About' },
                { href: '#programs', label: language === 'es' ? 'Programas' : 'Programs' },
                { href: '#gallery', label: language === 'es' ? 'Galería' : 'Gallery' },
                { href: '#reviews', label: language === 'es' ? 'Testimonios' : 'Testimonials' },
                { href: '#faq', label: 'FAQ' },
                { href: '#contact', label: language === 'es' ? 'Contacto' : 'Contact' }
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'es'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ES
              </button>
            </div>
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => setShowEnrollDialog(true)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              {t.hero.enrollButton}
            </button>
          </div>
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
                  {t.hero.title}{' '}
                  <span className="text-gradient block mt-1 md:mt-2">
                    {t.hero.subtitle}
                </span>
              </h1>

                {/* Subheadline */}
                <p className="text-body text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                  {t.hero.description}
              </p>
              
              {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-8 md:mb-12">
                <button
                    onClick={() => setShowTourDialog(true)}
                    className="button-primary w-full sm:w-auto px-6 py-3 text-base"
                >
                    {t.hero.tourButton}
                </button>
                <button
                    onClick={() => setShowCoursesDialog(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-purple-200 dark:border-dark-border text-gray-700 dark:text-dark-text hover:border-purple-300 dark:hover:border-purple-500/30 transition-all duration-300 text-base"
                >
                    {t.features.viewCoursesButton}
                </button>
              </div>

              {/* Key Stats */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0">
                  <div className="text-center p-3 md:p-4 card-base">
                    <div className="text-xl md:text-2xl font-bold text-gradient">3,000+</div>
                    <div className="text-xs md:text-sm text-body">{t.hero.stats.graduates}</div>
                    </div>
                  <div className="text-center p-3 md:p-4 card-base">
                    <div className="text-xl md:text-2xl font-bold text-gradient">98%</div>
                    <div className="text-xs md:text-sm text-body">{t.hero.stats.successRate}</div>
                    </div>
                  <div className="text-center p-3 md:p-4 card-base">
                    <div className="text-xl md:text-2xl font-bold text-gradient">∞</div>
                    <div className="text-xs md:text-sm text-body">{t.hero.stats.support}</div>
                  </div>
              </div>
            </div>

              {/* Right Column - Visual */}
              <div className="relative mt-8 lg:mt-0 space-y-6">
                {/* Promo Banner */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
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

                {/* CTA Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                  <div className="p-6">
                    <h3 className="text-lg text-gray-900 dark:text-white font-medium mb-4">
                      {t.hero.ctaCard.title}
                    </h3>
                    {showPhoneInput ? (
                      <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                        <input
                          type="tel"
                          value={formatPhoneNumber(phoneNumber)}
                          onChange={handlePhoneChange}
                          placeholder={t.hero.ctaCard.phonePlaceholder}
                          maxLength={14}
                          className="flex-1 px-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button
                          type="submit"
                          disabled={!isValidPhone}
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowPhoneInput(true)}
                        className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                        {t.hero.ctaCard.getStarted}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                  {language === 'es' ? 'Acerca de AIMA' : 'About AIMA'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {language === 'es' 
                    ? 'Empoderando a profesionales de la belleza a través de la excelencia en educación de maquillaje permanente'
                    : 'Empowering beauty professionals through excellence in permanent makeup education'
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {language === 'es' 
                            ? 'Institución Premier de California'
                            : 'California\'s Premier Institution'
                          }
                        </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                          {language === 'es'
                            ? 'Institución líder en capacitación de maquillaje permanente, especializada en microblading, microshading y técnicas avanzadas de PMU.'
                            : 'Leading permanent makeup training institution, specializing in microblading, microshading, and advanced PMU techniques.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {language === 'es'
                            ? 'Entrenamiento de Última Generación'
                            : 'State-of-the-Art Training'
                          }
                        </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                          {language === 'es'
                            ? 'Instalaciones modernas equipadas con equipo profesional e instructores expertos que garantizan la educación de la más alta calidad.'
                            : 'Modern facilities equipped with professional-grade equipment and expert instructors ensuring highest quality education.'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="text-2xl">📈</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {language === 'es'
                            ? 'Tasa de Éxito Comprobada'
                            : 'Proven Success Rate'
                          }
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {language === 'es'
                            ? 'Más de 3,000 graduados exitosos con una tasa de éxito del 98%, respaldados por apoyo de por vida y mentoría continua.'
                            : 'Over 3,000 successful graduates with a 98% success rate, backed by lifetime support and ongoing mentorship.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                    <button
                      onClick={() => setShowTourDialog(true)}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                    {language === 'es' ? 'Programa una Visita al Campus' : 'Schedule a Campus Tour'}
                    </button>
                  </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/about-aima.jpg"
                    alt={language === 'es' ? 'Instalaciones de Entrenamiento AIMA' : 'AIMA Training Facility'}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section id="programs" className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                {language === 'es' ? 'Nuestros Programas' : 'Our Programs'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                {language === 'es' 
                  ? 'Transforma tu carrera con nuestros programas completos de entrenamiento en maquillaje permanente'
                  : 'Transform your career with our comprehensive permanent makeup training programs'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Microblading Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Microblading
                  </h3>
                </div>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                  {language === 'es' 
                    ? '24 Horas (3 Días)'
                    : '24 Hours (3 Days)'
                  }
                </p>
                <div className="flex justify-center mb-6">
                  <span className="text-4xl">✍️</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'es'
                    ? 'Domina el arte de crear cejas de aspecto natural a través de técnicas precisas de trazos de pelo. Perfecto para artistas que buscan especializarse en el servicio de maquillaje permanente más solicitado.'
                    : 'Master the art of creating natural-looking eyebrows through precise hair-stroke techniques. Perfect for artists seeking to specialize in the most in-demand permanent makeup service.'
                  }
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    language === 'es' 
                      ? 'Entrenamiento práctico con modelos en vivo'
                      : 'Hands-on training with live models',
                    language === 'es'
                      ? 'Kit profesional de microblading incluido'
                      : 'Professional microblading kit included',
                    language === 'es'
                      ? '12 meses de soporte empresarial'
                      : '12 months of business support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowCoursesDialog(true)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  {language === 'es' ? 'Ver Fechas Disponibles' : 'View Available Dates'}
                </button>
              </div>

              {/* Microshading Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Microshading
                  </h3>
                  <span className="px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full">
                    {language === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}
                    </span>
                  </div>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                  {language === 'es'
                    ? '24 Horas (3 Días)'
                    : '24 Hours (3 Days)'
                  }
                </p>
                <div className="flex justify-center mb-6">
                  <span className="text-4xl">🎨</span>
                </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'es'
                    ? 'Aprende la técnica de efecto polvo que crea cejas suaves y rellenas. Perfecto para clientes con piel grasa y aquellos que prefieren una apariencia más definida, similar al maquillaje.'
                    : 'Learn the powder-effect technique that creates soft, filled brows. Perfect for clients with oily skin and those preferring a more defined, makeup-like appearance.'
                  }
                  </p>
                  <ul className="space-y-3 mb-8">
                  {[
                    language === 'es'
                      ? 'Técnicas expertas de sombreado'
                      : 'Expert shading techniques',
                    language === 'es'
                      ? 'Kit profesional incluido'
                      : 'Professional kit included',
                    language === 'es'
                      ? 'Mentoría continua'
                      : 'Ongoing mentorship'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                  onClick={() => setShowCoursesDialog(true)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                  {language === 'es' ? 'Ver Fechas Disponibles' : 'View Available Dates'}
                  </button>
                </div>

              {/* Combo Course Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'es' ? 'Curso Combo' : 'Combo Course'}
                  </h3>
                  <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                    {language === 'es' ? 'MEJOR VALOR' : 'BEST VALUE'}
                  </span>
                </div>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-4">
                  {language === 'es'
                    ? '48 Horas (6 Días)'
                    : '48 Hours (6 Days)'
                  }
                </p>
                <div className="flex justify-center mb-6">
                  <span className="text-4xl">✨🎨</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'es'
                    ? 'Domina las técnicas de microblading y microshading en nuestro curso combo integral. Conviértete en un artista versátil capaz de personalizar tratamientos para cualquier cliente.'
                    : 'Master both microblading and microshading techniques in our comprehensive combo course. Become a versatile artist capable of customizing treatments for any client.'
                  }
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    language === 'es'
                      ? 'Dominio completo de PMU'
                      : 'Complete PMU mastery',
                    language === 'es'
                      ? 'Kit profesional completo'
                      : 'Full professional kit',
                    language === 'es'
                      ? 'Soporte empresarial prioritario'
                      : 'Priority business support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                  onClick={() => setShowCoursesDialog(true)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                  {language === 'es' ? 'Ver Fechas Disponibles' : 'View Available Dates'}
                  </button>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                {t.features.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                {language === 'es' 
                  ? "Únete a la academia premier de maquillaje permanente de California con un historial comprobado de más de 3,000 graduados exitosos"
                  : "Join California's premier permanent makeup academy with a proven track record of over 3,000 successful graduates"
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Industry-Leading Academy */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.features.items.academy.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Con más de 3,000 graduados exitosos, AIMA se destaca como la institución de formación en maquillaje permanente más establecida y confiable de California."
                    : "With over 3,000 successful graduates, AIMA stands as the most established and trusted permanent makeup training institution in California."
                  }
                </p>
              </div>

              {/* Expert Instructors */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">👩‍🏫</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.features.items.instructors.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Aprende de profesionales de la industria con años de experiencia en el arte del maquillaje permanente y educación."
                    : "Learn from industry professionals with years of experience in permanent makeup artistry and education."
                  }
                </p>
              </div>

              {/* Hands-On Training */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.features.items.training.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Obtén experiencia práctica extensiva con técnicas del mundo real y equipamiento de grado profesional."
                    : "Get extensive practical experience with real-world techniques and professional-grade equipment."
                  }
                </p>
              </div>

              {/* Comprehensive Curriculum */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {language === 'es' ? "Currículo Integral" : "Comprehensive Curriculum"}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Domina las técnicas fundamentales y avanzadas a través de nuestro programa de entrenamiento estructurado y completo."
                    : "Master both fundamental and advanced techniques through our structured, thorough training program."
                  }
                </p>
              </div>

              {/* Business Support */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.features.items.business.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Recibe orientación sobre configuración de negocio, marketing y adquisición de clientes para impulsar tu carrera."
                    : "Receive guidance on business setup, marketing, and client acquisition to jumpstart your career."
                  }
                </p>
              </div>

              {/* Lifetime Support */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.features.items.support.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  {language === 'es'
                    ? "Accede a nuestra app exclusiva y mentoría continua de por vida - estamos aquí para apoyar tu éxito en cada etapa."
                    : "Access our exclusive app and ongoing mentorship for life - we're here to support your success at every stage."
                  }
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowCoursesDialog(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t.features.viewCoursesButton}
              </button>
            </div>
          </div>
        </section>

        {/* Support Options Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Financial Options Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'es' ? 'Opciones Financieras' : 'Financial Options'}
              </h3>
              <ul className="space-y-4">
                {[
                  language === 'es' ? 'Planes de pago flexibles disponibles' : 'Flexible payment plans available',
                  language === 'es' ? 'Opciones de financiamiento sin intereses' : '0% interest financing options',
                  language === 'es' ? 'Descuentos especiales por inscripción temprana' : 'Special early enrollment discounts',
                  language === 'es' ? 'Oportunidades de becas para candidatos calificados' : 'Scholarship opportunities for qualified candidates'
                ].map((option: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{option}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Support Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'es' ? 'Apoyo Profesional' : 'Career Support'}
              </h3>
              <ul className="space-y-4">
                {[
                  language === 'es' ? 'Asistencia en colocación laboral' : 'Job placement assistance',
                  language === 'es' ? 'Guía para iniciar tu negocio' : 'Business startup guidance',
                  language === 'es' ? 'Apoyo en estrategias de marketing' : 'Marketing strategy support',
                  language === 'es' ? 'Soporte técnico continuo' : 'Ongoing technical support'
                ].map((option: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Student Reviews Section */}
        <section id="reviews" className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                {language === 'es' ? 'Reseñas de Estudiantes' : 'Student Reviews'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                {language === 'es'
                  ? 'Únete a más de 3,000 graduados exitosos que han transformado sus carreras a través de nuestros programas'
                  : 'Join over 3,000 successful graduates who have transformed their careers through our programs'
                }
              </p>
                  </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {(language === 'es' ? translations.es : translations.en).reviews.testimonials.map((review, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                  </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/Allure+Institute+of+Makeup+Artistry/@33.7744373,-117.8841993,17z/data=!3m1!4b1!4m6!3m5!1s0x80dce96da7a6d6d5:0xa33171aaa154b018!8m2!3d33.7744373!4d-117.8841993!16s%2Fg%2F11ghpmqwlg?hl=en-US&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"/>
                  <path fill="#fff" d="M12 4.872c-3.939 0-7.128 3.189-7.128 7.128 0 3.939 3.189 7.128 7.128 7.128 3.939 0 7.128-3.189 7.128-7.128 0-3.939-3.189-7.128-7.128-7.128zm2.317 9.446l-3.521-2.115V7.415h1.204v4.053l2.317 1.391-.789 1.459z"/>
                </svg>
                {language === 'es' ? 'Ver Todas las Reseñas en Google' : 'View All Reviews on Google'}
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold heading-primary mb-4">
                {t.gallery.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gradient-purple-start to-gradient-pink-end mx-auto rounded-full mb-6"></div>
              <p className="text-body max-w-2xl mx-auto">
                {t.gallery.subtitle}
              </p>
            </div>

            <div className="max-w-[1200px] mx-auto relative">
              <div className="gallery-slider w-full relative">
                <div className="swiper-wrapper">
                  {GALLERY_IMAGES.map((imagePath, index) => (
                    <div key={index} className="swiper-slide p-4">
                      <div className="group relative card-base overflow-hidden transition-all duration-300">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-xl font-semibold mb-2">{t.gallery.studentWork}{index + 1}</h3>
                            <p className="text-sm text-gray-200">
                              {t.gallery.caption}
                            </p>
                          </div>
                        </div>

                        {/* Main Image */}
                        <div className="aspect-[3/4]">
                        <Image
                            src={imagePath}
                            alt={`${t.gallery.studentWork}${index + 1}`}
                            width={600}
                            height={800}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation */}
                <div className="swiper-button-prev !text-white !w-12 !h-12 !bg-purple-500/80 rounded-full -translate-x-6"></div>
                <div className="swiper-button-next !text-white !w-12 !h-12 !bg-purple-500/80 rounded-full translate-x-6"></div>
                
                {/* Pagination */}
                <div className="swiper-pagination !bottom-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <section className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="card-base p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-100 dark:border-purple-900/50">
                <div className="text-6xl mb-6">🎯</div>
                <h2 className="text-3xl md:text-4xl font-bold heading-primary mb-4">
                  {language === 'es' ? 'Descubre Tu Camino PMU' : 'Discover Your PMU Path'}
              </h2>
                <p className="text-body mb-8 max-w-2xl mx-auto">
                  {language === 'es'
                    ? 'Toma nuestro breve cuestionario para evaluar tu comprensión del maquillaje permanente y descubre qué programa se adapta mejor a tus objetivos'
                    : 'Take our quick quiz to assess your understanding of permanent makeup and discover which program best suits your goals'
                  }
                </p>
                <button
                  onClick={() => setShowQuizDialog(true)}
                  className="button-primary px-8 py-4 text-lg flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  {language === 'es' ? 'Comenzar Cuestionario' : 'Start Quiz'}
                </button>
                  </div>
            </div>
          </div>
        </section>

        {/* Add the Income Calculator before the FAQ section */}
        <IncomeCalculator language={language} />

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                {t.faq.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                {t.faq.subtitle}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {t.faq.questions.map((faq, index) => (
                <Disclosure key={index}>
                  {({ open }) => (
                    <div className="overflow-hidden">
                      <Disclosure.Button className="w-full flex items-center justify-between gap-4 p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{faq.icon}</span>
                          <span className="text-lg font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        </div>
                        <svg
                          className={`flex-shrink-0 w-5 h-5 text-purple-600 dark:text-purple-400 transform transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 py-4 bg-white dark:bg-gray-800 -mt-2 rounded-b-2xl">
                        <div className="pl-12 pr-4 text-gray-600 dark:text-gray-300">
                          {faq.answer}
                        </div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t.faq.subtitle}
              </p>
              <button
                onClick={() => setShowTourDialog(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t.faq.contactButton}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                {t.contact.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.form.firstName}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'es' ? "Juan" : "John"}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t.contact.form.lastName}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'es' ? "García" : "Doe"}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.form.phone}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    <input
                        type="tel"
                        placeholder="123-456-7890"
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Format: XXX-XXX-XXXX</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.form.email} ({language === 'es' ? 'Opcional' : 'Optional'})
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder={language === 'es' ? "tucorreo@ejemplo.com" : "you@example.com"}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.contact.form.message} ({language === 'es' ? 'Opcional' : 'Optional'})
                    </label>
                    <textarea
                      placeholder={language === 'es' ? "Cuéntanos sobre tus objetivos y cualquier pregunta que tengas..." : "Tell us about your goals and any questions you have..."}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 text-gray-900 dark:text-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t.contact.form.submitButton}
                  </button>

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {language === 'es' 
                      ? "Al enviar este formulario, aceptas ser contactado con respecto a tu solicitud."
                      : "By submitting this form, you agree to be contacted regarding your request."
                    }
                    <br />
                    {language === 'es'
                      ? "Respetamos tu privacidad y nunca compartiremos tu información."
                      : "We respect your privacy and will never share your information."
                    }
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Tour Dialog */}
      {showTourDialog && (
      <Dialog
          as="div"
          static
        open={showTourDialog}
        onClose={() => setShowTourDialog(false)}
        className="relative z-50"
      >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="heading-primary text-2xl mb-4"
            >
              {t.dialogs.tour.title}
            </Dialog.Title>
            
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {language === 'es' 
                  ? "Conoce nuestras instalaciones de última generación y conoce a nuestros instructores expertos. Completa el formulario a continuación y un consejero de admisiones te contactará para programar tu visita."
                  : "Experience our state-of-the-art facilities and meet our expert instructors. Complete the form below and an admissions counselor will contact you to schedule your tour."
                }
              </p>
            </div>

            <form onSubmit={handleTourSubmit} className="space-y-4">
              {/* Campus Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'es' ? "Campus Preferido" : "Preferred Campus"} <span className="text-pink-500">*</span>
                </label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>{language === 'es' ? "Selecciona un campus" : "Select a campus"}</option>
                  <option value="santa-ana">{language === 'es' ? "Santa Ana" : "Santa Ana"}</option>
                  <option value="south-gate">South Gate</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.dialogs.tour.form.firstName} <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                  placeholder={language === 'es' ? "Tu nombre" : "Your first name"}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.dialogs.tour.form.email} ({language === 'es' ? 'Opcional' : 'Optional'})
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-300 outline-none"
                  placeholder={language === 'es' ? "tucorreo@ejemplo.com" : "you@example.com"}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'es' ? "Teléfono" : "Phone"} <span className="text-pink-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formatPhoneNumber(phoneNumber)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const cleaned = value.replace(/\D/g, '');
                    if (cleaned.length <= 10) {
                      setPhoneNumber(cleaned);
                    }
                  }}
                  placeholder={language === 'es' ? "123-456-7890" : "123-456-7890"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                />
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.dialogs.tour.form.date} <span className="text-pink-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const day = date.getDay();
                    // Only allow Monday-Saturday (0 = Sunday, 6 = Saturday)
                    if (day !== 0) {
                      e.target.setCustomValidity('');
                    } else {
                      e.target.setCustomValidity(language === 'es' 
                        ? 'Por favor selecciona un día de Lunes a Sábado'
                        : 'Please select a day from Monday to Saturday'
                      );
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.dialogs.tour.form.time} <span className="text-pink-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>{t.dialogs.tour.form.timeOptions.placeholder}</option>
                  <option value="morning">{t.dialogs.tour.form.timeOptions.morning}</option>
                  <option value="afternoon">{t.dialogs.tour.form.timeOptions.afternoon}</option>
                  <option value="evening">{t.dialogs.tour.form.timeOptions.evening}</option>
                </select>
              </div>

              {/* Program Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {language === 'es' ? "Programa de Interés" : "Program of Interest"} <span className="text-pink-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-900 transition-all duration-300 outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>{language === 'es' ? "Selecciona un programa" : "Select a program"}</option>
                  <option value="microblading">Microblading</option>
                  <option value="microshading">Microshading</option>
                  <option value="combo">{language === 'es' ? "Curso Combo" : "Combo Course"}</option>
                </select>
              </div>

                <button
                  type="submit"
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-medium hover:from-teal-500 hover:to-emerald-400 transition-all duration-300"
                >
                {t.dialogs.tour.form.submitButton}
                </button>

              {/* Form Footer */}
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-4">
                {language === 'es' 
                  ? "Al enviar este formulario, serás contactado por uno de nuestros consejeros de admisiones para programar tu visita al campus."
                  : "By submitting this form, you'll be contacted by one of our admissions counselors to schedule your campus tour."
                }
              </p>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      )}

      {/* Courses Dialog */}
      {showCoursesDialog && (
      <Dialog
          as="div"
          static
        open={showCoursesDialog}
        onClose={() => setShowCoursesDialog(false)}
        className="relative z-50"
      >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Dialog.Title className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'es' ? 'Fechas de Cursos Disponibles' : 'Available Course Dates'}
            </Dialog.Title>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'es' 
                      ? 'Selecciona una fecha que mejor se adapte a tu horario. Todos los cursos incluyen entrenamiento práctico y un kit profesional.'
                      : 'Select a course date that works best for you. All courses include hands-on training and a professional kit.'
                    }
                  </p>
                </div>
              <button
                onClick={() => setShowCoursesDialog(false)}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 mb-8">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-purple-600 dark:text-purple-400">
                  {language === 'es' 
                    ? 'Formato híbrido disponible para todos los cursos'
                    : 'Hybrid format available for all courses'
                  }
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {COURSES.map((course, index) => (
                <div
                  key={index}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {course.tag && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`px-3 py-1 text-white text-sm font-medium rounded-full whitespace-nowrap ${
                          course.tag === 'BEST VALUE' 
                            ? 'bg-emerald-500' 
                            : 'bg-purple-500'
                        }`}>
                          {course.tag}
                        </span>
                      </div>
                    )}

                    <div className="mt-4">
                      <div className="flex flex-col mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {course.course}
                  </h3>
                        {course.status === 'available' && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                              {course.slotsLeft} {course.slotsLeft === 1 ? 'space' : 'spaces'} remaining
                    </span>
                          </div>
                        )}
                        {course.status === 'full' && (
                          <span className="text-sm text-red-500 font-medium">
                            Enrollment Complete
                          </span>
                        )}
                  </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {language === 'es' ? 'Ubicación' : 'Location'}
                            </span>
                            <span className="text-gray-900 dark:text-white">{course.location}</span>
                          </div>
                    </div>
                    
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {language === 'es' ? 'Fecha de Inicio' : 'Start Date'}
                            </span>
                            <span className="text-gray-900 dark:text-white">{course.date}</span>
                          </div>
                    </div>
                    
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {language === 'es' ? 'Horario' : 'Schedule'}
                            </span>
                            <div>
                              <span className="text-gray-900 dark:text-white">10:00 AM - 7:00 PM</span>
                              <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                                <span className="text-lg">🍽️</span>
                                <span>
                                  {language === 'es' ? 'Almuerzo: 2-3 PM' : 'Lunch: 2-3 PM'}
                                </span>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>

                      {course.status === 'available' && (
                  <button
                    onClick={() => {
                          setShowCoursesDialog(false);
                          setFormData(prev => ({
                            ...prev,
                            program: course.course.toLowerCase().includes('microblading') 
                              ? 'microblading' 
                              : course.course.toLowerCase().includes('microshading')
                              ? 'microshading'
                              : 'combo'
                          }));
                          setShowEnrollDialog(true);
                        }}
                        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                          {language === 'es' ? 'Inscribirse Ahora' : 'Enroll Now'}
                  </button>
                      )}
                      {course.status === 'full' && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">
                            {language === 'es' ? 'Inscripción Completa' : 'Enrollment Complete'}
                          </span>
                          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                            {language === 'es' 
                              ? 'Por favor revisa otras fechas disponibles'
                              : 'Please check other available dates'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                </div>
              ))}
            </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'es'
                    ? '¿Necesitas ayuda para elegir? Contacta a nuestro equipo de admisiones'
                    : 'Need help choosing? Contact our admissions team for guidance'
                  }
                </p>
                <button
                  onClick={() => {
                    setShowCoursesDialog(false);
                    setShowTourDialog(true);
                  }}
                  className="mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                >
                  {language === 'es' ? 'Programa una Visita al Campus →' : 'Schedule a Campus Tour →'}
                </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      )}

      {/* Enrollment Dialog */}
      {showEnrollDialog && (
      <Dialog
          as="div"
          static
        open={showEnrollDialog}
        onClose={() => setShowEnrollDialog(false)}
        className="relative z-50"
      >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl">
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Start Your Journey
            </Dialog.Title>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Fill out the form below to begin your enrollment process.
              </p>
              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                  </label>
                  <input
                    type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                  </label>
                  <input
                    type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <input
                  type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                </label>
                <input
                  type="tel"
                    value={formatPhoneNumber(formData.phone)}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, '');
                      if (cleaned.length <= 10) {
                        setFormData({ ...formData, phone: cleaned });
                      }
                    }}
                    placeholder="(123) 456-7890"
                    maxLength={14}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                />
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Campus
                    </label>
                    <select
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value as 'santa-ana' | 'south-gate' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="santa-ana">Santa Ana (Main Campus)</option>
                      <option value="south-gate">South Gate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value as 'microblading' | 'microshading' | 'combo' })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="microblading">Microblading</option>
                      <option value="microshading">Microshading</option>
                      <option value="combo">Combo Course</option>
                    </select>
              </div>
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Goals
                </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Tell us about your professional goals..."
                  />
              </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEnrollDialog(false)}
                    className="px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                <button
                  type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                >
                    Submit Application
                </button>
            </div>
                </form>
          </Dialog.Panel>
        </div>
      </Dialog>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
      <Dialog
          as="div"
          static
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        className="relative z-50"
      >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-center align-middle shadow-xl transition-all">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.dialogs.enroll.success.title}
            </Dialog.Title>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t.dialogs.enroll.success.message}
            </p>
                <button
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-medium hover:from-teal-500 hover:to-emerald-400 transition-all duration-300"
              onClick={() => setShowSuccessDialog(false)}
                >
              {t.dialogs.enroll.success.closeButton}
                </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      )}

      {/* Quiz Dialog */}
      {showQuizDialog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              resetQuiz();
            }
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={resetQuiz}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Quiz Content */}
              <div className="mb-8">
                {!showResults ? (
                  <>
                {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

                    <h3 className="text-2xl font-bold mb-6">
                      {quizQuestions[currentQuestion].question[language === 'es' ? 'es' : 'en']}
                    </h3>

                  <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 hover:border-purple-200 dark:border-gray-700 dark:hover:border-purple-700'
                          }`}
                        >
                          {option[language === 'es' ? 'es' : 'en']}
                        </button>
                      ))}
                  </div>
                  </>
                ) : (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-6">
                      {language === 'es' ? 'Tu Análisis PMU Personalizado' : 'Your Personalized PMU Analysis'}
                    </h3>
                    
                    {/* Recommendation Section */}
                    <div className="mb-8 text-left bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                      <h4 className="text-xl font-semibold mb-4">
                      {(() => {
                          const scores = [
                            { type: 'microblading', score: quizScores.microblading },
                            { type: 'microshading', score: quizScores.microshading },
                            { type: 'combo', score: quizScores.combo }
                          ];
                          const recommended = scores.reduce((a, b) => a.score > b.score ? a : b);
                          return language === 'es' 
                            ? `Recomendado: ${
                                recommended.type === 'microblading' ? 'Programa de Microblading'
                                : recommended.type === 'microshading' ? 'Programa de Microshading'
                                : 'Programa Combo'
                              }`
                            : `Recommended: ${
                                recommended.type === 'microblading' ? 'Microblading Program'
                                : recommended.type === 'microshading' ? 'Microshading Program'
                                : 'Combo Program'
                              }`;
                      })()}
                      </h4>

                      {/* Profile Analysis */}
                      <div className="mb-6">
                        <h5 className="font-medium mb-2">
                          {language === 'es' ? 'Análisis de tu Perfil' : 'Your Profile Analysis'}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          {(() => {
                            const scores = [
                              { type: 'microblading', score: quizScores.microblading },
                              { type: 'microshading', score: quizScores.microshading },
                              { type: 'combo', score: quizScores.combo }
                            ];
                            const recommended = scores.reduce((a, b) => a.score > b.score ? a : b);
                            
                            if (recommended.type === 'microblading') {
                              return language === 'es'
                                ? 'Tu enfoque en resultados naturales y tus habilidades de dibujo te hacen ideal para el microblading.'
                                : 'Your focus on natural-looking results and drawing skills make you ideal for microblading.';
                            } else if (recommended.type === 'microshading') {
                              return language === 'es'
                                ? 'Tu experiencia con el sombreado y preferencia por looks suaves te hacen perfecta para el microshading.'
                                : 'Your experience with shading and preference for soft looks make you perfect for microshading.';
                            } else {
                              return language === 'es'
                                ? 'Tu versatilidad en técnicas y objetivos sugiere que el curso combo te serviría mejor.'
                                : 'Your versatility in techniques and goals suggests the combo course would serve you best.';
                            }
                          })()}
                        </p>
                      </div>

                      {/* Learning Path */}
                      <div className="mb-6">
                        <h5 className="font-medium mb-2">
                          {language === 'es' ? 'Camino de Aprendizaje y Objetivos' : 'Learning Path & Business Goals'}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300">
                          {(() => {
                            const scores = [
                              { type: 'microblading', score: quizScores.microblading },
                              { type: 'microshading', score: quizScores.microshading },
                              { type: 'combo', score: quizScores.combo }
                            ];
                            const recommended = scores.reduce((a, b) => a.score > b.score ? a : b);
                            
                            if (recommended.type === 'microblading' || recommended.type === 'microshading') {
                              return language === 'es'
                                ? 'Tu enfoque metódico de aprendizaje sugiere comenzar con un programa especializado.'
                                : 'Your methodical approach to learning suggests starting with a specialized program.';
                            } else {
                              return language === 'es'
                                ? 'Tu compromiso con el entrenamiento intensivo se alinea bien con nuestra estructura de programa integral.'
                                : 'Your commitment to intensive training aligns well with our comprehensive program structure.';
                            }
                          })()}
                        </p>
                      </div>
                      
                      {/* Compatibility Scores */}
                      <div className="space-y-4">
                        <h5 className="font-medium">
                          {language === 'es' ? 'Compatibilidad de Programa' : 'Program Compatibility'}
                        </h5>
                      <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'es' ? 'Microblading' : 'Microblading'}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {Math.round((quizScores.microblading / (quizQuestions.length * 5)) * 100)}%
                            </span>
                      </div>
                          <div className="w-full h-4 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(quizScores.microblading / (quizQuestions.length * 5)) * 100}%`
                              }}
                              />
                            </div>
                          </div>
                          <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'es' ? 'Microshading' : 'Microshading'}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {Math.round((quizScores.microshading / (quizQuestions.length * 5)) * 100)}%
                            </span>
                            </div>
                          <div className="w-full h-4 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-pink-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(quizScores.microshading / (quizQuestions.length * 5)) * 100}%`
                              }}
                              />
                            </div>
                          </div>
                          <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {language === 'es' ? 'Curso Combo' : 'Combo Course'}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {Math.round((quizScores.combo / (quizQuestions.length * 5)) * 100)}%
                            </span>
                            </div>
                          <div className="w-full h-4 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(quizScores.combo / (quizQuestions.length * 5)) * 100}%`
                              }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                    {/* Next Steps */}
                    <div className="text-left mb-8">
                      <h4 className="text-xl font-semibold mb-4">
                        {language === 'es' ? 'Próximos Pasos Recomendados' : 'Recommended Next Steps'}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                          {language === 'es' 
                            ? 'Programa un tour del campus para discutir tus resultados con nuestros instructores'
                            : 'Schedule a campus tour to discuss your results with our instructors'
                          }
                            </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {language === 'es'
                            ? 'Ver fechas de cursos próximos que coincidan con tu programa recomendado'
                            : 'View upcoming course dates that match your recommended program'
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {language === 'es'
                            ? 'Descarga nuestra guía gratuita del programa para más información'
                            : 'Download our free program guide for more information'
                          }
                        </li>
                        </ul>
                      </div>

                    <div className="flex gap-4">
                        <button
                          onClick={() => setShowTourDialog(true)}
                        className="button-primary px-6 py-3 flex-1"
                        >
                        {language === 'es' ? 'Programa un Tour' : 'Schedule a Tour'}
                        </button>
                        <button
                          onClick={() => setShowCoursesDialog(true)}
                        className="button-secondary px-6 py-3 flex-1"
                        >
                        {language === 'es' ? 'Ver Fechas' : 'View Dates'}
                        </button>
                      </div>
                    </div>
                )}
                  </div>
                </div>
          </div>
        </div>
      )}
    </>
  )
} 