import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';
import { FaBriefcase, FaGraduationCap, FaLaptopCode, FaUserAlt, FaTools } from 'react-icons/fa';
import Skills from '../components/Skills';
import WhiteParticlesBackground from '../components/WhiteParticlesBackground';
import '../styles/Resume.css';

// Import company logos
import AboduLogo from '../assets/Abodu_Logo_Transparent.png';
import BluegreenLogo from '../assets/Bluegreen_Logo_Transparent.png';
import MicrosoftLogo from '../assets/microsoft_logo_transparent.png';
import URBLogo from '../assets/URB_Logo_NoBackground.png';
import UMichLogo from '../assets/UMichM_Logo_Transparent.png';

// Component for company logo
const CompanyLogo = ({ logo, alt, size = "medium", className = "" }) => {
  const sizeClasses = {
    xsmall: "logo-xsmall",
    small: "logo-small",
    medium: "logo-medium",
    large: "logo-large"
  };

  return (
    <motion.div 
      className={`flex items-center justify-center p-1 bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)" }}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: { 
          type: "spring", 
          stiffness: 150, 
          damping: 15 
        } 
      }}
    >
      <img 
        src={logo} 
        alt={alt} 
        className="object-contain w-full h-full" 
      />
    </motion.div>
  );
};

const Resume = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Company experience data with logos
  const experienceData = [
    {
      company: "Microsoft",
      logo: MicrosoftLogo,
      location: "Redmond, WA",
      date: "Summer 2025",
      title: "Incoming Technical Product Manager Intern",
      description: "Azure Cloud Operations + Innovation"
    },
    {
      company: "Abodu",
      logo: AboduLogo,
      location: "Redwood City, CA",
      date: "Summer 2024",
      title: "Associate Product Manager Intern",
      description: "Focusing on customer experience optimization and product development for prefabricated homes. Led development of AR visualization tools and streamlined internal processes through custom solutions."
    },
    {
      company: "URB Consulting",
      logo: URBLogo,
      location: "Ann Arbor, MI",
      date: "2024 - Present",
      title: "Founder & President",
      description: "Founded UMich's first and only urban tech consulting organization. Established partnerships with industry leaders and created professional development opportunities through case competitions and networking events."
    },
    {
      company: "Taubman College of Architecture & Urban Planning",
      logo: UMichLogo,
      location: "Ann Arbor, MI",
      date: "2023 - 2024",
      title: "Strategic Consultant",
      description: "Focused on program growth and student engagement. Enhanced pre-matriculated student experience through improved information access and engagement initiatives."
    },
    {
      company: "Bluegreen Vacations",
      logo: BluegreenLogo,
      location: "San Jose, CA",
      date: "Fall 2022",
      title: "Sales Development Representative",
      description: "Specialized in luxury vacation package sales through direct customer engagement and personalized pitching strategies."
    },
    {
      company: "E-commerce Store",
      logo: null,
      location: "San Jose, CA",
      date: "2021 - 2022",
      title: "Founder",
      description: "Founded Shopify-based dropshipping business specializing in Avengers merchandise. Managed end-to-end operations including supply chain and customer satisfaction."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="resume-section"
    >
      <WhiteParticlesBackground />
      <div className="resume-fade-overlay" />
      <div className="resume-content">
        <motion.div 
          className="resume-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          

          <motion.div variants={itemVariants} className="resume-section-content">
            <h2 className="section-title">/objective</h2>
            <div className="section-content bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#dc2626]/10">
              <p>
              Driven by a vision of transforming urban experiences through technology, I craft human-centric solutions that
              bridge the gap between urban systems and human needs. As an aspiring Product Manager, I'm passionate about
              developing scalable products at the intersection of real estate, mobility, and energy. My goal is to 
              create a future urban utopia by solving urban challenges that create meaningful impact and empower communities.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="resume-section-content"
          >
            <h2 className="section-title">/education</h2>
            <div className="section-content bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#dc2626]/10 transform transition-all duration-300 hover:border-[#dc2626]/30 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl sm:text-2xl font-medium mb-2">University of Michigan – Ann Arbor, Michigan</h3>
                  <p className="text-lg font-medium text-[#dc2626]">B.S. Urban Technology + Computer Science</p>
                  <p className="text-gray-400 mb-4">Graduation: Dec 2025</p>
                  
                  <p className="text-gray-300 mb-2">• Part of the second ever cohort of the <a href="https://taubmancollege.umich.edu/academics/urban-and-regional-planning/bachelor-of-science-in-urban-technology/" className="text-[#dc2626] hover:underline" target="_blank" rel="noopener noreferrer">Urban Technology Program</a> at Taubman College</p>
                  
                  <div>
                    <p className="text-lg font-medium text-gray-300 mb-2">Campus Involvements:</p>
                    <ul className="text-gray-400 list-disc pl-5 space-y-1">
                      <li>URB Consulting (Founder & President)</li>
                      <li>Urban Tech Student Organization (Co-Founder)</li>
                      <li>Product Motion (VP Internal)</li>
                      <li>MProduct (Product Management Club)</li>
                      <li>Indian American Student Association</li>
                      <li>Intramural Basketball</li>
                    </ul>
                  </div>
                </div>
                <div className="ml-4 mt-1 hidden sm:flex items-start self-start">
                  <CompanyLogo logo={UMichLogo} alt="University of Michigan Logo" size="xsmall" className="education-logo" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="resume-section-content"
          >
            <h2 className="section-title">/experience</h2>
            <div className="space-y-16">
              {experienceData.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="experience-item"
                  whileHover="hover"
                  custom={index}
                >
                  <div className="experience-dot" />
                  <div className="flex space-y-0 items-start">
                    {job.logo ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            delay: 0.1 * index,
                            duration: 0.5
                          }
                        }}
                        className="logo-container mr-3 mt-1.5"
                      >
                        <CompanyLogo logo={job.logo} alt={`${job.company} Logo`} size="xsmall" />
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 mr-3 mt-1.5 flex items-center justify-center bg-white/10 rounded-lg">
                        <FaBriefcase className="text-sm text-[#dc2626]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center">
                        <motion.p 
                          className="font-bold text-xl sm:text-2xl"
                          variants={{
                            hover: { color: "#dc2626", transition: { duration: 0.2 } }
                          }}
                        >
                          {job.company}
                        </motion.p>
                      </div>
                      <motion.div 
                        variants={{
                          hover: { 
                            x: 5,
                            transition: { duration: 0.3, ease: "easeOut" }
                          }
                        }}
                      >
                        <p className="text-gray-400 text-sm sm:text-base">{job.location} | {job.date}</p>
                        <p className="text-[#dc2626] text-lg sm:text-xl font-medium mt-1">{job.title}</p>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mt-2">{job.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Skills section */}
      <Skills />

      <div className="resume-bottom-fade" />
    </motion.section>
  );
};

export default Resume;
