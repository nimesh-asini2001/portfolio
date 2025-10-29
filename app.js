// app.js
(function(){
  const e = React.createElement;
  const { useState, useEffect, useRef } = React;

  /* ----- Simple Router ----- */
  function useHashRoute(){
    const [route, setRoute] = useState(window.location.hash || "#/");

    useEffect(()=>{
      const onHash = ()=> setRoute(window.location.hash || "#/");
      window.addEventListener("hashchange", onHash);
      return ()=> window.removeEventListener("hashchange", onHash);
    }, []);
    return route;
  }

  /* ----- Update title & meta ----- */
  function setMeta(title, desc){
    if(title) document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content', desc || '');
  }

  /* ----- Scroll reveal hook ----- */
  function useReveal(){
    useEffect(()=>{
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(ent=>{
          if(ent.isIntersecting) ent.target.classList.add('show');
        });
      }, {threshold: 0.12});
      document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
      return ()=> obs.disconnect();
    }, []);
  }

  /* ----- Theme Toggle ----- */
  function useTheme(){
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    useEffect(()=>{
      if(theme === 'dark'){
        document.documentElement.style.setProperty('--bg','#0a0a1a');
      } else {
        document.documentElement.style.setProperty('--bg','#f6f9ff');
        document.documentElement.style.setProperty('--card','#ffffff');
        document.documentElement.style.setProperty('--muted','#394c59');
        document.documentElement.style.setProperty('--accent','#0066cc');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);
    return [theme, setTheme];
  }

  /* ----- Nav ----- */
  function Nav({route, onToggleTheme, theme}){
    const links = [
      {to:'#/', label:'Home'},
      {to:'#/about', label:'About'},
      {to:'#/skills', label:'Skills'},
      {to:'#/projects', label:'Projects'},
      {to:'#/education', label:'Education'},
      {to:'#/achievements', label:'Achievements'},
      {to:'#/contact', label:'Contact'},
    ];
    return e('nav', null,
      e('div',{className:'nav-inner'},
        e('div',{className:'brand'}, e('span',{className:'dot'}), 'Nimesh (Nima🙂)'),
        e('div',{className:'nav-right', style:{display:'flex',alignItems:'center',gap:12}},
          e('div',{className:'nav-links'}, links.map(l =>
            e('a',{
              key:l.to,
              href:l.to,
              className: route === l.to ? 'active' : '',
            }, l.label)
          )),
          e('div',{className:'theme-toggle'},
            e('button',{className:'btn secondary', onClick: ()=> onToggleTheme(theme === 'dark' ? 'light' : 'dark')},
              theme === 'dark' ? e('span',null,'Light') : e('span',null,'Dark')
            )
          )
        )
      )
    )
  }

  /* ----- Components for sections ----- */

  function Home(){
  useReveal();
  useEffect(()=> 
    setMeta(
      'Nimesh Madusanka — Web Developer & Designer', 
      'Hi, I’m Nimesh Madusanka — a passionate Web Developer, Designer, and MIS Undergraduate from Sri Lanka. I create impactful web experiences using modern technologies.'
    ), 
  []);

  return e('main', {className:'container'},
    e('section',{className:'hero section reveal'},
      e('div',{className:'intro'},
        e('h1', null, "Hi, I’m Nimesh Madusanka"),
        e('p', {className:'lead'}, 
          "A passionate Web Developer, Designer, and MIS Undergraduate from Sri Lanka. I create impactful web experiences using modern technologies."
        ),
        e('div',{className:'cta-row'},
          e('a',{href:'#/projects', className:'btn'}, "View My Work"),
          e('a',{href:'#/contact', className:'btn secondary'}, "Contact Me")
        ),
        e('p',{style:{marginTop:18,color:'var(--muted)'}}, 
          "Currently pursuing BSc (Hons) in Management Information Systems."
        )
      ),

      // --- Profile Card ---
      e('aside',{className:'profile-card'},
        e('img',{
          src:'assets/profile.jpg', 
          alt:'Nimesh Madusanka', 
          className:'profile-photo',
          style:{
            width:'200px',       // slightly larger
            height:'200px',
            borderRadius:'50%',  // perfect circular
            objectFit:'cover',
            boxShadow:'0 6px 18px rgba(0,0,0,0.25)', // soft clean shadow
            marginBottom:'14px'
          }
        }),
        e('h3', null, "Nimesh Madusanka"),
        e('p',{style:{color:'var(--muted)', marginBottom:12}}, 
          "Web Developer • UI/UX • MIS Undergraduate"
        ),
        e('a',{
          href:'assets/CV_Nimesh_Madusanka.pdf',
          className:'btn',
          target:'_blank',
          rel:'noopener noreferrer'
        }, 
          e('i',{className:'fa fa-eye', style:{marginRight:6}}), 
          "View CV"
        )
      )
    ),

    // --- Featured Projects Section ---
    e('section',{className:'section reveal'},
      e('h2', null, "Featured Projects"),
      e('p',{className:'desc'}, 
        "Selected projects that showcase web development and UI/UX skills."
      ),
      e('div',{className:'projects-grid'},
        e('article',{className:'project'},
          e('img',{src:'assets/projects/vehicle-market-th.jpg', alt:'Vehicle Marketplace'}),
          e('div',{className:'body'},
            e('h4', null, "Vehicle Marketplace"),
            e('p',{className:'stack'}, "Next.js • Node.js • React (demo placeholder)"),
            e('div',{style:{marginTop:'auto',display:'flex',gap:8}},
              e('a',{href:'#',className:'btn'}, "Live Demo"),
              e('a',{href:'#',className:'btn secondary'}, "GitHub")
            )
          )
        ),
        e('article',{className:'project'},
          e('img',{src:'assets/projects/hospital-th.jpg', alt:'Hospital System'}),
          e('div',{className:'body'},
            e('h4', null, "Hospital Management System"),
            e('p',{className:'stack'}, "JSP • MySQL"),
            e('div',{style:{marginTop:'auto',display:'flex',gap:8}},
              e('a',{href:'#',className:'btn'}, "Live Demo"),
              e('a',{href:'#',className:'btn secondary'}, "GitHub")
            )
          )
        )
      )
    )
  );
}

  function About(){
  useReveal();
  useEffect(()=> 
    setMeta(
      'About — Nimesh Madusanka', 
      'Personal bio and education summary of Nimesh Madusanka.'
    ), 
  []);

  return e('main',{className:'container'},
    e('section',{className:'section reveal'},
      e('h2', null, "About Me"),
      e('p',{className:'desc'}, 
        "I’m Nimesh — a web developer and designer currently pursuing a BSc (Hons) in Management Information Systems. I enjoy building accessible, performant web apps and designing user-friendly interfaces."
      ),
      e('div',{
        style:{
          display:'grid',
          gridTemplateColumns:'1fr 320px',
          gap:24,
          marginTop:18,
          alignItems:'center'
        }
      },
        e('div',null,
          e('h3', null, "Education & Goals"),
          e('p', null, 
            "Currently in Year 2 of BSc (Hons) MIS. My goal is to become a full-stack developer and product-oriented designer who builds delightful user experiences."
          )
        ),
        e('aside',{className:'profile-card', style:{textAlign:'center'}},
          e('img',{
            src:'assets/profile.jpg', 
            alt:'Profile', 
            className:'profile-photo',
            style:{
              width:'180px',
              height:'180px',
              borderRadius:'50%',
              objectFit:'cover',
              boxShadow:'0 4px 15px rgba(0,0,0,0.2)',
              marginBottom:'12px'
            }
          }),
          e('a',{
            href:'assets/CV_Nimesh_Madusanka.pdf',
            className:'btn',
            target:'_blank',
            rel:'noopener noreferrer'
          }, 
            e('i',{className:'fa fa-eye', style:{marginRight:6}}),
            "View CV"
          )
        )
      )
    )
  );
}


  function Skills(){
    useReveal();
    useEffect(()=> setMeta('Skills — Nimesh Madusanka', 'Web Development, Design Tools, Databases, and other skills.'), []);
    const skillList = [
      {cat:'Web Development', items:['HTML','CSS','JavaScript','React','Next.js','Node.js','Express.js']},
      {cat:'Databases', items:['MySQL','PostgreSQL']},
      {cat:'Design Tools', items:['Figma','Photoshop','Illustrator']},
      {cat:'Other', items:['Git','VS Code','Project Management']},
    ];
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "Skills"),
        e('p',{className:'desc'}, "Technical and design skills categorized."),
        e('div',{className:'skills-grid', style:{marginTop:18}},
          skillList.map((s,idx)=> e('div',{className:'skill-card', key:idx},
            e('h4', null, s.cat),
            e('div',null, s.items.map((it,i)=>
              e('div',{key:i, style:{marginBottom:8}},
                e('div',{style:{display:'flex',justifyContent:'space-between',fontSize:13, color:'var(--muted)'}},
                  e('span',null,it),
                  e('span',null, `${70 + (i*3)}%`) // sample progress value
                ),
                e('div',{className:'progress'}, e('span',{style:{width: `${70 + (i*3)}%`}}))
              )
            ))
          ))
        )
      )
    );
  }

 function Projects(){
  useReveal();
  useEffect(()=> setMeta('Projects — Nimesh Madusanka', 'Personal and academic projects including Vehicle Marketplace, Hospital Management, UI/UX designs.'), []);

  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const perPage = 12; // 👈 3×4 layout

  const projects = [
    {title:'Vehicle Marketplace', img:'assets/projects/vehicle-market-th.jpg', desc:'A marketplace for vehicles with filters and user dashboards.', stack:'Next.js • Node.js', preview:'assets/projects/vehicle-preview.mp4', details:'Developed a full marketplace with user dashboard, real-time bidding, and leasing integration.'},
    {title:'Hospital Management System', img:'assets/projects/hospital-th.jpg', desc:'JSP based hospital admin & patient records system.', stack:'JSP • MySQL', preview:'assets/projects/hospital-preview.jpg', details:'Handles patient records, appointments, doctor schedules, and billing efficiently.'},
    {title:'UI/UX Dashboard', img:'assets/projects/dashboard-th.jpg', desc:'Figma dashboard concept for analytics.', stack:'Figma', preview:'assets/projects/dashboard-preview.mp4', details:'A modern analytics dashboard design focused on clean data visualization.'},
    {title:'Portfolio Website', img:'assets/projects/portfolio-th.jpg', desc:'Personal portfolio built using HTML, CSS, and React.', stack:'React.js • TailwindCSS', preview:'assets/projects/portfolio-preview.jpg', details:'Showcases skills, contact info, and projects in a modern layout.'},
    {title:'Student Management System', img:'assets/projects/student-th.jpg', desc:'Web app for student records management.', stack:'PHP • MySQL', preview:'assets/projects/student-preview.jpg', details:'Used by schools to manage student data, attendance, and grades.'},
    {title:'E-commerce App', img:'assets/projects/ecommerce-th.jpg', desc:'Online shopping platform with cart system.', stack:'React.js • Node.js', preview:'assets/projects/ecommerce-preview.mp4', details:'Full e-commerce app with payment gateway and order tracking.'},
    {title:'Chat Application', img:'assets/projects/chat-th.jpg', desc:'Real-time chat system with sockets.', stack:'React.js • Socket.io', preview:'assets/projects/chat-preview.mp4', details:'Supports private and group chats with media sharing.'},
    {title:'Weather App', img:'assets/projects/weather-th.jpg', desc:'Displays real-time weather data.', stack:'React.js • OpenWeather API', preview:'assets/projects/weather-preview.jpg', details:'Fetches and displays accurate weather information globally.'},
    {title:'Task Manager', img:'assets/projects/task-th.jpg', desc:'Organize tasks and deadlines efficiently.', stack:'Vue.js • Firebase', preview:'assets/projects/task-preview.jpg', details:'Productivity app to manage daily tasks and reminders.'},
    {title:'Blog Platform', img:'assets/projects/blog-th.jpg', desc:'Simple blogging system.', stack:'Node.js • Express', preview:'assets/projects/blog-preview.jpg', details:'Users can write, edit, and publish blogs with markdown support.'},
    {title:'Inventory Management', img:'assets/projects/inventory-th.jpg', desc:'Manages stock and orders.', stack:'Laravel • MySQL', preview:'assets/projects/inventory-preview.jpg', details:'For shops to monitor products, stock levels, and suppliers.'},
    {title:'Vehicle Marketplace', img:'assets/projects/vehicle-market-th.jpg', desc:'A marketplace for vehicles with filters and user dashboards.', stack:'Next.js • Node.js', preview:'assets/projects/vehicle-preview.mp4', details:'Developed a full marketplace with user dashboard, real-time bidding, and leasing integration.'},
    {title:'Hospital Management System', img:'assets/projects/hospital-th.jpg', desc:'JSP based hospital admin & patient records system.', stack:'JSP • MySQL', preview:'assets/projects/hospital-preview.jpg', details:'Handles patient records, appointments, doctor schedules, and billing efficiently.'},
    {title:'UI/UX Dashboard', img:'assets/projects/dashboard-th.jpg', desc:'Figma dashboard concept for analytics.', stack:'Figma', preview:'assets/projects/dashboard-preview.mp4', details:'A modern analytics dashboard design focused on clean data visualization.'},
    {title:'Portfolio Website', img:'assets/projects/portfolio-th.jpg', desc:'Personal portfolio built using HTML, CSS, and React.', stack:'React.js • TailwindCSS', preview:'assets/projects/portfolio-preview.jpg', details:'Showcases skills, contact info, and projects in a modern layout.'},
    {title:'Student Management System', img:'assets/projects/student-th.jpg', desc:'Web app for student records management.', stack:'PHP • MySQL', preview:'assets/projects/student-preview.jpg', details:'Used by schools to manage student data, attendance, and grades.'},
    {title:'E-commerce App', img:'assets/projects/ecommerce-th.jpg', desc:'Online shopping platform with cart system.', stack:'React.js • Node.js', preview:'assets/projects/ecommerce-preview.mp4', details:'Full e-commerce app with payment gateway and order tracking.'},
    {title:'Chat Application', img:'assets/projects/chat-th.jpg', desc:'Real-time chat system with sockets.', stack:'React.js • Socket.io', preview:'assets/projects/chat-preview.mp4', details:'Supports private and group chats with media sharing.'},
    {title:'Weather App', img:'assets/projects/weather-th.jpg', desc:'Displays real-time weather data.', stack:'React.js • OpenWeather API', preview:'assets/projects/weather-preview.jpg', details:'Fetches and displays accurate weather information globally.'},
    {title:'Task Manager', img:'assets/projects/task-th.jpg', desc:'Organize tasks and deadlines efficiently.', stack:'Vue.js • Firebase', preview:'assets/projects/task-preview.jpg', details:'Productivity app to manage daily tasks and reminders.'},
    {title:'Blog Platform', img:'assets/projects/blog-th.jpg', desc:'Simple blogging system.', stack:'Node.js • Express', preview:'assets/projects/blog-preview.jpg', details:'Users can write, edit, and publish blogs with markdown support.'},
    {title:'Inventory Management', img:'assets/projects/inventory-th.jpg', desc:'Manages stock and orders.', stack:'Laravel • MySQL', preview:'assets/projects/inventory-preview.jpg', details:'For shops to monitor products, stock levels, and suppliers.'},
    {title:'Finance Tracker', img:'assets/projects/finance-th.jpg', desc:'Track income and expenses visually.', stack:'React.js • Chart.js', preview:'assets/projects/finance-preview.jpg', details:'Includes graphs for better financial planning.'},
    {title:'Travel Booking App', img:'assets/projects/travel-th.jpg', desc:'Book trips and hotels easily.', stack:'Next.js • MongoDB', preview:'assets/projects/travel-preview.mp4', details:'Allows users to plan vacations with interactive maps.'},
    {title:'Online Exam Portal', img:'assets/projects/exam-th.jpg', desc:'Conduct and evaluate exams online.', stack:'Spring Boot • MySQL', preview:'assets/projects/exam-preview.jpg', details:'Auto-evaluation and instant result generation.'},
    {title:'Restaurant Ordering System', img:'assets/projects/restaurant-th.jpg', desc:'Online food ordering app.', stack:'Django • SQLite', preview:'assets/projects/restaurant-preview.jpg', details:'Enables online menu viewing and order tracking.'},
    {title:'Portfolio V2', img:'assets/projects/portfolio2-th.jpg', desc:'Next version of personal portfolio.', stack:'React • TailwindCSS', preview:'assets/projects/portfolio2-preview.jpg', details:'Enhanced animations, dark mode, and SEO optimized.'},
  ];

  const totalPages = Math.ceil(projects.length / perPage);
  const startIndex = (page - 1) * perPage;
  const currentProjects = projects.slice(startIndex, startIndex + perPage);

  return e('main',{className:'container'},
    e('section',{className:'section reveal'},
      e('h2', null, "Projects"),
      e('p',{className:'desc'}, "Explore my personal and academic projects. Click 'View Project' for full details."),

      // 🔹 Project Grid (3×4 layout)
      e('div',{className:'projects-grid', style:{
        marginTop:18,
        display:'grid',
        gridTemplateColumns:'repeat(3, 1fr)', // 👈 3 columns only
        gap:'22px'
      }},
        currentProjects.map((p, i)=>
          e('article',{className:'project', key:i, style:{
            background:'#111',borderRadius:'10px',overflow:'hidden',
            display:'flex',flexDirection:'column',justifyContent:'space-between',
            boxShadow:'0 4px 12px rgba(0,0,0,0.3)'
          }},
            e('img',{src:p.img, alt:p.title, style:{width:'100%',height:'180px',objectFit:'cover'}}),
            e('div',{className:'body', style:{padding:'14px',display:'flex',flexDirection:'column',gap:'6px'}},
              e('h4', {style:{fontSize:'1.1rem',color:'#fff'}}, p.title),
              e('p',{className:'stack',style:{fontSize:'0.85rem',color:'#8cf'}}, p.stack),
              e('p',{style:{fontSize:'0.9rem',color:'#ccc'}}, p.desc),
              e('div',{style:{marginTop:'auto',display:'flex',gap:8,justifyContent:'space-between'}},
                e('button',{className:'btn', onClick:()=> setSelected(p)}, "View Project"),
                e('a',{href:'#',className:'btn secondary'}, "GitHub")
              )
            )
          )
        )
      ),

      // 🔹 Pagination Buttons
      e('div',{style:{marginTop:24, display:'flex', justifyContent:'center', gap:12}},
        e('button',{
          className:'btn secondary',
          disabled: page === 1,
          onClick:()=> setPage(page - 1)
        },"← Previous"),
        e('span',null,`Page ${page} of ${totalPages}`),
        e('button',{
          className:'btn',
          disabled: page === totalPages,
          onClick:()=> setPage(page + 1)
        },"Next →")
      ),

      // 🔹 Modal Preview
      selected && e('div',{
        className:'preview-modal',
        style:{
          position:'fixed',
          top:0,left:0,right:0,bottom:0,
          background:'rgba(0,0,0,0.85)',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          zIndex:1000,
          padding:'20px'
        },
        onClick:()=> setSelected(null)
      },
        e('div',{
          className:'preview-content',
          style:{
            background:'#111',
            borderRadius:'12px',
            padding:'20px',
            maxWidth:'850px',
            width:'100%',
            textAlign:'center',
            position:'relative'
          },
          onClick:(e)=>e.stopPropagation()
        },
          e('button',{
            onClick:()=> setSelected(null),
            style:{
              position:'absolute',top:10,right:10,
              background:'transparent',border:'none',
              color:'#fff',fontSize:'1.5rem',cursor:'pointer'
            }
          },'✕'),
          e('h3',null, selected.title),
          selected.preview.endsWith('.mp4')
            ? e('video',{src:selected.preview, controls:true, style:{width:'100%',borderRadius:'8px',marginTop:'12px'}})
            : e('img',{src:selected.preview, alt:selected.title, style:{width:'100%',borderRadius:'8px',marginTop:'12px'}}),
          e('p',{style:{marginTop:'10px'}}, selected.desc),
          e('p',{style:{marginTop:'8px',color:'#bbb',fontSize:'0.9rem'}}, selected.details)
        )
      )
    )
  );
}


  function Education() {
  useReveal();
  useEffect(() => 
    setMeta('Education — Nimesh Madusanka', 'BSc (Hons) in Management Information Systems — Year 2.'), 
  []);

  const [showCert, setShowCert] = React.useState(false);

  // Close modal function
  const closeModal = () => {
    setShowCert(false);
    // Smooth scroll back to top of Education section after close
    setTimeout(() => {
      const section = document.querySelector('.section.reveal');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return e('main', { className: 'container' },
    e('section', { className: 'section reveal' },
      e('h2', null, "Education"),

      // === Education List ===
      e('div', { className: 'list', style: { marginTop: 12 } },

        // ---- Degree ----
        e('div', { className: 'item' },
          e('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            e('div', null,
              e('h4', null, "BSc (Hons) in Management Information Systems — [University Name]"),
              e('p', { style: { color: 'var(--muted)' } }, "Year 2 (Current)")
            )
            // Degree button removed
          )
        ),

        // ---- Certifications ----
        e('div', { className: 'item', style: { marginTop: 16 } },
          e('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            e('div', null,
              e('h4', null, "Certifications"),
              e('p', { style: { color: 'var(--muted)' } }, 
                "Full-Stack Bootcamp (Udemy), React Essentials (Coursera)"
              )
            ),
            e('button', {
              onClick: () => setShowCert(true),
              style: {
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              },
              onMouseEnter: (e) => e.target.style.background = '#0097e6',
              onMouseLeave: (e) => e.target.style.background = 'var(--accent)'
            }, "View Certificate")
          )
        )
      ),

      // === Full-Screen Image Modal ===
      showCert && e('div', {
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-in-out',
        },
        onClick: closeModal
      },
        e('div', {
          style: {
            position: 'relative',
            maxWidth: '95%',
            maxHeight: '95%',
            animation: 'scaleIn 0.4s ease-in-out'
          },
          onClick: (e) => e.stopPropagation()
        },
          // Close button ✕
          e('button', {
            onClick: closeModal,
            style: {
              position: 'absolute',
              top: '-40px',
              right: '0',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '50%',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'background 0.3s',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)'
            },
            onMouseEnter: (e) => e.target.style.background = '#0097e6',
            onMouseLeave: (e) => e.target.style.background = 'var(--accent)'
          }, '✕'),

          // Certificate image
          e('img', {
            src: '/images/certificate-sample.jpg', // <-- Replace with your real image path
            alt: 'Certificate',
            style: {
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 0 25px rgba(255,255,255,0.2)',
              objectFit: 'contain'
            }
          })
        )
      )
    )
  );
}

// === Add smooth animation styles globally ===
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);


  function Achievements(){
    useReveal();
    useEffect(()=> setMeta('Achievements — Nimesh Madusanka', 'Achievements and recognitions such as Innovation Challenge and published designs.'), []);
    const items = [
      "Completed Full-Stack Web Development Bootcamp",
      "Top 10 in Innovation Challenge 2024",
      "Published design on Behance"
    ];
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "Achievements"),
        e('div',{className:'list', style:{marginTop:12}},
          items.map((it,i)=> e('div',{className:'item', key:i}, e('p',null,it)))
        )
      )
    );
  }

  function Contact() {
  useReveal();
  useEffect(() => 
    setMeta(
      'Contact — Nimesh Madusanka', 
      'View Nimesh Madusanka personal contact information, profile photo, and social links for portfolio purposes.'
    ), 
  []);

  return e('main', { className: 'container', style: { padding: '60px 20px', maxWidth: '600px', margin: '0 auto' } },
    e('section', { className: 'section reveal', style: { display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' } },
      e('h2', { style: { textAlign: 'center' } }, "Contact Info"),
      e('p', { style: { textAlign: 'center', color: 'var(--muted)', fontSize: '16px' } }, 
        "Reach out via email, phone, or social links below."
      ),

      // --- Profile Card with Photo ---
      e('aside', { className: 'profile-card', style: { background: 'var(--card)', padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', width: '100%', boxShadow: '0 6px 25px rgba(0,0,0,0.15)' } },
        
        // Profile Photo
        e('img', { 
          src: '/images/profile-photo.jpg', // <-- replace with your actual photo path
          alt: 'Nimesh Madusanka', 
          style: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' } 
        }),

        // Personal Info
        e('h3', { style: { margin: 0 } }, "Nimesh Madusanka"),
        e('p', { style: { color: 'var(--muted)', margin: '4px 0' } }, "Age: 21"),
        e('p', { style: { color: 'var(--muted)', margin: '4px 0' } }, "Phone: +94 77 123 4567"),
        e('p', { style: { color: 'var(--muted)', margin: '4px 0' } }, "Email:"),
        e('a', { href: 'mailto:nimeshmadusanka@gmail.com', style: { color: 'var(--accent)', textDecoration: 'none', fontWeight: '500', fontSize: '16px' } }, "nimeshmadusanka@gmail.com"),

        // Social Links
        e('div', { style: { display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' } },
          e('a', { href: 'https://linkedin.com/in/yourprofile', target: '_blank', rel: 'noopener noreferrer', style: { padding: '10px 16px', borderRadius: '8px', background: 'var(--accent)', color: '#fff', textDecoration: 'none', transition: 'background 0.3s', textAlign: 'center' }, onMouseEnter: (e) => e.target.style.background = '#0097e6', onMouseLeave: (e) => e.target.style.background = 'var(--accent)' }, "LinkedIn"),
          e('a', { href: 'https://github.com/yourprofile', target: '_blank', rel: 'noopener noreferrer', style: { padding: '10px 16px', borderRadius: '8px', background: 'var(--accent)', color: '#fff', textDecoration: 'none', transition: 'background 0.3s', textAlign: 'center' }, onMouseEnter: (e) => e.target.style.background = '#0097e6', onMouseLeave: (e) => e.target.style.background = 'var(--accent)' }, "GitHub"),
          e('a', { href: 'https://facebook.com/yourprofile', target: '_blank', rel: 'noopener noreferrer', style: { padding: '10px 16px', borderRadius: '8px', background: '#3b5998', color: '#fff', textDecoration: 'none', transition: 'background 0.3s', textAlign: 'center' }, onMouseEnter: (e) => e.target.style.background = '#2d4373', onMouseLeave: (e) => e.target.style.background = '#3b5998' }, "Facebook"),
          e('a', { href: 'https://instagram.com/yourprofile', target: '_blank', rel: 'noopener noreferrer', style: { padding: '10px 16px', borderRadius: '8px', background: '#e4405f', color: '#fff', textDecoration: 'none', transition: 'background 0.3s', textAlign: 'center' }, onMouseEnter: (e) => e.target.style.background = '#c1355a', onMouseLeave: (e) => e.target.style.background = '#e4405f' }, "Instagram")
        )
      )
    )
  );
}


 
  /* ----- Router Render Switch ----- */
  function App() {
  const route = useHashRoute();

  // Always light theme
  useEffect(() => {
    document.documentElement.style.setProperty('--bg', '#f6f9ff');
    document.documentElement.style.setProperty('--card', '#ffffff');
    document.documentElement.style.setProperty('--muted', '#394c59');
    document.documentElement.style.setProperty('--accent', '#0066cc');
  }, []);

  // Update document title/meta based on route
  useEffect(() => {
    switch(route) {
      case "#/about": setMeta('About — Nimesh Madusanka','About Nimesh Madusanka'); break;
      case "#/skills": setMeta('Skills — Nimesh Madusanka','Skill list'); break;
      case "#/projects": setMeta('Projects — Nimesh Madusanka','Projects details'); break;
      case "#/education": setMeta('Education — Nimesh Madusanka','Education & certifications'); break;
      case "#/achievements": setMeta('Achievements — Nimesh Madusanka','Achievements & recognitions'); break;
      case "#/contact": setMeta('Contact — Nimesh Madusanka','Contact details and form'); break;
      default: setMeta('Nimesh Madusanka — Web Developer & Designer','Portfolio of Nimesh Madusanka'); break;
    }
  }, [route]);

  // Scroll to top on route change
  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [route]);

  // Render the page component based on route
  const page = (() => {
    switch(route) {
      case "#/about": return e(About);
      case "#/skills": return e(Skills);
      case "#/projects": return e(Projects);
      case "#/education": return e(Education);
      case "#/achievements": return e(Achievements);
      case "#/contact": return e(Contact);
      default: return e(Home);
    }
  })();

  return e(React.Fragment, null,
    // Pass a dummy theme toggle since we don't change theme
    e(Nav, { route, onToggleTheme: () => {}, theme: 'light' }),
    page,
    e('footer', null, "© " + (new Date()).getFullYear() + " Nimesh Madusanka — Built with HTML, CSS & React. Hosted on GitHub Pages.")
  );
}

/* ----- Render ----- */
ReactDOM.createRoot(document.getElementById('root')).render(e(App));

})();
