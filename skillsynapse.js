import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Clock, ShieldCheck, Search, Filter, Calendar, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, QrCode, Lock, 
  Award, TrendingUp, User, ChevronRight, PlusCircle, Check,
  AlertCircle, BookOpen, Code, Music, Palette, Cpu, Globe, GraduationCap, X, Zap
} from 'lucide-react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('market');
  const [walletBalance, setWalletBalance] = useState(2.5);
  const [escrowBalance, setEscrowBalance] = useState(0.0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exchangeType, setExchangeType] = useState('Offering'); // 'Offering' | 'Requesting'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-11-02');
  const [bookingTime, setBookingTime] = useState('16:00');
  
  // OTP Verification state
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Notifications
  const [notification, setNotification] = useState(null);

  const triggerNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- MOCK DATA ---
  const [skillsList, setSkillsList] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      department: "Computer Science (Yr 3)",
      skill: "Full-Stack Web Dev (React & Node)",
      category: "Coding",
      type: "Offering",
      rating: 4.9,
      reviewsCount: 18,
      rate: 1.0,
      availability: "Mon, Wed • 4-6 PM",
      bio: "Will help you debug your React state or set up Express APIs. Looking to learn Spanish in return!"
    },
    {
      id: 2,
      name: "Ananya Roy",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      department: "Design & Media (Yr 2)",
      skill: "UI/UX Design in Figma & Prototyping",
      category: "Design",
      type: "Offering",
      rating: 5.0,
      reviewsCount: 24,
      rate: 1.0,
      availability: "Tue, Thu • 2-5 PM",
      bio: "Figma components, design systems & mobile UI structure. Need calculus tutoring!"
    },
    {
      id: 3,
      name: "Rohan Das",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      department: "Mechanical Engg (Yr 4)",
      skill: "Acoustic Guitar & Music Theory",
      category: "Music",
      type: "Offering",
      rating: 4.8,
      reviewsCount: 12,
      rate: 1.0,
      availability: "Weekends • 11 AM - 3 PM",
      bio: "Learn basic chords, fingerpicking, or songwriting fundamentals in 1-hour sessions."
    },
    {
      id: 4,
      name: "Priya Kalita",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      department: "Biotechnology (Yr 1)",
      skill: "Conversational French & Grammar",
      category: "Languages",
      type: "Offering",
      rating: 4.9,
      reviewsCount: 9,
      rate: 1.0,
      availability: "Fri • 3-6 PM",
      bio: "Native-level fluency. Let's practice speaking and vocabulary drill!"
    },
    {
      id: 5,
      name: "Vikramjit Baruah",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      department: "Electrical Engg (Yr 3)",
      skill: "Need help with Python Data Structures",
      category: "Coding",
      type: "Requesting",
      rating: 4.7,
      reviewsCount: 6,
      rate: 1.0,
      availability: "Flexible Evening Slots",
      bio: "Struggling with Linked Lists and Trees. Offering 1 Time Credit per hour for peer tutoring!"
    }
  ]);

  const [activeSessions, setActiveSessions] = useState([
    {
      id: "SESS-8092",
      mentorName: "Ananya Roy",
      learnerName: "You (Current User)",
      skill: "UI/UX Design in Figma",
      date: "2026-10-30",
      time: "15:00 - 16:00",
      amount: 1.0,
      status: "In Escrow",
      otpCode: "4829",
      location: "Central Library Study Pod B"
    }
  ]);

  const [ledger, setLedger] = useState([
    {
      id: "TX-9011",
      type: "Welcome Bonus",
      amount: "+1.0",
      peer: "SkillSynapse Network",
      date: "2026-10-25 10:00 AM",
      status: "Completed",
      isCredit: true
    },
    {
      id: "TX-9024",
      type: "Session Taught",
      amount: "+1.0",
      peer: "Karan Verma (CSE)",
      date: "2026-10-27 04:30 PM",
      status: "Completed",
      isCredit: true
    },
    {
      id: "TX-9033",
      type: "Escrow Hold",
      amount: "-1.0",
      peer: "Ananya Roy (Design)",
      date: "2026-10-29 09:15 AM",
      status: "In Escrow",
      isCredit: false
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Aarav Sharma", dept: "CSE", hoursTaught: 32, creditsEarned: 32, badge: "Master Mentor" },
    { rank: 2, name: "Ananya Roy", dept: "Design", hoursTaught: 28, creditsEarned: 28, badge: "Top Educator" },
    { rank: 3, name: "Devika Gogoi", dept: "Robotics", hoursTaught: 24, creditsEarned: 24, badge: "Skill Champion" },
    { rank: 4, name: "You (Current User)", dept: "Software Engg", hoursTaught: 12, creditsEarned: 14, badge: "Rising Star" },
  ]);

  // --- ACTIONS ---
  const handleOpenBooking = (mentor) => {
    setSelectedMentor(mentor);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (walletBalance < 1.0) {
      triggerNotification("Insufficient Time Credits! Teach a peer to earn more.", "error");
      return;
    }

    // Deduct from wallet & put to escrow
    setWalletBalance(prev => prev - 1.0);
    setEscrowBalance(prev => prev + 1.0);

    const newSession = {
      id: `SESS-${Math.floor(1000 + Math.random() * 9000)}`,
      mentorName: selectedMentor.name,
      learnerName: "You (Current User)",
      skill: selectedMentor.skill,
      date: bookingDate,
      time: `${bookingTime} - ${parseInt(bookingTime) + 1}:00`,
      amount: 1.0,
      status: "In Escrow",
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      location: "Campus Innovation Lab - Room 204"
    };

    setActiveSessions([newSession, ...activeSessions]);

    // Add to ledger
    const newTx = {
      id: `TX-${Math.floor(9000 + Math.random() * 1000)}`,
      type: "Escrow Hold",
      amount: "-1.0",
      peer: selectedMentor.name,
      date: new Date().toLocaleString(),
      status: "In Escrow",
      isCredit: false
    };

    setLedger([newTx, ...ledger]);
    setBookingModalOpen(false);
    triggerNotification(`Session booked with ${selectedMentor.name}! 1 Time Credit locked in Escrow.`);
  };

  const handleVerifyOtp = (session) => {
    if (enteredOtp !== session.otpCode) {
      setOtpError("Invalid OTP Code. Please ask your mentor for the matching 4-digit code.");
      return;
    }

    // Release from Escrow to Completed
    setEscrowBalance(prev => Math.max(0, prev - 1.0));
    
    // Update active sessions status
    setActiveSessions(activeSessions.map(s => s.id === session.id ? { ...s, status: "Completed" } : s));

    // Update ledger entry
    setLedger(ledger.map(tx => tx.peer === session.mentorName && tx.status === "In Escrow" ? { ...tx, status: "Settled", type: "Session Spent" } : tx));

    setEnteredOtp('');
    setOtpError('');
    triggerNotification("Session Completed! 1 Time Credit transferred from Escrow.", "success");
  };

  // Filter skills
  const filteredSkills = skillsList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = item.type === exchangeType;
    const matchesSearch = item.skill.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2C2825] font-sans flex flex-col">
      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl text-white transition-all transform animate-bounce ${
          notification.type === 'error' ? 'bg-red-800' : 'bg-[#6B1D2F]'
        }`}>
          <Zap className="w-5 h-5 text-[#E8C872]" />
          <span className="font-medium text-sm">{notification.msg}</span>
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E3DCD0] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6B1D2F] flex items-center justify-center text-[#F5F2EB] shadow-md border border-[#800020]">
              <Sparkles className="w-6 h-6 text-[#E8C872]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-[#3D121C]">Skill<span className="text-[#6B1D2F]">Synapse</span></span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#E8E2D5] text-[#6B1D2F] px-2 py-0.5 rounded-full border border-[#D5CCBC]">
                  ADTU Hackathon
                </span>
              </div>
              <p className="text-xs text-[#786F66] font-medium">Peer Time-Credit Skill Exchange Platform</p>
            </div>
          </div>

          {/* NAV TABS */}
          <nav className="flex items-center bg-[#E8E2D5]/60 p-1.5 rounded-2xl border border-[#D8D0C0] text-xs font-semibold">
            {[
              { id: 'market', label: 'Skill Market', icon: Search },
              { id: 'escrow', label: 'Escrow & Sessions', icon: ShieldCheck, badge: activeSessions.filter(s => s.status === 'In Escrow').length },
              { id: 'wallet', label: 'Wallet & Ledger', icon: Clock },
              { id: 'leaderboard', label: 'Leaderboard', icon: Award },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-[#6B1D2F] text-[#F5F2EB] shadow-sm font-bold' 
                      : 'text-[#5C534B] hover:text-[#2C2825] hover:bg-[#E3DCD0]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E8C872]' : 'text-[#8A8075]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className="ml-1 bg-[#E8C872] text-[#3D121C] text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* USER WALLET BADGE */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-2 pr-4 rounded-2xl border border-[#E3DCD0] shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#6B1D2F]/10 flex items-center justify-center text-[#6B1D2F]">
              <Clock className="w-5 h-5 text-[#6B1D2F]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#8A8075] uppercase tracking-wider">Time Balance</div>
              <div className="text-sm font-extrabold text-[#3D121C] flex items-center gap-1.5">
                <span>{walletBalance.toFixed(1)} Hrs</span>
                <span className="text-[10px] font-medium text-[#786F66]">(1 Hr = 1 Credit)</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8 flex-grow">

        {/* TAB 1: SKILL MARKET */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            
            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D121C] via-[#6B1D2F] to-[#4A1422] text-[#F5F2EB] p-8 md:p-10 shadow-xl border border-[#800020]">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#E8C872]/20 border border-[#E8C872]/40 text-[#E8C872] px-3 py-1 rounded-full text-xs font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>Campus-Exclusive Knowledge Network</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Teach what you know. <br/>
                  <span className="text-[#E8C872]">Learn what you love. Zero Cash.</span>
                </h1>
                <p className="text-sm text-[#E8E2D5]/90 leading-relaxed">
                  Every hour spent mentoring a peer earns you 1 Time Credit. Use your credits to book 1-on-1 tutoring in coding, music, design, or languages!
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTab('wallet')}
                    className="bg-[#E8C872] text-[#3D121C] hover:bg-[#F2D68C] px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Claim Initial Welcome Credit (+1.0)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* RETRO TECH PATTERN OVERLAY */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-lg border border-[#F5F2EB] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#E8C872]"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTROLS & FILTERS */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E3DCD0] shadow-sm">
              
              {/* SEARCH BAR */}
              <div className="relative flex-grow">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8075]" />
                <input
                  type="text"
                  placeholder="Search skills (e.g. React, Guitar, Figma, French)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F2EB] border border-[#D8D0C0] text-xs focus:outline-none focus:border-[#6B1D2F] font-medium"
                />
              </div>

              {/* OFFERING VS REQUESTING SWITCH */}
              <div className="flex bg-[#E8E2D5] p-1 rounded-xl border border-[#D5CCBC]">
                <button
                  onClick={() => setExchangeType('Offering')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    exchangeType === 'Offering' 
                      ? 'bg-[#6B1D2F] text-[#F5F2EB] shadow-sm' 
                      : 'text-[#61574D] hover:text-[#2C2825]'
                  }`}
                >
                  Peer Mentors (Offering)
                </button>
                <button
                  onClick={() => setExchangeType('Requesting')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    exchangeType === 'Requesting' 
                      ? 'bg-[#6B1D2F] text-[#F5F2EB] shadow-sm' 
                      : 'text-[#61574D] hover:text-[#2C2825]'
                  }`}
                >
                  Skill Requests (Seeking)
                </button>
              </div>

            </div>

            {/* CATEGORY TAGS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Coding', 'Design', 'Music', 'Languages', 'Hardware'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#3D121C] text-[#E8C872] border-[#3D121C] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#61574D] border-[#E3DCD0] hover:bg-[#E8E2D5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SKILL CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map(item => (
                <div 
                  key={item.id} 
                  className="bg-[#FAF8F5] rounded-2xl border border-[#E3DCD0] p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#6B1D2F]/40 transition-all group"
                >
                  <div>
                    {/* CARD HEADER */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-[#D8D0C0]"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-[#2C2825] group-hover:text-[#6B1D2F] transition-colors">{item.name}</h3>
                          <p className="text-[11px] text-[#786F66] font-medium">{item.department}</p>
                        </div>
                      </div>
                      <span className="bg-[#E8C872]/20 text-[#3D121C] font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-[#E8C872]/50 flex items-center gap-1">
                        ★ {item.rating} <span className="text-[#8A8075] font-normal">({item.reviewsCount})</span>
                      </span>
                    </div>

                    {/* SKILL TITLE */}
                    <div className="mb-4 bg-[#F5F2EB] p-3 rounded-xl border border-[#E8E2D5]">
                      <div className="text-[10px] uppercase font-bold text-[#8A8075] tracking-wider mb-1">
                        {item.type === 'Offering' ? 'Can Teach You' : 'Wants To Learn'}
                      </div>
                      <div className="font-extrabold text-sm text-[#3D121C] flex items-center justify-between">
                        <span>{item.skill}</span>
                        <span className="text-[10px] font-bold bg-[#6B1D2F] text-white px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5C534B] leading-relaxed mb-4 line-clamp-2">
                      {item.bio}
                    </p>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-[#8A8075] block">Time Rate</span>
                      <span className="text-sm font-black text-[#6B1D2F]">1 Credit <span className="text-[10px] font-normal text-[#5C534B]">/ 1 Hour</span></span>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(item)}
                      className="bg-[#6B1D2F] hover:bg-[#800020] text-[#F5F2EB] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E8C872]" />
                      <span>{item.type === 'Offering' ? 'Book Session' : 'Offer Skill'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: ESCROW & ACTIVE SESSIONS */}
        {activeTab === 'escrow' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#3D121C]">Session Escrow & Verification</h2>
              <p className="text-xs text-[#786F66] mt-1">
                Credits remain safely locked in Escrow until both students complete the session and input the matching 4-digit verification code.
              </p>
            </div>

            {/* ESCROW STAT CARD */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E3DCD0] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8C872]/20 border border-[#E8C872]/50 flex items-center justify-center text-[#3D121C]">
                  <Lock className="w-6 h-6 text-[#6B1D2F]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8A8075] uppercase tracking-wider">Locked in Escrow</div>
                  <div className="text-2xl font-extrabold text-[#3D121C]">{escrowBalance.toFixed(1)} Time Credits</div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Atomic Lock Protection</span>
                </span>
              </div>
            </div>

            {/* ACTIVE SESSIONS LIST */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#3D121C]">Active & Upcoming Sessions</h3>

              {activeSessions.map((session) => (
                <div key={session.id} className="bg-[#FAF8F5] border border-[#E3DCD0] rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E8E2D5] pb-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#6B1D2F] tracking-widest uppercase bg-[#6B1D2F]/10 px-2.5 py-0.5 rounded-full">
                        {session.id}
                      </span>
                      <h4 className="font-extrabold text-base text-[#2C2825] mt-1">{session.skill}</h4>
                      <p className="text-xs text-[#786F66]">Mentor: <span className="font-bold text-[#3D121C]">{session.mentorName}</span></p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        session.status === 'In Escrow' 
                          ? 'bg-[#E8C872]/30 text-[#3D121C] border border-[#E8C872]' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#8A8075] font-medium block">Scheduled Time</span>
                      <span className="font-bold text-[#3D121C]">{session.date} • {session.time}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8075] font-medium block">Meetup Location</span>
                      <span className="font-bold text-[#3D121C]">{session.location}</span>
                    </div>
                  </div>

                  {session.status === 'In Escrow' && (
                    <div className="bg-[#F5F2EB] p-4 rounded-xl border border-[#E8E2D5] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#3D121C] flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-[#6B1D2F]" />
                          <span>4-Digit Completion OTP Verification</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-[#E8E2D5] text-[#3D121C] px-2 py-0.5 rounded">
                          Simulated Mentor Code: {session.otpCode}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          placeholder="Enter 4-digit OTP"
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#D8D0C0] text-center font-mono text-sm font-bold tracking-widest focus:outline-none focus:border-[#6B1D2F]"
                        />
                        <button
                          onClick={() => handleVerifyOtp(session)}
                          className="bg-[#6B1D2F] hover:bg-[#800020] text-[#F5F2EB] px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm"
                        >
                          Verify & Release Credit
                        </button>
                      </div>

                      {otpError && (
                        <p className="text-[11px] font-semibold text-red-700 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{otpError}</span>
                        </p>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: WALLET & TRANSACTION LEDGER */}
        {activeTab === 'wallet' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#3D121C]">Time-Credit Wallet & Ledger</h2>
              <p className="text-xs text-[#786F66] mt-1">
                Transparent time banking ledger. All peer teaching and learning hours are recorded automatically.
              </p>
            </div>

            {/* BALANCE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#3D121C] text-[#F5F2EB] p-6 rounded-2xl shadow-lg border border-[#6B1D2F] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#E8C872] uppercase tracking-wider block mb-1">Available Balance</span>
                  <div className="text-3xl font-black text-white">{walletBalance.toFixed(1)} <span className="text-sm font-normal text-[#E8E2D5]">Credits</span></div>
                </div>
                <p className="text-[10px] text-[#E8E2D5]/70 mt-4">1 Credit = 1 Hour of Peer Tutoring</p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E3DCD0] shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8A8075] uppercase tracking-wider block mb-1">Escrow Hold</span>
                  <div className="text-3xl font-extrabold text-[#3D121C]">{escrowBalance.toFixed(1)} <span className="text-sm font-normal text-[#786F66]">Credits</span></div>
                </div>
                <p className="text-[10px] text-[#786F66] mt-4">Locked pending session completion</p>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E3DCD0] shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#8A8075] uppercase tracking-wider block mb-1">Lifetime Taught</span>
                  <div className="text-3xl font-extrabold text-[#10B981]">12.0 <span className="text-sm font-normal text-[#786F66]">Hours</span></div>
                </div>
                <p className="text-[10px] text-[#786F66] mt-4">Contributed to campus community</p>
              </div>

            </div>

            {/* LEDGER TABLE */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E3DCD0] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[#3D121C]">Atomic Transaction Ledger</h3>
                <span className="text-xs text-[#8A8075] font-medium">Domain Locked: @adtu.in</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E2D5] text-[#8A8075] uppercase font-bold text-[10px] tracking-wider">
                      <th className="py-3 px-2">Tx ID</th>
                      <th className="py-3 px-2">Type</th>
                      <th className="py-3 px-2">Peer / Entity</th>
                      <th className="py-3 px-2">Timestamp</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Credit Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D5]">
                    {ledger.map(tx => (
                      <tr key={tx.id} className="hover:bg-[#F5F2EB] transition-colors">
                        <td className="py-3 px-2 font-mono font-bold text-[#3D121C]">{tx.id}</td>
                        <td className="py-3 px-2 font-bold text-[#2C2825]">{tx.type}</td>
                        <td className="py-3 px-2 text-[#5C534B]">{tx.peer}</td>
                        <td className="py-3 px-2 text-[#786F66]">{tx.date}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            tx.status === 'Completed' || tx.status === 'Settled'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className={`py-3 px-2 text-right font-extrabold text-sm ${
                          tx.isCredit ? 'text-[#10B981]' : 'text-[#6B1D2F]'
                        }`}>
                          {tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CAMPUS LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#3D121C]">Campus Top Skill Contributors</h2>
              <p className="text-xs text-[#786F66] mt-1">
                Honoring students who have contributed the most hours of peer education this semester.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E3DCD0] overflow-hidden shadow-sm">
              <div className="divide-y divide-[#E8E2D5]">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="p-5 flex items-center justify-between hover:bg-[#F5F2EB] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        user.rank === 1 ? 'bg-[#E8C872] text-[#3D121C]' :
                        user.rank === 2 ? 'bg-slate-300 text-slate-800' :
                        user.rank === 3 ? 'bg-amber-600 text-white' : 'bg-[#E8E2D5] text-[#5C534B]'
                      }`}>
                        #{user.rank}
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-[#2C2825]">{user.name}</h4>
                        <p className="text-xs text-[#786F66]">{user.dept} Dept</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#6B1D2F] block">{user.hoursTaught} Hours Taught</span>
                        <span className="text-[10px] text-[#8A8075]">{user.creditsEarned} Credits Earned</span>
                      </div>

                      <span className="bg-[#3D121C] text-[#E8C872] text-[10px] font-bold px-3 py-1 rounded-full border border-[#6B1D2F]">
                        {user.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* BOOKING MODAL */}
      {bookingModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 bg-[#2C2825]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full border border-[#E3DCD0] shadow-2xl p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
              <h3 className="font-extrabold text-lg text-[#3D121C]">Confirm Session Booking</h3>
              <button 
                onClick={() => setBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#E8E2D5] flex items-center justify-center text-[#5C534B] hover:bg-[#D5CCBC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 bg-[#F5F2EB] p-3 rounded-2xl border border-[#E8E2D5]">
                <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-[#2C2825]">{selectedMentor.name}</h4>
                  <p className="text-[#786F66]">{selectedMentor.skill}</p>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#3D121C] block mb-1">Select Date</label>
                <input 
                  type="date" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border border-[#D8D0C0] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-[#3D121C] block mb-1">Select Start Time</label>
                <input 
                  type="time" 
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F5F2EB] border border-[#D8D0C0] font-medium"
                />
              </div>

              <div className="p-4 bg-[#3D121C] text-[#F5F2EB] rounded-2xl space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Time Credit Cost:</span>
                  <span className="text-[#E8C872]">1.0 Credit (1 Hour)</span>
                </div>
                <p className="text-[10px] text-[#E8E2D5]/70">This credit will be safely held in Escrow until completion.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-1/2 py-3 rounded-xl border border-[#D8D0C0] text-xs font-bold text-[#5C534B] hover:bg-[#E8E2D5]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="w-1/2 py-3 rounded-xl bg-[#6B1D2F] hover:bg-[#800020] text-[#F5F2EB] text-xs font-bold shadow-md"
              >
                Lock Credit & Book
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#E3DCD0] bg-[#FAF8F5] py-6 px-6 mt-12 text-center text-xs text-[#8A8075]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#3D121C]">SkillSynapse Platform</span>
            <span>•</span>
            <span>PS ID: ECCLISIA26-003</span>
          </div>
          <p>© 2026 Assam Down Town University (ADTU) Hackathon Submission</p>
        </div>
      </footer>

    </div>
  );
}