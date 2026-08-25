const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '../src/pages/Home.jsx');
let content = fs.readFileSync(homePath, 'utf8');

// Ensure useTranslation is imported
if (!content.includes('useTranslation')) {
  content = content.replace("import React from 'react';", "import React from 'react';\nimport { useTranslation } from 'react-i18next';");
}
if (!content.includes('const { t } = useTranslation();')) {
  content = content.replace("const Home = () => {", "const Home = () => {\n  const { t } = useTranslation();");
}

const replacements = {
  'AI CLUB • MOULOUD MAMMERI UNIVERSITY • TIZI OUZOU': "{t('home_subtitle')}",
  'Build the Future with': "{t('home_build')}",
  "Join Tizi Ouzou's student AI community. Practical workshops, real-world projects, hackathons and inspiring talks with industry experts.": "{t('home_desc')}",
  'JOIN MIRAI': "{t('home_join')}",
  'EXPLORE ACTIVITIES': "{t('home_explore')}",
  '<span className="uppercase">Heritage</span>': '<span className="uppercase">{t(\'marquee_heritage\')}</span>',
  '<span className="uppercase">Intelligence</span>': '<span className="uppercase">{t(\'marquee_intelligence\')}</span>',
  '<span className="uppercase">Future</span>': '<span className="uppercase">{t(\'marquee_future\')}</span>',
  '<span className="uppercase">Mirai</span>': '<span className="uppercase">Mirai</span>', // Keep Mirai as is, or remove it from replacements
  'Core Values': "{t('mission_tag')}",
  'Mission & objectives': "{t('mission_title')}",
  '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">Educate</h3>': '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t(\'mission_ed_title\')}</h3>',
  '<p className="text-base text-on-surface-variant leading-relaxed font-body">Practical workshops and training on machine learning, deep learning, and essential toolchains.</p>': '<p className="text-base text-on-surface-variant leading-relaxed font-body">{t(\'mission_ed_desc\')}</p>',
  '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">Inspire</h3>': '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t(\'mission_in_title\')}</h3>',
  '<p className="text-base text-on-surface-variant leading-relaxed font-body">Representing Tizi Ouzou in national hackathons and innovative AI competitions.</p>': '<p className="text-base text-on-surface-variant leading-relaxed font-body">{t(\'mission_in_desc\')}</p>',
  '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">Connect</h3>': '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t(\'mission_co_title\')}</h3>',
  '<p className="text-base text-on-surface-variant leading-relaxed font-body">An active community of passionate university students, open to all skill levels.</p>': '<p className="text-base text-on-surface-variant leading-relaxed font-body">{t(\'mission_co_desc\')}</p>',
  '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">Experiment</h3>': '<h3 className="text-2xl sm:text-3xl font-display font-bold text-black mb-3 tracking-tight">{t(\'mission_ex_title\')}</h3>',
  '<p className="text-base text-on-surface-variant leading-relaxed font-body">Concrete projects, from prototyping to deployment, developed collaboratively in teams.</p>': '<p className="text-base text-on-surface-variant leading-relaxed font-body">{t(\'mission_ex_desc\')}</p>',
  
  '>Active Members<': '>{t(\'stats_members\')}<',
  '>Events<': '>{t(\'stats_events\')}<',
  '>Projects<': '>{t(\'stats_projects\')}<',
  '>Shared Resources<': '>{t(\'stats_resources\')}<',
  
  '>Our Team<': '>{t(\'team_tag\')}<',
  '>Meet the members<': '>{t(\'team_title\')}<',
  '>President<': '>{t(\'team_pres\')}<',
  '>Vice-President<': '>{t(\'team_vp\')}<',
  '>Secretary General<': '>{t(\'team_sec\')}<',
  '>SKILLS<': '>{t(\'team_skills\')}<',
  '>Management<': '>{t(\'team_mgt\')}<',
  '>Strategy<': '>{t(\'team_str\')}<',
  '>Operations<': '>{t(\'team_ops\')}<',
  '>Logistics<': '>{t(\'team_log\')}<',
  '>Outreach<': '>{t(\'team_out\')}<',
  '>Support<': '>{t(\'team_sup\')}<',
  
  '>Initiatives<': '>{t(\'proj_tag\')}<',
  '>Current projects<': '>{t(\'proj_title\')}<',
  'Explore Project': "{t('proj_explore')}"
};

for (const [search, replace] of Object.entries(replacements)) {
  content = content.replaceAll(search, replace);
}

fs.writeFileSync(homePath, content, 'utf8');
console.log('Home.jsx updated.');
