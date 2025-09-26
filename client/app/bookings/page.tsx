"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Filter } from "lucide-react"
import { BookingFilters } from "@/components/booking/BookingFilters"
import { BookingCalendar } from "@/components/booking/BookingCalendar"
import { ScheduleGrid } from "@/components/booking/ScheduleGrid"
import { CounselorDetailsModal } from "@/components/booking/CounselorDetailsModal"
import { BookingModal } from "@/components/booking/BookingModal"
import { ProfileIcon } from "@/components/profile/icon"
import { cn } from "@/lib/utils"
import { TopNav } from "@/components/nav/top-nav"
import { useLanguage } from "@/components/ui/language-context"
import LanguageSelector from "@/components/ui/language-selector"
const counselors = [
  {
    id: 1,
    name: "counselor_sarah_chen",
    title: "counselor_sarah_title", 
    specialties: ["specialty_anxiety", "specialty_depression", "specialty_trauma"],
    avatar: "/professional-therapist-woman.png",
    initials: "SC",
  },
  {
    id: 2,
    name: "counselor_michael_rodriguez",
    title: "counselor_michael_title",
    specialties: ["specialty_couples_therapy", "specialty_family_counseling"],
    avatar: "/professional-therapist-man.jpg",
    initials: "MR",
  },
  {
    id: 3,
    name: "counselor_emily_johnson",
    title: "counselor_emily_title",
    specialties: ["specialty_addiction", "specialty_grief_counseling"],
    avatar: "/professional-therapist-woman-blonde.jpg",
    initials: "EJ",
  },
  {
    id: 4,
    name: "counselor_david_kim",
    title: "counselor_david_title",
    specialties: ["specialty_teen_counseling", "specialty_adhd"],
    avatar: "/professional-therapist-asian-man.jpg",
    initials: "DK",
  },
  {
    id: 5,
    name: "counselor_lisa_thompson",
    title: "counselor_lisa_title",
    specialties: ["specialty_cbt", "specialty_mindfulness"],
    avatar: "/professional-therapist-woman-curly-hair.jpg",
    initials: "LT",
  },
]

const appointments = [
  { counselorId: 1, time: "time_10am_11am", status: "available" },
  { counselorId: 1, time: "time_2pm_3pm", status: "booked" },
  { counselorId: 2, time: "time_10am_11am", status: "available" },
  { counselorId: 2, time: "time_11am_12pm", status: "available" },
  { counselorId: 3, time: "time_1pm_2pm", status: "available" },
  { counselorId: 3, time: "time_3pm_4pm", status: "booked" },
  { counselorId: 4, time: "time_10am_11am", status: "available" },
  { counselorId: 4, time: "time_2pm_3pm", status: "available" },
  { counselorId: 5, time: "time_11am_12pm", status: "available" },
  { counselorId: 5, time: "time_4pm_5pm", status: "booked" },
]

const timeSlots = ["time_10am", "time_11am", "time_noon", "time_1pm", "time_2pm", "time_3pm", "time_4pm", "time_5pm"]

export default function CounselorSchedule() {
  const { t } = useLanguage()
  const [showCalendar, setShowCalendar] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  // Note: Removed scroll prevention as calendar and filters are inline dropdowns, not modals
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2021, 5, 4)) // June 4th, 2021
  const [selectedDate, setSelectedDate] = useState("")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<{
    counselorId: number
    timeSlot: string
    counselorName: string
  } | null>(null)
  const [bookedAppointments, setBookedAppointments] = useState<Set<string>>(new Set())
  // Counselor details modal state
  const [showCounselorDetails, setShowCounselorDetails] = useState(false);
  const [counselorDetails, setCounselorDetails] = useState<any>(null);

  // Initialize selectedDate with translated format
  useEffect(() => {
    setSelectedDate(formatDate(currentDate))
  }, [t]) // Re-run when language changes

  const getAppointmentForCounselor = (counselorId: number, timeSlot: string) => {
    const appointmentKey = `${counselorId}-${timeSlot}`
    if (bookedAppointments.has(appointmentKey)) {
      return { counselorId, time: `${timeSlot.toLowerCase()} - ${getNextHour(timeSlot)}`, status: "booked" }
    }
    return appointments.find((apt) => apt.counselorId === counselorId && apt.time.startsWith(timeSlot.toLowerCase()))
  }

  const getNextHour = (timeSlot: string) => {
    const timeMap: { [key: string]: string } = {
      "10am": "11am",
      "11am": "12pm",
      Noon: "1pm",
      "1pm": "2pm",
      "2pm": "3pm",
      "3pm": "4pm",
      "4pm": "5pm",
      "5pm": "6pm",
    }
    return timeMap[timeSlot] || "next hour"
  }

  const handleBookAppointment = (counselorId: number, timeSlot: string) => {
    const counselor = counselors.find((c) => c.id === counselorId)
    if (counselor) {
      setSelectedBooking({
        counselorId,
        timeSlot,
        counselorName: counselor.name,
      })
      setShowBookingModal(true)
    }
  }

  const confirmBooking = (bookingType: 'online' | 'offline') => {
    if (selectedBooking) {
      const appointmentKey = `${selectedBooking.counselorId}-${selectedBooking.timeSlot}`
      setBookedAppointments((prev) => new Set([...prev, appointmentKey]))
      setShowBookingModal(false)
      setSelectedBooking(null)
      
      // You can add additional logic here to handle the booking type
      // For example, save to database with booking type information
      console.log(`Booking confirmed: ${bookingType} session with ${t(selectedBooking.counselorName)}`)
    }
  }

  const cancelBooking = () => {
    setShowBookingModal(false)
    setSelectedBooking(null)
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
    setSelectedDate(formatDate(newDate))
  }

  const formatDate = (date: Date) => {
    const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const monthKeys = [
      "january",
      "february", 
      "march",
      "april",
      "may",
      "june",
      "july", 
      "august",
      "september",
      "october",
      "november",
      "december",
    ]

    return `${t(dayKeys[date.getDay()])}, ${t(monthKeys[date.getMonth()])} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`
  }

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date)
    setSelectedDate(formatDate(date))
    setShowCalendar(false)
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const filteredCounselors =
    selectedFilters.length === 0
      ? counselors
      : counselors.filter((counselor) => counselor.specialties.some((specialty) => selectedFilters.includes(specialty)))

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8 md:pl-20">
      <TopNav/>
      <div className="hidden lg:block absolute right-5 top-5">
        <ProfileIcon />
      </div>
      <div className="max-w-7xl mx-auto pt-20 sm:pt-6 md:pt-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-pretty text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-100">{t("counselor_schedule")}📆</h1>
          </div>
          <LanguageSelector />
        </div>

        {/* Date Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-slate-100 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-base sm:text-lg font-medium">{selectedDate}</h2>
              <Button variant="ghost" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
              {filteredCounselors.length * 3} {t("available_slots")}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-black">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}  className={cn(
                            "px-3 py-1.5 text-sm font-medium w-full sm:w-auto",
                            "bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90 transition", 
                          )}>
              <Filter className="w-4 h-4 mr-2" />
              {t("filters")}
              {selectedFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowCalendar(!showCalendar)}  className={cn(
                            "px-3 py-1.5 text-sm font-medium w-full sm:w-auto",
                            "bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90 transition",
                          )}>
              <Calendar className="w-4 h-4 mr-2" />
              {t("calendar")}
            </Button>
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <BookingFilters
            specialties={[
              "anxiety",
              "depression", 
              "trauma",
              "relationships",
              "family",
              "addiction",
              "grief",
              "academic",
              "career",
              "mindfulness",
            ]}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            clearFilters={() => setSelectedFilters([])}
          />
        )}

        {/* Calendar Popup */}
        {showCalendar && (
          <BookingCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            handleDateSelect={handleDateSelect}
            generateCalendarDays={generateCalendarDays}
          />
        )}

        {/* Schedule Grid */}
        <ScheduleGrid
          counselors={counselors}
          timeSlots={timeSlots}
          filteredCounselors={filteredCounselors}
          getAppointmentForCounselor={getAppointmentForCounselor}
          handleBookAppointment={handleBookAppointment}
          getNextHour={getNextHour}
          onShowCounselorDetails={(counselor) => {
            setCounselorDetails({
              ...counselor,
              rating: 4.8,
              experience: "8 years",
            });
            setShowCounselorDetails(true);
          }}
        />

        {/* Booking Confirmation Modal */}
        <BookingModal
          show={showBookingModal}
          selectedBooking={selectedBooking}
          selectedDate={selectedDate}
          getNextHour={getNextHour}
          confirmBooking={confirmBooking}
          cancelBooking={cancelBooking}
        />
        {/* Counselor Details Modal */}
        <CounselorDetailsModal
          show={showCounselorDetails}
          counselor={counselorDetails}
          onClose={() => setShowCounselorDetails(false)}
        />
      </div>
    </div>
  )
}

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th"
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}
