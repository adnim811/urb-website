import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';
import { FaBriefcase, FaGraduationCap, FaLaptopCode, FaUserAlt, FaFileAlt } from 'react-icons/fa';
import '../styles/Resume.css';

// Import company logos
import AboduLogo from '../assets/Abodu_Logo_Transparent.png';
import BluegreenLogo from '../assets/Bluegreen_Logo_Transparent.png';
import MicrosoftLogo from '../assets/microsoft_logo_transparent.png';
import URBLogo from '../assets/URB_Logo_NoBackground.png';
import UMichLogo from '../assets/UMichM_Logo_Transparent.png';
// Import resume PDF
import ResumePDF from '../assets/Aditya_Resume_Portfolio.pdf';

// Move getCategoryTitle to the module scope so it can be used by multiple components
const getCategoryTitle = (category) => {
  switch(category) {
    case "programming_languages":
      return "Programming Languages";
    case "software_tools":
      return "Software Tools";
    case "pm_skills":
      return "PM Skills";
    case "about_me":
      return "About Me";
    default:
      return category;
  }
};

const SkillCard = ({ category, skills }) => {
  const getCategoryIcon = () => {
    switch(category) {
      case "programming_languages":
        return <FaLaptopCode className="text-2xl text-[#5a0817] mr-2" />;
      case "software_tools":
        return <FaLaptopCode className="text-2xl text-[#5a0817] mr-2" />;
      case "pm_skills":
        return <FaBriefcase className="text-2xl text-[#5a0817] mr-2" />;
      case "about_me":
        return <FaUserAlt className="text-2xl text-[#5a0817] mr-2" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 w-full flex flex-col shadow-lg border border-[#5a0817]/20"
    >
      <div className="flex items-center mb-6">
        {getCategoryIcon()}
        <h3 className="text-xl font-mono text-gray-300 tracking-wider">{getCategoryTitle(category)}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 flex-grow">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`${skill.color} px-3 py-2 rounded-lg text-sm font-medium text-center
              transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110`}
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

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

// View Resume Button
const ViewResumeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={ResumePDF}
      target="_blank"
      rel="noopener noreferrer"
      className="view-resume-btn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaFileAlt className={`view-icon ${isHovered ? 'animate-pulse' : ''}`} />
      <span>View Resume</span>
    </motion.a>
  );
};

const Resume = () => {
  const [activeCategory, setActiveCategory] = useState("programming_languages");
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const skillCategories = [
    {
      category: "programming_languages",
      skills: [
        { name: "PYTHON", color: "bg-blue-400" },
        { name: "C++", color: "bg-blue-600" },
        { name: "REACT", color: "bg-blue-500" },
        { name: "NEXTJS", color: "bg-gray-800" },
        { name: "SQL", color: "bg-orange-600" },
        { name: "JAVA", color: "bg-red-600" }
      ]
    },
    {
      category: "software_tools",
      skills: [
        { name: "FIGMA", color: "bg-purple-500" },
        { name: "JIRA", color: "bg-blue-600" },
        { name: "TABLEAU", color: "bg-blue-400" },
        { name: "ASANA", color: "bg-red-500" },
        { name: "ADOBE SUITE", color: "bg-red-600" },
        { name: "MICROSOFT/GOOGLE SUITE", color: "bg-blue-700" },
        { name: "SALESFORCE", color: "bg-blue-500" },
        { name: "GOOGLE CLOUD", color: "bg-blue-400" },
        { name: "CHATGPT", color: "bg-green-600" }
      ]
    },
    {
      category: "pm_skills",
      skills: [
        { name: "AGILE METHODOLOGIES", color: "bg-green-600" },
        { name: "PRODUCT ROADMAPS", color: "bg-blue-500" },
        { name: "USER STORIES", color: "bg-purple-500" },
        { name: "CUSTOMER NEEDS", color: "bg-yellow-600" },
        { name: "LIFECYCLE MANAGEMENT", color: "bg-indigo-500" },
        { name: "GO-TO-MARKET", color: "bg-red-500" }
      ]
    },
    {
      category: "about_me",
      skills: [
        { name: "GUITAR PLAYER", color: "bg-yellow-700" },
        { name: "BASKETBALL PLAYER", color: "bg-orange-500" },
        { name: "NEUROSCIENCE/PSYCHOLOGY READER", color: "bg-purple-600" },
        { name: "REAL ESTATE & CONSTRUCTION TECH FANATIC", color: "bg-green-700" }
      ]
    }
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Languages', value: 'language' },
    { name: 'Frameworks', value: 'framework' },
    { name: 'Tools', value: 'tool' },
    { name: 'Design', value: 'design' },
    { name: 'Research', value: 'research' },
    { name: 'Business', value: 'business' },
    { name: 'Industry', value: 'industry' },
  ];

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
      <div className="resume-fade-overlay" />
      <div className="resume-content">
        <motion.div 
          className="resume-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Resume
            </motion.h1>
            <motion.div variants={itemVariants} style={{ marginLeft: 'auto' }}>
              <ViewResumeButton />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="resume-section-content">
            <h2 className="section-title">/objective</h2>
            <div className="section-content bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#5a0817]/10">
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
            <div className="section-content bg-black/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#5a0817]/10 transform transition-all duration-300 hover:border-[#5a0817]/30 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl sm:text-2xl font-medium mb-2">University of Michigan – Ann Arbor, Michigan</h3>
                  <p className="text-lg font-medium text-[#5a0817]">B.S. Urban Technology + Computer Science</p>
                  <p className="text-gray-400 mb-4">Graduation: Dec 2025</p>
                  
                  <p className="text-gray-300 mb-2">• Part of the second ever cohort of the <a href="https://taubmancollege.umich.edu/academics/urban-and-regional-planning/bachelor-of-science-in-urban-technology/" className="text-[#5a0817] hover:underline" target="_blank" rel="noopener noreferrer">Urban Technology Program</a> at Taubman College</p>
                  
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
                        <FaBriefcase className="text-sm text-[#5a0817]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center">
                        <motion.p 
                          className="font-bold text-xl sm:text-2xl"
                          variants={{
                            hover: { color: "#5a0817", transition: { duration: 0.2 } }
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
                        <p className="text-[#5a0817] text-lg sm:text-xl font-medium mt-1">{job.title}</p>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mt-2">{job.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="resume-section-content">
            <h2 className="section-title">/skills</h2>
            
            <div className="mb-6 flex flex-wrap gap-3">
              {skillCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${activeCategory === category.category 
                      ? 'bg-[#5a0817] text-white shadow-lg scale-105' 
                      : 'bg-black/30 text-gray-300 hover:bg-[#5a0817]/30'}
                    before:content-[""] before:absolute before:inset-0 before:border-2 
                    before:border-[#5a0817]/0 before:rounded-lg before:transition-all
                    ${activeCategory === category.category ? 'before:border-[#5a0817]/50' : 'hover:before:border-[#5a0817]/20'}
                    transform hover:scale-102.5 active:scale-95`}
                >
                  {getCategoryTitle(category.category)}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {skillCategories.map((category) => (
                activeCategory === category.category && (
                  <SkillCard
                    key={category.category}
                    {...category}
                  />
                )
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="resume-bottom-fade" />
    </motion.section>
  );
};

export default Resume;
