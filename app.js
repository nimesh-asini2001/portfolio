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
        e('div',{className:'brand'}, e('span',{className:'dot'}), 'Nimesh'),
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
    useEffect(()=> setMeta('Nimesh Madusanka — Web Developer & Designer', 'Hi, I’m Nimesh Madusanka — a passionate Web Developer, Designer, and MIS Undergraduate from Sri Lanka. I create impactful web experiences using modern technologies.'), []);
    return e('main', {className:'container'},
      e('section',{className:'hero section reveal'},
        e('div',{className:'intro'},
          e('h1', null, "Hi, I’m Nimesh Madusanka"),
          e('p', {className:'lead'}, "A passionate Web Developer, Designer, and MIS Undergraduate from Sri Lanka. I create impactful web experiences using modern technologies."),
          e('div',{className:'cta-row'},
            e('a',{href:'#/projects', className:'btn'}, "View My Work"),
            e('a',{href:'#/contact', className:'btn secondary'}, "Contact Me")
          ),
          e('p',{style:{marginTop:18,color:'var(--muted)'}}, "Currently pursuing BSc (Hons) in Management Information Systems.")
        ),
        e('aside',{className:'profile-card'},
          e('img',{src:'assets/profile.jpg', alt:'Nimesh Madusanka', className:'profile-photo'}),
          e('h3', null, "Nimesh Madusanka"),
          e('p',{style:{color:'var(--muted)'}}, "Web Developer • UI/UX • MIS Undergraduate"),
          e('a',{href:'assets/CV_Nimesh_Madusanka.pdf', className:'btn', download:true}, e('i',{className:'fa fa-download'}), " Download CV")
        )
      ),

      e('section',{className:'section reveal'},
        e('h2', null, "Featured Projects"),
        e('p',{className:'desc'}, "Selected projects that showcase web development and UI/UX skills."),
        e('div',{className:'projects-grid'},
          /* Sample project card */
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
    useEffect(()=> setMeta('About — Nimesh Madusanka', 'Personal bio and education summary of Nimesh Madusanka.'), []);
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "About Me"),
        e('p',{className:'desc'}, "I’m Nimesh — a web developer and designer currently pursuing a BSc (Hons) in Management Information Systems. I enjoy building accessible, performant web apps and designing user-friendly interfaces."),
        e('div',{style:{display:'grid',gridTemplateColumns:'1fr 320px',gap:24,marginTop:18}},
          e('div',null,
            e('h3', null, "Education & Goals"),
            e('p', null, "Currently in Year 2 of BSc (Hons) MIS. My goal is to become a full-stack developer and product-oriented designer who builds delightful user experiences.")
          ),
          e('aside',{className:'profile-card'},
            e('img',{src:'assets/profile.jpg', alt:'Profile', className:'profile-photo'}),
            e('a',{href:'assets/CV_Nimesh_Madusanka.pdf', className:'btn', download:true}, e('i',{className:'fa fa-download'}), " Download CV")
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
    // Example data - replace thumbnails and links with real ones
    const projects = [
      {title:'Vehicle Marketplace', img:'assets/projects/vehicle-market-th.jpg', desc:'A marketplace for vehicles with filters and user dashboards.', stack:'Next.js • Node.js'},
      {title:'Hospital Management System', img:'assets/projects/hospital-th.jpg', desc:'JSP based hospital admin & patient records system.', stack:'JSP • MySQL'},
      {title:'UI/UX Dashboard', img:'assets/projects/dashboard-th.jpg', desc:'Figma dashboard concept for analytics.', stack:'Figma'}
    ];
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "Projects"),
        e('p',{className:'desc'}, "Detailed project cards with live/demo and GitHub links."),
        e('div',{className:'projects-grid', style:{marginTop:18}},
          projects.map((p, i)=>
            e('article',{className:'project', key:i},
              e('img',{src:p.img, alt:p.title}),
              e('div',{className:'body'},
                e('h4', null, p.title),
                e('p',{className:'stack'}, p.stack),
                e('p',null, p.desc),
                e('div',{style:{marginTop:'auto',display:'flex',gap:8}},
                  e('a',{href:'#',className:'btn'}, "Live Demo"),
                  e('a',{href:'#',className:'btn secondary'}, "GitHub")
                )
              )
            )
          )
        )
      )
    );
  }

  function Education(){
    useReveal();
    useEffect(()=> setMeta('Education — Nimesh Madusanka', 'BSc (Hons) in Management Information Systems — Year 2.'), []);
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "Education"),
        e('div',{className:'list', style:{marginTop:12}},
          e('div',{className:'item'},
            e('h4', null, "BSc (Hons) in Management Information Systems — [University Name]"),
            e('p',{style:{color:'var(--muted)'}}, "Year 2 (Current)")
          ),
          e('div',{className:'item'},
            e('h4', null, "Certifications"),
            e('p',{style:{color:'var(--muted)'}}, "Full-Stack Bootcamp (Udemy), React Essentials (Coursera)")
          )
        )
      )
    );
  }

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

  function Contact(){
    useReveal();
    useEffect(()=> setMeta('Contact — Nimesh Madusanka', 'Contact Nimesh via email or social links. Use the contact form powered by Formspree.'), []);
    return e('main',{className:'container'},
      e('section',{className:'section reveal'},
        e('h2', null, "Contact"),
        e('p',{className:'desc'}, "Got a project or question? Reach out — or use the contact form below."),
        e('div',{style:{display:'grid',gridTemplateColumns:'1fr 380px',gap:24,marginTop:18}},
          e('div',null,
            e('form',{action:'https://formspree.io/f/yourFormID', method:'POST', className:'form'}, // replace with your Formspree endpoint
              e('input',{name:'name', className:'input', placeholder:'Your name', required:true}),
              e('input',{name:'email', type:'email', className:'input', placeholder:'Your email', required:true}),
              e('input',{name:'subject', className:'input', placeholder:'Subject', className2:'input'}),
              e('textarea',{name:'message', rows:6, className:'input full', placeholder:'Message', required:true}),
              e('button',{className:'btn', type:'submit'}, "Send Message")
            )
          ),
          e('aside',{className:'profile-card'},
            e('h4', null, "Contact Info"),
            e('p',{style:{color:'var(--muted)'}}, "Email: "),
            e('a',{href:'mailto:nimeshmadusanka@gmail.com'}, "nimeshmadusanka@gmail.com"),
            e('div',{style:{marginTop:12,display:'flex',gap:8,justifyContent:'center'}},
              e('a',{href:'https://linkedin.com/in/yourprofile', target:'_blank', rel:'noopener noreferrer', className:'btn secondary'}, "LinkedIn"),
              e('a',{href:'https://github.com/yourprofile', target:'_blank', rel:'noopener noreferrer', className:'btn secondary'}, "GitHub")
            )
          )
        )
      )
    );
  }

  /* ----- Router Render Switch ----- */
  function App(){
    const route = useHashRoute();
    const [theme, setTheme] = useTheme();

    useEffect(()=>{
      // set document title/meta based on route
      switch(route){
        case "#/about": setMeta('About — Nimesh Madusanka','About Nimesh Madusanka'); break;
        case "#/skills": setMeta('Skills — Nimesh Madusanka','Skill list'); break;
        case "#/projects": setMeta('Projects — Nimesh Madusanka','Projects details'); break;
        case "#/education": setMeta('Education — Nimesh Madusanka','Education & certifications'); break;
        case "#/achievements": setMeta('Achievements — Nimesh Madusanka','Achievements & recognitions'); break;
        case "#/contact": setMeta('Contact — Nimesh Madusanka','Contact details and form'); break;
        default: setMeta('Nimesh Madusanka — Web Developer & Designer','Portfolio of Nimesh Madusanka'); break;
      }
    }, [route]);

    // simple scroll to top when route changes
    useEffect(()=> window.scrollTo({top:0, behavior:'smooth'}), [route]);

    const page = (()=>{
      switch(route){
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
      e(Nav, {route, onToggleTheme:setTheme, theme}),
      page,
      e('footer', null, "© " + (new Date()).getFullYear() + " Nimesh Madusanka — Built with HTML, CSS & React. Hosted on GitHub Pages.")
    );
  }

  /* ----- Render ----- */
  ReactDOM.createRoot(document.getElementById('root')).render(e(App));

})();
