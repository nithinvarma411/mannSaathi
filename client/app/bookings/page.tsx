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
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    avatar: "/professional-therapist-woman.png",
    initials: "SC",
  },
  {
    id: 2,
    name: "Dr. Michael Rodriguez",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Couples Therapy", "Family Counseling"],
    avatar: "/professional-therapist-man.jpg",
    initials: "MR",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    title: "Licensed Clinical Social Worker",
    specialties: ["Addiction", "Grief Counseling"],
    avatar: "/professional-therapist-woman-blonde.jpg",
    initials: "EJ",
  },
  {
    id: 4,
    name: "Dr. David Kim",
    title: "Licensed Professional Counselor",
    specialties: ["Teen Counseling", "ADHD"],
    avatar: "/professional-therapist-asian-man.jpg",
    initials: "DK",
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    title: "Licensed Clinical Psychologist",
    specialties: ["CBT", "Mindfulness"],
    avatar: "/professional-therapist-woman-curly-hair.jpg",
    initials: "LT",
  },
]

const appointments = [
  { counselorId: 1, time: "10am - 11am", status: "available" },
  { counselorId: 1, time: "2pm - 3pm", status: "booked" },
  { counselorId: 2, time: "10am - 11am", status: "available" },
  { counselorId: 2, time: "11am - 12pm", status: "available" },
  { counselorId: 3, time: "1pm - 2pm", status: "available" },
  { counselorId: 3, time: "3pm - 4pm", status: "booked" },
  { counselorId: 4, time: "10am - 11am", status: "available" },
  { counselorId: 4, time: "2pm - 3pm", status: "available" },
  { counselorId: 5, time: "11am - 12pm", status: "available" },
  { counselorId: 5, time: "4pm - 5pm", status: "booked" },
]

const timeSlots = ["10am", "11am", "Noon", "1pm", "2pm", "3pm", "4pm", "5pm"]

export default function CounselorSchedule() {
  const { t } = useLanguage()
  const [showCalendar, setShowCalendar] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  // Note: Removed scroll prevention as calendar and filters are inline dropdowns, not modals
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2021, 5, 4)) // June 4th, 2021
  const [selectedDate, setSelectedDate] = useState("Friday, June 4th")
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
      console.log(`Booking confirmed: ${bookingType} session with ${selectedBooking.counselorName}`)
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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`
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
              {filteredCounselors.length * 3} available slots
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
              "Anxiety",
              "Depression",
              "Trauma",
              "Couples Therapy",
              "Family Counseling",
              "Addiction",
              "Grief Counseling",
              "Teen Counseling",
              "ADHD",
              "CBT",
              "Mindfulness",
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
