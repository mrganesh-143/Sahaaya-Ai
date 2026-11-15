'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function YouthPage() {
  const [tab, setTab] = useState<'courses' | 'jobs' | 'scholarships'>('courses');
  const [enrolledCourses, setEnrolledCourses] = useState<{ [id: string]: boolean }>({});

  const courses = [
    { id: '1', title: 'Tally Prime & GST Accounting for MSMEs', duration: '30 Hours', level: 'Beginner', isFree: true, instructor: 'V. Ramanathan (CA)', students: 1840, tag: 'High Employment Demand' },
    { id: '2', title: 'Full-Stack Web Development Foundation', duration: '60 Hours', level: 'Intermediate', isFree: true, instructor: 'K. Sridhar (Senior Dev)', students: 2450, tag: 'Tech Career Track' },
    { id: '3', title: 'Spoken English & Interview Communication', duration: '20 Hours', level: 'Beginner', isFree: true, instructor: 'Ananya Sharma', students: 3120, tag: 'Essential Soft Skills' },
    { id: '4', title: 'Digital Marketing & Social Media for Small Business', duration: '25 Hours', level: 'Beginner', isFree: true, instructor: 'M. Imran', students: 1650, tag: 'Freelance & Agency' },
    { id: '5', title: 'Electric Two-Wheeler Maintenance & Servicing', duration: '40 Hours', level: 'Vocational', isFree: true, instructor: 'Skill India Certified', students: 920, tag: 'Green Mobility Jobs' },
    { id: '6', title: 'Data Entry, Excel & Office Automation', duration: '15 Hours', level: 'Beginner', isFree: true, instructor: 'P. Lakshmi', students: 4200, tag: 'Immediate Entry Roles' }
  ];

  const jobs = [
    { id: '1', title: 'Junior Accounts Assistant', company: 'Telangana Agro Traders', location: 'Hyderabad, TS', type: 'Full-Time', stipend: '₹ 18,000 - ₹ 22,000 / mo', deadline: '25 Nov 2026' },
    { id: '2', title: 'Front-End React Intern', company: 'Digital Bharat Tech', location: 'Remote / Work From Home', type: 'Internship', stipend: '₹ 12,000 / mo', deadline: '30 Nov 2026' },
    { id: '3', title: 'Customer Operations & Community Executive', company: 'Sahaaya Logistics Hub', location: 'Secunderabad, TS', type: 'Full-Time', stipend: '₹ 16,000 - ₹ 20,000 / mo', deadline: '1 Dec 2026' },
    { id: '4', title: 'Inventory & Store Supervisor', company: 'Kisan Cooperative Depot', location: 'Warangal, TS', type: 'Full-Time', stipend: '₹ 15,000 / mo', deadline: '28 Nov 2026' }
  ];

  const scholarships = [
    { id: '1', title: 'National Means-cum-Merit Scholarship', provider: 'Ministry of Education, GoI', amount: '₹ 12,000 / Year', eligibility: 'Class 9 to 12 students with family income < ₹3.5L', deadline: '15 Dec 2026' },
    { id: '2', title: 'Post-Matric Technical Scholarship for Underprivileged Youth', provider: 'State Welfare Department', amount: 'Full Tuition Fee Reimbursement', eligibility: 'Diploma / Degree students in technical disciplines', deadline: '20 Dec 2026' },
    { id: '3', title: 'Sahaaya Girl Child Higher Education Grant', provider: 'Sahaaya Social Impact Foundation', amount: '₹ 25,000 One-time grant', eligibility: 'Girls pursuing graduation / polytechnic in Telangana & AP', deadline: '31 Dec 2026' }
  ];

  const handleEnroll = (id: string) => {
    setEnrolledCourses(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#113B15] to-[#1B5E20] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8BC34A] px-2.5 py-0.5 rounded-full bg-white/10">
            Empowerment Through Skills
          </span>
          <h1 className="text-3xl font-black mt-2">Youth Development Portal</h1>
          <p className="text-white/80 text-xs sm:text-sm max-w-2xl mt-1">
            Free career certifications, verified entry-level jobs, and scholarships to ensure every Indian youth builds a sustainable livelihood.
          </p>
        </div>

        <div className="flex gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
          <button
            onClick={() => setTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'courses' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Free Courses ({courses.length})
          </button>
          <button
            onClick={() => setTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'jobs' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Jobs & Internships ({jobs.length})
          </button>
          <button
            onClick={() => setTab('scholarships')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'scholarships' ? 'bg-[#8BC34A] text-[#113B15]' : 'text-white hover:bg-white/10'
            }`}
          >
            Scholarships ({scholarships.length})
          </button>
        </div>
      </div>

      {/* COURSES TAB */}
      {tab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => {
            const isEnrolled = enrolledCourses[course.id];

            return (
              <div key={course.id} className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1B5E20] p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-md">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-green-50 text-[#1B5E20]">
                      {course.level}
                    </span>
                    <span className="text-xs font-bold text-[#8BC34A] bg-[#113B15] px-2 py-0.5 rounded-md">
                      100% Free
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[#1A1A1A] mb-2">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">Mentor: {course.instructor}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{course.duration}</span>
                    </div>
                    <span>{course.students} youth enrolled</span>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ★ {course.tag}
                    </span>
                  </div>

                  {isEnrolled ? (
                    <div className="w-full py-2.5 rounded-xl bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Enrolled! Open Learning</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="w-full py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Enroll for Free</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* JOBS TAB */}
      {tab === 'jobs' && (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:border-[#1B5E20] transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {job.type}
                  </span>
                  <span className="text-xs text-gray-400">Deadline: {job.deadline}</span>
                </div>
                <h3 className="font-black text-lg text-[#1A1A1A]">{job.title}</h3>
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <div className="text-left md:text-right">
                  <span className="text-xs text-gray-400 block">Stipend / Salary</span>
                  <span className="font-black text-base text-[#1B5E20]">{job.stipend}</span>
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold text-xs transition-all shadow-sm">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCHOLARSHIPS TAB */}
      {tab === 'scholarships' && (
        <div className="space-y-4">
          {scholarships.map(sch => (
            <div key={sch.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm hover:border-[#8BC34A] transition-colors">
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                    Verified Scheme
                  </span>
                  <h3 className="font-black text-lg text-[#1A1A1A] mt-1">{sch.title}</h3>
                  <p className="text-xs text-gray-500">{sch.provider}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-gray-400 block">Assistance Value</span>
                  <span className="font-black text-base text-[#1B5E20]">{sch.amount}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl my-3 text-xs text-gray-600">
                <strong>Eligibility:</strong> {sch.eligibility}
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-gray-400">Application Deadline: {sch.deadline}</span>
                <button className="font-bold text-[#1B5E20] hover:underline flex items-center gap-1">
                  <span>View Details & Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
