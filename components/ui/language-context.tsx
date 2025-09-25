"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations
const translations = {
  en: {
    // Generic app text
    "app_title": "CalmSpace",
    "app_description": "Mental Wellness Platform",
    
    // Navigation items
    "home": "Home",
    "chat": "Chat", 
    "resources": "Resources",
    "bookings": "Bookings",
    "community": "Community",
    "counselor_schedule": "Counselor Schedule",
    "ai_chat": "AI Chat",
    "counselor_history": "Counselor History",
    "your_counselors": "Your Counselors",
    
    // Common
    "choose_your_path": "Choose Your Path",
    "select_role": "Select your role to access personalized features and resources",
    "back": "Back",
    "secure_fast_intuitive": "Secure • Fast • Intuitive",
    "welcome_back": "Welcome Back",
    "sign_in": "Sign In",
    "search_university": "Search University...",
    "enter_university_id": "Enter University ID",
    "enter_password": "Enter Password",
    "forgot_password": "Forgot password?",
    "role": "Role",
    "role_not_found": "Role not found",
    
    // Dashboard
    "mental_health_dashboard": "Mental Health Dashboard",
    "analytics_insights": "Analytics & Insights",
    "college_dashboard": "College Dashboard",
    "view_institutional": "View institutional analytics and management tools",
    "chats_initiated": "Chats Initiated",
    "active_bookings": "Active Bookings",
    "flagged_urgent": "Flagged Urgent",
    "mood_index": "Mood Index",
    "manage_bookings": "Manage Bookings",
    "recent_booking": "Recent booking activity",
    "chats_history": "Chats History",
    "recent_conversations": "Recent conversations",
    "select_timeframe": "Select Timeframe",
    "today": "Today",
    "last_7_days": "Last 7 Days",
    "last_30_days": "Last 30 Days",
    "custom": "Custom",
    "timeframe": "Timeframe",
    "open": "Open",
    "reschedule": "Reschedule",
    "confirmed": "Confirmed",
    "pending": "Pending",
    "completed": "Completed",
    
    // Resources
    "resources_self_help": "Resources & Self-Help 📚",
    "curated_guides": "Curated guides, exercises, and tools to support your mental well-being. ✨",
    "search_resources": "Search resources...",
    "category": "Category",
    "format": "Format",
    "sort": "Sort",
    "view_resource": "View Resource",
    "featured_guides": "Featured guides ⭐",
    "recently_viewed": "Recently viewed 👁️",
    "saved_resources": "Saved resources 💜",
    "nothing_yet": "Nothing yet",
    "nothing_saved": "Nothing saved",
    "no_results_found": "No results found",
    "try_adjusting_filters": "Try adjusting your filters.",
    "show": "Show",
    "hide": "Hide",
    "quick_access": "Quick Access",
    "remove": "Remove",
    "save": "Save",
    "saved": "Saved",
    "most_popular": "Most Popular",
    "newest": "Newest",
    "recommended": "Recommended",
    
    // Resource Data Content
    "resource_breathing_title": "5-Minute Breathing Exercise",
    "resource_breathing_desc": "A quick, guided breathing routine to reduce anxiety and refocus.",
    "resource_restructuring_title": "Cognitive Restructuring Worksheet", 
    "resource_restructuring_desc": "Identify unhelpful thoughts and reframe them with practical steps.",
    "resource_sleep_title": "Sleep Hygiene 101",
    "resource_sleep_desc": "Improve your sleep quality with proven habits and a simple evening routine.",
    "resource_bodyscan_title": "Mindful Body Scan",
    "resource_bodyscan_desc": "A 10-minute audio to ground yourself and release tension.",
    "resource_grounding_title": "Anxiety Grounding Techniques",
    "resource_grounding_desc": "Learn 3 quick grounding techniques for panic and high-stress moments.",
    "resource_focus_title": "Focus Sprint Template",
    "resource_focus_desc": "A simple, printable template to run 25-minute focus sprints.",
    
    // Categories
    "category_anxiety": "Anxiety",
    "category_mindfulness": "Mindfulness", 
    "category_sleep": "Sleep",
    "category_depression": "Depression",
    "category_stress": "Stress",
    "category_productivity": "Productivity",
    
    // Formats
    "format_article": "Article",
    "format_video": "Video", 
    "format_worksheet": "Worksheet",
    "format_guide": "Guide",
    
    // Counselor Data
    "counselor_sarah_chen": "Dr. Sarah Chen",
    "counselor_sarah_title": "Licensed Clinical Psychologist",
    "counselor_michael_rodriguez": "Dr. Michael Rodriguez", 
    "counselor_michael_title": "Licensed Marriage & Family Therapist",
    "counselor_emily_johnson": "Dr. Emily Johnson",
    "counselor_emily_title": "Licensed Professional Counselor",
    "counselor_david_kim": "Dr. David Kim",
    "counselor_david_title": "Licensed Clinical Social Worker",
    "counselor_lisa_thompson": "Dr. Lisa Thompson",
    "counselor_lisa_title": "Licensed Mental Health Counselor",
    
    // Booking Status
    "click_to_book": "Click to Book",
    "unavailable": "Unavailable", 
    "booked": "Booked",
    
    // Chat Content
    "chat_counselor_maya": "Dr. Maya Singh",
    "chat_counselor_alex": "Alex Rivera", 
    "chat_counselor_priya": "Priya N.",
    "chat_maya_message": "Let's revisit your sleep routine.",
    "chat_alex_message": "How was your breathing exercise?",
    "chat_priya_message": "Sending the grounding steps again.",
    "chat_time_2h": "2h",
    "chat_time_yesterday": "Yesterday",
    "chat_time_monday": "Mon",
    "chat_prompt_anxious": "I'm feeling anxious about work",
    "chat_prompt_sleep": "Help me with sleep issues",
    "chat_prompt_coping": "I need coping strategies", 
    "chat_prompt_stress": "Let's talk about stress management",
    "chat_how_can_i_help": "How can I help you today?",
    "chat_type_message_instruction": "Type a message or choose a prompt to get started",
    
    // Booking Specialties
    "specialty_anxiety": "Anxiety",
    "specialty_depression": "Depression", 
    "specialty_trauma": "Trauma",
    "specialty_couples_therapy": "Couples Therapy",
    "specialty_family_counseling": "Family Counseling",
    "specialty_addiction": "Addiction",
    "specialty_grief_counseling": "Grief Counseling",
    "specialty_teen_counseling": "Teen Counseling",
    "specialty_adhd": "ADHD",
    "specialty_cbt": "CBT",
    "specialty_mindfulness": "Mindfulness",
    
    // Time Slots
    "time_10am": "10am",
    "time_11am": "11am", 
    "time_noon": "Noon",
    "time_1pm": "1pm",
    "time_2pm": "2pm",
    "time_3pm": "3pm", 
    "time_4pm": "4pm",
    "time_5pm": "5pm",
    "time_10am_11am": "10am - 11am",
    "time_11am_12pm": "11am - 12pm",
    "time_1pm_2pm": "1pm - 2pm",
    "time_2pm_3pm": "2pm - 3pm",
    "time_3pm_4pm": "3pm - 4pm",
    "time_4pm_5pm": "4pm - 5pm",
    
    // Booking Interface
    "counselor_label": "Counselor",
    "filter_by_specialty": "Filter by Specialty",
    "clear_all_filters": "Clear all filters",
    "filters": "Filters",
    "calendar": "Calendar",
    
    // Dashboard Content (only new keys)
    "dashboard_recent_booking_activity": "Recent booking activity",
    "dashboard_recent_conversations": "Recent conversations",
    "dashboard_reschedule": "Reschedule",
    "dashboard_view_institutional_analytics": "View institutional analytics and management tools",
    "dashboard_select_timeframe": "Select Timeframe:",
    "dashboard_timeframe": "Timeframe",
    "dashboard_last_7_days": "Last 7 Days", 
    "dashboard_last_30_days": "Last 30 Days",
    "dashboard_custom": "Custom",
    "dashboard_yesterday": "Yesterday",
    "dashboard_chats_initiated": "Chats Initiated",
    "dashboard_active_bookings": "Active Bookings", 
    "dashboard_flagged_urgent": "Flagged Urgent",
    "dashboard_mood_index": "Mood Index",
    "dashboard_confirmed": "Confirmed",
    "dashboard_pending": "Pending",
    "dashboard_completed": "Completed",
    "dashboard_today_1400": "Today, 14:00",
    "dashboard_today_1230": "Today, 12:30", 
    "dashboard_yesterday_1615": "Yesterday, 16:15",
    "dashboard_panic_feelings_improved": "Panic feelings improved after breathing exercise.",
    "dashboard_discussed_sleep_hygiene": "Discussed sleep hygiene and study plan.",
    "dashboard_explored_motivation_triggers": "Explored motivation triggers and small goals.",
    
    // Profile Page
    "profile_manage_personal_info": "Manage your personal info and preferences.",
    "profile_student_name": "Student Name",
    "profile_student_email": "student@example.com",
    "profile_change": "Change", 
    "profile_name": "Name",
    "profile_email": "Email",
    "profile_email_notifications": "Email notifications",
    "profile_receive_important_updates": "Receive important updates",
    "profile_push_notifications": "Push notifications",
    "profile_enable_device_alerts": "Enable device alerts",
    "profile_save_changes": "Save changes",
    
    // Notifications Page
    "notifications_stay_up_to_date": "Stay up to date across chats, bookings, and community.",
    "notifications_mark_all_read": "Mark all read",
    "notifications_clear_all": "Clear all", 
    "notifications_all_caught_up": "You are all caught up.",
    "notifications_new": "New",
    "notification_new_message_from_ai": "New message from Support AI",
    "notification_breathing_exercise": "I found a breathing exercise you might like.",
    "notification_booking_confirmed": "Booking confirmed",
    "notification_session_with_ms_lee": "Your session with Ms. Lee is set for Thu 4:00 PM.",
    "notification_community_reply": "Community reply",
    "notification_alex_replied": "Alex replied to your post in Exam Stress.",
    "notification_time_2m": "2m",
    "notification_time_1h": "1h",
    "all": "All",
    
    // Categories & Formats
    "anxiety": "Anxiety",
    "mindfulness": "Mindfulness",
    "sleep": "Sleep",
    "depression": "Depression",
    "stress": "Stress",
    "productivity": "Productivity",
    "article": "Article",
    "video": "Video",
    "worksheet": "Worksheet",
    "guide": "Guide",
    
    // Profile & Navigation
    "profile": "Profile",
    "notifications": "Notifications",
    "dashboard": "Dashboard",
    "logout": "Logout",
    "health": "Health",
    
    // Auth Pages
    "university": "University",
    "counselor": "Counselor",
    "student": "Student",
    
    // Common Actions
    "submit": "Submit",
    "cancel": "Cancel",
    "edit": "Edit",
    "delete": "Delete",
    "create": "Create",
    "update": "Update",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    
    // Home Page
    "student_mental_wellness_platform": "Student Mental Wellness Platform",
    "home_chat_ai_description": "Chat with AI, book therapists anonymously, and grow with student-focused resources",
    "ai_chat_support": "AI Chat Support",
    "ai_chat_support_desc": "24/7 guidance for stress and anxiety",
    "anonymous_booking": "Anonymous Booking",
    "anonymous_booking_desc": "Find student-focused therapists safely",
    "personal_growth": "Personal Growth",
    "personal_growth_desc": "Curated mental health resources",
    
    // Reports Page
    "reports": "Reports",
    "reports_description": "Search and view details for students and counselors",
    "search_by_name_email": "Search by name or email",
    "enter_name_email": "Enter name or email...",
    "search_type": "Search Type",
    "search_results": "Search Results",
    "students": "Students",
    "counselors": "Counselors",
    
    // Hero Component
    "peace_love_santuy": "Peace Love and Santuy",
    "hero_title": "Mental Wellness From Research to Remedy. 🧠",
    "hero_description": "Peacelab identifies, innovates, and commercializes new methods. Psychedelics can heal a world in pain and Peacelab is leading the way. 💜",
    "get_started": "GET STARTED",
    
    // Mental Health Dashboard
    "student_mental_health_analytics": "Student Mental Health Analytics 📊",
    "track_emotional_wellbeing": "Track your emotional well-being with AI-powered insights designed for student life",
    "stress_level": "Stress Level 🧠",
    "academic_pressure_tracking": "Academic pressure tracking over the week",
    "anxiety_episodes": "Anxiety Episodes 💜",
    "weekly_anxiety_pattern": "Weekly anxiety pattern analysis",
    "sleep_quality": "Sleep Quality 💤",
    "average_sleep_exam": "Average sleep during exam period",
    "focus_stability": "Focus Stability 🎯",
    "concentration_study": "Concentration during study sessions",
    "daily_mood": "Daily Mood 😊",
    "weekly_emotional_patterns": "Weekly emotional patterns",
    "study_sessions": "Study Sessions 📚",
    "study_intensity_weeks": "Study intensity over 3 weeks",
    
    // Features Component
    "features": "Features",
    "anonymous_booking_feature": "Anonymous booking 🔒",
    "anonymous_booking_feature_desc": "Your privacy comes first—stress-free support without judgment.",
    "ai_powered_chat_feature": "AI-powered chat ✨",
    "ai_powered_chat_feature_desc": "24/7 guidance for academic stress and mental wellness.",
    "student_counselors_feature": "Student counselors 👥",
    "student_counselors_feature_desc": "Verified therapists who understand student life.",
    "stress_management_feature": "Stress management 📚",
    "stress_management_feature_desc": "Curated guides for exam anxiety and academic pressure.",
    "peer_communities_feature": "Peer communities 💬",
    "peer_communities_feature_desc": "Safe spaces for students to share and support each other.",
    
    // Testimonials Component
    "testimonials_title": "Student Community & Testimonials 💬",
    "testimonial_alex_name": "Alex (College Student)",
    "testimonial_alex_text": "Managing exam stress became so much easier. The AI helped me track my anxiety patterns and find calm.",
    "testimonial_maya_name": "Maya (University)",
    "testimonial_maya_text": "The mood tracking helped me realize my stress triggers during finals week. Life-changing insights!",
    "testimonial_jai_name": "Jai (Graduate Student)",
    "testimonial_jai_text": "Clean, simple, and exactly what stressed students need. No overwhelming features, just helpful support.",
    
    // CTA Component
    "cta_title": "Start your mental wellness journey today 🌟 — it's free, anonymous, and designed for students like you. 🎓",
    "cta_button": "Begin Your Journey 🧠",
    
    // Footer Component
    "footer_home": "Home",
    "footer_chat": "Chat",
    "footer_booking": "Booking",
    "footer_resources": "Resources",
    "footer_community": "Community",
    "footer_copyright": "All rights reserved.",
    
    // MoodTrackerApp Component
    "mood_tracker_title": "Mood Tracking Made Beautiful",
    "mood_tracker_description": "Express your emotions with playful characters and elegant design",
    "how_feeling_today": "How are you feeling today?",
    "share_how_feel": "Share how feel in mood.",
    "mood_get_started": "Get Started",
    "already_have_account": "Already have an account?",
    "log_in": "Log in",
    "good_morning_dan": "Good Morning Dan!",
    "start_your_day": "Start your day here!",
    "for_good_mornings": "For Good Mornings",
    "for_afternoon_lifts": "For Afternoon Lifts",
    "new_day": "New Day",
    "fresh_start": "Fresh Start",
    "bright_mornings": "Bright Mornings,",
    "bold_beginnings": "Bold Beginnings",
    "awake_energize": "Awake, Energize,",
    "conquer_today": "Conquer Today",
    "pause_recharge": "Pause, Recharge,",
    "power_up": "Power Up",
    "keep_calm": "Keep Calm,",
    "stay_focused": "Stay Focused",
    "select_todays_mood": "Select your today's mood",
    "mood_save": "Save",
    "joyful": "Joyful",
    "cheerful": "Cheerful",
    "content": "Content",
    "heartbroken": "Heartbroken",
    "despairing": "Despairing",
    "devastated": "Devastated",
  },
  hi: {
    // Generic app text
    "app_title": "CalmSpace",
    "app_description": "मानसिक कल्याण प्लेटफॉर्म",
    
    // Navigation items
    "home": "होम",
    "chat": "चैट", 
    "resources": "संसाधन",
    "bookings": "बुकिंग",
    "community": "समुदाय",
    "counselor_schedule": "सलाहकार कार्यक्रम",
    "ai_chat": "AI चैट",
    "counselor_history": "सलाहकार इतिहास",
    "your_counselors": "आपके सलाहकार",
    
    // Common
    "choose_your_path": "अपना रास्ता चुनें",
    "select_role": "व्यक्तिगत सुविधाओं और संसाधनों तक पहुंचने के लिए अपनी भूमिका का चयन करें",
    "back": "वापस",
    "secure_fast_intuitive": "सुरक्षित • तेज़ • सहज",
    "welcome_back": "वापसी पर स्वागत है",
    "sign_in": "साइन इन करें",
    "search_university": "विश्वविद्यालय खोजें...",
    "enter_university_id": "विश्वविद्यालय आईडी दर्ज करें",
    "enter_password": "पासवर्ड दर्ज करें",
    "forgot_password": "पासवर्ड भूल गए?",
    "role": "भूमिका",
    "role_not_found": "भूमिका नहीं मिली",
    
    // Dashboard
    "mental_health_dashboard": "मानसिक स्वास्थ्य डैशबोर्ड",
    "analytics_insights": "विश्लेषणात्मक और अंतर्दृष्टि",
    "college_dashboard": "कॉलेज डैशबोर्ड",
    "view_institutional": "संस्थागत विश्लेषण और प्रबंधन उपकरण देखें",
    "chats_initiated": "चैट शुरू की गई",
    "active_bookings": "सक्रिय बुकिंग",
    "flagged_urgent": "तत्काल चिह्नित",
    "mood_index": "मूड सूचकांक",
    "manage_bookings": "बुकिंग प्रबंधन",
    "recent_booking": "हाल की बुकिंग गतिविधि",
    "chats_history": "चैट इतिहास",
    "recent_conversations": "हाल की बातचीत",
    "select_timeframe": "समयसीमा चुनें",
    "today": "आज",
    "last_7_days": "पिछले 7 दिन",
    "last_30_days": "पिछले 30 दिन",
    "custom": "कस्टम",
    "timeframe": "समयसीमा",
    "open": "खोलें",
    "reschedule": "पुनर्निर्धारण",
    "confirmed": "पुष्ट",
    "pending": "लंबित",
    "completed": "पूर्ण",
    
    // Resources
    "resources_self_help": "संसाधन और स्वयं सहायता 📚",
    "curated_guides": "आपकी मानसिक भलाई का समर्थन करने के लिए क्यूरेटेड गाइड, अभ्यास और उपकरण। ✨",
    "search_resources": "संसाधन खोजें...",
    "category": "श्रेणी",
    "format": "प्रारूप",
    "sort": "क्रमबद्ध",
    "view_resource": "संसाधन देखें",
    "featured_guides": "विशेष गाइड ⭐",
    "recently_viewed": "हाल में देखे गए 👁️",
    "saved_resources": "सहेजे गए संसाधन 💜",
    "nothing_yet": "अभी तक कुछ नहीं",
    "nothing_saved": "कुछ भी सहेजा नहीं गया",
    "no_results_found": "कोई परिणाम नहीं मिला",
    "try_adjusting_filters": "अपने फ़िल्टर समायोजित करने का प्रयास करें।",
    "show": "दिखाएं",
    "hide": "छुपाएं",
    "quick_access": "त्वरित पहुंच",
    "remove": "हटाएं",
    "save": "सहेजें",
    "saved": "सहेजा गया",
    "most_popular": "सबसे लोकप्रिय",
    "newest": "नवीनतम",
    "recommended": "अनुशंसित",
    
    // Resource Data Content
    "resource_breathing_title": "5-मिनट सांस लेने का व्यायाम",
    "resource_breathing_desc": "चिंता कम करने और फिर से ध्यान केंद्रित करने के लिए एक त्वरित, निर्देशित सांस लेने की दिनचर्या।",
    "resource_restructuring_title": "संज्ञानात्मक पुनर्गठन वर्कशीट", 
    "resource_restructuring_desc": "अनुपयोगी विचारों की पहचान करें और व्यावहारिक चरणों के साथ उन्हें फिर से तैयार करें।",
    "resource_sleep_title": "नींद की स्वच्छता 101",
    "resource_sleep_desc": "सिद्ध आदतों और सरल शाम की दिनचर्या के साथ अपनी नींद की गुणवत्ता में सुधार करें।",
    "resource_bodyscan_title": "माइंडफुल बॉडी स्कैन",
    "resource_bodyscan_desc": "अपने आप को स्थिर करने और तनाव मुक्त करने के लिए 10-मिनट का ऑडियो।",
    "resource_grounding_title": "चिंता ग्राउंडिंग तकनीकें",
    "resource_grounding_desc": "घबराहट और उच्च तनाव के क्षणों के लिए 3 त्वरित ग्राउंडिंग तकनीकें सीखें।",
    "resource_focus_title": "फोकस स्प्रिंट टेम्प्लेट",
    "resource_focus_desc": "25-मिनट के फोकस स्प्रिंट चलाने के लिए एक सरल, प्रिंट करने योग्य टेम्प्लेट।",
    
    // Categories
    "category_anxiety": "चिंता",
    "category_mindfulness": "माइंडफुलनेस", 
    "category_sleep": "नींद",
    "category_depression": "अवसाद",
    "category_stress": "तनाव",
    "category_productivity": "उत्पादकता",
    
    // Formats
    "format_article": "लेख",
    "format_video": "वीडियो", 
    "format_worksheet": "वर्कशीट",
    "format_guide": "गाइड",
    
    // Counselor Data
    "counselor_sarah_chen": "डॉ. सारा चेन",
    "counselor_sarah_title": "लाइसेंस प्राप्त क्लिनिकल मनोवैज्ञानिक",
    "counselor_michael_rodriguez": "डॉ. माइकल रोड्रिगेज", 
    "counselor_michael_title": "लाइसेंस प्राप्त विवाह और पारिवारिक चिकित्सक",
    "counselor_emily_johnson": "डॉ. एमिली जॉन्सन",
    "counselor_emily_title": "लाइसेंस प्राप्त पेशेवर परामर्शदाता",
    "counselor_david_kim": "डॉ. डेविड किम",
    "counselor_david_title": "लाइसेंस प्राप्त क्लिनिकल सामाजिक कार्यकर्ता",
    "counselor_lisa_thompson": "डॉ. लिसा थॉम्पसन",
    "counselor_lisa_title": "लाइसेंस प्राप्त मानसिक स्वास्थ्य परामर्शदाता",
    
    // Booking Status
    "click_to_book": "बुक करने के लिए क्लिक करें",
    "unavailable": "अनुपलब्ध", 
    "booked": "बुक किया गया",
    
    // Chat Content
    "chat_counselor_maya": "डॉ. माया सिंह",
    "chat_counselor_alex": "एलेक्स रिवेरा", 
    "chat_counselor_priya": "प्रिया एन.",
    "chat_maya_message": "आइए अपनी नींद की दिनचर्या पर दोबारा नज़र डालते हैं।",
    "chat_alex_message": "आपका सांस लेने का व्यायाम कैसा रहा?",
    "chat_priya_message": "ग्राउंडिंग स्टेप्स फिर से भेज रहा हूं।",
    "chat_time_2h": "2 घंटे",
    "chat_time_yesterday": "कल",
    "chat_time_monday": "सोमवार",
    "chat_prompt_anxious": "मैं काम को लेकर चिंतित महसूस कर रहा हूं",
    "chat_prompt_sleep": "नींद की समस्याओं में मेरी मदद करें",
    "chat_prompt_coping": "मुझे सहायक रणनीतियों की आवश्यकता है", 
    "chat_prompt_stress": "आइए तनाव प्रबंधन के बारे में बात करते हैं",
    "chat_how_can_i_help": "मैं आज आपकी कैसे मदद कर सकता हूं?",
    "chat_type_message_instruction": "एक संदेश टाइप करें या शुरू करने के लिए एक प्रॉम्प्ट चुनें",
    
    // Booking Specialties  
    "specialty_anxiety": "चिंता",
    "specialty_depression": "अवसाद",
    "specialty_trauma": "आघात", 
    "specialty_couples_therapy": "जोड़े की चिकित्सा",
    "specialty_family_counseling": "पारिवारिक परामर्श",
    "specialty_addiction": "लत",
    "specialty_grief_counseling": "शोक परामर्श",
    "specialty_teen_counseling": "किशोर परामर्श",
    "specialty_adhd": "ADHD", 
    "specialty_cbt": "CBT",
    "specialty_mindfulness": "सचेतता",
    
    // Time Slots
    "time_10am": "सुबह 10 बजे",
    "time_11am": "सुबह 11 बजे",
    "time_noon": "दोपहर",
    "time_1pm": "दोपहर 1 बजे", 
    "time_2pm": "दोपहर 2 बजे",
    "time_3pm": "दोपहर 3 बजे",
    "time_4pm": "शाम 4 बजे",
    "time_5pm": "शाम 5 बजे",
    "time_10am_11am": "सुबह 10 बजे - 11 बजे",
    "time_11am_12pm": "सुबह 11 बजे - दोपहर 12 बजे",
    "time_1pm_2pm": "दोपहर 1 बजे - 2 बजे",
    "time_2pm_3pm": "दोपहर 2 बजे - 3 बजे",
    "time_3pm_4pm": "दोपहर 3 बजे - 4 बजे",
    "time_4pm_5pm": "शाम 4 बजे - 5 बजे",
    
    // Booking Interface
    "counselor_label": "परामर्शदाता",
    "filter_by_specialty": "विशेषता के आधार पर फ़िल्टर करें",
    "clear_all_filters": "सभी फ़िल्टर साफ़ करें",
    "filters": "फ़िल्टर",
    "calendar": "कैलेंडर",
    
    // Dashboard Content (only new keys)
    "dashboard_recent_booking_activity": "हाल की बुकिंग गतिविधि",
    "dashboard_recent_conversations": "हाल की बातचीत",
    "dashboard_reschedule": "पुनर्निर्धारण",
    "dashboard_view_institutional_analytics": "संस्थागत विश्लेषण और प्रबंधन उपकरण देखें",
    "dashboard_select_timeframe": "समय सीमा चुनें:",
    "dashboard_timeframe": "समय सीमा",
    "dashboard_last_7_days": "पिछले 7 दिन", 
    "dashboard_last_30_days": "पिछले 30 दिन",
    "dashboard_custom": "कस्टम",
    "dashboard_yesterday": "कल",
    "dashboard_chats_initiated": "शुरू की गई चैट्स",
    "dashboard_active_bookings": "सक्रिय बुकिंग", 
    "dashboard_flagged_urgent": "तत्काल चिह्नित",
    "dashboard_mood_index": "मूड इंडेक्स",
    "dashboard_confirmed": "पुष्ट",
    "dashboard_pending": "लंबित",
    "dashboard_completed": "पूर्ण",
    "dashboard_today_1400": "आज, 14:00",
    "dashboard_today_1230": "आज, 12:30", 
    "dashboard_yesterday_1615": "कल, 16:15",
    "dashboard_panic_feelings_improved": "सांस लेने के व्यायाम के बाद घबराहट की भावना में सुधार हुआ।",
    "dashboard_discussed_sleep_hygiene": "नींद की स्वच्छता और अध्ययन योजना पर चर्चा की।",
    "dashboard_explored_motivation_triggers": "प्रेरणा ट्रिगर और छोटे लक्ष्यों की खोज की।",
    
    // Profile Page
    "profile_manage_personal_info": "अपनी व्यक्तिगत जानकारी और प्राथमिकताएं प्रबंधित करें।",
    "profile_student_name": "छात्र का नाम",
    "profile_student_email": "student@example.com",
    "profile_change": "बदलें", 
    "profile_name": "नाम",
    "profile_email": "ईमेल",
    "profile_email_notifications": "ईमेल सूचनाएं",
    "profile_receive_important_updates": "महत्वपूर्ण अपडेट प्राप्त करें",
    "profile_push_notifications": "पुश सूचनाएं",
    "profile_enable_device_alerts": "डिवाइस अलर्ट सक्षम करें",
    "profile_save_changes": "परिवर्तन सहेजें",
    
    // Notifications Page
    "notifications_stay_up_to_date": "चैट्स, बुकिंग और कम्यूनिटी में अपडेट रहें।",
    "notifications_mark_all_read": "सभी को पढ़ा हुआ मार्क करें",
    "notifications_clear_all": "सभी साफ़ करें", 
    "notifications_all_caught_up": "आप सभी के साथ अपडेट हैं।",
    "notifications_new": "नया",
    "notification_new_message_from_ai": "सपोर्ट AI से नया संदेश",
    "notification_breathing_exercise": "मुझे एक सांस लेने का व्यायाम मिला जो आपको पसंद आ सकता है।",
    "notification_booking_confirmed": "बुकिंग पुष्ट",
    "notification_session_with_ms_lee": "श्रीमती ली के साथ आपका सेशन गुरुवार शाम 4:00 बजे निर्धारित है।",
    "notification_community_reply": "कम्यूनिटी जवाब",
    "notification_alex_replied": "एलेक्स ने Exam Stress में आपकी पोस्ट का जवाब दिया।",
    "notification_time_2m": "2 मिनट",
    "notification_time_1h": "1 घंटा",
    "all": "सभी",
    
    // Categories & Formats
    "anxiety": "चिंता",
    "mindfulness": "सचेतना",
    "sleep": "नींद",
    "depression": "अवसाद",
    "stress": "तनाव",
    "productivity": "उत्पादकता",
    "article": "लेख",
    "video": "वीडियो",
    "worksheet": "वर्कशीट",
    "guide": "गाइड",
    
    // Profile & Navigation
    "profile": "प्रोफ़ाइल",
    "notifications": "सूचनाएं",
    "dashboard": "डैशबोर्ड",
    "logout": "लॉग आउट",
    "health": "स्वास्थ्य",
    
    // Auth Pages
    "university": "विश्वविद्यालय",
    "counselor": "सलाहकार",
    "student": "छात्र",
    
    // Common Actions
    "submit": "जमा करें",
    "cancel": "रद्द करें",
    "edit": "संपादित करें",
    "delete": "हटाएं",
    "create": "बनाएं",
    "update": "अपडेट करें",
    "loading": "लोड हो रहा है...",
    "error": "त्रुटि",
    "success": "सफलता",
    
    // Home Page
    "student_mental_wellness_platform": "छात्र मानसिक कल्याण प्लेटफॉर्म",
    "home_chat_ai_description": "AI के साथ चैट करें, गुमनाम रूप से चिकित्सकों को बुक करें, और छात्र-केंद्रित संसाधनों के साथ बढ़ें",
    "ai_chat_support": "AI चैट सहायता",
    "ai_chat_support_desc": "तनाव और चिंता के लिए 24/7 मार्गदर्शन",
    "anonymous_booking": "गुमनाम बुकिंग",
    "anonymous_booking_desc": "सुरक्षित रूप से छात्र-केंद्रित चिकित्सक खोजें",
    "personal_growth": "व्यक्तिगत विकास",
    "personal_growth_desc": "क्यूरेटेड मानसिक स्वास्थ्य संसाधन",
    
    // Reports Page
    "reports": "रिपोर्ट्स",
    "reports_description": "छात्रों और परामर्शदाताओं के लिए विवरण खोजें और देखें",
    "search_by_name_email": "नाम या ईमेल द्वारा खोजें",
    "enter_name_email": "नाम या ईमेल दर्ज करें...",
    "search_type": "खोज प्रकार",
    "search_results": "खोज परिणाम",
    "students": "छात्र",
    "counselors": "परामर्शदाता",
    
    // Hero Component
    "peace_love_santuy": "शांति प्रेम और संतुई",
    "hero_title": "अनुसंधान से उपाय तक मानसिक कल्याण। 🧠",
    "hero_description": "पीसलैब नई विधियों की पहचान, नवाचार और व्यावसायीकरण करता है। साइकेडेलिक्स दर्द में डूबी दुनिया को ठीक कर सकते हैं और पीसलैब इसका नेतृत्व कर रहा है। 💜",
    "get_started": "शुरू करें",
    
    // Mental Health Dashboard
    "student_mental_health_analytics": "छात्र मानसिक स्वास्थ्य विश्लेषणात्मक 📊",
    "track_emotional_wellbeing": "छात्र जीवन के लिए डिज़ाइन की गई AI-संचालित अंतर्दृष्टि के साथ अपनी भावनात्मक भलाई को ट्रैक करें",
    "stress_level": "तनाव स्तर 🧠",
    "academic_pressure_tracking": "सप्ताह भर में शैक्षणिक दबाव की ट्रैकिंग",
    "anxiety_episodes": "चिंता के एपिसोड 💜",
    "weekly_anxiety_pattern": "साप्ताहिक चिंता पैटर्न विश्लेषण",
    "sleep_quality": "नींद की गुणवत्ता 💤",
    "average_sleep_exam": "परीक्षा अवधि के दौरान औसत नींद",
    "focus_stability": "फोकस स्थिरता 🎯",
    "concentration_study": "अध्ययन सत्र के दौरान एकाग्रता",
    "daily_mood": "दैनिक मूड 😊",
    "weekly_emotional_patterns": "साप्ताहिक भावनात्मक पैटर्न",
    "study_sessions": "अध्ययन सत्र 📚",
    "study_intensity_weeks": "3 सप्ताह में अध्ययन की तीव्रता",
    
    // Features Component
    "features": "विशेषताएं",
    "anonymous_booking_feature": "गुमनाम बुकिंग 🔒",
    "anonymous_booking_feature_desc": "आपकी गोपनीयता पहले आती है—बिना जजमेंट के तनाव-मुक्त सहायता।",
    "ai_powered_chat_feature": "AI-संचालित चैट ✨",
    "ai_powered_chat_feature_desc": "शैक्षणिक तनाव और मानसिक कल्याण के लिए 24/7 मार्गदर्शन।",
    "student_counselors_feature": "छात्र परामर्शदाता 👥",
    "student_counselors_feature_desc": "सत्यापित चिकित्सक जो छात्र जीवन को समझते हैं।",
    "stress_management_feature": "तनाव प्रबंधन 📚",
    "stress_management_feature_desc": "परीक्षा चिंता और शैक्षणिक दबाव के लिए क्यूरेटेड गाइड।",
    "peer_communities_feature": "सहकर्मी समुदाय 💬",
    "peer_communities_feature_desc": "छात्रों के लिए सुरक्षित स्थान साझा करने और एक-दूसरे का समर्थन करने के लिए।",
    
    // Testimonials Component
    "testimonials_title": "छात्र समुदाय और प्रशंसापत्र 💬",
    "testimonial_alex_name": "एलेक्स (कॉलेज छात्र)",
    "testimonial_alex_text": "परीक्षा तनाव को संभालना इतना आसान हो गया। AI ने मुझे अपने चिंता पैटर्न ट्रैक करने और शांति पाने में मदद की।",
    "testimonial_maya_name": "माया (विश्वविद्यालय)",
    "testimonial_maya_text": "मूड ट्रैकिंग ने मुझे फाइनल सप्ताह के दौरान अपने तनाव ट्रिगर का एहसास कराया। जीवन बदलने वाली अंतर्दृष्टि!",
    "testimonial_jai_name": "जय (स्नातक छात्र)",
    "testimonial_jai_text": "स्वच्छ, सरल, और बिल्कुल वही जिसकी तनावग्रस्त छात्रों को आवश्यकता होती है। कोई भारी फीचर नहीं, बस सहायक समर्थन।",
    
    // CTA Component
    "cta_title": "आज ही अपनी मानसिक कल्याण की यात्रा शुरू करें 🌟 — यह मुफ्त, गुमनाम, और आपकी तरह के छात्रों के लिए डिज़ाइन किया गया है। 🎓",
    "cta_button": "अपनी यात्रा शुरू करें 🧠",
    
    // Footer Component
    "footer_home": "होम",
    "footer_chat": "चैट",
    "footer_booking": "बुकिंग",
    "footer_resources": "संसाधन",
    "footer_community": "समुदाय",
    "footer_copyright": "सभी अधिकार सुरक्षित।",
    
    // MoodTrackerApp Component
    "mood_tracker_title": "मूड ट्रैकिंग को सुंदर बनाया गया",
    "mood_tracker_description": "खेल जैसे पात्रों और सुंदर डिज़ाइन के साथ अपनी भावनाओं को व्यक्त करें",
    "how_feeling_today": "आज आप कैसा महसूस कर रहे हैं?",
    "share_how_feel": "बताएं कि आप कैसा महसूस कर रहे हैं।",
    "mood_get_started": "शुरू करें",
    "already_have_account": "पहले से खाता है?",
    "log_in": "लॉग इन करें",
    "good_morning_dan": "सुप्रभात डैन!",
    "start_your_day": "यहाँ से अपना दिन शुरू करें!",
    "for_good_mornings": "अच्छी सुबह के लिए",
    "for_afternoon_lifts": "दोपहर की ऊर्जा के लिए",
    "new_day": "नया दिन",
    "fresh_start": "नई शुरुआत",
    "bright_mornings": "उज्ज्वल सुबह,",
    "bold_beginnings": "साहसिक शुरुआत",
    "awake_energize": "जागो, ऊर्जा भरो,",
    "conquer_today": "आज जीतो",
    "pause_recharge": "रुको, रिचार्ज करो,",
    "power_up": "पावर अप",
    "keep_calm": "शांत रहो,",
    "stay_focused": "फोकस रहो",
    "select_todays_mood": "आज का अपना मूड चुनें",
    "mood_save": "सहेजें",
    "joyful": "खुशी",
    "cheerful": "प्रसन्न",
    "content": "संतुष्ट",
    "heartbroken": "दिल टूटा",
    "despairing": "निराश",
    "devastated": "तबाह",
  },
  ur: {
    // Generic app text
    "app_title": "CalmSpace",
    "app_description": "ذہنی بہبود پلیٹ فارم",
    
    // Navigation items
    "home": "ہوم",
    "chat": "چیٹ", 
    "resources": "وسائل",
    "bookings": "بکنگز",
    "community": "کمیونٹی",
    "counselor_schedule": "مشیر شیڈول",
    "ai_chat": "AI چیٹ",
    "counselor_history": "مشیر تاریخ",
    "your_counselors": "آپ کے مشیر",
    
    // Common
    "choose_your_path": "اپنا راستہ منتخب کریں",
    "select_role": "ذاتی خصوصیات اور وسائل تک رسائی کے لیے اپنا کردار منتخب کریں",
    "back": "واپس",
    "secure_fast_intuitive": "محفوظ • تیز • بدیہی",
    "welcome_back": "واپس آنے پر خوش آمدید",
    "sign_in": "سائن ان کریں",
    "search_university": "یونیورسٹی تلاش کریں...",
    "enter_university_id": "یونیورسٹی آئی ڈی داخل کریں",
    "enter_password": "پاس ورڈ داخل کریں",
    "forgot_password": "پاس ورڈ بھول گئے؟",
    "role": "کردار",
    "role_not_found": "کردار نہیں ملا",
    
    // Dashboard
    "mental_health_dashboard": "ذہنی صحت ڈیش بورڈ",
    "analytics_insights": "تجزیات اور بصیرت",
    "college_dashboard": "کالج ڈیش بورڈ",
    "view_institutional": "ادارہ جاتی تجزیات اور انتظامی آلات دیکھیں",
    "chats_initiated": "چیٹس شروع کی گئیں",
    "active_bookings": "فعال بکنگز",
    "flagged_urgent": "فوری نشان زد",
    "mood_index": "موڈ انڈکس",
    "manage_bookings": "بکنگز کا انتظام",
    "recent_booking": "حالیہ بکنگ سرگرمی",
    "chats_history": "چیٹس کی تاریخ",
    "recent_conversations": "حالیہ گفتگو",
    "select_timeframe": "وقت کا فریم منتخب کریں",
    "today": "آج",
    "last_7_days": "پچھلے 7 دن",
    "last_30_days": "پچھلے 30 دن",
    "custom": "کسٹم",
    "timeframe": "وقت کا فریم",
    "open": "کھولیں",
    "reschedule": "دوبارہ شیڈول کریں",
    "confirmed": "تصدیق شدہ",
    "pending": "زیر التوا",
    "completed": "مکمل",
    
    // Resources
    "resources_self_help": "وسائل اور خود مدد 📚",
    "curated_guides": "آپ کی ذہنی تندرستی کی حمایت کے لیے منتخب کردہ گائیڈز، مشقیں اور ٹولز۔ ✨",
    "search_resources": "وسائل تلاش کریں...",
    "category": "قسم",
    "format": "شکل",
    "sort": "ترتیب",
    "view_resource": "وسائل دیکھیں",
    "featured_guides": "خصوصی گائیڈز ⭐",
    "recently_viewed": "حال ہی میں دیکھے گئے 👁️",
    "saved_resources": "محفوظ کردہ وسائل 💜",
    "nothing_yet": "ابھی تک کچھ نہیں",
    "nothing_saved": "کچھ بھی محفوظ نہیں",
    "no_results_found": "کوئی نتائج نہیں ملے",
    "try_adjusting_filters": "اپنے فلٹرز کو ایڈجسٹ کرنے کی کوشش کریں۔",
    "show": "دکھائیں",
    "hide": "چھپائیں",
    "quick_access": "فوری رسائی",
    "remove": "ہٹائیں",
    "save": "محفوظ کریں",
    "saved": "محفوظ شدہ",
    "most_popular": "سب سے مقبول",
    "newest": "تازہ ترین",
    "recommended": "تجویز کردہ",
    
    // Resource Data Content
    "resource_breathing_title": "5 منٹ کی سانس لینے کی مشق",
    "resource_breathing_desc": "پریشانی کم کرنے اور دوبارہ توجہ مرکوز کرنے کے لیے ایک فوری، رہنمائی شدہ سانس لینے کا طریقہ۔",
    "resource_restructuring_title": "علمی بحالی ورک شیٹ", 
    "resource_restructuring_desc": "غیر مفید خیالات کی نشاندہی کریں اور عملی اقدامات کے ساتھ انہیں نئے انداز میں پیش کریں۔",
    "resource_sleep_title": "نیند کی حفظان صحت 101",
    "resource_sleep_desc": "ثابت شدہ عادات اور سادہ شام کے معمول کے ساتھ اپنی نیند کی کوالٹی بہتر بنائیں۔",
    "resource_bodyscan_title": "ذہن سازی جسمانی اسکین",
    "resource_bodyscan_desc": "اپنے آپ کو مستحکم کرنے اور تناؤ چھوڑنے کے لیے 10 منٹ کا آڈیو۔",
    "resource_grounding_title": "پریشانی گراؤنڈنگ تکنیکیں",
    "resource_grounding_desc": "گھبراہٹ اور زیادہ تناؤ کے لمحوں کے لیے 3 فوری گراؤنڈنگ تکنیکیں سیکھیں۔",
    "resource_focus_title": "فوکس اسپرنٹ ٹیمپلیٹ",
    "resource_focus_desc": "25 منٹ کے فوکس اسپرنٹس چلانے کے لیے ایک آسان، پرنٹ ایبل ٹیمپلیٹ۔",
    
    // Categories
    "category_anxiety": "پریشانی",
    "category_mindfulness": "ذہن سازی", 
    "category_sleep": "نیند",
    "category_depression": "ڈپریشن",
    "category_stress": "تناؤ",
    "category_productivity": "پیداواری صلاحیت",
    
    // Formats
    "format_article": "مضمون",
    "format_video": "ویڈیو", 
    "format_worksheet": "ورک شیٹ",
    "format_guide": "گائیڈ",
    
    // Counselor Data
    "counselor_sarah_chen": "ڈاکٹر سارہ چن",
    "counselor_sarah_title": "لائسنس یافتہ کلینیکل سائیکالوجسٹ",
    "counselor_michael_rodriguez": "ڈاکٹر مائیکل روڈریگز", 
    "counselor_michael_title": "لائسنس یافتہ شادی اور خاندانی معالج",
    "counselor_emily_johnson": "ڈاکٹر ایملی جانسن",
    "counselor_emily_title": "لائسنس یافتہ پیشہ ور مشیر",
    "counselor_david_kim": "ڈاکٹر ڈیوڈ کم",
    "counselor_david_title": "لائسنس یافتہ کلینیکل سماجی کارکن",
    "counselor_lisa_thompson": "ڈاکٹر لیزا تھامسن",
    "counselor_lisa_title": "لائسنس یافتہ ذہنی صحت مشیر",
    
    // Booking Status
    "click_to_book": "بک کرنے کے لیے کلک کریں",
    "unavailable": "دستیاب نہیں", 
    "booked": "بک شدہ",
    
    // Chat Content
    "chat_counselor_maya": "ڈاکٹر مایا سنگھ",
    "chat_counselor_alex": "ایلیکس رویرا", 
    "chat_counselor_priya": "پریا این.",
    "chat_maya_message": "آئیے آپ کے نیند کے معمول کا جائزہ لیتے ہیں۔",
    "chat_alex_message": "آپ کی سانس لینے کی مشق کیسی رہی؟",
    "chat_priya_message": "گراؤنڈنگ اسٹیپس دوبارہ بھیج رہا ہوں۔",
    "chat_time_2h": "2 گھنٹے",
    "chat_time_yesterday": "کل",
    "chat_time_monday": "پیر",
    "chat_prompt_anxious": "میں کام کے بارے میں پریشان محسوس کر رہا ہوں",
    "chat_prompt_sleep": "نیند کے مسائل میں میری مدد کریں",
    "chat_prompt_coping": "مجھے نمٹنے کی حکمت عملیوں کی ضرورت ہے", 
    "chat_prompt_stress": "آئیے تناؤ کے انتظام کے بارے میں بات کرتے ہیں",
    "chat_how_can_i_help": "آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
    "chat_type_message_instruction": "ایک پیغام ٹائپ کریں یا شروع کرنے کے لیے ایک پرامپٹ منتخب کریں",
    
    // Booking Specialties
    "specialty_anxiety": "بےچینی",
    "specialty_depression": "ڈپریشن",
    "specialty_trauma": "صدمہ",
    "specialty_couples_therapy": "جوڑوں کی تھراپی",
    "specialty_family_counseling": "خاندانی مشاورت",
    "specialty_addiction": "لت",
    "specialty_grief_counseling": "غم کی مشاورت",
    "specialty_teen_counseling": "نوجوان مشاورت",
    "specialty_adhd": "ADHD",
    "specialty_cbt": "CBT", 
    "specialty_mindfulness": "ذہن سازی",
    
    // Time Slots
    "time_10am": "صبح 10 بجے",
    "time_11am": "صبح 11 بجے",
    "time_noon": "دوپہر",
    "time_1pm": "دوپہر 1 بجے",
    "time_2pm": "دوپہر 2 بجے",
    "time_3pm": "دوپہر 3 بجے",
    "time_4pm": "شام 4 بجے",
    "time_5pm": "شام 5 بجے",
    "time_10am_11am": "صبح 10 بجے - 11 بجے",
    "time_11am_12pm": "صبح 11 بجے - دوپہر 12 بجے",
    "time_1pm_2pm": "دوپہر 1 بجے - 2 بجے",
    "time_2pm_3pm": "دوپہر 2 بجے - 3 بجے", 
    "time_3pm_4pm": "دوپہر 3 بجے - 4 بجے",
    "time_4pm_5pm": "شام 4 بجے - 5 بجے",
    
    // Booking Interface
    "counselor_label": "مشیر",
    "filter_by_specialty": "خصوصیت کے ذریعے فلٹر کریں",
    "clear_all_filters": "تمام فلٹرز صاف کریں",
    "filters": "فلٹرز",
    "calendar": "کیلنڈر",
    
    // Dashboard Content (only new keys)
    "dashboard_recent_booking_activity": "حالیہ بکنگ سرگرمی",
    "dashboard_recent_conversations": "حالیہ بات چیت",
    "dashboard_reschedule": "دوبارہ شیڈول",
    "dashboard_view_institutional_analytics": "ادارہ جاتی تجزیات اور انتظامی ٹولز دیکھیں",
    "dashboard_select_timeframe": "ٹائم فریم منتخب کریں:",
    "dashboard_timeframe": "ٹائم فریم",
    "dashboard_last_7_days": "آخری 7 دن", 
    "dashboard_last_30_days": "آخری 30 دن",
    "dashboard_custom": "کسٹم",
    "dashboard_yesterday": "کل",
    "dashboard_chats_initiated": "شروع کی گئی چیٹس",
    "dashboard_active_bookings": "فعال بکنگز", 
    "dashboard_flagged_urgent": "فوری نشان زد",
    "dashboard_mood_index": "موڈ انڈیکس",
    "dashboard_confirmed": "تصدیق شدہ",
    "dashboard_pending": "زیر التواء",
    "dashboard_completed": "مکمل",
    "dashboard_today_1400": "آج، 14:00",
    "dashboard_today_1230": "آج، 12:30", 
    "dashboard_yesterday_1615": "کل، 16:15",
    "dashboard_panic_feelings_improved": "سانس لینے کی مشق کے بعد گھبراہٹ کے احساسات میں بہتری آئی۔",
    "dashboard_discussed_sleep_hygiene": "نیند کی صفائی اور مطالعہ کی منصوبہ بندی پر بحث کی۔",
    "dashboard_explored_motivation_triggers": "حوصلہ افزائی کے محرکات اور چھوٹے اہداف کی تلاش کی۔",
    
    // Profile Page
    "profile_manage_personal_info": "اپنی ذاتی معلومات اور ترجیحات کا انتظام کریں۔",
    "profile_student_name": "طالب علم کا نام",
    "profile_student_email": "student@example.com",
    "profile_change": "تبدیل کریں", 
    "profile_name": "نام",
    "profile_email": "ای میل",
    "profile_email_notifications": "ای میل اطلاعات",
    "profile_receive_important_updates": "اہم اپڈیٹس حاصل کریں",
    "profile_push_notifications": "پش اطلاعات",
    "profile_enable_device_alerts": "ڈیوائس الرٹس فعال کریں",
    "profile_save_changes": "تبدیلیاں محفوظ کریں",
    
    // Notifications Page
    "notifications_stay_up_to_date": "چیٹس، بکنگز اور کمیونٹی میں اپ ٹو ڈیٹ رہیں۔",
    "notifications_mark_all_read": "سب کو پڑھا ہوا نشان زد کریں",
    "notifications_clear_all": "سب صاف کریں", 
    "notifications_all_caught_up": "آپ سب کے ساتھ اپ ٹو ڈیٹ ہیں۔",
    "notifications_new": "نیا",
    "notification_new_message_from_ai": "سپورٹ AI سے نیا پیغام",
    "notification_breathing_exercise": "مجھے ایک سانس لینے کی مشق ملی جو آپ کو پسند آ سکتی ہے۔",
    "notification_booking_confirmed": "بکنگ کی تصدیق",
    "notification_session_with_ms_lee": "محترمہ لی کے ساتھ آپ کا سیشن جمعرات شام 4:00 بجے مقرر ہے۔",
    "notification_community_reply": "کمیونٹی جواب",
    "notification_alex_replied": "ایلیکس نے Exam Stress میں آپ کی پوسٹ کا جواب دیا۔",
    "notification_time_2m": "2 منٹ",
    "notification_time_1h": "1 گھنٹہ",
    
    "all": "تمام",
    
    // Categories & Formats
    "anxiety": "بےچینی",
    "mindfulness": "ذہن سازی",
    "sleep": "نیند",
    "depression": "ڈپریشن",
    "stress": "دباؤ",
    "productivity": "پیداواری صلاحیت",
    "article": "مضمون",
    "video": "ویڈیو",
    "worksheet": "ورک شیٹ",
    "guide": "گائیڈ",
    
    // Profile & Navigation
    "profile": "پروفائل",
    "notifications": "اطلاعات",
    "dashboard": "ڈیش بورڈ",
    "logout": "لاگ آؤٹ",
    "health": "صحت",
    
    // Auth Pages
    "university": "یونیورسٹی",
    "counselor": "مشیر",
    "student": "طالب علم",
    
    // Common Actions
    "submit": "جمع کریں",
    "cancel": "منسوخ کریں",
    "edit": "ترمیم کریں",
    "delete": "ڈیلیٹ کریں",
    "create": "بنائیں",
    "update": "اپ ڈیٹ کریں",
    "loading": "لوڈ ہو رہا ہے...",
    "error": "خرابی",
    "success": "کامیابی",
    
    // Home Page
    "student_mental_wellness_platform": "طلباء کی ذہنی صحت کا پلیٹ فارم",
    "home_chat_ai_description": "AI کے ساتھ چیٹ کریں، گمنام طور پر معالجین بک کریں، اور طلبا پر مبنی وسائل کے ساتھ ترقی کریں",
    "ai_chat_support": "AI چیٹ سپورٹ",
    "ai_chat_support_desc": "دباؤ اور پریشانی کے لیے 24/7 رہنمائی",
    "anonymous_booking": "گمنام بکنگ",
    "anonymous_booking_desc": "محفوظ طریقے سے طلبا پر مرکوز معالجین تلاش کریں",
    "personal_growth": "ذاتی ترقی",
    "personal_growth_desc": "منتخب کردہ ذہنی صحت کے وسائل",
    
    // Reports Page
    "reports": "رپورٹس",
    "reports_description": "طلبا اور مشیروں کے لیے تفصیلات تلاش کریں اور دیکھیں",
    "search_by_name_email": "نام یا ای میل کے ذریعے تلاش کریں",
    "enter_name_email": "نام یا ای میل درج کریں...",
    "search_type": "تلاش کی قسم",
    "search_results": "تلاش کے نتائج",
    "students": "طلبا",
    "counselors": "مشیر",
    
    // Hero Component
    "peace_love_santuy": "امن محبت اور سنتوی",
    "hero_title": "تحقیق سے علاج تک ذہنی تندرستی۔ 🧠",
    "hero_description": "پیس لیب نئے طریقوں کی نشاندہی، اختراع اور تجارتی کاری کرتا ہے۔ سائیکیڈیلکس درد میں مبتلا دنیا کو ٹھیک کر سکتے ہیں اور پیس لیب اس میں پیش قدمی کر رہا ہے۔ 💜",
    "get_started": "شروع کریں",
    
    // Mental Health Dashboard
    "student_mental_health_analytics": "طلباء کی ذہنی صحت کا تجزیہ 📊",
    "track_emotional_wellbeing": "طلبا کی زندگی کے لیے ڈیزائن کردہ AI سے چلنے والی بصیرت کے ساتھ اپنی جذباتی بہبودی کو ٹریک کریں",
    "stress_level": "دباؤ کی سطح 🧠",
    "academic_pressure_tracking": "ہفتے بھر تعلیمی دباؤ کی ٹریکنگ",
    "anxiety_episodes": "پریشانی کے واقعات 💜",
    "weekly_anxiety_pattern": "ہفتہ وار پریشانی کے نمونے کا تجزیہ",
    "sleep_quality": "نیند کا معیار 💤",
    "average_sleep_exam": "امتحان کی مدت کے دوران اوسط نیند",
    "focus_stability": "توجہ کی استحکام 🎯",
    "concentration_study": "مطالعہ کے سیشنز کے دوران ارتکاز",
    "daily_mood": "یومیہ موڈ 😊",
    "weekly_emotional_patterns": "ہفتہ وار جذباتی نمونے",
    "study_sessions": "مطالعہ کے سیشنز 📚",
    "study_intensity_weeks": "3 ہفتوں میں مطالعہ کی شدت",
    
    // Features Component
    "features": "خصوصیات",
    "anonymous_booking_feature": "گمنام بکنگ 🔒",
    "anonymous_booking_feature_desc": "آپ کی رازداری سب سے پہلے آتی ہے—بغیر کسی فیصلے کے تناؤ سے پاک مدد۔",
    "ai_powered_chat_feature": "AI سے چلنے والی چیٹ ✨",
    "ai_powered_chat_feature_desc": "تعلیمی تناؤ اور ذہنی تندرستی کے لیے 24/7 رہنمائی۔",
    "student_counselors_feature": "طالب علم مشیر 👥",
    "student_counselors_feature_desc": "تصدیق شدہ معالج جو طالب علم کی زندگی کو سمجھتے ہیں۔",
    "stress_management_feature": "تناؤ کا انتظام 📚",
    "stress_management_feature_desc": "امتحان کی پریشانی اور تعلیمی دباؤ کے لیے منتخب کردہ گائیڈز۔",
    "peer_communities_feature": "ہم عمر کمیونٹیز 💬",
    "peer_communities_feature_desc": "طلبا کے لیے محفوظ جگہیں تاکہ وہ بانٹ سکیں اور ایک دوسرے کا ساتھ دے سکیں۔",
    
    // Testimonials Component
    "testimonials_title": "طالب علم کمیونٹی اور تعارفی خط 💬",
    "testimonial_alex_name": "ایلکس (کالج کا طالب علم)",
    "testimonial_alex_text": "امتحان کے تناؤ کو سنبھالنا بہت آسان ہو گیا۔ AI نے میری پریشانی کے نمونوں کو ٹریک کرنے اور سکون پانے میں مدد کی۔",
    "testimonial_maya_name": "مایا (یونیورسٹی)",
    "testimonial_maya_text": "موڈ ٹریکنگ نے مجھے فائنل ویک کے دوران اپنے تناؤ کے محرکات کا احساس دلایا۔ زندگی بدلنے والی بصیرت!",
    "testimonial_jai_name": "جے (گریجویٹ طالب علم)",
    "testimonial_jai_text": "صاف، سادہ، اور بالکل وہی جس کی تناؤ زدہ طلبا کو ضرورت ہوتی ہے۔ کوئی بھاری خصوصیات نہیں، صرف مددگار مدد۔",
    
    // CTA Component
    "cta_title": "آج ہی اپنی ذہنی تندرستی کا سفر شروع کریں 🌟 — یہ مفت، گمنام، اور آپ جیسے طلبا کے لیے ڈیزائن کیا گیا ہے۔ 🎓",
    "cta_button": "اپنا سفر شروع کریں 🧠",
    
    // Footer Component
    "footer_home": "ہوم",
    "footer_chat": "چیٹ",
    "footer_booking": "بکنگ",
    "footer_resources": "وسائل",
    "footer_community": "کمیونٹی",
    "footer_copyright": "تمام حقوق محفوظ ہیں۔",
    
    // MoodTrackerApp Component
    "mood_tracker_title": "موڈ ٹریکنگ کو خوبصورت بنایا گیا",
    "mood_tracker_description": "کھیل جیسے کرداروں اور خوبصورت ڈیزائن کے ساتھ اپنے جذبات کا اظہار کریں",
    "how_feeling_today": "آج آپ کیسا محسوس کر رہے ہیں؟",
    "share_how_feel": "بتائیں کہ آپ کیسا محسوس کر رہے ہیں۔",
    "mood_get_started": "شروع کریں",
    "already_have_account": "پہلے سے اکاؤنٹ ہے؟",
    "log_in": "لاگ ان کریں",
    "good_morning_dan": "صبح بخیر ڈین!",
    "start_your_day": "یہاں سے اپنا دن شروع کریں!",
    "for_good_mornings": "اچھی صبح کے لیے",
    "for_afternoon_lifts": "دوپہر کی توانائی کے لیے",
    "new_day": "نیا دن",
    "fresh_start": "نئی شروعات",
    "bright_mornings": "روشن صبحیں،",
    "bold_beginnings": "بہادر شروعات",
    "awake_energize": "جاگو، توانائی بھرو،",
    "conquer_today": "آج جیتو",
    "pause_recharge": "رکو، ری چارج کرو،",
    "power_up": "پاور اپ",
    "keep_calm": "پرسکون رہو،",
    "stay_focused": "فوکس رہو",
    "select_todays_mood": "آج کا اپنا موڈ منتخب کریں",
    "mood_save": "محفوظ کریں",
    "joyful": "خوشی",
    "cheerful": "خوش",
    "content": "مطمئن",
    "heartbroken": "دل ٹوٹا",
    "despairing": "مایوس",
    "devastated": "تباہ",
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};